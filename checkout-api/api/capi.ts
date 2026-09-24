import crypto from "node:crypto";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { cors } from "./_lib.js";

/**
 * Meta Conversions API relay.
 *
 * The site is a static export on GitHub Pages, so it has no server of its own
 * to send events from — this Vercel function is it. The browser fires the
 * pixel as usual and posts the same event here; we add the things only a
 * server can see (the caller's IP, the hashed personal details) and forward it
 * to Meta.
 *
 * Both copies carry the same `event_id`, which is how Meta knows they're one
 * event and not two. Get that wrong and every conversion counts twice.
 *
 * Silent by design: a tracking failure must never surface to a visitor, and
 * must never fail the request that triggered it.
 */

const DATASET_ID = "1757904242196710";
const API_VERSION = "v21.0";

/** Set in the Vercel project's environment variables — never committed. */
const TOKEN = process.env.META_CAPI_TOKEN ?? "";

export const capiConfigured = Boolean(TOKEN);

/** Events this relay will forward. Anything else is dropped rather than guessed at. */
const ALLOWED = new Set(["Schedule", "ViewContent", "Lead", "Purchase", "InitiateCheckout", "AddToCart"]);

/**
 * Meta wants personal details normalised then SHA-256 hashed, and it is strict
 * about the normalising: any stray whitespace or capital letter produces a
 * different hash and the person simply doesn't match.
 */
const sha256 = (v: string) => crypto.createHash("sha256").update(v).digest("hex");

const hashText = (v?: string) => {
  const clean = (v ?? "").trim().toLowerCase();
  return clean ? sha256(clean) : undefined;
};

/**
 * Phone numbers hash as digits only, including the country code. An Australian
 * mobile typed as "0412 345 678" has to become "61412345678" or it won't match
 * the same person's number held by Meta in international form.
 */
const hashPhone = (v?: string) => {
  let digits = (v ?? "").replace(/\D/g, "");
  if (!digits) return undefined;
  if (digits.startsWith("0")) digits = `61${digits.slice(1)}`;
  else if (!digits.startsWith("61") && digits.length <= 9) digits = `61${digits}`;
  return sha256(digits);
};

/** Strips undefined keys — Meta treats an explicit null as a declared-but-empty field. */
const compact = <T extends Record<string, unknown>>(o: T) =>
  Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined && v !== ""));

type Body = {
  event_name?: string;
  event_id?: string;
  event_source_url?: string;
  /** Unix seconds. Defaults to now; the Cal webhook sends the booking's own time. */
  event_time?: number;
  /** Meta's own cookies, read in the browser. The only identifiers an anonymous view has. */
  fbp?: string;
  fbc?: string;
  email?: string;
  phone?: string;
  first_name?: string;
  last_name?: string;
  custom_data?: Record<string, unknown>;
  /** Echoed back by Meta's Test Events tab when set. */
  test_event_code?: string;
};

/**
 * Sends one event. Exported so the Cal webhook can call it directly rather
 * than making an HTTP round trip to ourselves.
 */
export async function sendToMeta(b: Body, ip?: string, ua?: string): Promise<boolean> {
  if (!capiConfigured || !b.event_name || !ALLOWED.has(b.event_name)) return false;

  const user_data = compact({
    em: hashText(b.email),
    ph: hashPhone(b.phone),
    fn: hashText(b.first_name),
    ln: hashText(b.last_name),
    // These four are sent raw — Meta hashes cookies and network details itself,
    // and hashing them here would break the match.
    fbp: b.fbp,
    fbc: b.fbc,
    client_ip_address: ip,
    client_user_agent: ua,
  });

  const payload = {
    data: [
      compact({
        event_name: b.event_name,
        event_time: b.event_time ?? Math.floor(Date.now() / 1000),
        event_id: b.event_id,
        event_source_url: b.event_source_url,
        action_source: "website",
        user_data,
        custom_data: b.custom_data,
      }),
    ],
    ...(b.test_event_code ? { test_event_code: b.test_event_code } : {}),
  };

  try {
    const res = await fetch(
      `https://graph.facebook.com/${API_VERSION}/${DATASET_ID}/events?access_token=${encodeURIComponent(TOKEN)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );
    if (!res.ok) {
      // Logged, never thrown. Meta's errors are specific and worth having in
      // the function logs when match quality looks wrong.
      console.warn("CAPI rejected event", b.event_name, res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.warn("CAPI send failed", err);
    return false;
  }
}

/** The caller's real IP, not Vercel's edge. */
export function clientIp(req: VercelRequest): string | undefined {
  const fwd = req.headers["x-forwarded-for"];
  const first = Array.isArray(fwd) ? fwd[0] : (fwd ?? "").split(",")[0];
  return first.trim() || undefined;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (cors(req, res)) return;
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

  try {
    const b = (typeof req.body === "string" ? JSON.parse(req.body) : req.body ?? {}) as Body;
    const ua = (req.headers["user-agent"] as string) || undefined;
    await sendToMeta(b, clientIp(req), ua);
  } catch (err) {
    console.warn("CAPI handler error", err);
  }

  // Always 204. The browser doesn't act on the result, and a failure here is
  // never the visitor's problem.
  return res.status(204).end();
}
