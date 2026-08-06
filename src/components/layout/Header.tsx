"use client";

import Link from "next/link";
import Image from "next/image";
import { asset } from "@/lib/basePath";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { PlusIcon } from "@/components/ui/PlusIcon";

const SERVICES = [
  {
    href: "/web-design-and-development",
    label: "Web Development",
    desc: "Fast, modern websites built to convert.",
    icon: (
      <>
        <rect x="4" y="5" width="16" height="14" rx="2.5" />
        <path d="M4 9h16" strokeLinecap="round" />
      </>
    ),
  },
  {
    href: "/shopify-development-services",
    label: "Shopify Development",
    desc: "Custom stores built to sell, not just look good.",
    icon: (
      <>
        <path d="M6 8l1-3.5A2 2 0 0 1 8.9 3h6.2a2 2 0 0 1 1.9 1.5L18 8" />
        <path d="M5 8h14l-1 12H6L5 8Z" />
      </>
    ),
  },
  {
    href: "/seo",
    label: "SEO",
    desc: "Rank higher, get found, drive real traffic.",
    icon: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="M20 20l-5-5" strokeLinecap="round" />
      </>
    ),
  },
  {
    href: "/professional-logo-design",
    label: "Logo & Branding",
    desc: "Handcrafted brand identities that stand out.",
    icon: (
      <>
        <path d="M12 3l2.6 5.6 6.1.8-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6-4.5-4.2 6.1-.8L12 3Z" />
      </>
    ),
  },
];

const NAV_LINKS = [
  { href: "/professional-logo-design", label: "Logo & Branding" },
  { href: "/web-design-and-development", label: "Web Development" },
  { href: "/shopify-development-services", label: "Shopify Development" },
  { href: "/seo", label: "SEO" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
];

function ServicesMegaMenu() {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function show() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }
  function hide() {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  }

  return (
    <div className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <button
        className="flex items-center gap-1.5 text-[15px] font-medium opacity-85 transition-opacity hover:opacity-100"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        Services
        <svg viewBox="0 0 24 24" className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-full z-[110] mt-3 w-[560px] -translate-x-1/2 rounded-[20px] border border-line bg-white/90 p-3 shadow-[0_20px_60px_rgba(0,0,0,0.12)] backdrop-blur-xl"
          >
            <div className="grid grid-cols-2 gap-1.5">
              {SERVICES.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-start gap-3 rounded-2xl p-4 transition-colors hover:bg-paper"
                >
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-[10px] border border-line bg-white transition-transform duration-300 group-hover:scale-105 group-hover:-skew-x-3">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="var(--ink)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      {s.icon}
                    </svg>
                  </span>
                  <span>
                    <span className="block text-[14.5px] font-semibold tracking-[-0.01em]">{s.label}</span>
                    <span className="mt-0.5 block text-[13px] leading-snug text-grey">{s.desc}</span>
                  </span>
                </Link>
              ))}
            </div>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-1.5 flex items-center justify-between rounded-2xl bg-[color:var(--green-deep)] p-4 text-white transition-transform duration-300 hover:-skew-x-1"
            >
              <span className="inline-flex items-center gap-2 text-[14.5px] font-medium">
                <PlusIcon className="h-[16px] w-[16px]" />
                Not sure what you need? Let&rsquo;s talk.
              </span>
              <span className="text-[13px] text-white/70">Contact us →</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-[100] border-b border-line bg-paper">
        <nav className="flex h-[60px] items-center justify-between gap-6 px-5">
          <Link href="/" aria-label="Rankify home" className="flex-none">
            <Image
              src={asset("/assets/images/ha7iyKKaK8R1V7r8jKPhCa6P74.svg")}
              alt="Rankify®"
              width={186}
              height={40}
              className="h-[22px] w-auto"
              priority
            />
          </Link>
          <div className="hidden items-center gap-8 lg:flex">
            <ServicesMegaMenu />
            <Link href="/contact" className="text-[15px] font-medium opacity-85 transition-opacity hover:opacity-100">
              Contact
            </Link>
            <Link href="/blog" className="text-[15px] font-medium opacity-85 transition-opacity hover:opacity-100">
              Blog
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <Button href="/schedule-strategy-call">Schedule Call</Button>
            </div>
            <button
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="relative h-10 w-10 lg:hidden"
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
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[90] flex flex-col justify-between bg-paper px-6 pb-8 pt-24"
          >
            <nav className="flex flex-col gap-2">
              {[...NAV_LINKS, { href: "/schedule-strategy-call", label: "Schedule Call" }].map(
                (l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="text-[clamp(32px,7vw,48px)] font-medium leading-tight tracking-[-0.04em]"
                  >
                    {l.label}
                  </Link>
                )
              )}
            </nav>
            <div className="flex flex-wrap gap-x-8 gap-y-4 text-[15px] text-grey">
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
