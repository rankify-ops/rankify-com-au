import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/basePath";
import { Reveal } from "@/components/ui/Reveal";
import { ScreenshotWall } from "@/components/service-page/ScreenshotWall";
import { CheckItem, TrustRow } from "@/components/service-page/ServiceHero";
import { CaseStudyRow } from "@/components/service-page/CaseStudyRow";
import { PartnerCard } from "@/components/service-page/PartnerCard";
import { DevCard } from "@/components/service-page/DevCard";
import { ServiceFaq } from "@/components/service-page/ServiceFaq";
import { webDesignAndDevelopment as WEB } from "@/content/service-pages/web-design-and-development";
import type { CaseStudyRowBlock, DevCardBlock, PartnerBlock } from "@/content/service-pages/types";
import { LandingPixel, StickyCta } from "@/components/landing/LandingChrome";

/**
 * Paid landing page for the joint Rankify × Adalytical Google Ads offer.
 *
 * Same shape as /free-homepage: headerless, no footer nav, one destination.
 * Different offer, so the sections below the hero are this offer's — the web
 * dev stack sells a $2,999 website build, which is not what's on the table
 * here.
 *
 * `noindex`: built for paid traffic, and it quotes an offer that isn't the
 * standing /google-ads service. `follow` so the legal links still pass.
 */
export const metadata: Metadata = {
  title: "Google Ads Offer | Rankify × Adalytical",
  description:
    "A new landing page, your Google Ads campaigns, the ad copy and the conversion tracking — built first, paid for only if you're happy with it.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/google-ads-offer" },
};

const APPLY = "/google-ads-offer/apply";
const CTA = "See if you qualify";
const LOGO = "/assets/images/ha7iyKKaK8R1V7r8jKPhCa6P74.svg";

const BADGES = [
  "Nothing upfront — see it before you pay",
  "A landing page built to convert",
  "Google Ads campaigns set up and written",
  "Conversion tracking installed and tested",
  "Direct access to the people doing the work",
  "Ex-Google growth team running the ads",
];

/** What actually gets built before any money changes hands. */
const DELIVERABLES = [
  {
    n: "01",
    h: "A brand-new landing page",
    b: "Not your existing site with the ads pointed at it. A page built for one job — turning a click from Google into an enquiry or a booked job.",
  },
  {
    n: "02",
    h: "Your Google Ads campaigns, set up properly",
    b: "Structure, keywords, match types, negatives, bidding, geo — the parts that decide whether your budget buys customers or clicks from people who were never going to call.",
  },
  {
    n: "03",
    h: "The ads themselves, written for you",
    b: "Headlines and descriptions written to match what people actually search when they're ready to spend money, not filler that burns budget on curiosity.",
  },
  {
    n: "04",
    h: "Conversion tracking, installed and tested",
    b: "Calls and form submissions tracked end to end, so you can see which clicks became enquiries. Most accounts we look at are either not tracking this or tracking it wrong.",
  },
];

const STEPS = [
  {
    n: "01",
    h: "Tell us about your business",
    b: "A short form — what you do, where you work, what a good customer is worth to you. It takes a couple of minutes and it tells us whether we can actually help.",
  },
  {
    n: "02",
    h: "We build it",
    b: "If it's a fit, we build the landing page, set up the campaigns, write the ads and install the tracking. You don't pay anything at this stage.",
  },
  {
    n: "03",
    h: "You see it, then you decide",
    b: "We walk you through exactly what we've built. If you're happy with it, we talk about going live. If you're not, we shake hands and you've spent nothing.",
  },
];

const FOR_YOU = [
  "Dental practices",
  "Law firms",
  "Building companies",
  "Trade businesses",
  "Other high-value service businesses",
];

/**
 * Adalytical's half of the offer. Their standing partner block on the web dev
 * page is about *them sending work to Rankify* — here the two are running the
 * same job together, so the framing is written for this page.
 */
