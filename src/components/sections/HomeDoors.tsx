"use client";

import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { asset } from "@/lib/basePath";
import { Reveal } from "@/components/ui/Reveal";
import { AskBox } from "@/components/sections/AskBox";
import { FloatingPartners } from "@/components/sections/FloatingPartners";
import { SectionHeading } from "@/components/service-page/SectionHeading";

/**
 * The home page's first sections.
 *
 * `HomeHero` is deliberately almost empty: the wordmark, one line saying what
 * Rankify is, and the ask box. A visitor says what they need and gets
 * qualified in the first thing they see, instead of reading six service
 * blurbs to work out whether we do it. The six service tiles that used to sit
 * here were the header's own menu repeated, so they cost the hero its focus
 * and bought nothing.
 *
 * `HomeCtaCards` is the pair of offers, placed under the client logo
 * carousel. Ordinary cards, not glass: the glass belongs to the hero, and a
 * page that uses it everywhere has no emphasis left to spend. Book a call is
 * not among them, because Schedule Call sits in the header on every page.
 */

type Card = {
  kicker: string;
  title: string;
  line: string;
  href: string;
  icon: ReactNode;
  /** Shown up front, because that is the promise the heading makes. */
  price: string;
  /** The one we most want pressed. */
  accent?: boolean;
};

const I = ({ d }: { d: string }) => (
  <svg
    viewBox="0 0 24 24"
    className="h-[22px] w-[22px]"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={d} />
  </svg>
);

const CARDS: Card[] = [
  {
    kicker: "Websites",
    title: "Get a high performance website built",
    line: "A custom build made around how your customers actually buy, not a template.",
    price: "From $2,999",
    href: "/web-design-and-development",
    accent: true,
    icon: <I d="m9 8-4.5 4L9 16M15 8l4.5 4L15 16" />,
  },
  {
    // The other half of the website offer, sold rather than framed as a
    // login: existing clients sign in from the header.
    kicker: "Websites",
    title: "Change it yourself, just by asking",
    line: "Every site comes with a back end. Ask in plain words, see it before it goes live, undo it any time.",
    price: "From $199/mo",
    href: "/web-design-and-development",
    icon: <I d="M12 3.5 13.8 9l5.7 1.8-5.7 1.8L12 18.5l-1.8-5.9L4.5 10.8 10.2 9 12 3.5Z" />,
  },
  {
    kicker: "Ecommerce",
    title: "Ad Sidekick",
    line: "Run your Meta ads without logging into Meta. Told what to upload, when to scale and what to turn off.",
    price: "From $99/mo",
    href: "/meta-ads",
    icon: <I d="M4 10v4h3l6 4V6L7 10H4ZM17.5 9.2a4.2 4.2 0 0 1 0 5.6" />,
  },
  {
    kicker: "Shopify",
    title: "Build or fix a Shopify store",
    line: "Custom Liquid stores for brands scaling profitably. Migrations handled.",
    price: "From $5,999",
    href: "/shopify-development-services",
    icon: <I d="M4 5h2l2 10h9l2-7H7M9.5 19.5h.01M16.5 19.5h.01" />,
  },
  {
    kicker: "SEO",
    title: "Get found for what you sell",
    line: "Priced per page instead of an open-ended retainer, and reported in leads.",
    price: "$499 / page / mo",
    href: "/seo",
    icon: <I d="M11 17.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13ZM20 20l-4.4-4.4" />,
  },
  {
    kicker: "Google Ads",
    title: "Search and Shopping, pointed at profit",
    line: "Campaigns built to sell, with the tracking wired up properly from day one.",
    price: "Talk to us",
    href: "/google-ads",
    icon: <I d="M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17Zm0-4.6a3.9 3.9 0 1 0 0-7.8 3.9 3.9 0 0 0 0 7.8Z" />,
  },
  {
    kicker: "Apps & automation",
    title: "Custom tools, apps and AI automation",
    line: "The repetitive work eating your week, handed to software instead of a person.",
    price: "Talk to us",
    href: "/ai-and-automation",
    icon: <I d="M7.5 9.5h9a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2ZM12 6.5v3M12 4.2h.01M9.5 13.5h.01M14.5 13.5h.01M3.2 12.5v3M20.8 12.5v3" />,
  },
  {
    kicker: "Branding",
    title: "A logo and brand that fits",
    line: "The identity the rest of it hangs off, done once and done properly.",
    price: "Talk to us",
    href: "/professional-logo-design",
    icon: <I d="M12 3.5 14.6 9l6 .9-4.3 4.2 1 6L12 17.2 6.7 20l1-6L3.4 9.9l6-.9L12 3.5Z" />,
  },
];

