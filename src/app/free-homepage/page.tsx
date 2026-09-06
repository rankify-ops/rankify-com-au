import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/basePath";
import { Reveal } from "@/components/ui/Reveal";
import { ScreenshotWall } from "@/components/service-page/ScreenshotWall";
import { CheckItem, TrustRow } from "@/components/service-page/ServiceHero";
import { ServiceBlocks } from "@/components/templates/ServicePageTemplate";
import { ServiceFaq } from "@/components/service-page/ServiceFaq";
import { webDesignAndDevelopment as WEB } from "@/content/service-pages/web-design-and-development";
import type { Block, CaseStudyRowBlock } from "@/content/service-pages/types";
import { LandingPixel, StickyCta } from "@/components/landing/LandingChrome";

/**
 * Paid landing page for cold Meta traffic. Deliberately not part of the site.
 *
 * Below the hero it renders the *same* block stack as
 * /web-design-and-development, in the same order, through the same renderer —
 * not a rebuilt approximation of it. Those sections are what that page earns
 * its conversions with, and a landing page is the last place to be showing a
 * thinner version of your best material.
 *
 * Three deliberate differences, all the same rule: this page gets exactly one
 * destination.
 *   - no header, and no nav in the footer
 *   - the configurator is replaced by a CTA band, because a Stripe checkout is
 *     a second conversion path and this offer is a conversation
 *   - every button on the page is "Claim a free homepage" → /free-homepage/book
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

/**
 * The web dev hero's four badges plus the two this offer turns on: the
 * turnaround, and the free homepage itself. Each picks up its own icon from
 * BADGE_ICONS — six identical ticks read as one block and get skimmed.
 */
const BADGES = [
  "Try before you buy — free homepage build",
  "Built in 7–14 days",
  "Custom-built, conversion-focused",
  "Direct developer access, no middlemen",
  "Unlimited revisions",
  "30-day money-back guarantee",
];

/**
 * Strips or repoints anything in a block that would send the visitor somewhere
 * other than the booking page.
 *
 * The case study popups still work — a popup isn't an exit, it opens over the
 * page and closing it puts the visitor back where they were — but its CTA is
 * repointed and the outbound "visit the site" links are dropped.
 */
function forLanding(b: Block): Block {
  switch (b.type) {
    case "casestudyrow": {
      const row = b as CaseStudyRowBlock;
      return {
        ...row,
        ctaHref: BOOK,
        ctaLabel: CTA,
        hideLiveLinks: true,
        // The chip carries the headline result rather than "See results" — the
        // number is what earns the click.
        items: row.items
          .filter((i) => !i.placeholder && (i.results?.length || i.quote))
          .map((i) => ({ ...i, label: i.timeline ?? i.label })),
      };
    }
    case "devcard":
      return { ...b, cta: undefined, ctaSecondary: undefined };
    case "cardgrid":
      return { ...b, cta: undefined, items: b.items.map((i) => ({ ...i, cta: undefined })) };
    default:
      return b;
  }
}

/**
 * The web dev stack, split where the configurator sits so the CTA band can take
 * its place. Everything either side keeps its original order.
 */
const CONFIGURATOR_AT = WEB.blocks.findIndex((b) => b.type === "configurator");
const BEFORE = WEB.blocks.slice(0, CONFIGURATOR_AT).map(forLanding);
const AFTER = WEB.blocks.slice(CONFIGURATOR_AT + 1).map(forLanding);

/** The offer's own questions first, then the full web dev set. */
const FAQ = {
  ...WEB.faq,
  items: [
    {
      q: "What’s the catch with the free homepage?",
      a: "There isn’t one, but I’ll be straight with you about why I do it. Most people stall on a website because they can’t picture it. If I show you the real thing first, that goes away — and if you like the work, you’ll probably want the rest of it built. If you don’t, I’ve spent a bit of time and learned something about your industry. I’m comfortable with that trade.",
    },
    {
      q: "How many free homepages do you build?",
      a: "Ten a month. That’s what I can build properly while still delivering for paying clients, so I’d rather give the slots to businesses that are genuinely ready — an established business with a site that isn’t pulling its weight, or a launch date already set.",
    },
    ...WEB.faq.items,
  ],
};

/** The one button on this page, in its two colourways. */
function Cta({ light = false }: { light?: boolean }) {
  return (
    <Link
      href={BOOK}
      className={`neu-btn inline-flex items-center justify-center rounded-full px-7 py-3.5 text-center text-[16px] font-bold transition-transform hover:-skew-x-3 ${
        light ? "neu-btn-light bg-white text-ink" : "neu-btn-dark bg-[var(--green-deep)] text-white"
      }`}
    >
      {CTA}
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
                High-performance websites that actually convert traffic to drive real profit and
                growth to your business.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-[560px] text-[17px] leading-relaxed text-grey">
                From all trades — plumbers, builders, solar — to tech and accounting firms.
                I&rsquo;ve built the lot. I&rsquo;m a perfectionist, not a single pixel out of line,
                and I build so your traffic actually calls you or buys your product. Check out my
                work and results.
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
              <p className="mt-3.5 text-[13.5px] text-grey">15-minute call. No pressure, no pitch deck.</p>
            </Reveal>
          </div>

          <div className="h-[380px] sm:h-[480px] lg:h-[min(64vh,620px)]">
            <ScreenshotWall set="web" />
          </div>
        </div>
      </section>

      {/* Everything from the web dev page, up to where the configurator sits. */}
      <ServiceBlocks blocks={BEFORE} />

      {/* ---------- The offer, in the configurator's place ---------- */}
      <section
        id="the-offer"
        className="grain mx-2 mt-8 scroll-mt-24 rounded-3xl bg-[radial-gradient(120%_140%_at_20%_0%,#06382a_0%,var(--green-deep)_45%,#010f0a_100%)] text-white sm:mt-12 lg:mt-20"
      >
        <div className="relative z-[2] mx-auto max-w-[1400px] px-5 py-12 text-center sm:px-10 sm:py-16 lg:py-20">
          <Reveal className="mx-auto max-w-[760px]">
            <p className="mb-3 text-[12.5px] font-semibold uppercase tracking-[0.12em] text-[color:#07a889]">
              The offer
            </p>
            <h2 className="text-[clamp(26px,3.2vw,42px)] font-medium leading-[1.08] tracking-[-0.035em]">
              See your homepage before you spend a cent.
            </h2>
            <p className="mx-auto mt-4 max-w-[600px] text-[16px] leading-relaxed text-white/70">
              Most people aren&rsquo;t unsure about the price. They&rsquo;re unsure what it&rsquo;ll
              look like. So I build ten free homepage concepts a month — your brand, real design, no
              template. Like it and we talk about the full site. Don&rsquo;t, and there&rsquo;s no
              hard feelings and nothing spent.
            </p>
          </Reveal>
          <Reveal delay={0.05} className="mt-8">
            <Cta light />
            <p className="mt-4 text-[13.5px] text-white/60">
              15-minute call. No pressure, no pitch deck.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ...and everything after it. */}
      <ServiceBlocks blocks={AFTER} />

      <ServiceFaq faq={FAQ} />

      {/* ---------- Final CTA ---------- */}
      <section className="mx-2 mt-8 rounded-3xl bg-[radial-gradient(120%_140%_at_20%_0%,#06382a_0%,var(--green-deep)_45%,#010f0a_100%)] text-white sm:mt-12 lg:mt-20">
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
            <Cta light />
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
