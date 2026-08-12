"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { PlusIcon } from "@/components/ui/PlusIcon";

/**
 * Mirrors the six items in the top nav — see src/content/nav.tsx. The homepage
 * listed three (and claimed four), which left Shopify, both ad platforms and
 * AI & Automation unsellable from the front page.
 *
 * Branding is deliberately absent: it's out of the nav too, page still live and
 * linked from the footer.
 */
const SERVICES = [
  {
    title: "Web Development",
    href: "/web-design-and-development",
    desc: "Custom websites built around how your customers actually decide — not a template with your logo on it. From $2,999, live in 7–14 days.",
    cat: "What's included",
    tags: ["Custom build", "Conversion-focused", "Mobile-first", "Speed optimised", "SEO-ready", "Unlimited revisions"],
  },
  {
    title: "Shopify Development",
    href: "/shopify-development-services",
    desc: "Custom Liquid stores for brands that want to scale profitably. Migrations handled, apps built into the theme rather than bolted on. From $5,999.",
    cat: "What's included",
    tags: ["Custom Liquid themes", "Migrations", "Product & collection UX", "Checkout optimisation", "Apps built in", "Shopify Partner"],
  },
  {
    title: "SEO Optimisation",
    href: "/seo",
    desc: "The cheapest lead source you'll ever own. Priced per page rather than as an open-ended retainer, and reported on in leads — not impressions.",
    cat: "What's included",
    tags: ["Technical SEO", "On-Page SEO", "Keyword Strategy", "Content Strategy", "Link Building", "Local SEO"],
  },
  {
    title: "Google Ads",
    href: "/google-ads",
    desc: "Search and Shopping campaigns pointed at profit rather than clicks, with the tracking wired up properly so you can see what each dollar returned.",
    cat: "What's included",
    tags: ["Search campaigns", "Shopping & Merchant Center", "Conversion tracking", "Landing pages", "Budget management", "Reporting"],
  },
  {
    title: "Meta Ads",
    href: "/meta-ads",
    desc: "Facebook and Instagram campaigns where creative is treated as the main lever, with the pixel and CAPI set up so the data is actually usable.",
    cat: "What's included",
    tags: ["Creative strategy", "Catalogue ads", "Pixel & CAPI", "Retargeting", "Testing framework", "Reporting"],
  },
  {
    title: "AI & Automation",
    href: "/ai-and-automation",
    desc: "The repetitive work eating your week, handed to software instead of a person — plus the dashboards and internal tools you actually run the business on.",
    cat: "What we build",
    tags: ["Process automation", "Custom dashboards", "Internal tools", "Integrations", "Alerting", "AI consulting"],
  },
];

export function Services() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="grain mx-2 mt-8 sm:mt-12 lg:mt-20 rounded-3xl bg-[radial-gradient(120%_140%_at_20%_0%,#06382a_0%,var(--green-deep)_45%,#010f0a_100%)] text-white">
      <div className="relative z-[2] mx-auto max-w-[1400px] px-5 py-16 sm:px-10 sm:py-24 lg:py-32">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 sm:mb-16 lg:mb-24">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-[15px] font-medium">
              <PlusIcon className="h-[18px] w-[18px]" />
              What we do
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="text-[clamp(24px,2vw,38px)] font-medium tracking-[-0.04em] text-white/40">
              ({SERVICES.length})
            </span>
          </Reveal>
          <Reveal delay={0.15} className="w-full">
            <h2 className="text-[clamp(40px,3.55vw,68px)] font-medium leading-[0.92] tracking-[-0.06em]">
              Services.
            </h2>
          </Reveal>
        </div>

        <div className="border-t border-line-dark">
          {SERVICES.map((s, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={s.title}>
                <div className="border-b border-line-dark">
                  <button
                    onClick={() => setOpenIndex(i)}
                    className="grid w-full grid-cols-[44px_1fr_40px] items-center gap-4 py-6 text-left sm:grid-cols-[64px_1fr_44px] sm:gap-10 sm:py-8"
                  >
                    <span className="text-[15px] text-white/50">
                      ({String(i + 1).padStart(3, "0")})
                    </span>
                    <h3 className="text-[clamp(22px,2vw,34px)] font-medium leading-[1.1] tracking-[-0.04em]">
                      {s.title}
                    </h3>
                    <motion.span
                      animate={{ rotate: isOpen ? 90 : 0, backgroundColor: isOpen ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0)" }}
                      transition={{ duration: 0.35 }}
                      className="relative h-9 w-9 flex-none justify-self-end rounded-full border border-white/25 sm:h-10 sm:w-10"
                    >
                      <span className="absolute inset-0 m-auto h-[1.5px] w-3.5 bg-white" />
                      <motion.span
                        animate={{ scaleY: isOpen ? 0 : 1 }}
                        transition={{ duration: 0.35 }}
                        className="absolute inset-0 m-auto h-3.5 w-[1.5px] bg-white"
                      />
                    </motion.span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-5 pb-6 pl-[60px] pr-4 sm:flex-row sm:pb-8 sm:pl-[104px] sm:pr-10">
                      <div>
                        <p className="max-w-[480px] text-[15.5px] text-white/65">{s.desc}</p>
                        <div className="mt-5">
                          <p className="mb-3 text-[13px] text-white/50">{s.cat}</p>
                          <div className="flex max-w-[460px] flex-wrap gap-2">
                            {s.tags.map((t) => (
                              <span
                                key={t}
                                className="rounded-full border border-white/18 px-3.5 py-2 text-[13.5px] text-white/85"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                        <Link
                          href={s.href}
                          className="mt-6 inline-flex items-center gap-2 text-[14.5px] font-semibold text-white underline underline-offset-4"
                        >
                          See {s.title}
                          <span aria-hidden>&rarr;</span>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