const PARTNER: PartnerBlock = {
  type: "partner",
  anchorId: "who-does-the-work",
  kicker: "Who does the work",
  heading: "An ex-Google ads team,",
  headingDim: "and the developer who builds the page they send traffic to.",
  logo: "/assets/logos-web/adalytical-dark.svg",
  name: "Adalytical",
  chips: [
    { label: "Google Ads Partner", icon: "google-ads" },
    { label: "Australia's fastest growing Google Ads business", accent: true },
  ],
  body:
    "Adalytical's founders led growth teams at Google before starting Australia's fastest growing Google Ads business. They run the campaigns. Rankify builds the page those campaigns send people to — which is the half most agencies hand back to you and hope for the best on. Neither part works without the other, so on this offer they're done together.",
  quote:
    "We partner with Rankify when our clients are in need of a new website, Shopify store or landing pages — high-performance builds we know will convert.",
  people: [
    { name: "Jackson Wallace", avatar: "/assets/images/jackson-adalytical.webp" },
    { name: "Jackson Sharp", avatar: "/assets/images/jackson-sharp-adalytical.webp" },
  ],
  peopleRole: "Founders, Adalytical · Ex-Google growth team",
};

/** Tom's card from the web dev page, with its buttons stripped. */
const DEV_CARD = (() => {
  const source = WEB.blocks.find((b): b is DevCardBlock => b.type === "devcard");
  return source ? { ...source, cta: undefined, ctaSecondary: undefined } : undefined;
})();

/** Proof, with the popup CTA repointed and the outbound links dropped. */
const CASE_STUDIES: CaseStudyRowBlock | undefined = (() => {
  const source = WEB.blocks.find((b): b is CaseStudyRowBlock => b.type === "casestudyrow");
  if (!source) return undefined;
  return {
    ...source,
    kicker: "Proof",
    heading: "Built, launched,",
    headingDim: "and still bringing in work.",
    subheading: "Real builds for real businesses. Click one to see what it did.",
    ctaHref: APPLY,
    ctaLabel: CTA,
    hideLiveLinks: true,
    items: source.items
      .filter((i) => !i.placeholder && (i.results?.length || i.quote))
      .map((i) => ({ ...i, label: i.timeline ?? i.label })),
  };
})();

const FAQ = {
  heading: "FAQ.",
  subheading: "The questions worth answering before you fill anything in.",
  items: [
    {
      q: "What's the catch if I don't pay anything upfront?",
      a: "There isn't one, but here's the honest reason we do it. Every ads agency on earth promises results before they've done any work, and you have no way of telling the good ones from the rest until your money's gone. So we've taken that off the table — we build it first, show you exactly what we've made, and you decide from there. It only works because we're selective about who we take on, which is what the form is for.",
    },
    {
      q: "Who actually does the work?",
      a: "Both of us, on the parts we're each good at. Adalytical build and run the Google Ads campaigns — their founders led growth teams at Google before starting the business. Tom at Rankify builds the landing page the ads point at. You deal with the people doing the work, not an account manager relaying messages.",
    },
    {
      q: "Why does the landing page matter if the ads are good?",
      a: "Because the ad only buys you the click. What happens after that — whether the page loads fast, says the right thing, and makes it obvious how to get in touch — decides whether that click becomes a job or a bounce. Running strong campaigns into a weak page is the most common way we see budget wasted, and it's why these two things are being done together rather than by two companies who never speak.",
    },
    {
      q: "Who is this not for?",
      a: "Anyone shopping around for the cheapest option, or a business that isn't ready to spend on ads once the work is done. We're looking for established service businesses that have been meaning to get off referrals for years and finally want it handled properly. If that's not where you're at, it's not the right time and we'd rather say so now.",
    },
  ],
};

/** The one button on this page, in its two colourways. */
function Cta({ light = false }: { light?: boolean }) {
  return (
    <Link
      href={APPLY}
      className={`neu-btn inline-flex items-center justify-center rounded-full px-7 py-3.5 text-center text-[16px] font-bold transition-transform hover:-skew-x-3 ${
        light ? "neu-btn-light bg-white text-ink" : "neu-btn-dark bg-[var(--green-deep)] text-white"
      }`}
    >
      {CTA}
    </Link>
  );
}

