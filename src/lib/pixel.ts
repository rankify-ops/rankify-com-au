/**
 * Meta pixel helpers.
 *
 * The pixel is installed in the root layout; these just push events onto it.
 * Every call is a no-op when `fbq` isn't there — an ad blocker, a bot, or the
 * static export running without the script — so a tracking failure can never
 * break the configurator.
 */
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Standard Meta events. Standard names build audiences and can be optimised for; custom ones can't. */
type StandardEvent = "AddToCart" | "InitiateCheckout" | "Purchase" | "Lead";

export function pixelTrack(event: StandardEvent, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("track", event, params);
}
