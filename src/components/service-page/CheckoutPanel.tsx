"use client";

import { useCallback, useRef } from "react";
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
  const orderRef = useRef(order);
  // One session per open. StrictMode calls this twice in dev, and without the
  // cached promise that's two Stripe sessions for one order — the first one
  // torn down mid-init, which is what surfaces as "Something went wrong".
  const sessionRef = useRef<Promise<string> | null>(null);
  const fetchClientSecret = useCallback(() => {
    sessionRef.current ??= createSession(orderRef.current);
    return sessionRef.current;
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl bg-white">
      <EmbeddedCheckoutProvider stripe={getStripe()} options={{ fetchClientSecret }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
