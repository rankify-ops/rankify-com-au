import type { Metadata } from "next";
import Image from "next/image";
import { asset } from "@/lib/basePath";

/**
 * Ten mobile hero layouts, side by side, for picking one.
 *
 * Not part of the site: noindex, not in the sitemap, nothing links to it. It
 * exists so a layout decision can be made by looking at ten of them on a
 * phone rather than by shipping one and asking "better?" ten times.
 *
 * The field in each is a drawn placeholder, not a real input. Ten live ask
 * boxes on one page would each mount their own state and the page would stop
 * being about layout.
 *
 * What is actually being tested, from the current hero's measurements:
 *   - the greeting is left-aligned inside an otherwise centred column
 *   - 159px of dead space sits under the content
 *   - five type sizes became four, but the order (face, then box, then what
 *     we do) still asks the reader to care who Thomas is before they know
 *     what the company sells
 */

export const metadata: Metadata = {
  title: "Hero variations (internal)",
  robots: { index: false, follow: false },
};

const AVATAR = "/assets/images/fZdV1icYbXIkqfVAekWtJEAifo.png";
const HEADLINE = "We engineer high-performance marketing, websites, apps, AI, automations and dashboards.";
const HEADLINE_TAIL = "Custom built for your business.";
const SUB = "You work directly with us, and the goal is profit. Not clicks, not views, the business performance that actually matters.";
const CHIPS = ["new website", "Meta ads", "custom app"];

function Avatar({ size = 44, className = "" }: { size?: number; className?: string }) {
  return (
    <Image
      src={asset(AVATAR)}
      alt=""
      width={104}
      height={118}
      style={{ height: size, width: size }}
      className={`flex-none rounded-full object-cover object-top grayscale ${className}`}
    />
  );
}

/** The chips under the field, as one centred or left row. */
function Chips({ align = "center" }: { align?: "center" | "left" }) {
  return (
    <p
      className={`mt-3 whitespace-nowrap text-[13px] text-white/40 ${
        align === "center" ? "text-center" : "text-left"
      }`}
    >
      {CHIPS.join(" · ")}
    </p>
  );
}

/** The submit circle, so every variation's field ends the same way. */
function Go({ tone = "green" }: { tone?: "green" | "dark" | "light" }) {
  const bg =
    tone === "green"
      ? "bg-[color:#07a889] text-white"
      : tone === "dark"
        ? "bg-white/15 text-white"
        : "bg-[color:var(--green-text)] text-white";
  return (
    <span className={`flex h-9 w-9 flex-none items-center justify-center rounded-full ${bg}`}>
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h13M12 5l7 7-7 7" />
      </svg>
    </span>
  );
}

/* ── the five box treatments ─────────────────────────────────────────── */

/** 1. Glass, as the site has it today. */
function GlassBox() {
  return (
    <div className="relative w-full rounded-[28px] ring-1 ring-white/20 before:pointer-events-none before:absolute before:inset-0 before:z-[3] before:rounded-[28px] before:bg-[linear-gradient(135deg,rgba(255,255,255,0.45)_0%,rgba(255,255,255,0.06)_26%,rgba(255,255,255,0)_52%)]">
      <div className="w-full rounded-[28px] bg-white/[0.07] backdrop-blur-xl backdrop-saturate-150">
        <div className="flex w-full flex-col p-4">
          <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.08] py-2.5 pl-4 pr-2">
            <span className="flex-1 text-[16px] text-white/50">I need a new website</span>
            <Go />
          </div>
          <Chips />
        </div>
      </div>
    </div>
  );
}

/** 2. Solid dark card — no blur, so nothing behind it can muddy it. */
function SolidBox() {
  return (
    <div className="w-full rounded-[24px] border border-white/10 bg-[#04231a] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
      <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/25 py-2.5 pl-4 pr-2">
        <span className="flex-1 text-[16px] text-white/50">I need a new website</span>
        <Go />
      </div>
      <Chips />
    </div>
  );
}

/** 3. No card at all — the field sits straight on the hero. */
function BareBox() {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 rounded-full border border-white/25 bg-black/30 py-3 pl-5 pr-2">
        <span className="flex-1 text-[16px] text-white/55">I need a new website</span>
        <Go />
      </div>
      <Chips />
    </div>
  );
}

/** 4. A light panel, the way the rest of the site's cards look. */
function LightBox() {
  return (
    <div className="on-light w-full rounded-[24px] bg-white p-4 text-ink shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
      <div className="flex items-center gap-2 rounded-full border border-line bg-paper py-2.5 pl-4 pr-2">
        <span className="flex-1 text-[16px] text-grey">I need a new website</span>
        <Go tone="light" />
      </div>
      <p className="mt-3 whitespace-nowrap text-center text-[13px] text-grey">{CHIPS.join(" · ")}</p>
    </div>
  );
}

