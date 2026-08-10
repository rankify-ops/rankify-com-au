import type { VercelRequest, VercelResponse } from "@vercel/node";
import { stripe } from "./_lib.js";

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
    // Everything needed to start the build, in one log line Vercel keeps.
    console.log("ORDER PAID", {
      session: s.id,
      amount: s.amount_total,
      currency: s.currency,
      email: s.customer_details?.email,
      ...s.metadata,
    });

    // Fulfilment hook — wire a Lert push or an email here when you want the
    // order to reach your phone rather than the Vercel log.
  }

  return res.status(200).json({ received: true });
}
