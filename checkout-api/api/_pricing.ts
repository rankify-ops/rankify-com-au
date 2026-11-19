/**
 * The CRM's price record, for the endpoints that run per request.
 *
 * The website bakes prices in at build time because they sit in `<title>`
 * tags. This is a server, so it reads them live instead, cached for the five
 * minutes the record asks for and holding the last good copy in case the CRM
 * is briefly unreachable.
 *
 * It does NOT feed Stripe. Amounts charged stay in the checkout handlers and
 * in Stripe's own price objects, deliberately: a live feed into a charge means
 * a bad write in the CRM becomes a wrong card charge, and a price change would
 * silently reprice people mid-checkout. What this is for is the opposite —
 * knowing what the amounts are *supposed* to be, so drift gets noticed. See
 * `driftReport` below and the repricing rule in the pricing API docs.
 *
 * The amounts charged now come from `_pricing.generated.ts`, which is this
 * same record baked in at generate time. So this read is no longer the only
 * thing standing between the record and the charge — it is the check that the
 * baked copy is still current, and it shouts when a deploy has fallen behind.
 */

const URL = process.env.PRICING_URL ?? "https://hq.rankify.com.au/api/pricing";
const TTL_MS = 5 * 60 * 1000;

type Money = { [k: string]: unknown };
export type PriceRecord = {
  version: number;
  status: string;
  effective_from: string;
  products: Record<string, Money>;
};

// Module scope survives between invocations on a warm instance and is simply
// empty on a cold one, which is the right shape for a cache: worst case we
// fetch again.
let cached: PriceRecord | null = null;
let fetchedAt = 0;
let inFlight: Promise<PriceRecord | null> | null = null;

async function load(): Promise<PriceRecord | null> {
  try {
    const res = await fetch(URL, { headers: { Accept: "application/json" } });

    // 404 and 5xx mean opposite things and must not be handled alike.
    //
    // 404 is the record speaking: nothing is published right now. Serving the
    // last good copy there would mean quoting prices that have been
    // deliberately withdrawn, which is worse than quoting none. So the cache
    // is dropped and the caller is told there are no prices.
    if (res.status === 404) {
      if (cached) console.warn("pricing: nothing published, dropping the cached copy");
      cached = null;
      fetchedAt = Date.now();
      return null;
    }

    // Anything else — 5xx, a timeout, a network error — is the CRM failing to
    // answer, not a statement about prices. The last good copy stands.
    if (!res.ok) throw new Error(`pricing ${res.status}`);

    const data = (await res.json()) as PriceRecord;
    if (data.status !== "published" || !data.products) throw new Error("pricing not published");
    cached = data;
    fetchedAt = Date.now();
    return data;
  } catch (err) {
    console.warn("pricing fetch failed, using last good copy", err);
    // Five-minute-old prices beat no prices while the CRM is unreachable, and
    // this never feeds a charge. Null only on a cold instance that has never
    // had a successful read.
    return cached;
  }
}

/** The published record, or null if it has never been reachable. */
export async function getPricing(): Promise<PriceRecord | null> {
  if (cached && Date.now() - fetchedAt < TTL_MS) return cached;
  // One in-flight fetch per instance, so a burst of requests on a cold start
  // does not become a burst of requests at the CRM.
  if (!inFlight) inFlight = load().finally(() => { inFlight = null; });
  return inFlight;
}

const str = (p: Money | undefined, key: string): string | null => {
  const v = p?.[key];
  return typeof v === "string" ? v : null;
};

/**
 * The prices the ask box is allowed to quote, as a block of prompt text.
 *
 * Returns null when the record cannot be read at all. The caller then tells
 * the model to quote nothing rather than quote something stale — a wrong price
 * in a sales conversation is worse than "Tom will confirm on the call".
 */
