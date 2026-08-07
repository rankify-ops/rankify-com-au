"use client";

import Link from "next/link";
import Image from "next/image";
import { asset } from "@/lib/basePath";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { MOBILE_LINKS, NAV_ITEMS, SIMPLE_LINKS, type MegaMenu } from "@/content/nav";

/** Big "what do you actually want" cards — every menu routes by intent. */
function MegaPanel({ mega, onNavigate }: { mega: MegaMenu; onNavigate: () => void }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_minmax(240px,300px)]">
      <div className="grid gap-3 sm:grid-cols-2">
        {mega.choices.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            onClick={onNavigate}
            className="group/c flex items-start gap-4 rounded-2xl border border-line bg-paper p-5 transition-all duration-300 hover:-skew-x-1 hover:border-[color:#07a889] hover:bg-white"
          >
            <span className="mt-0.5 flex h-10 w-10 flex-none items-center justify-center rounded-[10px] border border-line bg-white text-[color:#07a889] transition-transform duration-300 group-hover/c:scale-110">
              {c.icon}
            </span>
            <span className="min-w-0">
              <span className="flex items-center gap-1.5 text-[16px] font-semibold tracking-[-0.02em] text-ink">
                {c.label}
                <span className="transition-transform duration-300 group-hover/c:translate-x-1">→</span>
              </span>
              <span className="mt-1 block text-[13.5px] leading-snug text-grey">{c.sub}</span>
            </span>
          </Link>
        ))}
      </div>

      <MegaPromo promo={mega.promo} onNavigate={onNavigate} />
    </div>
  );
}

function MegaPromo({ promo, onNavigate }: { promo: MegaMenu["promo"]; onNavigate: () => void }) {
  return (
    <Link
      href={promo.ctaHref}
      onClick={onNavigate}
      className="grain group/p relative flex flex-col justify-between overflow-hidden rounded-2xl bg-[radial-gradient(120%_140%_at_20%_0%,#06382a_0%,var(--green-deep)_45%,#010f0a_100%)] p-6 text-white transition-transform duration-300 hover:-skew-x-1"
    >
      <div className="relative z-[2]">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:#07a889]">
          {promo.kicker}
        </p>
        <p className="text-[17px] font-semibold leading-snug tracking-[-0.02em]">{promo.heading}</p>
      </div>
      <span className="relative z-[2] mt-8 inline-flex items-center gap-2 text-[14px] font-medium">
        {promo.ctaLabel}
        <span className="transition-transform duration-300 group-hover/p:translate-x-1">→</span>
      </span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function show(key: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveKey(key);
  }
  function scheduleHide() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActiveKey(null), 140);
  }
  function hideNow() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveKey(null);
  }

  const active = NAV_ITEMS.find((n) => n.label === activeKey);

  return (
    <>
      <header
        className="sticky top-0 z-[100] border-b border-line bg-paper"
        onMouseLeave={scheduleHide}
      >
        <nav className="flex h-[60px] items-center justify-between gap-5 px-5">
          <Link href="/" aria-label="Rankify home" className="flex-none" onClick={hideNow}>
            <Image
              src={asset("/assets/images/ha7iyKKaK8R1V7r8jKPhCa6P74.svg")}
              alt="Rankify®"
              width={186}
              height={40}
              className="h-[22px] w-auto"
              priority
            />
          </Link>

          <div className="hidden items-center gap-6 xl:flex">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} onMouseEnter={() => show(item.label)}>
                <Link
                  href={item.href}
                  onClick={hideNow}
                  className={`flex items-center gap-1.5 whitespace-nowrap text-[14.5px] font-medium transition-opacity ${
                    activeKey === item.label ? "opacity-100" : "opacity-85 hover:opacity-100"
                  }`}
                >
                  {item.label}
                  {item.mega && (
                    <svg
                      viewBox="0 0 24 24"
                      className={`h-3 w-3 transition-transform duration-300 ${activeKey === item.label ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  )}
                </Link>
              </div>
            ))}
            {SIMPLE_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onMouseEnter={hideNow}
                className="whitespace-nowrap text-[14.5px] font-medium opacity-85 transition-opacity hover:opacity-100"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden xl:block" onMouseEnter={hideNow}>
              <Button href="/schedule-strategy-call">Schedule Call</Button>
            </div>
            <button
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="relative h-10 w-10 xl:hidden"
            >
              <motion.span
                className="absolute left-2 right-2 h-[2px] bg-ink"
                animate={open ? { top: 20, rotate: 45 } : { top: 14, rotate: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="absolute left-2 right-2 h-[2px] bg-ink"
                animate={open ? { top: 20, rotate: -45 } : { top: 24, rotate: 0 }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </nav>

        {/* mega menu panel */}
        <AnimatePresence>
          {active?.mega && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => show(active.label)}
              className="absolute inset-x-0 top-full hidden px-2 pt-2 xl:block"
            >
              <div className="mx-auto max-w-[1400px] rounded-3xl border border-line bg-white/95 p-8 shadow-[0_24px_70px_rgba(0,0,0,0.13)] backdrop-blur-xl">
                <MegaPanel mega={active.mega} onNavigate={hideNow} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="grain fixed inset-0 z-[110] flex flex-col overflow-y-auto xl:hidden bg-[radial-gradient(120%_140%_at_20%_0%,#06382a_0%,var(--green-deep)_45%,#010f0a_100%)] px-5 pb-[calc(20px+env(safe-area-inset-bottom))] pt-4 text-white"
          >
            <div className="relative z-[2] mb-2 flex items-center justify-between border-b border-white/12 px-1 pb-[18px] pt-1.5">
              <Link href="/" onClick={() => setOpen(false)} aria-label="Rankify home">
                <Image
                  src={asset("/assets/images/n92JU5BqmoxMotdcH6fGsTpi7e4.svg")}
                  alt="Rankify®"
                  width={974}
                  height={210}
                  className="h-[26px] w-auto"
                />
              </Link>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-white/[0.14] bg-white/[0.08] transition-colors hover:bg-white/[0.16]"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="relative z-[2] mb-5 flex flex-col">
              {MOBILE_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center gap-3.5 border-b border-white/[0.08] py-[15px] pl-1 pr-1 text-[16.5px] font-semibold transition-all duration-200 hover:pl-2.5 hover:text-[color:#07a889]"
                >
                  <span className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-[11px] bg-white/[0.08] text-[color:#07a889]">
                    {l.icon}
                  </span>
                  {l.label}
                  <svg
                    viewBox="0 0 24 24"
                    className="ml-auto h-[18px] w-[18px] flex-none text-white/30"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 6 6 6-6 6" />
                  </svg>
                </Link>
              ))}
            </nav>

            <div className="relative z-[2] mt-auto flex flex-col gap-2.5">
              <Link
                href="/schedule-strategy-call"
                onClick={() => setOpen(false)}
                className="rounded-full bg-white px-4 py-[15px] text-center text-[15px] font-bold text-ink shadow-[0_8px_24px_rgba(0,0,0,0.28)]"
              >
                Book a Strategy Call
              </Link>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/[0.16] bg-white/[0.08] px-4 py-[15px] text-center text-[15px] font-semibold transition-colors hover:bg-white/[0.14]"
              >
                Get in touch
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
