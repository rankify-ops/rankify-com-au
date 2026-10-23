import type { VercelRequest, VercelResponse } from "@vercel/node";
import { cors } from "./_lib.js";
import { addWebsiteCapture, crmConfigured, recordWebsiteBudget } from "./_crm.js";

/**
 * The VSL funnel's qualifying form.
 *
 * Called twice for one visitor. `details` is the name and email, sent the
 * moment step one is submitted — before the budget question, so a visitor who
 * answers the first screen and leaves is still recorded. `budget` is their
 * answer, which updates the card the first call created rather than making a
 * second one for the same person.
 *
 * Everything lands in the CRM's "Rankify Website" space, not Leads. They
 * become a lead when they book the call.
 *
 * Always 200. The visitor is mid-form and a CRM outage is not their problem;
 * failures are logged for us instead.
 */

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (cors(req, res)) return;
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

  try {
    const b = (typeof req.body === "string" ? JSON.parse(req.body) : req.body ?? {}) as {
      stage?: string;
      name?: string;
      email?: string;
      phone?: string;
      budget?: string;
      qualified?: boolean;
      /** The card id step one returned, so the answer updates it in place. */
      id?: string;
    };

    const email = (b.email ?? "").trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "A valid email is required." });
    }
    const name = (b.name ?? "").slice(0, 100).trim();
    const phone = (b.phone ?? "").slice(0, 40).trim();

    if (!crmConfigured) {
      console.warn("VSL capture received but CRM is not configured", { email });
      return res.status(200).json({ ok: false });
    }

    if (b.stage === "budget") {
      await recordWebsiteBudget({
        id: typeof b.id === "string" ? b.id.slice(0, 40) : undefined,
        name,
        email,
        phone,
        budget: (b.budget ?? "").slice(0, 40),
        qualified: Boolean(b.qualified),
      });
      return res.status(200).json({ ok: true });
    }

    const id = await addWebsiteCapture({ name, email, phone });
    return res.status(200).json({ ok: true, id });
  } catch (err) {
    console.error("VSL qualifying capture failed", err);
    return res.status(200).json({ ok: false });
  }
}
