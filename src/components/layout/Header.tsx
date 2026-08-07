"use client";

import Link from "next/link";
import Image from "next/image";
import { asset } from "@/lib/basePath";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { NAV_ITEMS, SIMPLE_LINKS, type MegaMenu } from "@/content/nav";

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
            className="fixed inset-0 z-[90] flex flex-col justify-between overflow-y-auto bg-paper px-6 pb-8 pt-24"
          >
            <nav className="flex flex-col gap-1.5">
              {NAV_ITEMS.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-[clamp(26px,6vw,40px)] font-medium leading-tight tracking-[-0.04em]"
                  >
                    {item.label}
                  </Link>
                  {/* there's no hover on touch, so the intent chooser is
                      inlined rather than lost */}
                  {item.mega?.choices && (
                    <div className="mb-2 mt-2 flex flex-col gap-1.5 border-l border-line pl-4">
                      {item.mega.choices.map((c) => (
                        <Link
                          key={c.label}
                          href={c.href}
                          onClick={() => setOpen(false)}
                          className="text-[16px] font-medium text-grey"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {[...SIMPLE_LINKS, { label: "Schedule Call", href: "/schedule-strategy-call" }].map((l) => (
                <Link
                  key={l.href + l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-[clamp(26px,6vw,40px)] font-medium leading-tight tracking-[-0.04em]"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 text-[15px] text-grey">
              <a href="tel:1300880860">1300 880 860</a>
              <a href="mailto:hello@rankify.com.au">hello@rankify.com.au</a>
              <span>© 2026 Rankify®</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
