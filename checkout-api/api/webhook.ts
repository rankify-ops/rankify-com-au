import type { VercelRequest, VercelResponse } from "@vercel/node";
import { stripe } from "./_lib.js";
import { addPaidClient, crmConfigured } from "./_crm.js";

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
  // GET is a health check: which env vars this deployment can actually see.
  // Booleans only — never the values. Saves guessing at the Vercel UI when a
  // variable is saved but scoped to no environment, or saved after the last
  // build.
  if (req.method === "GET") {
    return res.status(200).json({
      configured: {
        STRIPE_SECRET_KEY: Boolean(process.env.STRIPE_SECRET_KEY),
        STRIPE_WEBHOOK_SECRET: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
        CRM_API_URL: Boolean(process.env.CRM_API_URL),
        CRM_ROUTINE_SECRET: Boolean(process.env.CRM_ROUTINE_SECRET),
      },
    });
  }

  if (req.method !== "POST") return res.status(405).end();

  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = req.headers["stripe-signature"];
  // Distinct messages: one is our misconfiguration, the other is the caller's.
  if (!secret) return res.status(500).send("Webhook secret not configured.");
  if (typeof signature !== "string") return res.status(400).send("Not signed.");

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

    // A payment always creates a client in the pipeline. The pre-payment
    // enquiry lives in the Rankify Website space, which is a different store —
    // there's no lead record to promote.
    //
    // Wrapped because a CRM outage must never make us return non-200: Stripe
    // would retry the event and we'd double-handle a payment that succeeded.
    try {
      if (crmConfigured) {
        const amount = s.amount_total ?? 0;
        await addPaidClient(
          {
            pages: (m.pages ?? "").split(", ").filter(Boolean),
            servicePages: Number(m.service_pages ?? 0),
            totalPages: Number(m.total_pages ?? 0),
            price: Math.round(amount / 100),
            business: m.business ?? "",
            industry: m.industry ?? "",
            existing: m.existing_site ?? "",
            about: m.about ?? "",
            name: m.contact_name ?? "",
            email: s.customer_details?.email ?? "",
            phone: m.contact_phone ?? "",
          },
          `PAID $${(amount / 100).toLocaleString("en-AU")} via Stripe (${s.id}). ${m.total_pages ?? "?"} pages.`,
        );
      }
    } catch (err) {
      console.error("CRM update failed for", s.id, err);
    }
  }

  return res.status(200).json({ received: true });
}
