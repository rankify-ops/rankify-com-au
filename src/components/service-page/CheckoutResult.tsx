"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CHECKOUT_API } from "@/lib/checkout";

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
          You&rsquo;re booked in. Let&rsquo;s build it.
        </h1>
        <p className="mt-5 max-w-[560px] text-[16.5px] leading-relaxed text-grey">
          {amount ? `${amount} paid in full` : "Payment received"}
          {data?.totalPages ? ` for a ${data.totalPages}-page build` : ""}. A receipt is on its way to{" "}
          <strong className="text-ink">{data?.email ?? "your inbox"}</strong>. We&rsquo;ll be in touch within
          one business day to book your discovery call and start the design — your site is live in 7&ndash;14
          days from sign-off.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/schedule-strategy-call"
            className="neu-btn neu-btn-dark rounded-full bg-[var(--green-deep)] px-6 py-3 text-[14.5px] font-bold text-white"
          >
            Book the call now
          </Link>
          <Link
            href="/"
            className="rounded-full border border-line px-6 py-3 text-[14.5px] font-semibold transition-colors hover:bg-white"
          >
            Back to site
          </Link>
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
