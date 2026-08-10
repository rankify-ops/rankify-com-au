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
      <div className="my-auto w-full max-w-[620px] overflow-hidden rounded-3xl bg-white shadow-[0_30px_80px_rgba(0,0,0,0.4)]">
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
        </div>
      </div>
    </div>,
    document.body,
  );
}
