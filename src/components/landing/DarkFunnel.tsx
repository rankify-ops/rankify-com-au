import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { asset } from "@/lib/basePath";
import { Reveal } from "@/components/ui/Reveal";
import { Stars } from "@/components/ui/Stars";
import { LandingPixel, StickyCta } from "@/components/landing/LandingChrome";
import { FunnelVideo, type Chapter } from "@/components/landing/FunnelVideo";

/**
 * The shared shell for the two funnel landing pages.
 *
 * Both funnels run the identical skeleton — hero, video, results, three steps,
 * form, calendar, second CTA — and differ only in copy and in which pixel
 * audience they build. Keeping the skeleton in one place is the only way two
 * pages meant to be comparable stay comparable; two hand-built copies diverge
 * the first time either one is edited.
 *
 * Dark ground, centred logo, no nav anywhere, one destination.
 */

const LOGO = "/assets/images/ha7iyKKaK8R1V7r8jKPhCa6P74.svg";
const STARS = "/assets/images/stars-green.webp";
/** The lockup ships black. Inverting it is cheaper than a second asset to keep in sync. */
const WHITE = "[filter:brightness(0)_invert(1)]";

export type FunnelConfig = {
  /** Distinguishes the two audiences in Events Manager. */
  pixelName: string;
  ctaHref: string;
  ctaLabel: string;
  /** Sits inside every button: the 48 hour promise, worded per funnel. */
  ctaMicro: string;
  eyebrow: string;
  headline: string;
  /**
   * The back half of the headline, set in green. The offer itself goes here:
   * on a page a cold visitor reads in about a second, the free part has to be
   * the thing their eye lands on.
   */
  headlineAccent?: string;
  videoHeading: string;
  /**
   * The 1080p master on Vercel Blob, too large for the repo. Left unset on a
   * funnel whose own VSL hasn't been recorded yet: the two offers are
   * different, and running one funnel's video on the other contradicts the
   * page it's sitting on.
   */
  videoSrc?: string;
  chapters?: Chapter[];
  /** Under the button: the star row and the four things they get. */
  proof: { count: string; label: string };
  bullets: string[];
  steps: { n: string; h: string; b: string }[];
  reviewsHeading: string;
  reviewsSub: string;
  reviews: { quote: string; name: string; role: string; avatar?: string }[];
  closeHeading: string;
  closeSub: string;
};

/**
 * One button, repeated down the page, with the delivery promise *inside* it
 * rather than under it — the promise is the reason to press it, so it belongs
 * on the button.
 */
function Cta({ cfg, light = false }: { cfg: FunnelConfig; light?: boolean }) {
  return (
    <Link
      href={cfg.ctaHref}
      className={`mx-auto flex w-full max-w-[520px] flex-col items-center rounded-2xl px-8 py-4 text-center transition-transform duration-300 hover:-translate-y-0.5 ${
        light
          ? "bg-white text-ink shadow-[0_14px_40px_rgba(0,0,0,0.28)]"
          : "bg-[color:#07a889] text-white shadow-[0_14px_40px_rgba(7,168,137,0.32)]"
      }`}
    >
      <span className="text-[clamp(19px,2.4vw,25px)] font-bold tracking-[-0.02em]">
        {cfg.ctaLabel}
      </span>
      <span className={`mt-0.5 text-[15px] font-medium ${light ? "text-ink/60" : "text-white/80"}`}>
        {cfg.ctaMicro}
      </span>
    </Link>
  );
}

/**
 * The reassurance block, directly under the button where the doubt is: who
 * else has done this, then the four things they're actually agreeing to.
 */
