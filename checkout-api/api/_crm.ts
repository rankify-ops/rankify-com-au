/**
 * Talks to rankify-crm's routine endpoint.
 *
 * Proxied through here rather than called from the browser: the bearer secret
 * can't live in client JS. Both env vars are set on this Vercel project.
 */
const CRM_URL = process.env.CRM_API_URL ?? "";
const CRM_SECRET = process.env.CRM_ROUTINE_SECRET ?? "";

export const crmConfigured = Boolean(CRM_URL && CRM_SECRET);

async function routine(body: Record<string, unknown>): Promise<Record<string, unknown> | null> {
  if (!crmConfigured) return null;
  const res = await fetch(`${CRM_URL.replace(/\/$/, "")}/api/routine`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${CRM_SECRET}` },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`CRM ${res.status}: ${await res.text().catch(() => "")}`);
  return (await res.json()) as Record<string, unknown>;
}

export type Brief = {
  /** "rankify" when they asked us to choose the pages instead of picking. */
  pagesMode?: "rankify" | "custom";
  pages: string[];
  servicePages: number;
  totalPages: number;
  price: number;
  business: string;
  industry: string;
  existing: string;
  about: string;
  name: string;
  email: string;
  phone: string;
};

export function briefNotes(b: Brief, extra?: string): string {
  // "Rankify to scope" briefs carry no page list, which used to print as
  // "0 pages" with an empty Pages line — it read like a broken submission
  // rather than the deliberate choice it is.
  const byUs = b.pagesMode === "rankify";
  const lines = [
    `Website configurator — ${byUs ? `Rankify to scope, up to ${b.totalPages}` : b.totalPages} pages, $${b.price.toLocaleString("en-AU")}`,
    byUs
      ? "Pages: asked us to choose"
      : `Pages: ${b.pages.join(", ")}${b.servicePages ? ` + ${b.servicePages} dedicated service page(s)` : ""}`,
    b.business ? `Business: ${b.business}` : "",
    b.industry ? `Industry: ${b.industry}` : "",
    b.existing ? `Existing site: ${b.existing}` : "",
  ].filter(Boolean);
  if (extra) lines.push(extra);
  return lines.join("\n");
}

/**
 * An enquiry that hasn't paid goes to the CRM's "Rankify Website" space, not
 * the client pipeline. Someone who configured a site and wandered off isn't a
 * lead you're working — they'd clog Leads and All with noise.
 *
 * Returns the item id, which rides along in the Stripe session so a later
 * payment can be tied back to this enquiry.
 */
export async function addEnquiry(b: Brief): Promise<string | null> {
  const out = await routine({
    action: "add_website_item",
    item: {
      name: b.business || b.name || b.email,
      status: "Didn't check out",
      list: "Website configurator",
      description: [
        briefNotes(b),
        `Contact: ${b.name || "—"} · ${b.email} · ${b.phone || "no phone"}`,
        b.about ? `About: ${b.about}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    },
  });
  const item = out?.item as { id?: string } | undefined;
  return item?.id ?? null;
}

/**
 * A paid order becomes a real client. `add_lead` always writes status "lead",
 * so it takes a second call to mark them active.
 */
export async function addPaidClient(b: Brief, note: string): Promise<string | null> {
  const out = await routine({
    action: "add_lead",
    lead: {
      company: b.business || b.name || b.email,
      contact: b.name,
      email: b.email,
      phone: b.phone,
      website: b.existing,
      description: b.about,
      notes: briefNotes(b, note),
      services: ["Web Development"],
      estimatedDealValue: b.price,
      leadSource: "Website configurator",
    },
  });
  const client = (out?.client as { id?: string } | undefined)?.id ?? null;
  if (client) await markPaid(client, b.price * 100, note);
  return client;
}

/** Adds one event to a client's CRM Timeline. Never creates a client. */
export async function routineEvent(event: {
  type: string;
  email: string;
  company: string;
  note?: string;
  date?: string;
}): Promise<Record<string, unknown> | null> {
  return routine({ action: "log_timeline", event });
}

/**
 * Applies a Stripe payment to the client's existing CRM card (matched by email,
 * then company): moves it to active, records revenue + hosting, marks their
 * campaign lead won. The CRM does it in one call and ignores repeats of the
 * same stripeRef, so a retried webhook can't double-count.
 */
export async function recordPayment(payment: {
  stripeRef: string;
  email: string;
  company: string;
  source: string;
  dealValue?: number;
  services?: string[];
  items: { name: string; amount: number; category: string }[];
  hosting?: { amount: number; renewalDate: string; type?: string };
  renewal?: boolean;
  note: string;
}): Promise<Record<string, unknown> | null> {
  return routine({ action: "record_payment", payment });
}

/** Marks a lead as a paying client once Stripe confirms the payment. */
export async function markPaid(clientId: string, amountCents: number, note: string): Promise<void> {
  await routine({
    action: "update_status",
    clientId,
    updates: {
      status: "active",
      estimatedDealValue: Math.round(amountCents / 100),
      notes: note,
    },
  });
}

/**
 * VSL funnel captures.
 *
 * These land in the CRM's "Rankify Website" space, not the Leads pipeline.
 * Someone who filled in a name and a budget hasn't booked anything yet, and
 * the same rule the configurator enquiries follow applies here: Leads is for
 * people you're actually working. They become a lead when they book the call.
 *
 * Written at step one, before the budget question, then updated in place when
 * the answer arrives — so one person is one card, not two.
 */
const WEBSITE_SPACE = "rankify-website";

export const VSL_LIST = "VSL qualifying";

function captureItem(c: { name: string; email: string; budget?: string; qualified?: boolean }) {
  return {
    name: c.name || c.email,
    list: VSL_LIST,
    status: c.budget ? (c.qualified ? "Qualified" : "Not qualified") : "No budget yet",
    description: [
      `Contact: ${c.name || "—"} · ${c.email}`,
      c.budget
        ? `Budget: ${c.budget}${c.qualified ? " — sent to the calendar" : " — did not qualify"}`
        : "Completed step one of the VSL qualifying form. Budget not answered yet.",
    ].join("\n"),
  };
}

/** Creates the card. Returns its id so the budget answer can update it. */
export async function addWebsiteCapture(c: {
  name: string;
  email: string;
}): Promise<string | null> {
  const out = await routine({ action: "add_website_item", item: captureItem(c) });
  return (out?.item as { id?: string } | undefined)?.id ?? null;
}

/**
 * Applies the budget answer to the card step one created. With no id — the
 * first request hadn't come back yet — it writes a complete card instead, so
 * the answer is never simply lost.
 *
 * When the visitor qualifies, also upserts a CRM lead so the Cal.com booking
 * webhook can merge by email instead of creating a duplicate.
 */
export async function recordWebsiteBudget(c: {
  id?: string;
  name: string;
  email: string;
  budget: string;
  qualified: boolean;
}): Promise<void> {
  const item = captureItem(c);
  if (!c.id) {
    await routine({ action: "add_website_item", item });
  } else {
    await routine({
      action: "update_space_item",
      space: WEBSITE_SPACE,
      id: c.id,
      updates: { status: item.status, description: item.description },
    });
  }

  if (c.qualified) {
    await routine({
      action: "qualify_lead",
      lead: { name: c.name, email: c.email, budget: c.budget, source: "Free Homepage" },
    }).catch((err: unknown) => console.error("qualify_lead failed", err));
  }
}
