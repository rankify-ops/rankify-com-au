import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/basePath";
import { Reveal } from "@/components/ui/Reveal";
import { ScreenshotWall } from "@/components/service-page/ScreenshotWall";
import { TrustRow } from "@/components/service-page/ServiceHero";
import { CaseStudyRow } from "@/components/service-page/CaseStudyRow";
import { ComparisonSection } from "@/components/service-page/ComparisonSection";
import { IndustriesSection } from "@/components/service-page/IndustriesSection";
import { CardGridSection } from "@/components/service-page/CardGridSection";
import { GuaranteeSection } from "@/components/service-page/GuaranteeSection";
import { QuoteBand } from "@/components/service-page/QuoteBand";
import { PartnerCard } from "@/components/service-page/PartnerCard";
import { DevCard } from "@/components/service-page/DevCard";
import { webDesignAndDevelopment } from "@/content/service-pages/web-design-and-development";
import type {
  CardGridBlock,
  CaseStudyRowBlock,
  ComparisonBlock,
  DevCardBlock,
  GuaranteeBlock,
  IndustriesBlock,
  PartnerBlock,
  QuoteBlock,
} from "@/content/service-pages/types";
import { LandingFaq, LandingPixel, StickyCta } from "@/components/landing/LandingChrome";

/**
 * Paid landing page for cold Meta traffic. Deliberately not part of the site.
 *
 * No header, no footer nav, no configurator, no forms. Every button goes to
 * one place — /free-homepage/book — because the only thing this page is
 * allowed to ask for is the call.
 *
 * The sections are the real ones from /web-design-and-development rather than
 * cut-down rebuilds of them. Those sections are what the page had to earn its
 * conversions with in the first place, and a landing page is the last place to
 * be showing a thinner version of your best material.
 *
 * `noindex`: it isn't built for search, and left indexable it would compete
 * with /web-design-and-development on the same terms while quoting a
 * different offer. `follow` so the legal links still pass through.
 */
export const metadata: Metadata = {
  title: "Free Homepage Concept | Rankify",
  description:
    "I build 10 free homepage concepts a month. Your brand, real design, no template. See it before you spend a cent on the full build.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/free-homepage" },
};

const BOOK = "/free-homepage/book";
const CTA = "Claim a free homepage";
const LOGO = "/assets/images/ha7iyKKaK8R1V7r8jKPhCa6P74.svg";

const TRUST = ["Built in 7–14 days", "Direct with the developer", "30-day money-back guarantee"];

/** Pulls a block straight off the web dev page so there's one copy to maintain. */
function block<T extends { type: string }>(type: T["type"]): T | undefined {
  return webDesignAndDevelopment.blocks.find((b) => b.type === type) as T | undefined;
}

const DEV_CARD = block<DevCardBlock>("devcard");
const COMPARISON = block<ComparisonBlock>("comparison");
const INDUSTRIES = block<IndustriesBlock>("industries");
const GUARANTEE = block<GuaranteeBlock>("guarantee");
const PARTNER = block<PartnerBlock>("partner");
const NICK = block<QuoteBlock>("quote");

/**
 * The case studies, with the popup's CTA repointed at the booking page and the
 * outbound "visit the site" links dropped, so the one-destination rule holds.
 * The popup itself is not an exit — closing it returns the visitor to exactly
 * where they were, which is why it's allowed here at all.
 */
const CASE_STUDIES: CaseStudyRowBlock | undefined = (() => {
  const source = block<CaseStudyRowBlock>("casestudyrow");
  if (!source) return undefined;
  return {
    ...source,
    ctaHref: BOOK,
    ctaLabel: CTA,
    hideLiveLinks: true,
    // The chip carries the headline result rather than "See results" — the
    // number is what earns the click.
    items: source.items
      .filter((i) => !i.placeholder && (i.results?.length || i.quote))
      .map((i) => ({ ...i, label: i.timeline ?? i.label })),
  };
})();

/**
 * The build process, with two edits for this page: step one points at the call
 * instead of the configurator, which doesn't exist here, and the last step's
 * button is dropped because it went to a second destination.
 */
const PROCESS: CardGridBlock | undefined = (() => {
  const source = webDesignAndDevelopment.blocks.find(
    (b): b is CardGridBlock => b.type === "cardgrid" && b.anchorId === "build-process",
  );
  if (!source) return undefined;
  return {
    ...source,
    cta: undefined,
    items: source.items.map((item) =>
      item.idx === "01"
        ? {
            ...item,
            title: "Book the call",
            desc: "Fifteen minutes to hear about your business, what you offer and who you're trying to reach. I'll tell you straight whether I can help. If it's a fit, I build your homepage from there — no pressure and no pitch.",
            cta: undefined,
          }
        : { ...item, cta: undefined },
    ),
  };
})();

