import { CHECKOUT_API } from "@/lib/checkout";

/**
 * Meta pixel helpers.
 *
 * The pixel is installed in the root layout; these push events onto it and
 * mirror the same event to the Conversions API relay on our Vercel function.
 *
 * Why both: the browser pixel is blocked for a meaningful share of visitors —
 * ad blockers, iOS, privacy extensions — and those conversions simply vanish.
 * The server copy arrives regardless. They are tied together by a shared
 * `event_id`, which is what stops Meta counting one booking as two.
 *
 * Every call is a no-op when `fbq` isn't there, and the server call is
 * fire-and-forget, so a tracking failure can never break the page.
 */
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Standard Meta events. Standard names build audiences and can be optimised for; custom ones can't. */
type StandardEvent =
  | "AddToCart"
  | "InitiateCheckout"
  | "Purchase"
  | "Lead"
  | "Schedule"
  | "ViewContent";

/** Personal details, sent only where we actually have them. Hashed on the server, never here. */
export type PixelPerson = {
  email?: string;
  phone?: string;
  first_name?: string;
  last_name?: string;
};

/**
 * Reads one of Meta's cookies.
 *
 * `_fbp` identifies the browser; `_fbc` holds the click ID from the ad that
 * brought them here. For an anonymous page view they are the only identifiers
 * there are, so a server event without them matches almost nobody.
 */
function cookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const hit = document.cookie.split("; ").find((c) => c.startsWith(`${name}=`));
  return hit ? decodeURIComponent(hit.slice(name.length + 1)) : undefined;
}

/**
 * `_fbc` is only set by the pixel when the landing URL carried `fbclid`. If the
 * cookie hasn't been written yet — first paint, or the pixel is blocked — build
 * it from the URL so a blocked-pixel visitor still attributes to their ad.
 */
function clickId(): string | undefined {
  const fromCookie = cookie("_fbc");
  if (fromCookie) return fromCookie;
  if (typeof window === "undefined") return undefined;
  const fbclid = new URLSearchParams(window.location.search).get("fbclid");
  return fbclid ? `fb.1.${Date.now()}.${fbclid}` : undefined;
}

const newEventId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `ev-${Date.now()}-${Math.random().toString(36).slice(2)}`;

/**
 * Fires an event to the pixel and to the Conversions API under one id.
 *
 * `eventId` can be passed in when both sides can derive the same natural key —
 * a Cal.com booking uid, say — so the browser copy and a later webhook copy
 * still deduplicate against each other.
 */
export function pixelTrack(
  event: StandardEvent,
  params?: Record<string, unknown>,
  person?: PixelPerson,
  eventId?: string,
) {
  if (typeof window === "undefined") return;
  const id = eventId ?? newEventId();

  if (typeof window.fbq === "function") {
    window.fbq("track", event, params, { eventID: id });
  }

  if (!CHECKOUT_API) return;
  try {
    const body = JSON.stringify({
      event_name: event,
      event_id: id,
      event_source_url: window.location.href,
      fbp: cookie("_fbp"),
      fbc: clickId(),
      ...person,
      custom_data: params,
    });

    // `keepalive` so the request survives the page being closed or navigated
    // away from — which is exactly what happens on a CTA click.
    void fetch(`${CHECKOUT_API}/api/capi`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {
    // A tracking failure is never worth surfacing.
  }
}
