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

/** Returns the new CRM client id, or null if the CRM isn't wired up. */
export async function addLead(b: Brief): Promise<string | null> {
  const out = await routine({
    action: "add_lead",
    lead: {
      // `company` is required by the CRM; fall back to the person so a lead
      // is never dropped for want of a business name.
      company: b.business || b.name || b.email,
      contact: b.name,
      email: b.email,
      phone: b.phone,
      website: b.existing,
      description: b.about,
      notes: briefNotes(b, "Started checkout — not yet paid."),
      services: ["Web Development"],
      estimatedDealValue: b.price,
      leadSource: "Website configurator",
    },
  });
  const client = out?.client as { id?: string } | undefined;
  return client?.id ?? null;
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
