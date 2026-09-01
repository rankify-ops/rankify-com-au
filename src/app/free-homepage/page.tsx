import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { asset } from "@/lib/basePath";
import { Reveal } from "@/components/ui/Reveal";
import { Stars } from "@/components/ui/Stars";
import { ScreenshotWall } from "@/components/service-page/ScreenshotWall";
import { CaseStudyRow } from "@/components/service-page/CaseStudyRow";
import { webDesignAndDevelopment } from "@/content/service-pages/web-design-and-development";
import type { CaseStudyRowBlock } from "@/content/service-pages/types";
import { LandingFaq, LandingPixel, StickyCta } from "@/components/landing/LandingChrome";

/**
 * Paid landing page for cold Meta traffic. Deliberately not part of the site.
 *
 * No header, no footer nav, no configurator, no forms. Every button goes to
 * one place — /free-homepage/book — because the only thing this page is
 * allowed to ask for is the call.
 *
 * `noindex`: it isn't built for search, and left indexable it would compete
 * with /web-design-and-development on the same terms while quoting a
 * different offer. `follow` so the legal links still pass through.
 */
export const metadata: Metadata = {
  title: "Free Homepage Concept | Rankify",
  description:
    "I build 10 free homepage concepts a month. Your brand, real design, no template. If you like it we talk about the full build — if not, keep it.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/free-homepage" },
};

const BOOK = "/free-homepage/book";
const CTA = "Claim a free homepage";
const LOGO = "/assets/images/ha7iyKKaK8R1V7r8jKPhCa6P74.svg";

const TRUST = ["Built in 7–14 days", "Direct with the developer", "30-day money-back guarantee"];

/**
 * The same case studies the web dev page uses, so there is one place to edit
 * a client result rather than two that drift.
 *
 * A logo in a box with no name, no number and no click was proof of nothing —
 * these open their results over the page. The popup is not an exit: closing it
 * puts the visitor back exactly where they were, which is why it is allowed
 * here at all. Its CTA is repointed at the booking page and the outbound
 * "visit the site" links are dropped, so the one-destination rule holds.
 *
 * Adalytical is filtered out — it has its own section further down — and so is
 * anything without results, because a "Coming soon" card on a page you are
 * paying to send traffic to is worse than one card fewer.
 */
const CASE_STUDIES: CaseStudyRowBlock = (() => {
  const source = webDesignAndDevelopment.blocks.find(
    (b): b is CaseStudyRowBlock => b.type === "casestudyrow",
  );
  return {
    type: "casestudyrow",
    heading: "Built, launched,",
    headingDim: "and still bringing in work.",
    subheading: "Real builds for real businesses. Click one to see what it did.",
    ctaHref: BOOK,
    ctaLabel: CTA,
    hideLiveLinks: true,
    items: (source?.items ?? [])
      .filter((i) => i.name !== "Adalytical" && !i.placeholder && (i.results?.length || i.quote))
      // The chip is the headline result rather than "See results" — the number
      // is what earns the click, and the subheading already says they open.
      .map((i) => ({ ...i, label: i.timeline ?? i.label })),
  };
})();

const STEPS = [
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
    b: "Like it? We talk about the full site — $2,999, up to 10 pages, live in 7–14 days. Don’t like it? Keep the homepage anyway and we shake hands.",
  },
];

const COMPARISON = [
  { label: "Who you talk to", agency: "Account managers, juniors, whoever", rankify: "Just the developer" },
  { label: "Timeline", agency: "2–4 months", rankify: "7–14 days" },
  { label: "Build cost", agency: "$20k–$40k+", rankify: "$2,999" },
  { label: "Ongoing cost per year", agency: "$2,000–$7,000+", rankify: "$0" },
];

const GUARANTEE = [
  "Unlimited revisions, submitted in two rounds",
  "Fixed price agreed before a line is written",
  "No lock-in contract, cancel any time",
];

