import Stripe from "stripe";
import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * Shared bits for the checkout endpoints.
 *
 * The static site is served from a different origin to these functions
 * (GitHub Pages vs Vercel), so every response needs CORS headers and every
 * POST is preceded by a preflight.
 */

/** Set in the Vercel project's environment variables — never committed. */
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2025-10-29.clover",
});

/**
 * Only these origins may create a session. An open `*` would let anyone
 * mint checkout sessions against the account.
 */
const ALLOWED_ORIGINS = [
  "https://www.rankify.com.au",
  "https://rankify.com.au",
  "https://rankify-ops.github.io",
  "http://localhost:5193",
  "http://localhost:3000",
];

/**
 * Returns true when the request is already dealt with — either a preflight was
 * answered or the caller was turned away.
 *
 * The allow-list is enforced, not merely advertised. CORS headers alone only
 * bind browsers: curl sends no `Origin` and ignores the response headers, so
 * header-only "protection" let anything script sessions against the account.
 * Pricing is server-side so nobody could buy a website cheap, but there's no
 * reason to let strangers fill the dashboard with abandoned sessions.
 *
 * Stripe's webhook does not come through here — it sends no Origin, and it
 * authenticates by signature instead.
 */
export function cors(req: VercelRequest, res: VercelResponse): boolean {
  const origin = req.headers.origin ?? "";
  const allowed = ALLOWED_ORIGINS.includes(origin);

  res.setHeader("Vary", "Origin");

  if (!allowed) {
    // 403 on the preflight too, so the browser reports a refusal rather than
    // a vague network error.
    res.status(403).json({ error: "Origin not allowed." });
    return true;
  }

  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return true;
  }
  return false;
}

/** Stripe metadata caps each value at 500 characters. */
export const clip = (v: unknown, max = 480): string =>
  String(v ?? "").slice(0, max);
