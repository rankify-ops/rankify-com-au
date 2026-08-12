"use client";

import Link from "next/link";
import Image from "next/image";
import { asset } from "@/lib/basePath";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SmartLink } from "@/components/ui/SmartLink";
import { NAV_ITEMS, SIMPLE_LINKS, type MegaMenu } from "@/content/nav";

/** Big "what do you actually want" cards — every menu routes by intent. */
function MegaPanel({ mega, onNavigate }: { mega: MegaMenu; onNavigate: () => void }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_minmax(240px,300px)]">
      <div className="grid gap-3 sm:grid-cols-2">
        {mega.choices.map((c) => (
          <SmartLink
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
              {/* "Learn more" runs on from the sentence in ink, so the grey
                  copy reads as one line with the prompt at the end of it. */}
              <span className="mt-1 block text-[13.5px] leading-snug text-grey">
                {c.sub}{" "}
                <span className="font-semibold text-ink underline-offset-2 group-hover/c:underline">
                  Learn more
                </span>
              </span>
            </span>
          </SmartLink>
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
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function closeMenu() {
    setOpen(false);
    setOpenSection(null);
  }

  // The divider only earns its place once content is sliding under the header.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    // rAF rather than a direct call so the initial read isn't a synchronous
    // setState inside the effect body
    const id = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

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
        className={`sticky top-0 z-[100] border-b bg-paper transition-colors duration-200 ${
          scrolled ? "border-line" : "border-transparent"
        }`}
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
              <Button href="/schedule-strategy-call" pulse>Schedule Call</Button>
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
            /* `grain` sets position:relative in globals.css and beats
               Tailwind's `fixed`, so the panel has to own the fixed
               positioning and the grain layer sits inside it. */
            className="fixed inset-0 z-[110] overflow-y-auto xl:hidden"
          >
            <div className="grain flex min-h-full flex-col bg-[radial-gradient(120%_140%_at_20%_0%,#06382a_0%,var(--green-deep)_45%,#010f0a_100%)] px-5 pb-[calc(20px+env(safe-area-inset-bottom))] pt-4 text-white">
              <div className="relative z-[2] mb-2 flex items-center justify-between border-b border-white/12 px-1 pb-[18px] pt-1.5">
                <Link href="/" onClick={closeMenu} aria-label="Rankify home">
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
                  onClick={closeMenu}
                  className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-white/[0.14] bg-white/[0.08] transition-colors hover:bg-white/[0.16]"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Mirrors the desktop nav: same five items, and tapping one
                  opens the same four choices the hover panel shows. */}
              <nav className="relative z-[2] mb-5 flex flex-col">
                {NAV_ITEMS.map((item) => {
                  const expanded = openSection === item.label;
                  return (
                    <div key={item.label} className="border-b border-white/[0.08]">
                      <button
                        onClick={() => setOpenSection(expanded ? null : item.label)}
                        aria-expanded={expanded}
                        className="flex w-full items-center gap-3.5 py-[15px] pl-1 pr-1 text-left text-[16.5px] font-semibold transition-colors"
                      >
                        <span
                          className={`flex h-[38px] w-[38px] flex-none items-center justify-center rounded-[11px] transition-colors ${
                            expanded ? "bg-[color:#07a889]/20 text-[color:#07a889]" : "bg-white/[0.08] text-[color:#07a889]"
                          }`}
                        >
                          {item.icon}
                        </span>
                        {item.label}
                        <svg
                          viewBox="0 0 24 24"
                          className={`ml-auto h-[18px] w-[18px] flex-none transition-transform duration-300 ${
                            expanded ? "rotate-90 text-[color:#07a889]" : "text-white/30"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m9 6 6 6-6 6" />
                        </svg>
                      </button>

                      <AnimatePresence initial={false}>
                        {expanded && item.mega && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            {/* The same choice cards the desktop mega menu
                                uses, inverted for the dark drawer. They were
                                one-line text rows with a 16px icon, which
                                dropped the sub-copy that tells you which
                                option you actually want. Taking more of the
                                screen is the right trade here. */}
                            <li className="grid gap-2.5 pb-4 pt-1">
                              {item.mega.choices.map((c) => (
                                <SmartLink
                                  key={c.label}
                                  href={c.href}
                                  onClick={closeMenu}
                                  className="group/c flex items-start gap-3.5 rounded-2xl border border-white/12 bg-white/[0.05] p-4 transition-all duration-300 active:border-[color:#07a889] active:bg-white/[0.09]"
                                >
                                  <span className="mt-0.5 flex h-10 w-10 flex-none items-center justify-center rounded-[11px] border border-white/12 bg-white/[0.07] text-[color:#07a889]">
                                    {c.icon}
                                  </span>
                                  <span className="min-w-0">
                                    <span className="flex items-center gap-1.5 text-[15.5px] font-semibold tracking-[-0.02em] text-white">
                                      {c.label}
                                      <span aria-hidden className="text-[color:#07a889]">
                                        →
                                      </span>
                                    </span>
                                    <span className="mt-1 block text-[13.5px] leading-snug text-white/55">
                                      {c.sub}{" "}
                                      <span className="font-semibold text-white underline underline-offset-2">
                                        Learn more
                                      </span>
                                    </span>
                                  </span>
                                </SmartLink>
                              ))}
                            </li>
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                {SIMPLE_LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={closeMenu}
                    className="flex items-center gap-3.5 border-b border-white/[0.08] py-[15px] pl-1 pr-1 text-[16.5px] font-semibold transition-all duration-200 hover:pl-2.5 hover:text-[color:#07a889]"
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
                  onClick={closeMenu}
                  className="neu-btn neu-btn-light rounded-full bg-white px-4 py-[15px] text-center text-[15px] font-bold text-ink"
                >
                  Book a Strategy Call
                </Link>
                <Link
                  href="/contact"
                  onClick={closeMenu}
                  className="rounded-full border border-white/[0.16] bg-white/[0.08] px-4 py-[15px] text-center text-[15px] font-semibold transition-colors hover:bg-white/[0.14]"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
