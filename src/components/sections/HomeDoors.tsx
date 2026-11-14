"use client";

import Link from "next/link";
import { asset } from "@/lib/basePath";
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
    kicker: "Already with us",
    title: "Log in to your website",
    line: "Ask for a change in plain words. See it before it goes live.",
    href: "https://app.rankify.com.au/login",
    external: true,
    icon: <I d="M15 3.5h3.5a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H15M10 16l4-4-4-4M14 12H3.5" />,
  },
  {
    kicker: "Our product",
    title: "Ad Sidekick",
    line: "The ads system an agency runs, in your hands. From $99/mo.",
    href: "/meta-ads",
    accent: true,
    icon: <I d="M4 10v4h3l6 4V6L7 10H4ZM17.5 9.2a4.2 4.2 0 0 1 0 5.6" />,
  },
  {
    kicker: "Start something",
    title: "Get a website built",
    line: "Built around how your customers actually buy. From $2,999.",
    href: "/web-design-and-development",
    icon: <I d="m9 8-4.5 4L9 16M15 8l4.5 4L15 16" />,
  },
  {
    kicker: "Not sure yet",
    title: "Book a call",
    line: "Fifteen minutes with me, not a salesperson.",
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
          <span className="mt-2 block max-w-[300px] text-[14px] leading-snug text-white/75">
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
    "group relative block h-[250px] rounded-[28px] ring-1 ring-white/20 transition-shadow duration-300 hover:ring-white/35 hover:shadow-[0_26px_60px_-24px_rgba(0,0,0,0.7)] sm:h-[270px] lg:h-[300px] before:pointer-events-none before:absolute before:inset-0 before:z-[3] before:rounded-[28px] before:bg-[linear-gradient(135deg,rgba(255,255,255,0.45)_0%,rgba(255,255,255,0.06)_26%,rgba(255,255,255,0)_52%)] after:pointer-events-none after:absolute after:inset-x-6 after:top-0 after:z-[3] after:h-px after:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.75),transparent)]";

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
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[1]">
        <span className="absolute left-[4%] top-[52%] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(63,216,187,0.55)_0%,rgba(63,216,187,0)_70%)] blur-[30px]" />
        <span className="absolute left-[38%] top-[44%] h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.3)_0%,rgba(255,255,255,0)_70%)] blur-[36px]" />
        <span className="absolute right-[6%] top-[58%] h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle,rgba(7,168,137,0.6)_0%,rgba(7,168,137,0)_70%)] blur-[34px]" />
        <span className="absolute right-[30%] top-[20%] h-[260px] w-[260px] rounded-full bg-[radial-gradient(circle,rgba(63,216,187,0.35)_0%,rgba(63,216,187,0)_72%)] blur-[40px]" />
      </div>

      <div className="relative z-[2] mx-auto max-w-[1400px] px-5 pb-14 pt-14 sm:px-10 sm:pb-20 sm:pt-20">
        <div className="max-w-[760px]">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[color:#3fd8bb]">
            Rankify®
          </p>
          <h1 className="mt-4 text-[clamp(32px,5vw,58px)] font-semibold leading-[1.02] tracking-[-0.045em] text-white">
            We build the website.{" "}
            <span className="text-[color:#3fd8bb]">
              Then we hand you the controls.
            </span>
          </h1>
          <p className="mt-5 max-w-[560px] text-[17px] leading-relaxed text-white/70">
            A site built around how your customers buy, a back end where you change it
            by asking, and the ads system behind it. Pick where you want to go.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
          {DOORS.map((d) => (
            <DoorCard key={d.title} door={d} />
          ))}
        </div>
      </div>
    </section>
  );
}