const OFFER_STEPS = [
  {
    n: "01",
    h: "Book a 15-minute call",
    b: "Tell me about your business, what you do, and who you’re trying to reach. That’s it. I’m not going to pitch you.",
  },
  {
    n: "02",
    h: "I build your homepage",
    b: "Your brand, your services, real design. Not a mockup and not a template with your logo dropped in. You’ll have it within a few days.",
  },
  {
    n: "03",
    h: "You decide",
    b: "Like what you see? We talk about the full site — $2,999, up to 10 pages, live in 7–14 days. Not for you? No hard feelings, and you haven’t spent a cent to find out.",
  },
];

const FAQ = [
  {
    q: "What’s the catch with the free homepage?",
    a: "There isn’t one, but I’ll be straight with you about why I do it. Most people stall on a website because they can’t picture it. If I show you the real thing first, that goes away — and if you like the work, you’ll probably want the rest of it built. If you don’t, I’ve spent a bit of time and learned something about your industry. I’m comfortable with that trade.",
  },
  {
    q: "What does the full website cost?",
    a: "$2,999. That’s the price whether you need one page or ten — ten pages are included, and every page after that is $200. Build time is 7–14 days from the day the design is signed off. Larger projects with custom functionality are quoted separately, but you’ll always have the number before any work starts.",
  },
  {
    q: "Do you work with businesses outside the Gold Coast?",
    a: "Yes. I’m on the Gold Coast and I work with businesses right across Australia. Everything runs over calls and email, and it hasn’t been a problem yet.",
  },
];

/** The one button on this page. */
function Cta() {
  return (
    <Link
      href={BOOK}
      className="neu-btn neu-btn-dark inline-flex items-center justify-center gap-2.5 rounded-full bg-[var(--green-deep)] px-7 py-3.5 text-center text-[16px] font-bold text-white transition-transform hover:-skew-x-3"
    >
      {CTA}
      <span className="relative flex h-2 w-2 items-center justify-center">
        <span className="cta-ping absolute inline-flex h-full w-full rounded-full bg-[#07a889]" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#07a889]" />
      </span>
    </Link>
  );
}

