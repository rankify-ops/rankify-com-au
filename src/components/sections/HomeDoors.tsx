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
  /** The one we most want pressed. */
  accent?: boolean;
};

/**
 * One drawing grid for all eight card icons.
 *
 * They were drawn ad hoc and it showed at size: the robot's ears and
 * antenna, the cart's wheels and the target's centre were detached
 * one-pixel specks that smeared into the tile at 22px, the speaker's wave
 * ran past the viewBox, and the sparkle and the star were the same shape
 * twice. Every mark here is a continuous stroke, each one fills roughly the
 * same 17 of the 24 units so none looks heavier than its neighbour, and no
 * two silhouettes repeat.
 */
const I = ({ children }: { children: ReactNode }) => (
  <svg
    viewBox="0 0 24 24"
    className="h-[22px] w-[22px]"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

const CARDS: Card[] = [
  {
    kicker: "Websites",
    title: "Get a high performance website built",
    line: "A custom build made around how your customers actually buy, not a template.",
    href: "/web-design-and-development",
    accent: true,
    // A browser window, not code brackets: what is being sold is the site,
    // not the writing of it.
    icon: (
      <I>
        <path d="M4 4.5h16A1.5 1.5 0 0 1 21.5 6v12a1.5 1.5 0 0 1-1.5 1.5H4A1.5 1.5 0 0 1 2.5 18V6A1.5 1.5 0 0 1 4 4.5Z" />
        <path d="M2.5 9h19M5.6 6.8h2.6" />
      </I>
    ),
  },
  {
    kicker: "Ecommerce",
    title: "Ad Sidekick",
    line: "Run your Meta ads without logging into Meta. Told what to upload, when to scale and what to turn off.",
    href: "/meta-ads",
    // A megaphone with its handle, which reads as advertising. The speaker
    // this replaces had its sound wave cut off by the edge of the viewBox.
    icon: (
      <I>
        <path d="M18.5 5.2v13.6l-9-3.3V8.5l9-3.3Z" />
        <path d="M9.5 8.5H6a2.6 2.6 0 0 0 0 5.2h3.5" />
        <path d="m8.9 13.9 1.1 4.5a1.5 1.5 0 0 0 2.9-.7l-.9-3.8" />
      </I>
    ),
  },
  {
    kicker: "Shopify",
    title: "Build or fix a Shopify store",
    line: "Custom Liquid stores for brands scaling profitably. Migrations handled.",
    href: "/shopify-development-services",
    // A bag rather than a trolley: the trolley's two wheels were isolated
    // dots that vanished at this size.
    icon: (
      <I>
        <path d="M5.6 7.8h12.8l1 11.7H4.6l1-11.7Z" />
        <path d="M9 7.8V6.4a3 3 0 0 1 6 0v1.4" />
      </I>
    ),
  },
  {
    kicker: "SEO",
    title: "Get found for what you sell",
    line: "Priced per page instead of an open-ended retainer, and reported in leads.",
    href: "/seo",
    icon: (
      <I>
        <path d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z" />
        <path d="m16.1 16.1 4.4 4.4" />
      </I>
    ),
  },
  {
    kicker: "Google Ads",
    title: "Search and Shopping, pointed at profit",
    line: "Campaigns built to sell, with the tracking wired up properly from day one.",
    href: "/google-ads",
    // Crosshairs make it a reticle. Two bare concentric circles read as a
    // record, or a loading spinner.
    icon: (
      <I>
        <path d="M12 20.3a8.3 8.3 0 1 0 0-16.6 8.3 8.3 0 0 0 0 16.6Z" />
        <path d="M12 15.9a3.9 3.9 0 1 0 0-7.8 3.9 3.9 0 0 0 0 7.8Z" />
        <path d="M12 2v1.7M12 20.3V22M2 12h1.7M20.3 12H22" />
      </I>
    ),
  },
  {
    kicker: "Apps & automation",
    title: "Custom tools, apps and AI automation",
    line: "The repetitive work eating your week, handed to software instead of a person.",
    href: "/ai-and-automation",
    // A cycle, which is what automation looks like. The robot it replaces
    // was seven marks in a 24px box, four of them floating.
    icon: (
      <I>
        <path d="M20.4 11A8.5 8.5 0 0 0 5.9 6.6L3.5 9" />
        <path d="M3.5 4.4V9H8.1" />
        <path d="M3.6 13a8.5 8.5 0 0 0 14.5 4.4l2.4-2.4" />
        <path d="M20.5 19.6V15h-4.6" />
      </I>
    ),
  },
  {
    kicker: "Dashboards",
    title: "Business dashboards",
    line: "One live screen for the numbers you actually run the business on.",
    // Same destination the header's dashboard entry uses, so the two cannot
    // drift apart.
    href: "/ai-and-automation#dashboards",
    // Bars on a baseline. A rising line would have read as the cycle arrows
    // two cards earlier, and a framed chart as the browser window on the
    // first card; bars share a silhouette with neither.
    icon: (
      <I>
        <path d="M3.5 20.2h17" />
        <path d="M7 20.2v-6.7M12 20.2V9M17 20.2V5.2" />
      </I>
    ),
  },
  {
    kicker: "Branding",
    title: "A logo and brand that fits",
    line: "The identity the rest of it hangs off, done once and done properly.",
    href: "/professional-logo-design",
    // A colour drop, which reads as paint rather than as a rating.
    icon: (
      <I>
        <path d="M12 3.4c3.3 3.6 6.1 7 6.1 10.1a6.1 6.1 0 0 1-12.2 0c0-3.1 2.8-6.5 6.1-10.1Z" />
      </I>
    ),
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

      {/* svh, not vh: on a phone vh is the height with the browser chrome
          hidden, so a vh-tall hero sits taller than the screen and pushes its
          own bottom out of sight until you scroll. svh is the visible height. */}
      <div className="relative z-[3] flex min-h-[calc(100svh-72px)] flex-col items-center justify-center px-3.5 pb-12 pt-10 text-center sm:px-10 sm:pb-20 sm:pt-16 lg:min-h-[calc(100svh-60px)]">
        {/* Outside Reveal: it animates opacity and transform, and either one
            cancels the glass this box is drawn with. */}
        <div className="mt-6 flex w-full justify-center sm:mt-9">
          <AskBox />
        </div>

        {/* The hero runs on three type sizes and nothing else: this headline,
            one body size shared by the ask box's intro, its field and the line
            below, and one micro size for the suggestions. It had five sizes
            inside a 5px band, which reads as sloppiness rather than
            hierarchy — the headline was 2px larger than body text, so nothing
            looked like a heading. Rank is carried by weight and colour from
            here on, not by half-pixel steps. The field itself is the one
            exception at 16px, because anything smaller makes iOS Safari zoom
            the page when it takes focus. */}
        <Reveal delay={0.2} className="mt-7 sm:mt-9">
          <h1 className="mx-auto max-w-[680px] text-balance text-[clamp(22px,2.1vw,28px)] font-medium leading-[1.12] tracking-[-0.03em] text-white">
            We engineer high-performance marketing, websites, apps, AI,
            automations and dashboards.{" "}
            <span className="text-white/55">Custom built for your business.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.3} className="mt-4 sm:mt-5">
          <p className="mx-auto max-w-[560px] text-balance text-[14.5px] leading-snug text-white/55 sm:text-[16px]">
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
        sub="Pick the one you came for. You deal with the developer doing the work, not an account manager."
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
