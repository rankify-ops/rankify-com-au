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

export function cors(req: VercelRequest, res: VercelResponse): boolean {
  const origin = req.headers.origin ?? "";
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
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
