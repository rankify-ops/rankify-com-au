import crypto from "node:crypto";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sendToMeta } from "./capi.js";

/**
 * Cal.com booking webhook → Meta Conversions API.
 *
 * This is the half of the tracking that survives reality. The browser fires
 * `Schedule` from inside Cal's embed, which works right up until an ad blocker
 * or iOS kills the pixel — and then a real booking, the only conversion that
 * matters here, is never recorded. Cal calls this endpoint from their server,
 * so it lands regardless of what the visitor's browser did.
 *
 * Both copies use `cal-<booking uid>` as the event id, so Meta deduplicates
 * them into one conversion.
 *
 * Note this endpoint deliberately does not go through `cors()`: Cal is a
 * server, sends no Origin, and authenticates by signature instead.
 */

/** Set in Vercel's environment variables. Cal signs every payload with it. */
const SECRET = process.env.CAL_WEBHOOK_SECRET ?? "";

/**
 * Verifies Cal's HMAC signature.
 *
 * Without this, anyone who finds the URL can post fake bookings and quietly
 * poison the conversion data the ad account optimises against.
 */
function verify(req: VercelRequest, raw: string): boolean {
  if (!SECRET) return false;
  const sent = String(req.headers["x-cal-signature-256"] ?? "");
  if (!sent) return false;
  const expected = crypto.createHmac("sha256", SECRET).update(raw).digest("hex");
  // Constant-time: a plain === leaks the signature a byte at a time.
  const a = Buffer.from(sent);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

  const raw =
    typeof req.body === "string" ? req.body : JSON.stringify(req.body ?? {});

  if (!verify(req, raw)) {
    console.warn("Cal webhook rejected: bad or missing signature");
    return res.status(401).json({ error: "Bad signature" });
  }

  try {
    const body = JSON.parse(raw) as {
      triggerEvent?: string;
      payload?: Record<string, any>;
    };

    // Only a created booking is a conversion. Cancellations and reschedules
    // come through here too and must not fire another Schedule.
    if (body.triggerEvent !== "BOOKING_CREATED") return res.status(200).json({ ok: true, skipped: body.triggerEvent });

    const p = body.payload ?? {};
    const attendee = (Array.isArray(p.attendees) ? p.attendees[0] : p.attendee) ?? {};
    const name = String(attendee.name ?? "").trim();
    const [firstName, ...rest] = name.split(/\s+/);
    const responses = p.responses ?? {};

    const uid = p.uid ?? p.bookingId;
    if (!uid) console.warn("Cal webhook: booking with no uid — this one can't deduplicate");

    await sendToMeta({
      event_name: "Schedule",
      // Matches what the browser sends from Cal's bookingSuccessful callback.
      event_id: uid ? `cal-${uid}` : undefined,
      event_source_url: "https://www.rankify.com.au/free-homepage/book",
      // The booking's own creation time, not ours — Meta scores freshness on it.
      event_time: p.createdAt ? Math.floor(new Date(p.createdAt).getTime() / 1000) : undefined,
      email: attendee.email ?? responses?.email?.value ?? responses?.email,
      phone:
        attendee.phoneNumber ??
        responses?.attendeePhoneNumber?.value ??
        responses?.phone?.value ??
        responses?.phone,
      first_name: firstName || undefined,
      last_name: rest.length ? rest.join(" ") : undefined,
      custom_data: { content_name: "Strategy call", content_category: "Booking", currency: "AUD" },
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    // 200 regardless: Cal retries on a non-2xx, and a malformed payload will
    // fail identically every time. Log it and move on.
    console.error("Cal webhook error", err);
    return res.status(200).json({ ok: false });
  }
}