const FAQ = [
  {
    q: "What’s the catch with the free homepage?",
    a: "There isn’t one, but I’ll be straight with you about why I do it. Most people stall on a website because they can’t picture it. If I show you first, that goes away — and if you like the work, you’ll probably want the rest of it. If you don’t, I’ve lost a bit of time and you’ve got a free homepage. I’m comfortable with that trade.",
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

/** The one button on this page, in its two sizes. */
function Cta({ size = "lg" }: { size?: "lg" | "md" }) {
  return (
    <Link
      href={BOOK}
      className={`neu-btn neu-btn-dark inline-flex items-center justify-center gap-2.5 rounded-full bg-[var(--green-deep)] text-center font-bold text-white transition-transform hover:-skew-x-3 ${
        size === "lg" ? "px-7 py-3.5 text-[16px]" : "px-6 py-3 text-[15px]"
      }`}
    >
      {CTA}
      <span className="relative flex h-2 w-2 items-center justify-center">
        <span className="cta-ping absolute inline-flex h-full w-full rounded-full bg-[#07a889]" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#07a889]" />
      </span>
    </Link>
  );
}

function SectionHead({ children, sub }: { children: ReactNode; sub?: string }) {
  return (
    <Reveal className="mx-auto max-w-[760px] text-center">
      <h2 className="text-[clamp(26px,3vw,40px)] font-medium leading-[1.1] tracking-[-0.035em]">
        {children}
      </h2>
      {sub && <p className="mt-4 text-[16px] leading-relaxed text-grey">{sub}</p>}
    </Reveal>
  );
}

export default function FreeHomepagePage() {
  return (
    <>
      <LandingPixel />

      {/* Logo only, and deliberately not a link — the whole point of this page
          is that there is nowhere to go except the call. */}
      <div className="mx-auto flex max-w-[1200px] items-center px-5 pt-7 sm:px-10">
        <Image src={asset(LOGO)} alt="Rankify®" width={186} height={40} priority className="h-[24px] w-auto" />
      </div>

      {/* ---------- 1. Hero ---------- */}
      <section className="mx-auto max-w-[1200px] px-5 pb-4 pt-10 sm:px-10 sm:pt-14">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <h1 className="text-[clamp(32px,4.2vw,52px)] font-medium leading-[1.03] tracking-[-0.04em]">
                Want to see what your new website would look like before you pay for it?
              </h1>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-5 max-w-[560px] text-[17px] leading-relaxed text-grey">
                I build 10 free homepage concepts a month. Your brand, real design, no template. If you
                like it, we talk about the full build. If you don&rsquo;t, keep it and we shake hands.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              {/* The separator trails each item as an ::after rather than
                  leading the next one. Leading it puts a stray bar at the
                  start of the wrapped line — which is exactly what this list
                  does at 390px, where it breaks after the second item. */}
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
            <Reveal id="hero-cta" delay={0.15} className="mt-8">
              <Cta />
              <p className="mt-3.5 text-[13.5px] text-grey">15-minute call. No pressure, no pitch deck.</p>
            </Reveal>
          </div>

          {/* The same drifting wall the web dev page uses. A single static
              screenshot read as one arbitrary phone; fifteen of them moving
              says "I have built a lot of these" before a word is read, which
              is the job this half of the hero is doing. */}
          <div className="h-[380px] sm:h-[480px] lg:h-[min(64vh,620px)]">
            <ScreenshotWall set="web" />
          </div>
        </div>
      </section>

      {/* ---------- 2. Thomas ---------- */}
      <section className="mx-auto max-w-[1200px] px-5 pb-2 pt-10 sm:px-10 sm:pt-14">
        <Reveal scale>
          <div className="neu mx-auto flex max-w-[900px] flex-col items-center gap-6 rounded-3xl border border-line bg-white p-6 text-center sm:flex-row sm:items-start sm:gap-8 sm:p-9 sm:text-left">
            <Image
              src={asset("/assets/images/fZdV1icYbXIkqfVAekWtJEAifo.png")}
              alt="Thomas Flood"
              width={208}
              height={236}
              className="h-[150px] w-[132px] flex-none rounded-xl object-cover grayscale sm:h-[176px] sm:w-[155px]"
            />
            <div className="min-w-0">
              <h2 className="text-[clamp(22px,2.2vw,30px)] font-medium leading-[1.15] tracking-[-0.03em]">
                Hey — I&rsquo;m your developer.
              </h2>
              <p className="mt-3 text-[15.5px] leading-relaxed text-grey">
                You&rsquo;ll work with me directly, as your only point of contact. No outsourcing, no
                juniors, no account managers — just me.
              </p>
              <p className="mt-3 text-[15.5px] leading-relaxed text-grey">
                I&rsquo;m a perfectionist, not a single pixel out of line, and I build so your traffic
                actually calls you or buys your product. Trades, tech, accounting firms — I&rsquo;ve
                built the lot.
              </p>
              <p className="mt-4 text-[13.5px] text-grey">
                <strong className="font-semibold text-ink">Thomas Flood</strong> · Director of Digital
                Strategy, Rankify
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------- 3. Proof ---------- */}
      {/* Rendered as a sibling, not a child: CaseStudyRow is a full section
          with its own margin and padding, and wrapping it in another padded
          one stacked four lots of 80px into a dead band above it. */}
      <CaseStudyRow block={CASE_STUDIES} />

      <section className="pb-9 pt-6 sm:pb-14 sm:pt-8">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-10">
          <Reveal scale delay={0.05} className="mx-auto max-w-[820px]">
            <figure className="neu rounded-3xl border border-line bg-white p-7 text-center sm:p-10">
              <Stars className="h-4 w-4" wrapperClassName="justify-center" />
              <blockquote className="mt-5 text-[clamp(18px,2vw,24px)] font-medium leading-snug tracking-[-0.02em]">
                &ldquo;Rankify had my website live in 7 days, which I didn&rsquo;t think was possible. I
                had about 10 enquiries in the first fortnight. One of those turned into a job that
                covered the website with plenty of money left over.&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center justify-center gap-3">
                <Image
                  src={asset("/assets/images/nick-prime-group.webp")}
                  alt="Nick, owner of Prime Group"
                  width={96}
                  height={96}
                  className="h-12 w-12 flex-none rounded-full object-cover"
                />
                <span className="text-left text-[13px] text-grey">
                  <strong className="block text-[15px] font-semibold tracking-[-0.01em] text-ink">
                    Nick
                  </strong>
                  Owner, Prime Group
                </span>
              </figcaption>
            </figure>
          </Reveal>

        </div>
      </section>

      {/* ---------- 4. The offer ---------- */}
      <section className="mx-auto max-w-[1200px] px-5 py-9 sm:px-10 sm:py-14">
        <SectionHead sub="Most people aren't unsure about the price. They're unsure what it'll look like. Fair enough — so I'll show you first.">
          How the free homepage works.
        </SectionHead>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {STEPS.map((s, i) => (
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
          <p className="rounded-2xl border border-line bg-[#f1f1f1] px-6 py-5 text-[14.5px] leading-relaxed text-grey">
            <strong className="font-semibold text-ink">Who this is for:</strong> established Australian
            businesses with a website that isn&rsquo;t pulling its weight, or a launch date already set.
            Ten slots a month is what I can actually build properly, so I&rsquo;d rather give them to
            people who are genuinely ready.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-9 text-center">
          <Cta />
        </Reveal>
      </section>

      {/* ---------- 5. Authority ---------- */}
      <section className="bg-paper py-9 sm:py-14">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-10">
          <SectionHead>
            The people who buy websites for a living choose Rankify to build them.
          </SectionHead>

          <Reveal scale delay={0.05} className="mx-auto mt-10 max-w-[900px]">
            <div className="neu rounded-3xl border border-line bg-white p-7 sm:p-10">
              <Image
                src={asset("/assets/logos-web/adalytical.webp")}
                alt="Adalytical"
                width={320}
                height={141}
                className="h-11 w-auto object-contain sm:h-12"
              />
              <p className="mt-5 text-[15.5px] leading-relaxed text-grey">
                Adalytical&rsquo;s founders led growth teams at Google before starting Australia&rsquo;s
                fastest-growing Google Ads business. Their campaigns only work if the page converts — so
                when their clients need a new website or landing pages, they bring me in.
              </p>
              <figure className="mt-6 border-t border-line pt-6">
                <blockquote className="text-[16px] font-medium leading-snug tracking-[-0.01em]">
                  &ldquo;We partner with Rankify when our clients are in need of a new website, Shopify
                  store or landing pages — high-performance builds we know will convert.&rdquo;
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <span className="flex">
                    {["jackson-adalytical", "jackson-sharp-adalytical"].map((f, i) => (
                      <Image
                        key={f}
                        src={asset(`/assets/images/${f}.webp`)}
                        alt=""
                        width={96}
                        height={96}
                        className="-ml-3 h-11 w-11 flex-none rounded-full border-2 border-white object-cover first:ml-0"
                        style={{ zIndex: 2 - i }}
                      />
                    ))}
                  </span>
                  <span className="text-[12.5px] leading-snug text-grey">
                    <strong className="block text-[14.5px] font-semibold tracking-[-0.01em] text-ink">
                      Jackson Wallace &amp; Jackson Sharp
                    </strong>
                    Founders, Adalytical · Ex-Google growth team
                  </span>
                </figcaption>
              </figure>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- 6. Comparison ---------- */}
      <section className="mx-auto max-w-[1200px] px-5 py-9 sm:px-10 sm:py-14">
        <SectionHead>Seriously — look at the difference.</SectionHead>

        <Reveal scale delay={0.05} className="mx-auto mt-10 max-w-[860px]">
          {/* A real table so the row headers read correctly to a screen reader.
              The label column is held narrow: at 390px three columns are tight
              and the labels are the shortest content of the three. */}
          <div className="overflow-hidden rounded-2xl border border-line bg-white">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-line bg-[#f7f7f7] text-[11.5px] font-semibold uppercase tracking-[0.08em] text-grey">
                  <th scope="col" className="px-3 py-3.5 sm:px-6" />
                  <th scope="col" className="px-3 py-3.5 sm:px-6">
                    Typical agency
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-ink sm:px-6">
                    Rankify
                  </th>
                </tr>
              </thead>
              <tbody className="text-[13.5px] sm:text-[15px]">
                {COMPARISON.map((r) => (
                  <tr key={r.label} className="border-b border-line last:border-0">
                    <th scope="row" className="w-[26%] px-3 py-4 font-medium sm:px-6">
                      {r.label}
                    </th>
                    <td className="px-3 py-4 text-grey sm:px-6">{r.agency}</td>
                    <td className="px-3 py-4 font-semibold sm:px-6">{r.rankify}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-center text-[14.5px] text-grey">
            Retainers and hosting add up every single year. With me, your running cost is zero.
          </p>
        </Reveal>
      </section>

      {/* ---------- 7. Guarantee ---------- */}
      <section className="bg-paper py-9 sm:py-14">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-10">
          <SectionHead sub="Take 30 days with the finished site. If you're not satisfied with what I built, ask for a refund and you'll get one — no argument and no exit interview.">
            30-day money-back guarantee. The risk is mine, not yours.
          </SectionHead>
          <Reveal delay={0.05} className="mx-auto mt-8 grid max-w-[900px] gap-3 sm:grid-cols-3">
            {GUARANTEE.map((g) => (
              <p
                key={g}
                className="flex items-start gap-2.5 rounded-2xl border border-line bg-white px-5 py-4 text-[14.5px] leading-snug"
              >
                <span className="mt-[3px] flex h-[17px] w-[17px] flex-none items-center justify-center rounded-full bg-[var(--green-mid)]">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-2.5 w-2.5"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {g}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- 8. FAQ ---------- */}
      <section className="mx-auto max-w-[1200px] px-5 py-9 sm:px-10 sm:py-14">
        <SectionHead>Questions, answered straight.</SectionHead>
        <div className="mt-10">
          <LandingFaq items={FAQ} />
        </div>
      </section>

      {/* ---------- 9. Final CTA ---------- */}
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
      <footer className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-5 py-10 text-[13px] text-grey sm:px-10">
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
