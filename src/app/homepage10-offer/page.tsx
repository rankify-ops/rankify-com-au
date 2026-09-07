import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { asset } from "@/lib/basePath";
import { Reveal } from "@/components/ui/Reveal";
import { LandingFaq, LandingPixel, StickyCta } from "@/components/landing/LandingChrome";

/**
 * VSL-style offer page, structured after the unorthodox.digital reference:
 * one long column, a big claim, the video, then a repeating rhythm of
 * section heading → proof panel → the same button again.
 *
 * The structure is the reference's; the copy is ours. Sections marked
 * `Placeholder` are deliberately unfinished — they need a real graphic or real
 * numbers, and inventing either on a page that takes paid traffic is how you
 * end up defending a claim you can't back.
 *
 * Headerless with one destination, same as the other landing pages.
 */
export const metadata: Metadata = {
  title: "Free Homepage in 7 Days | Rankify",
  description:
    "We build your new homepage first and deliver it in under 7 days. See it before you pay a cent.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/homepage10-offer" },
};

const BOOK = "/free-homepage/book";
const CTA_LABEL = "Get My Free Home Page";
const CTA_MICRO = "Delivered in under 7 days.";
const LOGO = "/assets/images/ha7iyKKaK8R1V7r8jKPhCa6P74.svg";

const BUILD_LIST = [
  "A brand-new homepage, designed around your business",
  "Written copy that speaks to the customer you actually want",
  "Built mobile-first, fast, and ready to rank",
  "Your enquiry form or booking flow wired up and working",
  "Delivered in under 7 days, before you pay anything",
];

const FAQ = [
  { q: "How much does it cost?", a: "PLACEHOLDER — confirm the price and what it covers." },
  {
    q: "How long does this take?",
    a: "Under 7 days from the day we have what we need from you — your logo, your services, and a few minutes on a call to hear what the site has to do.",
  },
  { q: "What's the catch?", a: "PLACEHOLDER — the honest reason for building first." },
  { q: "Why should I trust you?", a: "PLACEHOLDER — proof points, client count, guarantee." },
  { q: "What results can I expect?", a: "PLACEHOLDER — needs real numbers, not estimates." },
  { q: "Do I own everything you build?", a: "PLACEHOLDER — confirm ownership terms." },
  { q: "Will this work for my industry?", a: "PLACEHOLDER — industries served." },
  { q: "What if I don't like it?", a: "PLACEHOLDER — confirm the refund / walk-away terms." },
];

/** The one button, repeated down the page with its delivery promise under it. */
function Cta({ light = false }: { light?: boolean }) {
  return (
    <div className="text-center">
      <Link
        href={BOOK}
        className={`neu-btn inline-flex w-full items-center justify-center rounded-full px-8 py-4 text-center text-[17px] font-bold transition-transform hover:-skew-x-3 sm:w-auto ${
          light ? "neu-btn-light bg-white text-ink" : "neu-btn-dark bg-[var(--green-deep)] text-white"
        }`}
      >
        {CTA_LABEL}
      </Link>
      <p className={`mt-3 text-[14px] font-medium ${light ? "text-white/70" : "text-grey"}`}>
        {CTA_MICRO}
      </p>
    </div>
  );
}

/** Big centred section heading, in the reference's voice. */
function Head({ children }: { children: ReactNode }) {
  return (
    <Reveal>
      <h2 className="mx-auto max-w-[900px] text-center text-[clamp(28px,3.6vw,46px)] font-semibold leading-[1.08] tracking-[-0.035em]">
        {children}
      </h2>
    </Reveal>
  );
}

/**
 * Stands in for the graphics the reference uses in most of its sections.
 * Deliberately obvious — a polished empty box gets shipped by accident.
 */
function Placeholder({ label, ratio = "16 / 9" }: { label: string; ratio?: string }) {
  return (
    <Reveal scale className="mx-auto mt-8 w-full max-w-[900px]">
      <div
        style={{ aspectRatio: ratio }}
        className="flex w-full items-center justify-center rounded-2xl border-2 border-dashed border-line bg-white/60 px-6 text-center"
      >
        <span className="text-[13.5px] font-medium uppercase tracking-[0.12em] text-grey">
          {label}
        </span>
      </div>
    </Reveal>
  );
}

function Section({ children, paper = false }: { children: ReactNode; paper?: boolean }) {
  return (
    <section className={`mx-2 mt-8 rounded-3xl sm:mt-12 lg:mt-16 ${paper ? "bg-paper" : ""}`}>
      <div className="mx-auto max-w-[1100px] px-5 py-12 sm:px-10 sm:py-16">{children}</div>
    </section>
  );
}

