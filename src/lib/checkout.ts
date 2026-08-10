import { loadStripe, type Stripe } from "@stripe/stripe-js";
import { BASE_PATH } from "@/lib/basePath";

/**
 * Where the Stripe endpoints live. The site is a static export, so it can't
 * create a Checkout Session itself — see checkout-api/, deployed separately.
 */
export const CHECKOUT_API = process.env.NEXT_PUBLIC_CHECKOUT_API ?? "";

const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "";

/** Both must be set for checkout to run; without them the form stays on email. */
export const checkoutConfigured = Boolean(CHECKOUT_API && PUBLISHABLE_KEY);

let stripePromise: Promise<Stripe | null> | null = null;

/** Loaded once, lazily — Stripe.js is 40KB nobody needs until they check out. */
export function getStripe(): Promise<Stripe | null> {
  if (!stripePromise) stripePromise = loadStripe(PUBLISHABLE_KEY);
  return stripePromise;
}

export function returnUrl(): string {
  return `${window.location.origin}${BASE_PATH}/checkout/complete`;
}

export type OrderPayload = {
  pages: string[];
  servicePages: number;
  business: string;
  industry: string;
  existing: string;
  about: string;
  name: string;
  email: string;
  phone: string;
};

/**
 * Asks the API for a session. Note it sends the *selections*, never a price —
 * the amount is computed server-side so it can't be tampered with.
 */
export async function createSession(order: OrderPayload): Promise<string> {
  const res = await fetch(`${CHECKOUT_API}/api/create-checkout-session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...order, returnUrl: returnUrl() }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || "Could not start checkout.");
  }
  const { clientSecret } = await res.json();
  if (!clientSecret) throw new Error("Could not start checkout.");
  return clientSecret;
}
