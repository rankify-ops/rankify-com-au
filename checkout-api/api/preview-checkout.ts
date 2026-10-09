import type Stripe from "stripe";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { stripe, cors, clip } from "./_lib.js";

/**
 * Checkout for the free home page preview offer (the PreviewGate lock screen
 * on each client's preview site, backed by rankify-previews).
 *
 *   GET  ?site=<slug>          → the prices to show on the card, incl. any live offer
 *   POST { site, returnUrl }   → a hosted Checkout URL
 *
 * One Checkout, two items: the website build (one-off) and hosting (recurring
 * yearly). In subscription mode Stripe puts the one-off item on the first
 * invoice, so the client pays the build today and Stripe renews hosting.
 *
 * Launch offer: buy within OFFER_HOURS of opening the preview and the build is
 * $152 off, the first year of hosting is $1 and the first month of the AI web
 * dev assistant is $1 (one scoped coupon covering both first periods; they renew
 * at $249/yr and $100/mo). The window is measured from the
 * preview's server-side startedAt, so it can't be extended from the browser.
 *
 * Prices live here, never in the browser. The email comes from the preview
 * record, not the request, so a session is always for the client the preview
 * was set up for.
 */
const CURRENCY = "aud";
const BUILD_CENTS = 299_900; // $2,999 website build
const HOSTING_CENTS = 24_900; // $249 per year hosting, on top of the build

const AI_CENTS = 10_000; // $100 per month, AI web dev assistant

const OFFER_HOURS = 72;
const OFFER_BUILD_DISCOUNT_CENTS = 15_200; // $2,999 → $2,847
const OFFER_HOSTING_FIRST_YEAR_CENTS = 100; // $1 first year, then $249/yr
const OFFER_AI_FIRST_MONTH_CENTS = 100; // $1 first month, then $100/mo

// Hosting and the AI assistant are real Stripe products/prices (created once,
// found by lookup key) so the launch coupon can be scoped to them alone and
// shown against those lines rather than the whole invoice.
const HOSTING_LOOKUP_KEY = "preview_hosting_yearly_aud_249";
const AI_LOOKUP_KEY = "preview_ai_assistant_monthly_aud_100";
const LAUNCH_COUPON_ID = "preview-launch-first-period-1";

const priceCache: Record<string, { priceId: string; productId: string }> = {};

async function findOrCreatePrice(
  lookupKey: string,
  productName: string,
  productDescription: string,
  unitAmount: number,
  interval: "year" | "month",
): Promise<{ priceId: string; productId: string }> {
  if (priceCache[lookupKey]) return priceCache[lookupKey];
  const found = await stripe.prices.list({ lookup_keys: [lookupKey], active: true, limit: 1 });
  let price = found.data[0];
  if (!price) {
    const product = await stripe.products.create({ name: productName, description: productDescription });
    price = await stripe.prices.create({
      product: product.id,
      currency: CURRENCY,
      unit_amount: unitAmount,
      recurring: { interval },
      lookup_key: lookupKey,
    });
  }
  priceCache[lookupKey] = {
    priceId: price.id,
    productId: typeof price.product === "string" ? price.product : price.product.id,
  };
  return priceCache[lookupKey];
}

const hostingPrice = () =>
  findOrCreatePrice(HOSTING_LOOKUP_KEY, "Website hosting", "Renews yearly.", HOSTING_CENTS, "year");

const aiPrice = () =>
  findOrCreatePrice(
    AI_LOOKUP_KEY,
    "AI web dev assistant",
    "Edit and update your website by chat. Monthly, cancel any time.",
    AI_CENTS,
    "month",
  );

/** One coupon covering both first periods: hosting $1 for a year, AI $1 for a month. */
async function launchCoupon(productIds: string[]): Promise<string> {
  try {
    await stripe.coupons.retrieve(LAUNCH_COUPON_ID);
  } catch {
    await stripe.coupons.create({
      id: LAUNCH_COUPON_ID,
      name: "First year hosting $1 + first month AI $1",
      currency: CURRENCY,
      amount_off:
        HOSTING_CENTS - OFFER_HOSTING_FIRST_YEAR_CENTS + (AI_CENTS - OFFER_AI_FIRST_MONTH_CENTS),
      duration: "once",
      applies_to: { products: productIds },
    });
  }
  return LAUNCH_COUPON_ID;
}

/** Clients who get no launch offer: full price, no countdown. */
const NO_OFFER = new Set(["star-dentistry"]);

/** Per-client build price when Tom quotes something other than $2,999. */
const BUILD_OVERRIDES: Record<string, number> = {};

const PREVIEWS_API = "https://rankify-previews.vercel.app/api/preview";