export function HomeHero() {
  return (
    <section className="grain relative mx-2 overflow-hidden rounded-[32px] bg-[radial-gradient(120%_140%_at_20%_0%,#06382a_0%,var(--green-deep)_45%,#010f0a_100%)] text-white">
      {/* The old hero's background, unchanged: same gradient, same looping
          clip at the same opacity. */}
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-50"
        src={asset("/assets/hero-bg.mp4")}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Light for the ask box to refract. A sibling, never an ancestor: a
          filter on an ancestor creates a containing block and cancels the
          backdrop-filter the glass is drawn with. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[1]">
        <span className="absolute right-[18%] top-[28%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(63,216,187,0.45)_0%,rgba(63,216,187,0)_70%)] blur-[36px]" />
        <span className="absolute right-[4%] top-[56%] h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle,rgba(7,168,137,0.5)_0%,rgba(7,168,137,0)_70%)] blur-[34px]" />
        <span className="absolute left-[10%] top-[62%] h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0)_70%)] blur-[40px]" />
      </div>

      {/* One centred column. The ask box is the point of the hero, so it sits
          on the centre line rather than in a corner. */}
      <FloatingPartners />

      <div className="relative z-[3] flex flex-col items-center justify-center px-5 pb-14 pt-12 text-center sm:px-10 sm:pb-20 sm:pt-16 lg:min-h-[calc(100svh-60px)]">
        {/* Outside Reveal: it animates opacity and transform, and either one
            cancels the glass this box is drawn with. */}
        <div className="mt-9 flex w-full justify-center">
          <AskBox />
        </div>

        <Reveal delay={0.2} className="mt-9">
          <h1 className="mx-auto max-w-[680px] text-[clamp(18px,1.7vw,24px)] font-medium leading-[1.15] tracking-[-0.03em] text-white">
            High-performance marketing, websites, apps and AI automation.{" "}
            <span className="text-white/55">Custom built for your business.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.3} className="mt-5">
          <p className="mx-auto max-w-[560px] text-[15.5px] leading-snug text-white/55">
            You work directly with us, and the goal is profit. Not clicks, not views,
            the business performance that actually matters.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function HomeCtaCards() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-14 sm:px-10 sm:py-20">
      <SectionHeading
        label="Tools & Services"
        labelClassName="text-[14px] tracking-[0.18em]"
        heading="Everything you need to get found,"
        headingDim="and everything you need to convert."
        sub="Pick the one you came for. Each is priced up front, and you deal with the developer doing the work."
        centred
      />

      <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
        {CARDS.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.05}>
            <Link
              href={c.href}
              className="group flex h-full flex-col rounded-3xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[color:var(--green-text)] hover:shadow-[0_24px_60px_-34px_rgba(0,33,23,0.45)] sm:p-7"
            >
              <span className="flex items-start justify-between gap-3">
                <span
                  className={`flex h-12 w-12 flex-none items-center justify-center rounded-[14px] ${
                    c.accent
                      ? "bg-[color:var(--green-text)] text-white"
                      : "bg-[color:var(--green-text)]/10 text-[color:var(--green-text)]"
                  }`}
                >
                  {c.icon}
                </span>
                <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-grey">
                  {c.kicker}
                </span>
              </span>

              <h3 className="mt-5 text-[clamp(17px,1.4vw,20px)] font-semibold leading-[1.15] tracking-[-0.025em]">
                {c.title}
              </h3>
              <p className="mt-2.5 flex-1 text-[14.5px] leading-relaxed text-grey">
                {c.line}
              </p>

              <span className="mt-4 block text-[13.5px] font-semibold text-ink/70">{c.price}</span>

              <span className="mt-3 inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-[color:var(--green-text)]">
                Have a look
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h13M12 5.5 18.5 12 12 18.5" />
                </svg>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
