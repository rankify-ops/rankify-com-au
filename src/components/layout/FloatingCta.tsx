"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
    <div
      className={`fixed inset-x-0 bottom-0 z-[80] flex justify-center px-3 pb-3 transition-all duration-500 sm:pb-5 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <div className="grain flex w-full max-w-[680px] items-center gap-2.5 overflow-hidden rounded-full border border-white/12 bg-[radial-gradient(120%_240%_at_20%_0%,#06382a_0%,var(--green-deep)_55%,#010f0a_100%)] p-2.5 text-white shadow-[0_16px_44px_rgba(0,0,0,0.34)] sm:gap-4 sm:pl-6">
        {/* The dot belongs with the copy — left in on a phone it ate the space
            on one side and threw the two buttons off centre. */}
        <span className="relative z-[2] hidden h-2.5 w-2.5 flex-none items-center justify-center sm:flex">
          <span className="cta-ping absolute inline-flex h-full w-full rounded-full bg-[#07a889]" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#07a889]" />
        </span>

        <p className="relative z-[2] hidden min-w-0 flex-1 text-[15px] font-medium leading-tight sm:block">
          Ready when you are
          <span className="text-white/60"> — no obligation either way</span>
        </p>

        {/* Buttons split the bar on a phone; on desktop they shrink back to
            their own width so the copy has room. */}
        <div className="relative z-[2] flex min-w-0 flex-1 items-center gap-2 sm:flex-none sm:gap-2.5">
          <Link
            href="/web-design-and-development#website-configurator"
            className="neu-btn neu-btn-light flex-1 whitespace-nowrap rounded-full border border-transparent bg-white px-4 py-2.5 text-center text-[13.5px] font-bold text-ink hover:-skew-x-3 sm:flex-none sm:px-5 sm:py-2 sm:text-[14px]"
          >
            Get Started
          </Link>
          <Link
            href="/schedule-strategy-call"
            className="flex-1 whitespace-nowrap rounded-full border border-white/20 px-4 py-2.5 text-center text-[13.5px] font-semibold transition-colors hover:bg-white/10 sm:flex-none sm:px-5 sm:py-2 sm:text-[14px]"
          >
            Book a call
          </Link>
        </div>
      </div>
    </div>
  );
}
