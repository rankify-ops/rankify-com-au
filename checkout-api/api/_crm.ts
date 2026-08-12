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
  const lines = [
    `Website configurator — ${b.totalPages} pages, $${b.price.toLocaleString("en-AU")}`,
    `Pages: ${b.pages.join(", ")}${b.servicePages ? ` + ${b.servicePages} dedicated service page(s)` : ""}`,
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
