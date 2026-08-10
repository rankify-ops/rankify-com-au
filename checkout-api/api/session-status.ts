import type { VercelRequest, VercelResponse } from "@vercel/node";
import { stripe, cors } from "./_lib.js";

/**
 * What the return page asks after Stripe sends the buyer back: did it pay?
 *
 * Deliberately returns almost nothing — status, email and amount. Never the
 * whole session, which carries far more than a public page needs.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (cors(req, res)) return;
  if (req.method !== "GET") return res.status(405).json({ error: "GET only" });

  const id = req.query.session_id;
  if (typeof id !== "string" || !id.startsWith("cs_")) {
    return res.status(400).json({ error: "Missing session_id." });
  }

  try {
    const s = await stripe.checkout.sessions.retrieve(id);
    return res.status(200).json({
      status: s.status,
      paymentStatus: s.payment_status,
      email: s.customer_details?.email ?? null,
      amountTotal: s.amount_total,
      currency: s.currency,
      totalPages: s.metadata?.total_pages ?? null,
    });
  } catch (err) {
    console.error("session-status failed", err);
    return res.status(404).json({ error: "Session not found." });
  }
}
