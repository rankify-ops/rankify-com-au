import type { VercelRequest, VercelResponse } from "@vercel/node";
import { stripe } from "./_lib.js";
import { addLead, crmConfigured, markPaid } from "./_crm.js";

/**
 * Stripe's own callback. This — not the return page — is the source of truth
 * that an order was paid: a buyer can close the tab before being redirected,
 * and the return URL can be visited by anyone.
 *
 * Signature verification needs the exact bytes Stripe signed, so this route
 * opts out of body parsing.
 */
export const config = { api: { bodyParser: false } };

async function rawBody(req: VercelRequest): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  return Buffer.concat(chunks);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = req.headers["stripe-signature"];
  if (!secret || typeof signature !== "string") {
    return res.status(400).send("Not signed.");
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(await rawBody(req), signature, secret);
  } catch (err) {
    // An unverified body is either a misconfigured secret or someone poking
    // the endpoint. Either way, don't act on it.
    console.error("webhook signature check failed", err);
    return res.status(400).send("Bad signature.");
  }

  if (event.type === "checkout.session.completed") {
    const s = event.data.object;
    const m = s.metadata ?? {};

    // Everything needed to start the build, in one log line Vercel keeps.
    console.log("ORDER PAID", {
      session: s.id,
      amount: s.amount_total,
      currency: s.currency,
      email: s.customer_details?.email,
      ...m,
    });

    // Flip the CRM record from lead to paying client. Wrapped because a CRM
    // outage must never make us return non-200 — Stripe would retry the event
    // and we'd double-handle a payment that already succeeded.
    try {
      const clientId = m.crm_client_id;
      if (clientId) {
        await markPaid(
          clientId,
          s.amount_total ?? 0,
          `PAID $${((s.amount_total ?? 0) / 100).toLocaleString("en-AU")} via Stripe (${s.id}). ${m.total_pages ?? "?"} pages. Build starts on discovery call.`,
        );
      } else if (crmConfigured) {
        // No lead was recorded (they moved faster than the capture) — create
        // the record now so a paid order is never missing from the CRM.
        await addLead({
          pages: (m.pages ?? "").split(", ").filter(Boolean),
          servicePages: Number(m.service_pages ?? 0),
          totalPages: Number(m.total_pages ?? 0),
          price: Math.round((s.amount_total ?? 0) / 100),
          business: m.business ?? "",
          industry: m.industry ?? "",
          existing: m.existing_site ?? "",
          about: m.about ?? "",
          name: m.contact_name ?? "",
          email: s.customer_details?.email ?? "",
          phone: m.contact_phone ?? "",
        });
      }
    } catch (err) {
      console.error("CRM update failed for", s.id, err);
    }
  }

  return res.status(200).json({ received: true });
}
