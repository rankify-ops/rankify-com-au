"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { asset } from "@/lib/basePath";
import { Reveal } from "@/components/ui/Reveal";
import { AskBox } from "@/components/sections/AskBox";
import { FloatingPartners } from "@/components/sections/FloatingPartners";
import { SectionHeading } from "@/components/service-page/SectionHeading";
import { Gauge, Palette, Search, Workflow } from "lucide-react";
import { GoogleAdsMark, MetaMark, ShopifyMark } from "@/components/ui/BrandMark";

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
  /** The three things this card actually covers, in plain words. */
  sub?: string;
  href: string;
  icon: ReactNode;
  /** Real brand mark rather than a line icon: needs a neutral tile. */
  brand?: boolean;
};

/**
 * The service icons.
 *
 * Hand-drawn glyphs sat badly next to three real brand marks -- a stroke
 * somebody eyeballed, beside logos drawn by the companies that own them.
 * These come from lucide, which the plan tables already use, so there is one
 * icon set in the project rather than two.
 *
 * Still one rule, the one the hand-drawn set was redrawn for: no two
 * silhouettes repeat. A window, a magnifier, linked nodes, a dial and a
 * palette share no outline, so none of the five reads as its neighbour at
 * this size. That is why Dashboards is a dial rather than the obvious bar chart
 * and Websites a window rather than a panel grid -- those two would have
 * been the same rectangle twice.
 */
const I = ({ icon: Icon }: { icon: typeof Search }) => (
  <Icon className="h-[26px] w-[26px]" strokeWidth={1.7} absoluteStrokeWidth />
);

const CARDS: Card[] = [
  {
    kicker: "Websites",
    title: "Get a high performance website built",
    line: "Custom built around how your customers buy. Live in 7 to 15 days, with a back end you change in plain words.",
    href: "/web-design-and-development",
    sub: "New Builds / Redesigns / Landing Pages",
    // Tom's own artwork, not lucide. It arrived as a 1200px white square with
    // no alpha, so it is cropped to the glyph (the source carried 8% padding a
    // side, which would have made it the smallest mark on the row) and the
    // white turned transparent by distance rather than a threshold -- a hard
    // cut leaves a white fringe on every curve at this size.
    icon: (
      <Image
        src={asset("/assets/partners/websites-www.png")}
        alt=""
        width={256}
        height={256}
        className="h-[26px] w-[26px]"
      />
    ),
  },
  {
    // "Ecommerce" over a product name told a first-time visitor nothing
    // about what this card sells. The kicker is now the platform, which also
    // puts it in step with the Google Ads card beside it, and the line under
    // the title says which platforms in plain words -- it will not fit in the
    // kicker, which has 103px of room against the 218px that phrase needs.
    kicker: "Meta Ads",
    title: "Ad Sidekick",
    sub: "Meta / Facebook / Instagram Ads",
    line: "Run Meta ads without ever signing in. We build your campaigns and ads, then tell you when to add more, what is winning and what to turn off.",
    href: "/meta-ads",
    brand: true,
    icon: <MetaMark />,
  },
  {
    kicker: "Shopify",
    title: "Build or fix a Shopify store",
    line: "Custom Liquid stores, migrations handled, and a developer on call once it is live.",
    href: "/shopify-development-services",
    sub: "New Stores / Hire a Developer / Apps",
    brand: true,
    icon: <ShopifyMark />,
  },
  {
    kicker: "Google Ads",
    title: "Search and Shopping, pointed at profit",
    line: "Run by an ex-Google team and sent to a page we build, with every call and sale tracked.",
    href: "/google-ads",
    sub: "Search / Shopping / Tracking",
    brand: true,
    icon: <GoogleAdsMark />,
  },
  {
    kicker: "SEO",
    // "Get found for what you sell" described the outcome without naming a
    // single place it happens, so it read as the vaguest card on the row.
    title: "Show in Google and AI chatbot results",
    sub: "Local Maps / Search Engines / AI",
    line: "Priced per page, not as an open-ended retainer. Reported in leads.",
    href: "/seo",
    icon: <I icon={Search} />,
  },
  {
    kicker: "Apps & automation",
    title: "Custom tools, apps and AI automation",
    line: "The manual jobs eating your week, handed to software built for your business.",
    href: "/ai-and-automation",
    sub: "Internal Tools / Custom Apps / AI Automation",
    icon: <I icon={Workflow} />,
  },
  {
    kicker: "Dashboards",
    title: "Every number you run on, on one screen",
    line: "Sales, ad spend, stock and profit, live from the systems you already use.",
    // Same destination the header's dashboard entry uses, so the two cannot
    // drift apart.
    href: "/dashboards",
    sub: "Sales / Ad Spend / Profit",
    icon: <I icon={Gauge} />,
  },
  {
    kicker: "Branding",
    title: "A logo and brand that fits",
    line: "The identity everything else hangs off. Done once, done properly.",
    href: "/professional-logo-design",
    sub: "Logos / Brand Kits / Guidelines",
    icon: <I icon={Palette} />,
  },
];

export function HomeHero() {
  return (
    <section className="grain relative mx-2 flex flex-1 flex-col overflow-hidden rounded-[32px] bg-[radial-gradient(120%_140%_at_20%_0%,#06382a_0%,var(--green-deep)_45%,#010f0a_100%)] text-white sm:block sm:flex-none">
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
      {/* No forced height on a phone.
          Holding the hero at a full 100svh while the content is about 410px
          tall left 206px of empty green above it and 122px below -- a third
          of the hero doing nothing, which is what made the layout feel off
          however the type was set. It now sizes to its content on a phone
          and keeps the full-screen hero from sm up, where there is enough
          content width to fill one. */}
      <FloatingPartners />

      {/* svh, not vh: on a phone vh is the height with the browser chrome
          hidden, so a vh-tall hero sits taller than the screen and pushes its
          own bottom out of sight until you scroll. svh is the visible height. */}
      <div className="relative z-[3] flex flex-1 flex-col items-center justify-center px-3.5 pb-14 pt-12 text-center sm:min-h-[calc(100svh-72px)] sm:flex-none sm:px-10 sm:pb-20 sm:pt-16 lg:min-h-[calc(100svh-60px)]">
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
          <h1 className="mx-auto max-w-[680px] text-balance text-[14.5px] font-medium leading-[1.35] tracking-[-0.02em] text-white sm:text-[clamp(22px,2.1vw,28px)] sm:leading-[1.12] sm:tracking-[-0.03em]">
            We engineer high-performance marketing, websites, apps, AI,
            automations and dashboards.{" "}
            <span className="text-white/55">Custom built for your business.</span>
          </h1>
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
                  // One tile for all eight. The brand marks need a neutral
                  // ground -- a green wash under Meta blue or Shopify green
                  // muddies both -- and a row where three tiles are white and
                  // five are green reads as two unrelated sets rather than one
                  // row. The service icons keep the green stroke, so the colour
                  // is still there; it is in the mark instead of behind it.
                  className="flex h-12 w-12 flex-none items-center justify-center rounded-[14px] border border-line bg-white text-[color:var(--green-text)]"
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
              {c.sub && (
                <p className="mt-1.5 text-[13px] font-medium leading-snug text-[color:var(--green-text)]">
                  {c.sub}
                </p>
              )}
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