/** 5. Outline only — the shape without the surface. */
function OutlineBox() {
  return (
    <div className="w-full rounded-[24px] border border-white/25 p-4">
      <div className="flex items-center gap-2 rounded-full bg-white/10 py-2.5 pl-4 pr-2">
        <span className="flex-1 text-[16px] text-white/55">I need a new website</span>
        <Go tone="dark" />
      </div>
      <Chips />
    </div>
  );
}

/* ── the frame every variation sits in ───────────────────────────────── */

function Frame({
  n,
  name,
  note,
  glass,
  children,
}: {
  n: number;
  name: string;
  note: string;
  glass: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-10">
      <div className="mb-2 flex flex-wrap items-baseline gap-x-3 gap-y-1 px-1">
        <span className="text-[13px] font-bold text-ink">
          {n}. {name}
        </span>
        <span
          className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
            glass ? "bg-[color:var(--green-text)]/12 text-[color:var(--green-text)]" : "bg-ink/8 text-grey"
          }`}
        >
          {glass ? "glass" : "not glass"}
        </span>
        <span className="text-[12px] text-grey">{note}</span>
      </div>
      <section className="grain relative overflow-hidden rounded-[28px] bg-[radial-gradient(120%_140%_at_20%_0%,#06382a_0%,var(--green-deep)_45%,#010f0a_100%)] text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0 z-[1]">
          <span className="absolute right-[12%] top-[26%] h-[260px] w-[260px] rounded-full bg-[radial-gradient(circle,rgba(63,216,187,0.4)_0%,rgba(63,216,187,0)_70%)] blur-[34px]" />
          <span className="absolute left-[6%] top-[60%] h-[220px] w-[220px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0)_70%)] blur-[38px]" />
        </div>
        <div className="relative z-[2] px-4 py-9">{children}</div>
      </section>
    </div>
  );
}

function Headline({ align = "center" }: { align?: "center" | "left" }) {
  return (
    <h2
      className={`text-balance text-[22px] font-medium leading-[1.12] tracking-[-0.03em] text-white ${
        align === "center" ? "text-center" : "text-left"
      }`}
    >
      {HEADLINE} <span className="text-white/55">{HEADLINE_TAIL}</span>
    </h2>
  );
}

function Sub({ align = "center" }: { align?: "center" | "left" }) {
  return (
    <p
      className={`text-balance text-[14.5px] leading-snug text-white/55 ${
        align === "center" ? "text-center" : "text-left"
      }`}
    >
      {SUB}
    </p>
  );
}

export default function HeroVariationsPage() {
  return (
    <main className="mx-auto max-w-[520px] bg-paper px-3 py-8">
      <h1 className="mb-1 text-[22px] font-bold tracking-[-0.03em]">Mobile hero — 10 layouts</h1>
      <p className="mb-2 text-[14px] leading-snug text-grey">
        Look at this on your phone. The field is a drawn placeholder, not a live input.
      </p>
      <p className="mb-7 text-[13px] leading-snug text-grey">
        What is being fixed: today the greeting is left-aligned inside a centred
        column, and 159px of empty hero sits under the content. Variations 1–5
        keep the glass box, 6–10 drop it.
      </p>

      {/* 1 ─ the smallest change: stop mixing alignments */}
      <Frame n={1} name="All centred" note="greeting centred to match the rest" glass>
        <div className="flex flex-col items-center gap-3">
          <Avatar size={56} />
          <p className="max-w-[280px] text-center text-[14.5px] leading-[1.35] text-white/70">
            <span className="block font-semibold text-white">Hey, I&rsquo;m Thomas.</span>
            Tell me what you need and we&rsquo;ll take it from there.
          </p>
        </div>
        <div className="mt-5">
          <GlassBox />
        </div>
        <div className="mt-7 flex flex-col gap-4">
          <Headline />
          <Sub />
        </div>
      </Frame>

      {/* 2 ─ say what we do before who we are */}
      <Frame n={2} name="Headline first" note="what we sell, then the box, then the face" glass>
        <div className="flex flex-col gap-4">
          <Headline />
          <Sub />
        </div>
        <div className="mt-6">
          <GlassBox />
        </div>
        <div className="mt-5 flex items-center justify-center gap-2.5">
          <Avatar size={34} />
          <p className="text-[13.5px] text-white/60">
            <span className="font-semibold text-white">Thomas</span> reads these himself.
          </p>
        </div>
      </Frame>

      {/* 3 ─ one alignment, the other one */}
      <Frame n={3} name="All left" note="everything on one left edge, nothing centred" glass>
        <div className="flex items-center gap-3">
          <Avatar size={44} />
          <p className="text-[14.5px] leading-[1.35] text-white/70">
            <span className="block font-semibold text-white">Hey, I&rsquo;m Thomas.</span>
            Tell me what you need.
          </p>
        </div>
        <div className="mt-5">
          <GlassBox />
        </div>
        <div className="mt-7 flex flex-col gap-4">
          <Headline align="left" />
          <Sub align="left" />
        </div>
      </Frame>

      {/* 4 ─ the greeting moves inside the box it belongs to */}
      <Frame n={4} name="Greeting inside the box" note="one object instead of two" glass>
        <div className="flex flex-col gap-4">
          <Headline />
          <Sub />
        </div>
        <div className="mt-6">
          <div className="relative w-full rounded-[28px] ring-1 ring-white/20">
            <div className="w-full rounded-[28px] bg-white/[0.07] backdrop-blur-xl backdrop-saturate-150">
              <div className="flex w-full flex-col p-4">
                <div className="mb-3 flex items-center gap-2.5 border-b border-white/10 pb-3">
                  <Avatar size={32} />
                  <span className="text-[13.5px] text-white/70">
                    <span className="font-semibold text-white">Hey, I&rsquo;m Thomas.</span> Ask me anything.
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.08] py-2.5 pl-4 pr-2">
                  <span className="flex-1 text-[16px] text-white/50">I need a new website</span>
                  <Go />
                </div>
                <Chips />
              </div>
            </div>
          </div>
        </div>
      </Frame>

      {/* 5 ─ no face at all */}
      <Frame n={5} name="No avatar" note="drops the photo, keeps the offer" glass>
        <div className="flex flex-col gap-4">
          <Headline />
          <Sub />
        </div>
        <div className="mt-6">
          <GlassBox />
        </div>
        <p className="mt-4 text-center text-[13px] text-white/45">
          Answered by Thomas Flood, not a chatbot.
        </p>
      </Frame>

      {/* 6 ─ solid card, centred */}
      <Frame n={6} name="Solid card" note="no blur; nothing behind it to muddy it" glass={false}>
        <div className="flex flex-col items-center gap-3">
          <Avatar size={56} />
          <p className="max-w-[280px] text-center text-[14.5px] leading-[1.35] text-white/70">
            <span className="block font-semibold text-white">Hey, I&rsquo;m Thomas.</span>
            Tell me what you need and we&rsquo;ll take it from there.
          </p>
        </div>
        <div className="mt-5">
          <SolidBox />
        </div>
        <div className="mt-7 flex flex-col gap-4">
          <Headline />
          <Sub />
        </div>
      </Frame>

      {/* 7 ─ no card, headline first */}
      <Frame n={7} name="Bare field" note="no card at all — the field sits on the hero" glass={false}>
        <div className="flex flex-col gap-4">
          <Headline />
          <Sub />
        </div>
        <div className="mt-6">
          <BareBox />
        </div>
        <div className="mt-5 flex items-center justify-center gap-2.5">
          <Avatar size={34} />
          <p className="text-[13.5px] text-white/60">
            <span className="font-semibold text-white">Thomas</span> reads these himself.
          </p>
        </div>
      </Frame>

      {/* 8 ─ light panel */}
      <Frame n={8} name="Light panel" note="the same white card the rest of the site uses" glass={false}>
        <div className="flex flex-col gap-4">
          <Headline />
          <Sub />
        </div>
        <div className="mt-6">
          <LightBox />
        </div>
        <div className="mt-5 flex items-center justify-center gap-2.5">
          <Avatar size={34} />
          <p className="text-[13.5px] text-white/60">
            <span className="font-semibold text-white">Thomas</span> reads these himself.
          </p>
        </div>
      </Frame>

      {/* 9 ─ outline only, all left */}
      <Frame n={9} name="Outline, all left" note="shape without surface, one left edge" glass={false}>
        <div className="flex items-center gap-3">
          <Avatar size={44} />
          <p className="text-[14.5px] leading-[1.35] text-white/70">
            <span className="block font-semibold text-white">Hey, I&rsquo;m Thomas.</span>
            Tell me what you need.
          </p>
        </div>
        <div className="mt-5">
          <OutlineBox />
        </div>
        <div className="mt-7 flex flex-col gap-4">
          <Headline align="left" />
          <Sub align="left" />
        </div>
      </Frame>

      {/* 10 ─ the field as the last thing, after the pitch */}
      <Frame n={10} name="Pitch, then ask" note="bare field last, nothing above it competing" glass={false}>
        <div className="flex flex-col gap-4">
          <Headline align="left" />
          <Sub align="left" />
        </div>
        <div className="mt-6 flex items-center gap-3 rounded-2xl border border-white/12 bg-white/[0.06] p-3">
          <Avatar size={38} />
          <p className="text-[13.5px] leading-snug text-white/70">
            <span className="font-semibold text-white">Hey, I&rsquo;m Thomas.</span> Tell me what you
            need below.
          </p>
        </div>
        <div className="mt-3">
          <BareBox />
        </div>
      </Frame>

      <p className="pb-6 text-center text-[13px] text-grey">
        Tell me a number and I&rsquo;ll build it properly.
      </p>
    </main>
  );
}
