import type { VercelRequest, VercelResponse } from "@vercel/node";
import { cors } from "./_lib.js";
import { addFunnelLead, crmConfigured, routineEvent } from "./_crm.js";

/**
 * The VSL funnel's qualifying form.
 *
 * Called twice for one visitor. `details` is the name and email, sent the
 * moment step one is submitted — before the budget question, so a visitor who
 * answers the first screen and leaves is still recorded. `budget` is their
 * answer, which lands as a timeline event on the record the first call made
 * rather than creating a second card for the same person.
 *
 * Always 200. The visitor is mid-form and a CRM outage is not their problem;
 * failures are logged for us instead.
 */
const SOURCE = "VSL qualifying";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (cors(req, res)) return;
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

  try {
    const b = (typeof req.body === "string" ? JSON.parse(req.body) : req.body ?? {}) as {
      stage?: string;
      name?: string;
      email?: string;
      budget?: string;
      qualified?: boolean;
    };

    const email = (b.email ?? "").trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "A valid email is required." });
    }
    const name = (b.name ?? "").slice(0, 100).trim();

    if (!crmConfigured) {
      console.warn("VSL capture received but CRM is not configured", { email });
      return res.status(200).json({ ok: false });
    }

    if (b.stage === "budget") {
      const budget = (b.budget ?? "").slice(0, 40);
      await routineEvent({
        type: "note",
        email,
        company: name || email,
        note: `VSL qualifying form: budget ${budget}. ${
          b.qualified ? "Qualified, sent to the calendar." : "Did not qualify."
        }`,
      });
      return res.status(200).json({ ok: true });
    }

    const clientId = await addFunnelLead({ name, email, source: SOURCE });
    return res.status(200).json({ ok: true, clientId });
  } catch (err) {
    console.error("VSL qualifying capture failed", err);
    return res.status(200).json({ ok: false });
  }
}