type PreviewRecord = { email?: string; label?: string | null; startedAt?: string | null };

async function previewRecord(site: string): Promise<PreviewRecord | null> {
  const r = await fetch(PREVIEWS_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ site, action: "status" }),
  });
  if (!r.ok) return null;
  const data = (await r.json()) as { record?: PreviewRecord | null };
  return data.record ?? null;
}

const validSite = (s: unknown): s is string => typeof s === "string" && /^[a-z0-9-]{1,60}$/.test(s);

function quote(site: string, record: PreviewRecord | null, now = Date.now()) {
  const buildCents = BUILD_OVERRIDES[site] ?? BUILD_CENTS;
  const started = record?.startedAt ? new Date(record.startedAt).getTime() : NaN;
  const offerEnds = Number.isFinite(started) ? started + OFFER_HOURS * 3600 * 1000 : NaN;
  const offerActive = Number.isFinite(offerEnds) && now < offerEnds && !NO_OFFER.has(site);
  const offerBuildCents = buildCents - OFFER_BUILD_DISCOUNT_CENTS;
  return {
    currency: CURRENCY,
    buildCents,
    hostingCents: HOSTING_CENTS,
    aiCents: AI_CENTS,
    offer: offerActive
      ? {
          endsAt: new Date(offerEnds).toISOString(),
          buildCents: offerBuildCents,
          hostingFirstYearCents: OFFER_HOSTING_FIRST_YEAR_CENTS,
          aiFirstMonthCents: OFFER_AI_FIRST_MONTH_CENTS,
          savingCents:
            OFFER_BUILD_DISCOUNT_CENTS +
            (HOSTING_CENTS - OFFER_HOSTING_FIRST_YEAR_CENTS) +
            (AI_CENTS - OFFER_AI_FIRST_MONTH_CENTS),
        }
      : null,
    now: new Date(now).toISOString(),
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (cors(req, res)) return;

  try {
    if (req.method === "GET") {
      const site = req.query.site;
      if (!validSite(site)) return res.status(400).json({ error: "Bad site." });
      return res.status(200).json(quote(site, await previewRecord(site)));
    }

    if (req.method !== "POST") return res.status(405).json({ error: "GET or POST only" });

    const b = (typeof req.body === "string" ? JSON.parse(req.body) : req.body ?? {}) as {
      site?: string;
      returnUrl?: string;
    };
    if (!validSite(b.site)) return res.status(400).json({ error: "Bad site." });

    const record = await previewRecord(b.site);
    if (!record?.email) return res.status(404).json({ error: "Preview not set up." });
    const q = quote(b.site, record);

    const returnUrl =
      typeof b.returnUrl === "string" && /^https?:\/\//.test(b.returnUrl)
        ? b.returnUrl.split("?")[0].split("#")[0]
        : "https://www.rankify.com.au/";

    const business = record.label ?? "";
    const metadata: Record<string, string> = {
      source: "preview-gate",
      preview_site: b.site,
      business: clip(business, 200),
      offer: q.offer ? "400-off" : "none",
    };

    const hosting = await hostingPrice();
    // The AI assistant is part of the launch offer only.
    const ai = q.offer ? await aiPrice() : null;
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: CURRENCY,
          unit_amount: q.offer ? q.offer.buildCents : q.buildCents,
          product_data: {
            name: "Website build",
            description: q.offer
              ? "Your new website, built from the home page you previewed. Includes $152 off."
              : "Your new website, built from the home page you previewed.",
          },
        },
      },
      { quantity: 1, price: hosting.priceId },
      ...(ai ? [{ quantity: 1, price: ai.priceId }] : []),
    ];

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: lineItems,
      customer_email: record.email,
      metadata,
      subscription_data: {
        metadata,
        description: `Hosting — ${business || b.site}`,
      },
      success_url: `${returnUrl}?checkout=success`,
      cancel_url: returnUrl,
      automatic_tax: { enabled: false },
      // Stripe won't take a coupon and the promo-code box together: offer
      // sessions carry the $1-hosting coupon, full-price ones allow codes.
      ...(q.offer
        ? {
            discounts: [{ coupon: await launchCoupon([hosting.productId, ...(ai ? [ai.productId] : [])]) }],
            custom_text: { submit: { message: "First year of hosting $1 and first month of the AI assistant $1, then $249 per year and $100 per month. 30-day money-back guarantee · Website live in 7–14 days." } },
          }
        : {
            allow_promotion_codes: true,
            custom_text: { submit: { message: "30-day money-back guarantee · Website live in 7–14 days." } },
          }),
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("preview-checkout failed", err);
    const message = err instanceof Error ? err.message : "";
    return res.status(500).json({ error: "Could not start checkout.", detail: message });
  }
}