function SectionHead({ kicker, heading, dim, sub }: { kicker?: string; heading: string; dim?: string; sub?: string }) {
  return (
    <Reveal className="mx-auto max-w-[820px] text-center">
      {kicker && (
        <p className="mb-3 text-[12.5px] font-semibold uppercase tracking-[0.12em] text-[color:#07a889]">
          {kicker}
        </p>
      )}
      <h2 className="text-[clamp(26px,3vw,40px)] font-medium leading-[1.1] tracking-[-0.035em]">
        {heading}
        {dim && <span className="text-grey"> {dim}</span>}
      </h2>
      {sub && <p className="mt-4 text-[16px] leading-relaxed text-grey">{sub}</p>}
    </Reveal>
  );
}

export default function GoogleAdsOfferPage() {
  return (
    <>
      <LandingPixel />

      {/* Logo only, not a link — there is nowhere to go but the form. */}
      <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-5 pt-7 sm:px-10">
        <Image src={asset(LOGO)} alt="Rankify®" width={186} height={40} priority className="h-[24px] w-auto" />
        <span aria-hidden className="h-5 w-px bg-line" />
        <Image
          src={asset("/assets/logos-web/adalytical-dark.svg")}
          alt="Adalytical"
          width={181}
          height={30}
          priority
          className="h-[22px] w-auto object-contain"
        />
      </div>

      {/* ---------- Hero ---------- */}
      <section className="mx-auto max-w-[1400px] px-5 pb-4 pt-8 sm:px-10 sm:pt-12">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal className="mb-6">
              <TrustRow />
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="text-[clamp(32px,4.2vw,52px)] font-medium leading-[1.03] tracking-[-0.04em]">
                More leads from Google. You don&rsquo;t pay us until you&rsquo;ve seen the work.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-[560px] text-[17px] leading-relaxed text-grey">
                Rankify have partnered with Adalytical to build a small number of service businesses
                a brand-new landing page, set up their Google Ads campaigns, write the ads and
                install the conversion tracking. We build it first and show you exactly what
                we&rsquo;ve made — and only if you&rsquo;re happy with it do you pay.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <ul className="mt-6 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {BADGES.map((b) => (
                  <CheckItem key={b} label={b} />
                ))}
              </ul>
            </Reveal>
            <Reveal id="hero-cta" delay={0.2} className="mt-8">
              <Cta />
              <p className="mt-3.5 text-[13.5px] text-grey">
                Two minutes to tell us about your business. No obligation either way.
              </p>
            </Reveal>
          </div>

          <div className="h-[380px] sm:h-[480px] lg:h-[min(64vh,620px)]">
            <ScreenshotWall set="web" />
          </div>
        </div>
      </section>

      {/* ---------- What gets built ---------- */}
      <section className="mx-2 mt-8 rounded-3xl bg-paper text-ink sm:mt-12 lg:mt-20">
        <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-10 sm:py-16 lg:py-20">
          <SectionHead
            kicker="What you get"
            heading="Four things built for you,"
            dim="before you've paid anything."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {DELIVERABLES.map((d, i) => (
              <Reveal key={d.n} delay={i * 0.05}>
                <div className="neu h-full rounded-2xl border border-line bg-white p-6 sm:p-7">
                  <span className="text-[13px] font-semibold tracking-[0.12em] text-[color:#07a889]">
                    {d.n}
                  </span>
                  <h3 className="mt-3 text-[19px] font-medium tracking-[-0.02em]">{d.h}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-grey">{d.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Risk reversal ---------- */}
      <section className="grain mx-2 mt-8 rounded-3xl bg-[radial-gradient(120%_140%_at_20%_0%,#06382a_0%,var(--green-deep)_45%,#010f0a_100%)] text-white sm:mt-12 lg:mt-20">
        <div className="relative z-[2] mx-auto max-w-[900px] px-5 py-14 text-center sm:px-10 sm:py-20">
          <Reveal>
            <p className="mb-3 text-[12.5px] font-semibold uppercase tracking-[0.12em] text-[color:#07a889]">
              The difference
            </p>
            <h2 className="text-[clamp(28px,3.4vw,44px)] font-medium leading-[1.06] tracking-[-0.035em]">
              You don&rsquo;t pay us upfront.
            </h2>
            <p className="mx-auto mt-5 max-w-[620px] text-[16.5px] leading-relaxed text-white/70">
              Every agency promises results before they&rsquo;ve done a thing, and you find out which
              ones meant it after the money&rsquo;s gone. So we&rsquo;ve taken that off the table. We
              build the landing page and the Google Ads setup first, show you exactly what
              we&rsquo;ve created, and you decide from there.
            </p>
          </Reveal>
          <Reveal delay={0.05} className="mt-8">
            <Cta light />
          </Reveal>
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section className="mx-auto max-w-[1400px] px-5 py-12 sm:px-10 sm:py-16 lg:py-20">
        <SectionHead kicker="How it works" heading="Three steps," dim="and only one of them costs you anything." />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06}>
              <div className="neu h-full rounded-2xl border border-line bg-white p-6 sm:p-7">
                <span className="text-[13px] font-semibold tracking-[0.12em] text-[color:#07a889]">
                  {s.n}
                </span>
                <h3 className="mt-3 text-[19px] font-medium tracking-[-0.02em]">{s.h}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-grey">{s.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Who it's for ---------- */}
      <section className="mx-2 mt-8 rounded-3xl bg-paper text-ink sm:mt-12 lg:mt-20">
        <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-10 sm:py-16 lg:py-20">
          <SectionHead
            kicker="Who this is for"
            heading="Established service businesses"
            dim="that live on enquiries and booked jobs."
          />
          <Reveal delay={0.05} className="mt-9 flex flex-wrap justify-center gap-2.5">
            {FOR_YOU.map((f) => (
              <span
                key={f}
                className="rounded-full border border-line bg-white px-4 py-2 text-[14.5px] font-medium"
              >
                {f}
              </span>
            ))}
          </Reveal>
          <Reveal delay={0.1} className="mx-auto mt-8 max-w-[900px]">
            <p className="rounded-2xl border border-line bg-white px-6 py-5 text-[15px] leading-relaxed text-grey">
              <strong className="font-semibold text-ink">This isn&rsquo;t for tyre kickers.</strong>{" "}
              We&rsquo;re looking for businesses that have been telling themselves for years that they
              need to invest in advertising online and stop relying on referrals. We take on a small
              number at a time, because building it all before anyone pays only works if we&rsquo;re
              choosy about who we do it for.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="mt-9 text-center">
            <Cta />
          </Reveal>
        </div>
      </section>

      {/* ---------- Who does the work ---------- */}
      <PartnerCard block={PARTNER} />
      {DEV_CARD && <DevCard block={DEV_CARD} />}

      {/* ---------- Proof ---------- */}
      {CASE_STUDIES && <CaseStudyRow block={CASE_STUDIES} />}

      <ServiceFaq faq={FAQ} />

      {/* ---------- Final CTA ---------- */}
      <section className="mx-2 mt-8 rounded-3xl bg-[radial-gradient(120%_140%_at_20%_0%,#06382a_0%,var(--green-deep)_45%,#010f0a_100%)] text-white sm:mt-12 lg:mt-20">
        <div className="mx-auto max-w-[820px] px-5 py-16 text-center sm:px-10 sm:py-20">
          <Reveal>
            <h2 className="text-[clamp(26px,3.2vw,42px)] font-medium leading-[1.08] tracking-[-0.035em]">
              Tell us about your business and we&rsquo;ll see if you qualify.
            </h2>
            <p className="mx-auto mt-4 max-w-[580px] text-[16px] leading-relaxed text-white/70">
              A couple of minutes to fill in. If it&rsquo;s a fit, we&rsquo;ll build your landing page
              and your Google Ads setup and show you the lot. If it isn&rsquo;t, we&rsquo;ll tell you
              straight and you haven&rsquo;t lost anything.
            </p>
          </Reveal>
          <Reveal delay={0.05} className="mt-8">
            <Cta light />
            <p className="mt-4 text-[13.5px] text-white/60">Or email us — hello@rankify.com.au</p>
          </Reveal>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-5 py-10 text-[13px] text-grey sm:px-10">
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
      <StickyCta href={APPLY} label={CTA} />
    </>
  );
}