export default function FreeHomepagePage() {
  return (
    <>
      <LandingPixel />

      {/* Logo only, and deliberately not a link — the whole point of this page
          is that there is nowhere to go except the call. */}
      <div className="mx-auto flex max-w-[1400px] items-center px-5 pt-7 sm:px-10">
        <Image src={asset(LOGO)} alt="Rankify®" width={186} height={40} priority className="h-[24px] w-auto" />
      </div>

      {/* ---------- Hero ---------- */}
      <section className="mx-auto max-w-[1400px] px-5 pb-4 pt-8 sm:px-10 sm:pt-12">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            {/* Above the headline, same as the web dev page: the faces and the
                client count do more for a cold visitor than anything written
                below them. */}
            <Reveal className="mb-6">
              <TrustRow />
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="text-[clamp(32px,4.2vw,52px)] font-medium leading-[1.03] tracking-[-0.04em]">
                Want to see what your new website would look like before you pay for it?
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-[560px] text-[17px] leading-relaxed text-grey">
                I build 10 free homepage concepts a month. Your brand, real design, no template. If you
                like it, we talk about the full build. If you don&rsquo;t, no hard feelings — and you
                haven&rsquo;t spent a cent to find out.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              {/* The separator trails each item as an ::after rather than
                  leading the next one — leading it puts a stray bar at the
                  start of the wrapped line at 390px. */}
              <ul className="mt-6 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13.5px] font-medium text-ink">
                {TRUST.map((t) => (
                  <li
                    key={t}
                    className="after:ml-2.5 after:text-line after:content-['|'] last:after:content-none"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal id="hero-cta" delay={0.2} className="mt-8">
              <Cta />
              <p className="mt-3.5 text-[13.5px] text-grey">15-minute call. No pressure, no pitch deck.</p>
            </Reveal>
          </div>

          <div className="h-[380px] sm:h-[480px] lg:h-[min(64vh,620px)]">
            <ScreenshotWall set="web" />
          </div>
        </div>
      </section>

      {/* ---------- Your developer ---------- */}
      {DEV_CARD && <DevCard block={{ ...DEV_CARD, cta: undefined, ctaSecondary: undefined }} />}

      {/* ---------- Proof ---------- */}
      {CASE_STUDIES && <CaseStudyRow block={CASE_STUDIES} />}
      {NICK && <QuoteBand block={NICK} />}

      {/* ---------- The offer ---------- */}
      <section className="mx-2 mt-8 rounded-3xl bg-paper text-ink sm:mt-12 lg:mt-20">
        <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-10 sm:py-16 lg:py-20">
          <Reveal className="mx-auto max-w-[760px] text-center">
            <p className="mb-3 text-[12.5px] font-semibold uppercase tracking-[0.12em] text-[color:#07a889]">
              The offer
            </p>
            <h2 className="text-[clamp(26px,3vw,40px)] font-medium leading-[1.1] tracking-[-0.035em]">
              How the free homepage works.
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-grey">
              Most people aren&rsquo;t unsure about the price. They&rsquo;re unsure what it&rsquo;ll look
              like. Fair enough — so I&rsquo;ll show you first.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {OFFER_STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.06}>
                <div className="neu h-full rounded-2xl border border-line bg-white p-6 sm:p-7">
                  <span className="text-[13px] font-semibold tracking-[0.12em] text-[color:#07a889]">
                    {s.n}
                  </span>
                  <h3 className="mt-3 text-[18px] font-medium tracking-[-0.02em]">{s.h}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-grey">{s.b}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} className="mx-auto mt-6 max-w-[900px]">
            <p className="rounded-2xl border border-line bg-white px-6 py-5 text-[14.5px] leading-relaxed text-grey">
              <strong className="font-semibold text-ink">Who this is for:</strong> established Australian
              businesses with a website that isn&rsquo;t pulling its weight, or a launch date already set.
              Ten slots a month is what I can actually build properly, so I&rsquo;d rather give them to
              people who are genuinely ready.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-9 text-center">
            <Cta />
          </Reveal>
        </div>
      </section>

      {/* ---------- Who it's for ---------- */}
      {INDUSTRIES && <IndustriesSection block={INDUSTRIES} />}

      {/* ---------- How the build works ---------- */}
      {PROCESS && <CardGridSection block={PROCESS} />}

      {/* ---------- Developer vs agency ---------- */}
      {COMPARISON && <ComparisonSection block={COMPARISON} />}

      {/* ---------- Who trusts the work ---------- */}
      {PARTNER && <PartnerCard block={PARTNER} />}

      {/* ---------- Guarantee ---------- */}
      {GUARANTEE && <GuaranteeSection block={GUARANTEE} />}

      {/* ---------- FAQ ---------- */}
      <section className="mx-auto max-w-[1400px] px-5 py-12 sm:px-10 sm:py-16 lg:py-20">
        <Reveal className="mx-auto max-w-[760px] text-center">
          <h2 className="text-[clamp(26px,3vw,40px)] font-medium leading-[1.1] tracking-[-0.035em]">
            Questions, answered straight.
          </h2>
        </Reveal>
        <div className="mt-10">
          <LandingFaq items={FAQ} />
        </div>
      </section>

      {/* ---------- Final CTA ---------- */}
      <section className="mx-2 rounded-3xl bg-[radial-gradient(120%_140%_at_20%_0%,#06382a_0%,var(--green-deep)_45%,#010f0a_100%)] text-white">
        <div className="mx-auto max-w-[820px] px-5 py-16 text-center sm:px-10 sm:py-20">
          <Reveal>
            <h2 className="text-[clamp(26px,3.2vw,42px)] font-medium leading-[1.08] tracking-[-0.035em]">
              Ten slots a month. Let&rsquo;s see if one&rsquo;s yours.
            </h2>
            <p className="mx-auto mt-4 max-w-[560px] text-[16px] leading-relaxed text-white/70">
              Book a 15-minute call and tell me about your business. If it&rsquo;s a fit I&rsquo;ll build
              your homepage. If it isn&rsquo;t, I&rsquo;ll tell you that on the call and you
              haven&rsquo;t lost anything.
            </p>
          </Reveal>
          <Reveal delay={0.05} className="mt-8">
            <Link
              href={BOOK}
              className="neu-btn neu-btn-light inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-[16px] font-bold text-ink transition-transform hover:-skew-x-3"
            >
              {CTA}
            </Link>
            <p className="mt-4 text-[13.5px] text-white/60">Or email me directly — hello@rankify.com.au</p>
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

      {/* Clearance so the sticky bar never sits over the footer's last line. */}
      <div className="h-20 lg:hidden" />
      <StickyCta href={BOOK} label={CTA} />
    </>
  );
}
