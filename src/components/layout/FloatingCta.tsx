"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SmartLink } from "@/components/ui/SmartLink";

/**
 * Persistent bottom action bar — not dismissible, so there's always a live call
 * to action once the hero's own buttons have scrolled off. It hands over from
 * them rather than competing with them, which is why the gate is measured off
 * `#hero-cta` (set on the hero button row) instead of a magic pixel number.
 *
 * Full-width buttons on a phone; on desktop the line of copy sits beside them.
 *
 * Sits below the mobile drawer (z-110) and the hero chooser (z-120) so it
 * never covers either.
 */
export function FloatingCta() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    // every state write happens in a callback, never straight in the effect body
    const update = () => {
      const heroCta = document.getElementById("hero-cta");
      setShow(
        heroCta
          ? heroCta.getBoundingClientRect().bottom < 0
          : window.scrollY > 700, // pages without a marked hero row
      );
    };
    const id = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  // no point nudging a call on the page that books the call
  if (pathname === "/schedule-strategy-call" || pathname === "/contact") return null;

  return (
    // `pointer-events-none` on the full-width track, re-enabled on the pill
    // itself: the track is invisible but spans the viewport, and it was eating
    // clicks on anything that scrolled underneath it — the configurator's
    // Continue button sits well to the left of the pill and was still dead.
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-[80] flex justify-center px-3 pb-3 transition-all duration-500 sm:pb-5 ${
        show ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      {/* Frosted glass rather than a solid slab: it sits over both the dark
          hero and the paper sections, so it borrows whatever is behind it.
          No `grain` here — that noise layer is tuned for dark surfaces. */}
      <div
        className={`flex w-full max-w-[680px] items-center gap-2.5 overflow-hidden rounded-full border border-white/70 bg-white/55 p-2.5 text-ink shadow-[0_16px_44px_rgba(0,0,0,0.18)] backdrop-blur-2xl backdrop-saturate-150 sm:gap-4 sm:pl-6 ${
          show ? "pointer-events-auto" : ""
        }`}
      >
        {/* The dot belongs with the copy — left in on a phone it ate the space
            on one side and threw the two buttons off centre. */}
        <span className="relative z-[2] hidden h-2.5 w-2.5 flex-none items-center justify-center sm:flex">
          <span className="cta-ping absolute inline-flex h-full w-full rounded-full bg-[#07a889]" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#07a889]" />
        </span>

        <p className="relative z-[2] hidden min-w-0 flex-1 text-[15px] font-medium leading-tight sm:block">
          Ready when you are
          <span className="text-grey"> — no obligation either way</span>
        </p>

        {/* Buttons split the bar on a phone; on desktop they shrink back to
            their own width so the copy has room. */}
        <div className="relative z-[2] flex min-w-0 flex-1 items-center gap-2 sm:flex-none sm:gap-2.5">
          <SmartLink
            href="/web-design-and-development#website-configurator"
            className="neu-btn neu-btn-dark flex-1 whitespace-nowrap rounded-full border border-transparent bg-[var(--green-deep)] px-4 py-2.5 text-center text-[13.5px] font-bold text-white hover:-skew-x-3 sm:flex-none sm:px-5 sm:py-2 sm:text-[14px]"
          >
            Get Started
          </SmartLink>
          <Link
            href="/schedule-strategy-call"
            className="flex-1 whitespace-nowrap rounded-full border border-ink/15 bg-white/50 px-4 py-2.5 text-center text-[13.5px] font-semibold transition-colors hover:bg-white sm:flex-none sm:px-5 sm:py-2 sm:text-[14px]"
          >
            Book a call
          </Link>
        </div>
      </div>
    </div>
  );
}
