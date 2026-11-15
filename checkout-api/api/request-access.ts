import type { VercelRequest, VercelResponse } from "@vercel/node";
import { cors } from "./_lib.js";
import { allowLead } from "./_limits.js";
import { addSidekickRequest, crmConfigured } from "./_crm.js";

/**
 * Ad Sidekick access requests.
 *
 * Sign-up at sidekick.rankify.com.au/signup is built but switched off, so
 * every "Get started" on the Sidekick pages lands here instead. One card per
 * request, in the CRM's "Rankify Website" space.
 *
 * Unlike the VSL form this one answers honestly: somebody filling it in wants
 * to know they are on the list, so a CRM failure returns 502 rather than a
 * cheerful 200 that loses them.
 */

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (cors(req, res)) return;
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

  // Writes to the CRM, so a bot cannot run up an API bill here, only fill
  // the pipeline with rubbish. Fails open on purpose: losing a real
  // enquiry is the more expensive mistake, so an unreachable counter
  // lets the request through.
  if (!(await allowLead(req, { bucket: "access", burst: 3, perDay: 10 }))) {
    return res.status(429).json({ error: "That is a lot of requests from one place. Email hello@rankify.com.au instead." });
  }

  try {
    const b = (typeof req.body === "string" ? JSON.parse(req.body) : req.body ?? {}) as {
      name?: string;
      email?: string;
      phone?: string;
      business?: string;
      spend?: string;
    };

    const email = (b.email ?? "").trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "A valid email is required." });
    }

    const name = (b.name ?? "").slice(0, 100).trim();
    if (!name) return res.status(400).json({ error: "A name is required." });

    const phone = (b.phone ?? "").slice(0, 40).trim();
    if (!phone) return res.status(400).json({ error: "A mobile number is required." });

    if (!crmConfigured) {
      console.warn("Sidekick access request received but CRM is not configured", { email });
      return res.status(502).json({ error: "We could not record that. Email tom@rankify.com.au." });
    }

    const id = await addSidekickRequest({
      name,
      email,
      phone,
      business: (b.business ?? "").slice(0, 140).trim(),
      spend: (b.spend ?? "").slice(0, 40).trim(),
    });

    return res.status(200).json({ ok: true, id });
  } catch (err) {
    console.error("Sidekick access request failed", err);
    return res.status(502).json({ error: "We could not record that. Email tom@rankify.com.au." });
  }
}