function Proof({ cfg }: { cfg: FunnelConfig }) {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-center gap-3">
        {/* The supplied rating lockup, used as the image it is rather than
            redrawn: the proportions and the green are the familiar ones. */}
        <Image
          src={asset(STARS)}
          alt="Rated five stars"
          width={435}
          height={83}
          className="h-[36px] w-auto sm:h-[40px]"
        />
        {/* The number carries it, so it is set large with the wording small
            beneath — the same lockup the stars come from. */}
        <span className="text-left leading-none">
          <strong className="block whitespace-nowrap text-[21px] font-bold tracking-[-0.02em] text-white sm:text-[23px]">
            {cfg.proof.count}
          </strong>
          <span className="mt-1 block whitespace-nowrap text-[12px] font-medium text-white/55">
            {cfg.proof.label}
          </span>
        </span>
      </div>
      {/* Each row centres on its own, so the left edge is deliberately ragged.
          Locking the ticks to one column reads as a form field list under a
          centred hero; this reads as a run of claims. */}
      <ul className="mx-auto mt-5 grid gap-y-2.5">
        {cfg.bullets.map((b) => (
          <li key={b} className="flex items-center justify-center gap-2.5">
            <svg
              viewBox="0 0 24 24"
              className="h-[18px] w-[18px] flex-none text-[color:#3fd8bb]"
              fill="currentColor"
            >
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.8 7.7-5.6 5.6a1 1 0 0 1-1.4 0l-2.6-2.6a1 1 0 1 1 1.4-1.4l1.9 1.9 4.9-4.9a1 1 0 0 1 1.4 1.4Z" />
            </svg>
            <span className="text-[15.5px] font-semibold text-white">{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Head({ children, sub }: { children: ReactNode; sub?: string }) {
  return (
    <Reveal className="mx-auto max-w-[860px] text-center">
      <h2 className="text-[clamp(26px,3.4vw,42px)] font-semibold leading-[1.08] tracking-[-0.035em] text-white">
        {children}
      </h2>
      {sub && (
        <p className="mx-auto mt-4 max-w-[620px] text-[16.5px] leading-relaxed text-white/60">{sub}</p>
      )}
    </Reveal>
  );
}

function Section({
  children,
  id,
  className = "py-11 sm:py-16",
}: {
  children: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className={`mx-auto max-w-[1100px] scroll-mt-20 px-5 sm:px-8 ${className}`}>
      {children}
    </section>
  );
}

export function DarkFunnelPage({ cfg }: { cfg: FunnelConfig }) {
  return (
    <div className="min-h-screen bg-[#05100c] text-white">
      <LandingPixel contentName={cfg.pixelName} />

      {/* Centred logo, deliberately not a link. */}
      <div className="flex flex-col items-center gap-2.5 px-5 pt-6">
        <Image
          src={asset(LOGO)}
          alt="Rankify®"
          width={186}
          height={40}
          priority
          className={`h-[26px] w-auto ${WHITE}`}
        />
        <span className="inline-flex items-center gap-2 rounded-full border border-[color:#07a889]/35 bg-[color:#07a889]/15 px-3.5 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.14em] text-[color:#3fd8bb]">
          <span className="h-1.5 w-1.5 rounded-full bg-[color:#3fd8bb]" />
          {cfg.eyebrow}
        </span>
      </div>

      {/* ---------- 1. Hero ---------- */}
      <section className="mx-auto max-w-[1100px] px-5 pt-5 text-center sm:px-8 sm:pt-6">
        <Reveal>
          <h1 className="mx-auto max-w-[900px] text-[clamp(31px,4.8vw,54px)] font-bold leading-[1.06] tracking-[-0.035em]">
            {cfg.headline}
            {cfg.headlineAccent && (
              <>
                {" "}
                <span className="text-[color:#3fd8bb]">{cfg.headlineAccent}</span>
              </>
            )}
          </h1>
        </Reveal>
      </section>

      {/* ---------- 2. Video ---------- */}
      <Section className="pb-12 pt-7 sm:pb-16 sm:pt-9">
        <Reveal className="text-center">
          <p className="inline-flex items-center gap-2 text-[clamp(18px,2vw,24px)] font-bold tracking-[-0.02em] text-white">
            <svg viewBox="0 0 24 24" className="h-5 w-5 flex-none text-[color:#3fd8bb]" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 4.5v15M6 13.5l6 6 6-6" />
            </svg>
            {cfg.videoHeading}
          </p>
        </Reveal>
        <Reveal scale delay={0.05} className="mt-5">
          {cfg.videoSrc ? (
            <FunnelVideo src={cfg.videoSrc} chapters={cfg.chapters ?? []}>
              <div id="hero-cta" className="mt-6">
                <Cta cfg={cfg} />
              </div>
              <Proof cfg={cfg} />
            </FunnelVideo>
          ) : (
            <div className="mx-auto flex aspect-video w-full max-w-[880px] items-center justify-center rounded-3xl border border-white/10 bg-black/50">
              <span className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-[color:#07a889] shadow-[0_10px_34px_rgba(7,168,137,0.45)]">
                <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7" fill="#fff">
                  <path d="M8 5.5v13l11-6.5z" />
                </svg>
              </span>
            </div>
          )}
        </Reveal>
        {/* Only for a funnel with no video of its own: with one, the button and
            the proof block live inside the player, above the chapter list. */}
        {!cfg.videoSrc && (
          <>
            <Reveal id="hero-cta" delay={0.1} className="mt-6">
              <Cta cfg={cfg} />
            </Reveal>
            <Proof cfg={cfg} />
          </>
        )}
      </Section>

      {/* ---------- 3. How it works ---------- */}
      <Section>
        <Head>How it works</Head>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {cfg.steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-7">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[color:#07a889] text-[15px] font-bold text-white">
                  {s.n}
                </span>
                <h3 className="mt-4 text-[19px] font-medium tracking-[-0.02em]">{s.h}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-white/60">{s.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-8">
          <Cta cfg={cfg} />
        </div>
      </Section>

      {/* ---------- 4. Reviews ---------- */}
      <Section id="reviews">
        <Head sub={cfg.reviewsSub}>{cfg.reviewsHeading}</Head>
        {/* Columns, not a grid: the quotes are wildly different lengths and ten
            of them in a 3-up grid leaves a stranded card on the last row. */}
        <div className="mt-8 gap-4 [column-count:1] sm:[column-count:2] lg:[column-count:3]">
          {cfg.reviews.map((r, i) => (
            <Reveal key={r.name} delay={Math.min(i, 5) * 0.05} className="mb-4 break-inside-avoid">
              <figure className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <Stars className="h-4 w-4" />
                <blockquote className="mt-4 flex-1 text-[15.5px] leading-relaxed text-white/85">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  {r.avatar && (
                    <Image
                      src={asset(r.avatar)}
                      alt={r.name}
                      width={96}
                      height={96}
                      className="h-11 w-11 flex-none rounded-full object-cover"
                    />
                  )}
                  <span className="text-[13px] text-white/50">
                    <strong className="block text-[15px] font-semibold tracking-[-0.01em] text-white">
                      {r.name}
                    </strong>
                    {r.role}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------- 7. Second CTA ---------- */}
      <section className="mx-2 mb-2 rounded-3xl bg-[radial-gradient(120%_140%_at_20%_0%,#0a5340_0%,#04241a_50%,#010f0a_100%)]">
        <div className="mx-auto max-w-[820px] px-5 py-16 text-center sm:px-10 sm:py-20">
          <Reveal>
            <h2 className="text-[clamp(26px,3.2vw,42px)] font-semibold leading-[1.08] tracking-[-0.035em]">
              {cfg.closeHeading}
            </h2>
            <p className="mx-auto mt-4 max-w-[580px] text-[16px] leading-relaxed text-white/65">
              {cfg.closeSub}
            </p>
          </Reveal>
          <Reveal delay={0.05} className="mt-9">
            <Cta cfg={cfg} light />
          </Reveal>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="mx-auto flex max-w-[1100px] flex-col items-center gap-4 px-5 py-10 text-center text-[13px] text-white/45 sm:px-8">
        <Image
          src={asset(LOGO)}
          alt="Rankify®"
          width={186}
          height={40}
          className={`h-[20px] w-auto opacity-60 ${WHITE}`}
        />
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <span>© 2026 Rankify® All rights reserved.</span>
          <Link href="/legal/privacy-policy" className="hover:text-white">
            Privacy Policy
          </Link>
          <Link href="/legal/terms-of-service" className="hover:text-white">
            Terms of Service
          </Link>
        </div>
      </footer>

      <div className="h-24 lg:hidden" />
      <StickyCta href={cfg.ctaHref} label={cfg.ctaLabel} />
    </div>
  );
}
