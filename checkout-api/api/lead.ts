import type { VercelRequest, VercelResponse } from "@vercel/node";
import { cors } from "./_lib.js";
import { addLead, crmConfigured, type Brief } from "./_crm.js";

/**
 * Records a configurator lead in the CRM the moment a usable email exists —
 * before the card form, so someone who configures a site and wanders off is
 * still someone we can call.
 *
 * Prices the brief the same way the checkout does, so the deal value on the
 * CRM record matches what they'd have paid.
 */
const BASE = 2999;
const INCLUDED_PAGES = 10;
const EXTRA_PAGE = 200;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (cors(req, res)) return;
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

  try {
    const b = (typeof req.body === "string" ? JSON.parse(req.body) : req.body ?? {}) as Partial<Brief>;

    const email = (b.email ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "A valid email is required." });
    }

    const pages = Array.isArray(b.pages) ? b.pages.filter((p) => typeof p === "string") : [];
    const servicePages = Math.max(0, Math.min(50, Number(b.servicePages) || 0));
    const totalPages = pages.length + servicePages;

    const brief: Brief = {
      pages,
      servicePages,
      totalPages,
      price: BASE + Math.max(0, totalPages - INCLUDED_PAGES) * EXTRA_PAGE,
      business: (b.business ?? "").slice(0, 200),
      industry: (b.industry ?? "").slice(0, 100),
      existing: (b.existing ?? "").slice(0, 200),
      about: (b.about ?? "").slice(0, 1000),
      name: (b.name ?? "").slice(0, 100),
      email,
      phone: (b.phone ?? "").slice(0, 40),
    };

    if (!crmConfigured) {
      // Not an error the visitor should ever see — they're mid-form.
      console.warn("lead received but CRM is not configured", { email: brief.email });
      return res.status(200).json({ clientId: null });
    }

    const clientId = await addLead(brief);
    return res.status(200).json({ clientId });
  } catch (err) {
    // Never block the purchase on a CRM hiccup.
    console.error("lead capture failed", err);
    return res.status(200).json({ clientId: null });
  }
}
