"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { createSession, getStripe, type OrderPayload } from "@/lib/checkout";

/**
 * Stripe's embedded Checkout, mounted inside the configurator card so the
 * buyer never leaves the page.
 *
 * The order is read from a ref taken at mount and `fetchClientSecret` has no
 * dependencies, on purpose: the provider calls it once, and a new function
 * identity would tear down the iframe and open a second session. The panel
 * only mounts once the form is behind us, so the order can't change under it.
 */
export function CheckoutPanel({ order }: { order: OrderPayload }) {
  /**
   * Wait one tick before mounting Stripe.
   *
   * StrictMode mounts, unmounts and remounts every component in dev.
   * EmbeddedCheckoutProvider starts initialising on the first mount, gets torn
   * down halfway through, and the second mount inherits the wreckage — which
   * surfaces as Stripe's "Something went wrong", cleared by closing and
   * reopening. Deferring past the throwaway mount means Stripe only ever
   * initialises once. Harmless in production, where there's no double mount.
   */
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 0);
    return () => clearTimeout(t);
  }, []);

  const orderRef = useRef(order);
  // One session per open. StrictMode calls this twice in dev, and without the
  // cached promise that's two Stripe sessions for one order — the first one
  // torn down mid-init, which is what surfaces as "Something went wrong".
  const sessionRef = useRef<Promise<string> | null>(null);
  const fetchClientSecret = useCallback(() => {
    sessionRef.current ??= createSession(orderRef.current);
    return sessionRef.current;
  }, []);

  if (!ready) {
    return (
      <div className="flex min-h-[420px] items-center justify-center rounded-2xl bg-white">
        <span className="text-[14px] text-grey">Loading secure checkout…</span>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-white">
      <EmbeddedCheckoutProvider stripe={getStripe()} options={{ fetchClientSecret }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
