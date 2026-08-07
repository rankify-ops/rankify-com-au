"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Bottom bar nudging a strategy call. Appears once the visitor has committed
 * to the page rather than the moment they land, and can be dismissed for the
 * session.
 *
 * Sits below the mobile drawer (z-110) and the hero chooser (z-120) so it
 * never covers either.
 */
export function FloatingCta() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // every state write happens in a callback, never straight in the effect body
    const update = () => {
      if (sessionStorage.getItem("cta-dismissed") === "1") {
        setDismissed(true);
        return;
      }
      setShow(window.scrollY > 700);
    };
    const id = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("scroll", update);
    };
  }, []);

  // no point nudging a call on the page that books the call
  if (dismissed || pathname === "/schedule-strategy-call" || pathname === "/contact") return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[80] flex justify-center px-3 pb-3 transition-all duration-500 sm:pb-5 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <div className="grain flex w-full max-w-[680px] items-center gap-3 overflow-hidden rounded-full border border-white/12 bg-[radial-gradient(120%_240%_at_20%_0%,#06382a_0%,var(--green-deep)_55%,#010f0a_100%)] py-2.5 pl-4 pr-2.5 text-white shadow-[0_16px_44px_rgba(0,0,0,0.34)] sm:gap-4 sm:pl-6">
        <span className="relative z-[2] flex h-2.5 w-2.5 flex-none items-center justify-center">
          <span className="cta-ping absolute inline-flex h-full w-full rounded-full bg-[#07a889]" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#07a889]" />
        </span>

        <p className="relative z-[2] min-w-0 flex-1 text-[13.5px] font-medium leading-tight sm:text-[15px]">
          Free strategy call
          <span className="hidden text-white/60 sm:inline"> — no obligation, we&rsquo;ll show you what to fix</span>
        </p>

        <Link
          href="/schedule-strategy-call"
          className="relative z-[2] flex-none rounded-full bg-white px-4 py-2 text-[13px] font-bold text-ink transition-transform duration-300 hover:-skew-x-3 sm:px-5 sm:text-[14px]"
        >
          Book now
        </Link>

        <button
          aria-label="Dismiss"
          onClick={() => {
            sessionStorage.setItem("cta-dismissed", "1");
            setDismissed(true);
          }}
          className="relative z-[2] flex h-7 w-7 flex-none items-center justify-center rounded-full text-white/45 transition-colors hover:bg-white/10 hover:text-white"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
