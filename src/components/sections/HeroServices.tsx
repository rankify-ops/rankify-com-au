"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { NAV_ITEMS } from "@/content/nav";

/**
 * The six services in the hero. Tapping one opens the same four choices the
 * desktop hover menu shows — the hero can't use hover (it's the primary mobile
 * surface), so it gets a centred dialog instead.
 *
 * Both are driven by NAV_ITEMS, so the hero and the menu can't drift apart.
 */
export function HeroServices() {
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const active = NAV_ITEMS.find((n) => n.label === openLabel);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenLabel(null);
    };
    // Stop the page scrolling behind the dialog. Hiding the scrollbar widens
    // the layout viewport, so pad by its width or everything jumps sideways.
    const prevOverflow = document.body.style.overflow;
    const prevPad = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPad;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <>
      {/* Two columns of three at every width — as a single column the six
          services ate most of the phone screen. */}
      <ul className="mt-5 grid max-w-[430px] grid-cols-2 gap-x-3 gap-y-3 sm:mt-6 sm:gap-y-3.5">
        {NAV_ITEMS.map((s) => (
          <li key={s.href}>
            <button
              onClick={() => setOpenLabel(s.label)}
              aria-haspopup="dialog"
              className="group inline-flex items-center gap-2 whitespace-nowrap text-[12.5px] font-medium text-white/80 transition-colors hover:text-white sm:text-[14px] lg:gap-2.5 lg:text-[16px]"
            >
              <span className="flex h-[26px] w-[26px] flex-none items-center justify-center rounded-[8px] border border-white/12 bg-white/[0.07] text-[color:#07a889] transition-colors duration-300 group-hover:border-[color:#07a889]/40 group-hover:bg-[color:#07a889]/15 sm:h-7 sm:w-7 sm:rounded-[9px] lg:h-[34px] lg:w-[34px] lg:rounded-[10px] [&_svg]:h-[14px] [&_svg]:w-[14px] sm:[&_svg]:h-[15px] sm:[&_svg]:w-[15px] lg:[&_svg]:h-[18px] lg:[&_svg]:w-[18px]">
                {s.icon}
              </span>
              {s.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Portalled to body: Reveal wraps this in a transformed element, and a
          transformed ancestor becomes the containing block for position:fixed,
          which pinned the dialog inside the hero's corner column. */}
      {active?.mega &&
        createPortal(
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpenLabel(null)}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={active.label}
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-[calc(100svh-32px)] w-full max-w-[660px] overflow-y-auto rounded-3xl border border-line bg-white p-5 text-ink shadow-[0_30px_90px_rgba(0,0,0,0.4)] sm:p-7"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:#07a889]">
                    {active.label}
                  </p>
                  <p className="text-[20px] font-medium tracking-[-0.03em]">
                    What are you after?
                  </p>
                </div>
                <button
                  aria-label="Close"
                  onClick={() => setOpenLabel(null)}
                  className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-line bg-paper transition-colors hover:bg-[#efefef]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {active.mega.choices.map((c) => (
                  <Link
                    key={c.label}
                    href={c.href}
                    onClick={() => setOpenLabel(null)}
                    className="group/c flex items-start gap-4 rounded-2xl border border-line bg-paper p-4 transition-all duration-300 hover:-skew-x-1 hover:border-[color:#07a889] hover:bg-white sm:p-5"
                  >
                    <span className="mt-0.5 flex h-10 w-10 flex-none items-center justify-center rounded-[10px] border border-line bg-white text-[color:#07a889] transition-transform duration-300 group-hover/c:scale-110">
                      {c.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-1.5 text-[15.5px] font-semibold tracking-[-0.02em]">
                        {c.label}
                        <span className="transition-transform duration-300 group-hover/c:translate-x-1">
                          →
                        </span>
                      </span>
                      <span className="mt-1 block text-[13px] leading-snug text-grey">
                        {c.sub}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>

              {/* the tiles are buttons now, so keep the page itself reachable */}
              <Link
                href={active.href}
                onClick={() => setOpenLabel(null)}
                className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-medium underline"
              >
                Or see the full {active.label} page
              </Link>
            </motion.div>
          </div>,
          document.body,
        )}
    </>
  );
}
