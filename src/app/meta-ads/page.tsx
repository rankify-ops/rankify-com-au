import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceFaq } from "@/components/service-page/ServiceFaq";
import { Shot } from "@/components/sidekick/Shot";
import { Band, Heading, SidekickCta, SidekickNav } from "@/components/sidekick/SidekickChrome";
import { SIDEKICK_FAQ, SIDEKICK_PLANS, SIDEKICK_STEPS, LEARNING_NOTES } from "@/content/sidekick";

/**
 * Ad Sidekick, sold as its own product.
 *
 * This URL used to be a "coming soon" placeholder for done-for-you Meta
 * management. It keeps the URL because the search intent is an exact match
 * and it already ranks; what it sells is now the product.
 */
export const metadata: Metadata = {
  title: "Ad Sidekick — run your Meta ads without logging into Meta | Rankify",
  description:
    "Upload your ads and Ad Sidekick names them, builds the campaigns, tells you which are working, when to scale and what to turn off. For Shopify brands. From $99/mo, no contract.",
  alternates: { canonical: "/meta-ads" },
};

const DOES = [
  {
    h: "Names and writes every ad",
    b: "Upload the file and it is named to your convention with its copy written. No more ad-3-final-v2.",
  },
  {
    h: "Builds the campaigns",
    b: "Audiences, campaigns and ad sets set up for you, with the right number of ads for your budget.",
  },
  {
    h: "Tells you what is working",
    b: "Which ads to scale, which to turn off, which to leave alone — and when, rather than on a hunch.",
  },
  {
    h: "Keeps every winner",
    b: "Winning ads are kept and analysed, so the next one is built from what already worked.",
  },
  {
    h: "A daily P&L",
    b: "Spend against revenue every day, so you know whether yesterday made money before you spend today.",
  },
  {
    h: "Teaches you as it goes",
    b: "Short notes appear at the moment the thing being explained is on screen, not in a manual nobody opens.",
  },
];

