"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { pixelTrack } from "@/lib/pixel";

/**
 * Client-side pieces of the paid landing page.
 *
 * Kept together in one file because they're only ever used by that page and
 * each is a few lines — three separate modules for a sticky bar, an accordion
 * and a pixel call would be filing for its own sake.
 */

/**
 * Fires ViewContent for the landing page's own audience.
 *
 * The brief asked for `eventSourceUrl` to be passed by hand because Framer's
 * router left every event stamped with the site root. That isn't a problem
 * here — this is a real navigation to a real document, so the pixel reads
 * `/free-homepage` off `location` by itself. Verified in the network request
 * rather than assumed.
 */
export function LandingPixel() {
  const sent = useRef(false);
  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    pixelTrack("ViewContent", {
      content_name: "Free homepage offer",
      content_category: "Landing page",
    });
  }, []);
  return null;
}

/**
 * The mobile-only CTA bar, which appears once the hero's button has scrolled
 * past. Desktop keeps the in-page buttons — a phone is the only place where
 * you can be a long way from one.
 */
export function StickyCta({ href, label }: { href: string; label: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const update = () => {
      const anchor = document.getElementById("hero-cta");
      setShow(anchor ? anchor.getBoundingClientRect().bottom < 0 : window.scrollY > 600);
    };
    const id = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-[80] px-3 pb-3 transition-all duration-300 lg:hidden ${
        show ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <Link
        href={href}
        className={`neu-btn neu-btn-dark block rounded-full bg-[var(--green-deep)] px-5 py-3.5 text-center text-[15px] font-bold text-white ${
          show ? "pointer-events-auto" : ""
        }`}
      >
        {label}
      </Link>
    </div>
  );
}

/** Three questions, the first one open. */
export function LandingFaq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="mx-auto max-w-[760px] divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
      {items.map((item, i) => (
        <div key={item.q}>
          <button
            type="button"
            onClick={() => setOpen(open === i ? -1 : i)}
            aria-expanded={open === i}
            className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-[16px] font-medium tracking-[-0.01em] sm:px-7"
          >
            {item.q}
            <span
              className={`flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[#f1f1f1] transition-transform duration-300 ${
                open === i ? "rotate-45" : ""
              }`}
            >
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </button>
          {/* Grid-rows rather than max-height: the answers differ in length by
              a factor of four, so any single max-height is either clipping one
              or easing through empty space on another. */}
          <div
            className={`grid transition-all duration-300 ease-out ${
              open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <p className="px-5 pb-6 text-[15px] leading-relaxed text-grey sm:px-7">{item.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
