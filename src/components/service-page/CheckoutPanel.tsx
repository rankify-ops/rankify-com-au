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
  const fetchClientSecret = useCallback(() => createSession(orderRef.current), []);

  return (
    <div className="overflow-hidden rounded-2xl bg-white">
      <EmbeddedCheckoutProvider stripe={getStripe()} options={{ fetchClientSecret }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
