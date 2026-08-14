"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { CheckoutPanel } from "@/components/service-page/CheckoutPanel";
import type { OrderPayload } from "@/lib/checkout";

/**
 * Stripe's embedded checkout in a dialog over the page.
 *
 * Portalled to <body> deliberately: the configurator sits inside a Reveal,
 * whose transform would otherwise become the containing block for
 * `position: fixed` and pin this to a few hundred pixels of the card.
 */
export function CheckoutModal({
  order,
  summary,
  onClose,
}: {
  order: OrderPayload;
  /** e.g. "7 pages · $2,999" — shown in the dialog header. */
  summary: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Complete your order"
      // above the mobile drawer (110) and the hero chooser (120)
      className="fixed inset-0 z-[130] flex items-start justify-center overflow-y-auto overscroll-contain bg-black/55 p-4 backdrop-blur-sm sm:p-8"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Wide enough that Stripe lays the order summary beside the card form
          rather than stacking it — the stacked version reads as a form on a
          coloured slab, which is what made it feel less like a real checkout. */}
      <div className="my-auto w-full max-w-[940px] overflow-hidden rounded-3xl bg-white shadow-[0_30px_80px_rgba(0,0,0,0.4)]">
        <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-4">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:#07a889]">
              Complete your order
            </p>
            <p className="truncate text-[15px] font-semibold text-ink">{summary}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close checkout"
            className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-line text-grey transition-colors hover:bg-paper hover:text-ink"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 sm:p-6">
          <CheckoutPanel order={order} />

          {/* The last thing read before the card details go in. Stripe's iframe
              can't carry it, and it's the objection that stops the click. */}
          <div className="mt-4 flex items-start gap-3 rounded-2xl bg-[#e9f5f0] p-4">
            <span className="mt-px flex h-7 w-7 flex-none items-center justify-center rounded-full bg-[var(--green-mid)]">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3.2 19 5.7v5.6c0 4.4-3 7.4-7 9.1-4-1.7-7-4.7-7-9.1V5.7z" />
                <path d="m9.2 11.9 2 2 3.6-3.8" />
              </svg>
            </span>
            <p className="text-[13.5px] leading-snug text-ink">
              <strong className="font-semibold">100% money-back guarantee.</strong>{" "}
              <span className="text-grey">
                Not satisfied with your website within 30 days? Email us and we refund the project
                fee in full.
              </span>
            </p>
          </div>
        </div>

        {/* The reassurance a payment form is expected to carry. Stripe's iframe
            can't say any of this, and its absence is what reads as sketchy. */}
        <div className="border-t border-line bg-paper px-6 py-4">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12.5px] text-grey">
            <span className="inline-flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 flex-none" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="4" y="10.5" width="16" height="10" rx="2" />
                <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
              </svg>
              Secure, encrypted payment via Stripe
            </span>
            <span className="inline-flex items-center gap-1.5">
              {/* clock, not a tick — it's a timeline claim */}
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 flex-none" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="8.5" />
                <path d="M12 7.5V12l3 1.8" />
              </svg>
              Typically live in 7&ndash;14 days
            </span>
            <span className="inline-flex items-center gap-1.5">
              {/* loop, not a tick */}
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 flex-none" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 11.5a8 8 0 1 1-2.6-5.9M20 4v5h-5" />
              </svg>
              Unlimited revisions
            </span>
          </div>
          <p className="mt-2 text-center text-[12px] text-grey/70">
            Rankify · Gold Coast, Australia · hello@rankify.com.au
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
}
