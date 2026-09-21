import type { VercelRequest, VercelResponse } from "@vercel/node";
import { routineEvent } from "./_crm.js";

/**
 * Timeline events from the preview gate (rankify-previews), which has no CRM
 * credentials of its own. Server-to-server only: the shared webhook secret is
 * the auth, so no CORS and no browser can reach it.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  const secret = process.env.PREVIEW_WEBHOOK_SECRET;
  if (!secret || req.headers["x-webhook-secret"] !== secret) {
    return res.status(401).json({ error: "unauthorised" });
  }

  const b = (typeof req.body === "string" ? JSON.parse(req.body) : req.body ?? {}) as {
    type?: string;
    email?: string;
    company?: string;
    note?: string;
    date?: string;
  };
  if (!b.type || !(b.email || b.company)) return res.status(400).json({ error: "type and email or company required" });

  try {
    const out = await routineEvent({
      type: b.type,
      email: b.email ?? "",
      company: b.company ?? "",
      note: b.note ?? "",
      date: b.date,
    });
    console.log("TIMELINE EVENT", b.type, b.email || b.company, JSON.stringify(out));
    return res.status(200).json(out ?? { success: false, reason: "crm not configured" });
  } catch (err) {
    console.error("preview-event failed", err);
    return res.status(500).json({ error: "internal error" });
  }
}
