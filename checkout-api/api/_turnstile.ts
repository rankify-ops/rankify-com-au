import type { VercelRequest } from "@vercel/node";
import { callerIp } from "./_limits.js";

/**
 * Cloudflare Turnstile, the bot check in front of the ask box.
 *
 * Rate limiting decides how fast someone may call us. This decides whether
 * they are a someone at all. A limiter alone still lets a botnet grind away
 * within the limits from a thousand addresses; this is the layer that makes
 * that expensive to even attempt.
 *
 * The widget runs on the page, the visitor almost never sees anything, and
 * the token it produces is verified here. Tokens are single use and expire
 * after about five minutes, so the page fetches a fresh one before each
 * message rather than holding one for the conversation.
 */

const SECRET = process.env.TURNSTILE_SECRET_KEY ?? "";

export const turnstileConfigured = Boolean(SECRET);

const VERIFY = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/**
 * True when this token is a real, unused Turnstile solve.
 *
 * Returns false on anything doubtful, including a failure to reach
 * Cloudflare: the endpoint it guards costs money per call, so an unverified
 * caller is turned away rather than given the benefit of the doubt.
 */
export async function humanVerified(req: VercelRequest, token: unknown): Promise<boolean> {
  if (!turnstileConfigured) return false;
  if (typeof token !== "string" || !token || token.length > 2048) return false;

  try {
    const res = await fetch(VERIFY, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: SECRET,
        response: token,
        remoteip: callerIp(req),
      }),
      // Cloudflare is quick. If it is not, we are not holding a visitor's
      // request open waiting for it.
      signal: AbortSignal.timeout(5000),
    });

    const out = (await res.json()) as { success?: boolean; "error-codes"?: string[] };
    if (!out.success) console.warn("turnstile rejected", out["error-codes"]);
    return out.success === true;
  } catch (err) {
    console.error("turnstile verify failed", err);
    return false;
  }
}
