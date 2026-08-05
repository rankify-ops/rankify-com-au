"use client";

import Link from "next/link";
import Image from "next/image";
import { asset } from "@/lib/basePath";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const NAV_LINKS = [
  { href: "/professional-logo-design", label: "Logo & Branding" },
  { href: "/web-design-and-development", label: "Web Development" },
  { href: "/shopify-development-services", label: "Shopify Development" },
  { href: "/seo", label: "SEO" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
];

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
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[15px] font-medium opacity-85 transition-opacity hover:opacity-100"
              >
                {l.label}
              </Link>
            ))}
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