export function priceBlock(rec: PriceRecord | null): string | null {
  if (!rec) return null;
  const p = rec.products;

  const website = str(p.website_build, "base_display");
  const pages = p.website_build?.pages_included;
  const extra = str(p.website_build, "extra_page_display");
  const hosting = str(p.website_hosting, "per_year_display");
  const shopify = str(p.shopify_build, "from_display");
  const retainer = str(p.shopify_retainer, "from_display");
  const hourly = str(p.shopify_hourly, "per_hour_display");
  const seo = str(p.seo, "per_page_per_month_display");
  const seoMin = p.seo?.minimum_term_months;
  const branding = str(p.branding, "from_display");

  const sidekickTiers = Array.isArray(p.ad_sidekick?.tiers)
    ? (p.ad_sidekick.tiers as Money[]).map((t) => String(t.per_month_display)).filter(Boolean)
    : [];
  const sidekick =
    sidekickTiers.length > 1
      ? `${sidekickTiers.slice(0, -1).join(", ")} or ${sidekickTiers[sidekickTiers.length - 1]}`
      : sidekickTiers[0] ?? null;

  if (!website || !shopify || !seo) return null;

  // The ongoing plans sold through app.rankify.com.au. Optional on purpose:
  // the product was added to the record after this endpoint shipped, so a
  // record without it still answers rather than failing. This line used to be
  // "$199 a month" written into the prompt, which is exactly the kind of copy
  // that goes stale without anyone noticing.
  const plans = p.website_plans;
  const planTiers = Array.isArray(plans?.tiers) ? (plans.tiers as Money[]) : [];
  const planFrom = str(plans, "from_display");
  const planList = planTiers
    .map((t) => `${t.name} ${t.per_month_display}`)
    .filter((x) => !x.includes("undefined"));
  // Yearly is stored as a rule rather than a second number, so it is derived
  // here too instead of being quoted.
  const months = (plans?.billing as Money | undefined)?.year_rule as Money | undefined;
  const yearly =
    typeof months?.months_charged === "number"
      ? ` Paid yearly, you pay ${months.months_charged} months for twelve.`
      : "";

  return [
    `PRICES (version ${rec.version}, effective ${rec.effective_from} — these are the only prices you may quote)`,
    `- Websites from ${website}. ${pages} pages included, ${extra} per page after that.`,
    hosting && `- Hosting and security ${hosting} a year. Nothing else ongoing.`,
    `- Shopify builds from ${shopify}.`,
    retainer && hourly && `- Shopify retainers from ${retainer} a month, or ${hourly} an hour casual.`,
    `- SEO ${seo} per page per month${seoMin ? `, ${seoMin} month minimum` : ""}.`,
    branding && `- Branding and logo packages from ${branding}.`,
    planFrom &&
      planList.length &&
      `- Ongoing website plans at app.rankify.com.au from ${planFrom} a month: ${planList.join(", ")}.${yearly}`,
    sidekick && `- Ad Sidekick ${sidekick} a month. No contract.`,
    `Never quote a price that is not in this list. If you are asked about something not listed, say Tom will confirm it on the call.`,
  ]
    .filter(Boolean)
    .join("\n");
}

/**
 * Compares the amounts a handler charges against what the record says they
 * should be, and returns the mismatches.
 *
 * This is the whole reason the record is not wired into the charge: a
 * mismatch here is a loud log line and a thing a person fixes, not a silent
 * change to what someone's card is debited.
 */
export function driftReport(
  rec: PriceRecord | null,
  charged: Record<string, number>,
  expected: Record<string, [string, string]>,
): string[] {
  if (!rec) return [];
  const out: string[] = [];
  for (const [name, cents] of Object.entries(charged)) {
    const path = expected[name];
    if (!path) continue;
    const [product, field] = path;
    const want = rec.products?.[product]?.[field];
    if (typeof want === "number" && want !== cents) {
      out.push(`${name}: charging ${cents} but ${product}.${field} says ${want}`);
    }
  }
  return out;
}
