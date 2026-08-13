"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CHECKOUT_API } from "@/lib/checkout";
import { pixelTrack } from "@/lib/pixel";

type Status = {
  status: string | null;
  paymentStatus: string | null;
  email: string | null;
  amountTotal: number | null;
  currency: string | null;
  totalPages: string | null;
};

/**
 * Where Stripe returns the buyer after embedded checkout.
 *
 * The session id in the URL is only good for *showing* an outcome — the
 * webhook is what actually confirms the order, since anyone can open this
 * page and a buyer can close the tab before ever reaching it.
 */
export function CheckoutResult() {
  const [state, setState] = useState<"loading" | "paid" | "open" | "error">("loading");
  const [data, setData] = useState<Status | null>(null);
  const purchaseSentRef = useRef(false);

  useEffect(() => {
    let live = true;
    // every state write lands in a callback, never straight in the effect body
    Promise.resolve().then(() => {
      if (!live) return;
      const id = new URLSearchParams(window.location.search).get("session_id");
      if (!id || !CHECKOUT_API) {
        setState("error");
        return;
      }
      return fetch(`${CHECKOUT_API}/api/session-status?session_id=${encodeURIComponent(id)}`)
        .then((r) => (r.ok ? r.json() : Promise.reject(new Error("lookup failed"))))
        .then((d: Status) => {
          if (!live) return;
          setData(d);
          setState(d.paymentStatus === "paid" ? "paid" : "open");

          /**
           * Purchase, with the amount Stripe actually charged rather than the
           * price the configurator showed — promo codes and page changes make
           * those differ, and a wrong value teaches Meta the wrong ROAS.
           *
           * Only on a paid session. The session id alone proves nothing (this
           * page opens for abandoned sessions too), so paymentStatus is the
           * gate. Guarded against a double fire from React's dev remount.
           */
          if (d.paymentStatus === "paid" && !purchaseSentRef.current) {
            purchaseSentRef.current = true;
            pixelTrack("Purchase", {
              value: (d.amountTotal ?? 0) / 100,
              currency: (d.currency ?? "aud").toUpperCase(),
              content_name: "Website build",
              content_type: "product",
              num_items: Number(d.totalPages) || 1,
              // Stripe's id, so Meta can de-duplicate if a server-side
              // Conversions API event is ever added for the same order.
              event_id: id,
            });
          }
        })
        .catch(() => {
          if (live) setState("error");
        });
    });
    return () => {
      live = false;
    };
  }, []);

  if (state === "loading") {
    return <p className="text-[17px] text-grey">Confirming your payment…</p>;
  }

  if (state === "paid") {
    const amount =
      data?.amountTotal != null
        ? `$${(data.amountTotal / 100).toLocaleString("en-AU")}`
        : null;
    return (
      <>
        <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[color:#07a889] text-[26px] text-white">
          ✓
        </span>
        <h1 className="text-[clamp(28px,2.7vw,44px)] font-medium leading-[1.05] tracking-[-0.04em]">
          Order confirmed, your build is underway.
        </h1>
        <p className="mt-5 max-w-[560px] text-[16.5px] leading-relaxed text-grey">
          {amount ? `${amount} paid` : "Payment received"}
          {data?.totalPages ? ` for a ${data.totalPages}-page build` : ""}. A receipt is on its way to{" "}
          <strong className="text-ink">{data?.email ?? "your inbox"}</strong>. We start on your project
          straight away — we&rsquo;ll be in touch if we need anything from you, and again when the first
          round is ready for your review.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="neu-btn neu-btn-dark rounded-full bg-[var(--green-deep)] px-6 py-3 text-[14.5px] font-bold text-white"
          >
            Back to site
          </Link>
          <a
            href="mailto:hello@rankify.com.au"
            className="rounded-full border border-line px-6 py-3 text-[14.5px] font-semibold transition-colors hover:bg-white"
          >
            Email us
          </a>
        </div>
      </>
    );
  }

  return (
    <>
      <h1 className="text-[clamp(28px,2.7vw,44px)] font-medium leading-[1.05] tracking-[-0.04em]">
        {state === "open" ? "That payment didn't go through." : "We couldn't find that order."}
      </h1>
      <p className="mt-5 max-w-[560px] text-[16.5px] leading-relaxed text-grey">
        Nothing has been charged. Head back to the configurator and try again, or book a call and
        we&rsquo;ll set it up with you.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/web-design-and-development#website-configurator"
          className="neu-btn neu-btn-dark rounded-full bg-[var(--green-deep)] px-6 py-3 text-[14.5px] font-bold text-white"
        >
          Back to the configurator
        </Link>
        <Link
          href="/schedule-strategy-call"
          className="rounded-full border border-line px-6 py-3 text-[14.5px] font-semibold transition-colors hover:bg-white"
        >
          Book a call
        </Link>
      </div>
    </>
  );
}
