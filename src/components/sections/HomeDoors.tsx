"use client";

import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { asset } from "@/lib/basePath";
import { Reveal } from "@/components/ui/Reveal";
import { AskBox } from "@/components/sections/AskBox";

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
    href: "/web-design-and-development",
    accent: true,
    icon: <I d="m9 8-4.5 4L9 16M15 8l4.5 4L15 16" />,
  },
  {
    // The other half of the website offer. Sold, not framed as a login door:
    // existing clients sign in from the header, and this row is for people
    // who are not customers yet.
    kicker: "Websites",
    title: "Change it yourself, just by asking",
    line: "Every site comes with a back end. Ask for a change in plain words, see it before it goes live, undo it any time.",
    href: "/web-design-and-development",
    icon: <I d="M12 3.5 13.8 9l5.7 1.8-5.7 1.8L12 18.5l-1.8-5.9L4.5 10.8 10.2 9 12 3.5Z" />,
  },
  {
    kicker: "Ecommerce",
    title: "Ad Sidekick",
    line: "Run your Meta ads without logging into Meta. Told what to upload, when to scale and what to turn off.",
    href: "/meta-ads",
    icon: <I d="M4 10v4h3l6 4V6L7 10H4ZM17.5 9.2a4.2 4.2 0 0 1 0 5.6" />,
  },
  {
    kicker: "Shopify",
    title: "Build or fix a Shopify store",
    line: "A store built to sell, or development on the one you already have.",
    href: "/shopify-development-services",
    icon: <I d="M4 5h2l2 10h9l2-7H7M9.5 19.5h.01M16.5 19.5h.01" />,
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
      <div className="relative z-[2] flex flex-col items-center justify-center px-5 pb-14 pt-12 text-center sm:px-10 sm:pb-20 sm:pt-16 lg:min-h-[calc(100svh-60px)]">
        <Reveal className="w-full">
          <Image
            src={asset("/assets/images/n92JU5BqmoxMotdcH6fGsTpi7e4.svg")}
            alt="Rankify®"
            width={974}
            height={210}
            priority
            className="mx-auto h-auto w-full max-w-[680px] lg:max-w-[820px]"
          />
        </Reveal>

        <Reveal delay={0.12} className="mt-7">
          <h1 className="mx-auto max-w-[680px] text-[clamp(22px,2.3vw,32px)] font-medium leading-[1.05] tracking-[-0.04em] text-white">
            High-performance marketing, websites, apps and AI automation.{" "}
            <span className="text-white/55">Custom built for your business.</span>
          </h1>
        </Reveal>

        {/* Outside Reveal: it animates opacity and transform, and either one
            cancels the glass this box is drawn with. */}
        <div className="mt-9 flex w-full justify-center">
          <AskBox />
        </div>

        <Reveal delay={0.3} className="mt-10">
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
    <section className="mx-auto max-w-[1400px] px-5 py-12 sm:px-10 sm:py-16">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

              <h2 className="mt-5 text-[clamp(18px,1.5vw,21px)] font-semibold leading-[1.15] tracking-[-0.025em]">
                {c.title}
              </h2>
              <p className="mt-2.5 flex-1 text-[14.5px] leading-relaxed text-grey">
                {c.line}
              </p>

              <span className="mt-5 inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-[color:var(--green-text)]">
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