export default function MetaAdsPage() {
  return (
    <>
      <Header />
      <SidekickNav current="overview" />

      {/* ---------- Hero ---------- */}
      <section className="mx-auto max-w-[1400px] px-5 pb-6 pt-6 sm:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--green-text)]/30 bg-[color:var(--green-text)]/10 px-3.5 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.14em] text-[color:var(--green-text)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--green-text)]" />
                Ad Sidekick
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-5 text-[clamp(32px,4.4vw,54px)] font-semibold leading-[1.03] tracking-[-0.04em]">
                Run your Meta ad account{" "}
                <span className="text-[color:var(--green-text)]">without ever logging into Meta.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-[540px] text-[17.5px] leading-relaxed text-grey">
                Upload your ads. It names them, builds the campaigns, and tells you which are
                working, when to raise spend, and what to turn off. For Shopify brands who want
                ads to be easy.
              </p>
            </Reveal>
            <Reveal delay={0.15} className="mt-8">
              <SidekickCta />
              <p className="mt-3.5 text-[13.5px] text-grey">
                From $99/mo. No contract, no exit fee.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Shot alt="The Ad Sidekick dashboard" caption="Every number for the brand, in one place." />
          </Reveal>
        </div>
      </section>

      {/* ---------- The argument ---------- */}
      <Band dark>
        <Heading kicker="Why this exists" dark sub="An agency retainer does not buy ads. It buys the decisions about ads — and those decisions are a system that can be written down. Pay for the system, and the rest of the money goes on actually reaching customers.">
          You are not paying an agency for ads.
          <br />
          You are paying for their system.
        </Heading>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: "Your retainer", v: "whatever you pay now" },
            { k: "Ad Sidekick", v: "$99 – $699/mo" },
            { k: "The difference", v: "goes into ad spend" },
            { k: "To know an ad works", v: "about 3 days" },
          ].map((c) => (
            <div key={c.k} className="rounded-2xl border border-white/12 bg-white/[0.05] p-6">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/50">{c.k}</p>
              <p className="mt-2 text-[20px] font-semibold tracking-[-0.02em]">{c.v}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-[720px] text-[15.5px] leading-relaxed text-white/60">
          The other half of the argument is that you are better placed to run this than an agency
          is. You know the brand and the customer better than they ever will, and you actually
          care whether it works. This is the system, handed to the person with the most at stake.
        </p>
      </Band>

      {/* ---------- What it does ---------- */}
      <Band>
        <Heading kicker="What it does" sub="Every one of these is on every plan, Basic included.">
          The whole job, not a dashboard.
        </Heading>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DOES.map((d, i) => (
            <Reveal key={d.h} delay={i * 0.04}>
              <div className="h-full rounded-2xl border border-line bg-white p-6">
                <h3 className="text-[18px] font-semibold tracking-[-0.02em]">{d.h}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-grey">{d.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* ---------- How it works, short version ---------- */}
      <Band>
        <Heading kicker="How it works" sub="Four steps, and you are in control of all of them. Nothing goes live without you.">
          From an upload to a verdict.
        </Heading>
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {SIDEKICK_STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.05}>
              <div className="flex gap-5">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[color:var(--green-text)] text-[15px] font-bold text-white">
                  {s.n}
                </span>
                <div>
                  <h3 className="text-[19px] font-semibold tracking-[-0.02em]">{s.h}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-grey">{s.b}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10">
          <Link
            href="/meta-ads/how-it-works"
            className="inline-flex items-center gap-2 text-[15px] font-semibold text-[color:var(--green-text)] underline-offset-4 hover:underline"
          >
            Follow one ad all the way through
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h13M12 5.5 18.5 12 12 18.5" />
            </svg>
          </Link>
        </div>
      </Band>

      {/* ---------- It teaches ---------- */}
      <Band dark>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Heading kicker="It teaches, it does not just run" dark sub="Short notes appear while you work, at the moment the thing being explained is on screen. The audience is people learning Meta, and every note has to change what you do next or it does not exist.">
              You will understand your own ads.
            </Heading>
            <ul className="mt-8 grid gap-2.5">
              {LEARNING_NOTES.map((n) => (
                <li key={n} className="flex items-center gap-3 text-[15.5px] text-white/85">
                  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] flex-none text-[color:#3fd8bb]" fill="currentColor">
                    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.8 7.7-5.6 5.6a1 1 0 0 1-1.4 0l-2.6-2.6a1 1 0 1 1 1.4-1.4l1.9 1.9 4.9-4.9a1 1 0 0 1 1.4 1.4Z" />
                  </svg>
                  {n}
                </li>
              ))}
            </ul>
          </div>
          <Shot alt="A Learning Note shown inside the app" caption="Taught at the moment it matters." />
        </div>
      </Band>

      {/* ---------- Plans ---------- */}
      <Band id="pricing">
        <Heading kicker="Pricing" sub="Every plan has the whole core product. Pro adds the creative production, Max adds the automation. People are never charged for — add your whole team.">
          Three plans. No contract.
        </Heading>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {SIDEKICK_PLANS.map((p) => (
            <Reveal key={p.id}>
              <div
                className={`flex h-full flex-col rounded-2xl border p-7 ${
                  p.featured
                    ? "border-[color:var(--green-text)] bg-white shadow-[0_24px_60px_-34px_rgba(0,33,23,0.6)]"
                    : "border-line bg-white"
                }`}
              >
                {p.featured && (
                  <span className="mb-3 self-start rounded-full bg-[color:var(--green-text)] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white">
                    Most pick this
                  </span>
                )}
                <h3 className="text-[20px] font-semibold tracking-[-0.02em]">{p.name}</h3>
                <p className="mt-1 text-[14.5px] text-grey">{p.pitch}</p>
                <p className="mt-5 text-[36px] font-semibold tracking-[-0.04em]">
                  ${p.priceAud}
                  <span className="text-[15px] font-medium text-grey">/mo</span>
                </p>
                <ul className="mt-5 grid gap-2 text-[14.5px] text-grey">
                  <li>{p.brands}</li>
                  <li>{p.creatives}</li>
                  <li>Each extra brand ${p.extraBrandAud}/mo</li>
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-start gap-4">
          <SidekickCta />
          <Link
            href="/meta-ads/pricing"
            className="text-[15px] font-semibold text-[color:var(--green-text)] underline-offset-4 hover:underline"
          >
            See everything each plan includes
          </Link>
        </div>
      </Band>

      <ServiceFaq faq={SIDEKICK_FAQ} />

      {/* ---------- Close ---------- */}
      <Band dark>
        <div className="mx-auto max-w-[720px] text-center">
          <h2 className="text-[clamp(26px,3.2vw,42px)] font-semibold leading-[1.08] tracking-[-0.035em]">
            Stop paying for decisions. Buy the system.
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[16px] leading-relaxed text-white/70">
            No contract, no exit fee, and your whole team included. Turn it off whenever you like.
          </p>
          <div className="mt-8 flex justify-center">
            <SidekickCta light />
          </div>
        </div>
      </Band>

      <ContactFooter />
    </>
  );
}