export default function Homepage10OfferPage() {
  return (
    <>
      <LandingPixel />

      <div className="mx-auto flex max-w-[1100px] items-center px-5 pt-7 sm:px-10">
        <Image src={asset(LOGO)} alt="Rankify®" width={186} height={40} priority className="h-[24px] w-auto" />
      </div>

      {/* ---------- Hero ---------- */}
      <section className="mx-auto max-w-[1100px] px-5 pt-8 text-center sm:px-10 sm:pt-12">
        <Reveal>
          <h1 className="mx-auto max-w-[960px] text-[clamp(32px,5vw,60px)] font-semibold leading-[1.03] tracking-[-0.04em]">
            Get a brand-new homepage built for your business — free, and in your hands in under 7
            days.
          </h1>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mx-auto mt-5 max-w-[720px] text-[17px] leading-relaxed text-grey sm:text-[18px]">
            If you run a service business and your website isn&rsquo;t bringing you work, this is for
            you. We build it first. You only pay if you want to keep going.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-10 text-[clamp(22px,2.6vw,32px)] font-semibold tracking-[-0.03em]">
            This is what we&rsquo;ll build for you
          </h2>
        </Reveal>

        {/* Video — placeholder until the VSL is recorded. */}
        <Reveal scale delay={0.15} className="mx-auto mt-7 w-full max-w-[860px]">
          <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-line bg-[#101010]">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90">
              <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6" fill="var(--green-deep)">
                <path d="M8 5.5v13l11-6.5z" />
              </svg>
            </span>
            <span className="absolute bottom-5 text-[13px] font-medium uppercase tracking-[0.12em] text-white/50">
              VSL video goes here
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mt-8">
          <Cta />
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-6 text-[15px] font-medium italic text-grey">
            No tech knowledge needed. We handle the lot.*
          </p>
        </Reveal>
      </section>

      {/* ---------- What's included ---------- */}
      <Section paper>
        <Head>Everything that comes with it</Head>
        <Reveal delay={0.05} className="mx-auto mt-8 grid max-w-[820px] gap-3">
          {BUILD_LIST.map((b) => (
            <p
              key={b}
              className="flex items-start gap-3 rounded-2xl border border-line bg-white px-5 py-4 text-[15.5px] leading-snug"
            >
              <span className="mt-[3px] flex h-[18px] w-[18px] flex-none items-center justify-center rounded-full bg-[var(--green-mid)]">
                <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </span>
              {b}
            </p>
          ))}
        </Reveal>
        <div className="mt-10">
          <Cta />
        </div>
      </Section>

      {/* ---------- Process ---------- */}
      <Section>
        <Head>Our simple A–Z process:</Head>
        <Placeholder label="Process graphic — the A to Z steps" ratio="16 / 7" />
        <div className="mt-10">
          <Cta />
        </div>
      </Section>

      {/* ---------- Packages ---------- */}
      <Section paper>
        <Head>What you get free vs. the full build:</Head>
        <Placeholder label="Comparison table — free homepage vs. full website" ratio="16 / 9" />
        <div className="mt-10">
          <Cta />
        </div>
      </Section>

      {/* ---------- Reviews ---------- */}
      <Section>
        <Head>
          We&rsquo;ve built 100+ websites.
          <span className="block text-grey">Read our reviews:</span>
        </Head>
        <Placeholder label="Review wall — screenshots or cards" ratio="16 / 10" />
        <div className="mt-10">
          <Cta />
        </div>
      </Section>

      {/* ---------- Results ---------- */}
      <Section paper>
        <Head>The results these sites deliver:</Head>
        <Placeholder label="Results graphics — real client numbers" ratio="16 / 9" />
        <Reveal delay={0.05}>
          <p className="mt-6 text-center text-[14px] italic text-grey">
            These are real numbers from real clients we built sites for.*
          </p>
        </Reveal>
        <div className="mt-10">
          <Cta />
        </div>
      </Section>

      {/* ---------- Qualifier ---------- */}
      <Section>
        <Head>How do you know if this will work for you?</Head>
        <Placeholder label="Qualifier graphic — who this suits and who it doesn't" ratio="16 / 9" />
        <div className="mt-10">
          <Cta />
        </div>
      </Section>

      {/* ---------- Guarantee ---------- */}
      <section className="grain mx-2 mt-8 rounded-3xl bg-[radial-gradient(120%_140%_at_20%_0%,#06382a_0%,var(--green-deep)_45%,#010f0a_100%)] text-white sm:mt-12 lg:mt-16">
        <div className="relative z-[2] mx-auto max-w-[1100px] px-5 py-14 sm:px-10 sm:py-16">
          <Reveal>
            <h2 className="mx-auto max-w-[900px] text-center text-[clamp(26px,3.4vw,42px)] font-semibold leading-[1.08] tracking-[-0.035em]">
              If we don&rsquo;t think we can help you, we&rsquo;ll tell you before we start.*
            </h2>
            <p className="mx-auto mt-5 max-w-[640px] text-center text-[16.5px] leading-relaxed text-white/70">
              PLACEHOLDER — the guarantee wording goes here. What&rsquo;s covered, for how long, and
              what happens if they&rsquo;re not happy.
            </p>
          </Reveal>
          <div className="mt-9">
            <Cta light />
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <Section paper>
        <Head>Answering your questions:</Head>
        <div className="mt-9">
          <LandingFaq items={FAQ} />
        </div>
        <div className="mt-10">
          <Cta />
        </div>
      </Section>

      {/* ---------- Footer ---------- */}
      <footer className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-4 px-5 py-10 text-[13px] text-grey sm:px-10">
        <Image src={asset(LOGO)} alt="Rankify®" width={186} height={40} className="h-[20px] w-auto opacity-60" />
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <span>© 2026 Rankify® All rights reserved.</span>
          <Link href="/legal/privacy-policy" className="hover:text-ink">
            Privacy Policy
          </Link>
          <Link href="/legal/terms-of-service" className="hover:text-ink">
            Terms of Service
          </Link>
        </div>
      </footer>

      <div className="h-20 lg:hidden" />
      <StickyCta href={BOOK} label={CTA_LABEL} />
    </>
  );
}
