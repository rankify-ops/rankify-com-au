"use client";

import Link from "next/link";
import Image from "next/image";
import { asset } from "@/lib/basePath";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { HeroServices } from "@/components/sections/HeroServices";
import type { ReactNode } from "react";
import GlassSurface from "@/components/GlassSurface";

/**
 * The home page's front door.
 *
 * Rankify is no longer one thing, so the home page stops being a brochure you
 * scroll and becomes a set of doors: sign in, the product, the build, a call.
 * Whoever arrives — an existing client, a Shopify brand, somebody who wants a
 * website — gets to their own destination in one click instead of scrolling
 * past two offers that are not theirs.
 *
 * Three rules hold this together, and all three are about `backdrop-filter`,
 * which is how GlassSurface draws:
 *
 *   1. Nothing here is wrapped in <Reveal>. It animates opacity and transform,
 *      and either one on an ancestor cancels the glass outright.
 *   2. Hover changes shadow and text only. A hover `scale` or `translate`
 *      would kill the refraction for as long as the pointer is over the card,
 *      which looks like a rendering bug.
 *   3. The grid sits on `.glass-field`, because glass with nothing behind it
 *      is a grey box.
 */

type Door = {
  kicker: string;
  title: string;
  line: string;
  href: string;
  /** Outbound links leave the marketing site for an app. */
  external?: boolean;
  icon: ReactNode;
  /** The one door we most want pressed. */
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

const DOORS: Door[] = [
  {
    kicker: "Websites",
    title: "Get a high performance website built",
    line:
      "Shopify ecommerce or a custom build, made around how your customers buy. Then edit it yourself with AI after it is built.",
    href: "/web-design-and-development",
    accent: true,
    icon: <I d="m9 8-4.5 4L9 16M15 8l4.5 4L15 16" />,
  },
  {
    kicker: "Meta ads",
    title: "Ad Sidekick",
    line:
      "Run your Meta ad account without ever logging into Meta. Get told when to upload new ads, when to raise spend to scale, which ads are performing, and learn from your winners.",
    href: "/meta-ads",
    icon: <I d="M4 10v4h3l6 4V6L7 10H4ZM17.5 9.2a4.2 4.2 0 0 1 0 5.6" />,
  },
  {
    kicker: "Not sure yet",
    title: "Book a call",
    line: "Fifteen minutes with me, not a salesperson. We work out what you actually need.",
    href: "/schedule-strategy-call",
    icon: <I d="M6.5 3.8h3l1.4 3.5-2 1.4a11.5 11.5 0 0 0 5.4 5.4l1.4-2 3.5 1.4v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 6a2 2 0 0 1 2-2.2Z" />,
  },
];

function DoorCard({ door }: { door: Door }) {
  const inner = (
    // The 404 page's values, which is the one place this glass was already
    // working. `displace` stays at its default: overriding it regenerates the
    // displacement map into something that reads as flat tint, not refraction.
    <GlassSurface
      width="100%"
      height="100%"
      borderRadius={28}
      blur={14}
      backgroundOpacity={0.08}
      saturation={1.4}
      distortionScale={-140}
      className="h-full w-full"
    >
      <span className="flex h-full w-full flex-col items-start justify-between p-6 text-left sm:p-7">
        <span className="flex w-full items-start justify-between gap-3">
          <span
            className={`flex h-11 w-11 flex-none items-center justify-center rounded-[13px] ${
              door.accent
                ? "bg-[color:#07a889] text-white"
                : "bg-white/15 text-[color:#3fd8bb]"
            }`}
          >
            {door.icon}
          </span>
          <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">
            {door.kicker}
          </span>
        </span>

        <span className="mt-6 block">
          <span className="block text-[20px] font-semibold leading-tight tracking-[-0.03em] text-white sm:text-[22px]">
            {door.title}
          </span>
          <span className="mt-2 block max-w-[360px] text-[14px] leading-snug text-white/75">
            {door.line}
          </span>
        </span>

        <span className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[color:#3fd8bb]">
          {door.external ? "Sign in" : "Have a look"}
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h13M12 5.5 18.5 12 12 18.5" />
          </svg>
        </span>
      </span>
    </GlassSurface>
  );

  // Shadow only on hover. See rule 2 at the top of this file.
  const shell =
    "group relative block h-[280px] rounded-[28px] ring-1 ring-white/20 transition-shadow duration-300 hover:ring-white/35 hover:shadow-[0_26px_60px_-24px_rgba(0,0,0,0.7)] sm:h-[280px] lg:h-[320px] before:pointer-events-none before:absolute before:inset-0 before:z-[3] before:rounded-[28px] before:bg-[linear-gradient(135deg,rgba(255,255,255,0.45)_0%,rgba(255,255,255,0.06)_26%,rgba(255,255,255,0)_52%)] after:pointer-events-none after:absolute after:inset-x-6 after:top-0 after:z-[3] after:h-px after:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.75),transparent)]";

  return door.external ? (
    <a href={door.href} className={shell} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    <Link href={door.href} className={shell}>
      {inner}
    </Link>
  );
}

export function HomeDoors() {
  return (
    <section className="grain relative mx-2 overflow-hidden rounded-[32px] bg-[radial-gradient(120%_140%_at_20%_0%,#06382a_0%,var(--green-deep)_45%,#010f0a_100%)] text-white">
      {/* The old hero's background, put back: the same gradient and the same
          looping clip at the same opacity. */}
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-50"
        src={asset("/assets/hero-bg.mp4")}
        autoPlay
        muted
        loop
        playsInline
      />
      {/* Light for the cards to refract. Siblings, never ancestors: a filter
          on an ancestor would create a containing block and cancel the glass.
          Sat low, where the card row is. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[1]">
        <span className="absolute left-[4%] top-[58%] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(63,216,187,0.55)_0%,rgba(63,216,187,0)_70%)] blur-[30px]" />
        <span className="absolute left-[38%] top-[52%] h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.3)_0%,rgba(255,255,255,0)_70%)] blur-[36px]" />
        <span className="absolute right-[6%] top-[62%] h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle,rgba(7,168,137,0.6)_0%,rgba(7,168,137,0)_70%)] blur-[34px]" />
        <span className="absolute right-[28%] top-[26%] h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle,rgba(63,216,187,0.3)_0%,rgba(63,216,187,0)_72%)] blur-[40px]" />
      </div>

      <div className="relative z-[2] flex flex-col px-5 pb-10 pt-8 sm:px-10 lg:min-h-[calc(100svh-60px)]">
        {/* The wordmark across the top and the line in the corner: the old
            hero's composition, which the first pass threw away. Text may use
            Reveal; the cards below may not, because it animates opacity and
            transform and either one cancels backdrop-filter. */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-14">
          <Reveal className="lg:min-w-0 lg:flex-1">
            <Image
              src={asset("/assets/images/n92JU5BqmoxMotdcH6fGsTpi7e4.svg")}
              alt="Rankify®"
              width={974}
              height={210}
              priority
              className="h-auto w-full lg:max-w-[1100px]"
            />
          </Reveal>

          <Reveal delay={0.15} className="lg:w-[420px] lg:flex-none">
            <h1 className="max-w-[430px] text-[clamp(25px,2.5vw,36px)] font-medium leading-[0.94] tracking-[-0.05em] text-white">
              High-performance marketing, websites, apps and AI automation.
            </h1>
            <p className="mt-3 max-w-[430px] text-[15px] leading-snug text-white/60">
              Custom built for your business, not assembled from a template.
            </p>
            <HeroServices />
          </Reveal>
        </div>

        <div className="mt-auto flex flex-col items-start justify-between gap-8 pt-10 lg:flex-row lg:items-end lg:pt-14">
          <Reveal delay={0.25}>
            <p className="max-w-[480px] text-[clamp(19px,1.6vw,26px)] font-medium leading-[0.98] tracking-[-0.05em] text-white">
              You work directly with us, and the goal is profit.{" "}
              <span className="text-white/65">
                Not clicks, not views, the business performance that actually matters.
              </span>
            </p>
          </Reveal>
          <span className="order-3 text-[13px] text-white/55 lg:order-none">© 2026 Rankify®</span>
          <Reveal delay={0.35}>
            <div className="flex max-w-[400px] gap-4 rounded-2xl border border-white/15 bg-white/5 p-3 backdrop-blur-md">
              <Image
                src={asset("/assets/images/fZdV1icYbXIkqfVAekWtJEAifo.png")}
                alt="Thomas Flood"
                width={104}
                height={118}
                className="h-[118px] w-[104px] flex-none rounded-lg object-cover grayscale"
              />
              <div className="flex flex-col gap-1 text-white">
                <strong className="text-base font-semibold">Have a project in mind?</strong>
                <span className="text-[12.5px] text-white/60">
                  Thomas Flood – Director of Digital Strategy
                </span>
                <div id="hero-cta" className="mt-auto self-start">
                  <Button href="/schedule-strategy-call" variant="light" pulse className="px-5 py-2.5 text-[13.5px]">
                    Let&rsquo;s talk
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* The doors sit below the hero proper: the hero says who Rankify is,
            these say where to go. Still outside <Reveal> — it animates
            opacity and transform, and either cancels the glass. */}
        <div className="pt-12 sm:pt-14">
          <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/45">
            Start here
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DOORS.map((d) => (
              <DoorCard key={d.title} door={d} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
