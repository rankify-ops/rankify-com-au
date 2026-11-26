import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Band, Heading } from "@/components/sidekick/SidekickChrome";
import { BRANDS } from "@/content/proof";

/**
 * /about.
 *
 * There was no About page: the link 404'd. Everything stated here is already
 * public elsewhere on the site or was confirmed by Tom on 26 Nov 2026: the
 * Gold Coast base and founder (the organisation schema, the footer, the hero),
 * 100+ brands (src/content/proof.ts), the 7 to 15 day build, the two products,
 * the Google Ads partnership (/google-ads-offer) and the branding partner.
 *
 * It deliberately states no team size, revenue or client result. The claims
 * register in docs/reposition-plan.md rules those out, and the page does not
 * need them.
 */
export const metadata: Metadata = {
  title: "About Rankify | Websites, Stores, Ads and Software, Built on the Gold Coast",
  description:
    "Rankify builds websites, Shopify stores, ad systems and custom software for Australian businesses. You work with the developer who builds it, at a price agreed before work starts.",
  alternates: { canonical: "/about" },
};

const HOW = [
  {
    h: "You talk to the person doing the work",
    b: "No account managers and no handoffs. The developer who scopes your project is the one who builds it, and the one who answers when you have a question.",
  },
  {
    h: "The price is agreed first",
    b: "Every price is either published or quoted as one fixed figure before work starts. Nothing is billed per change and nothing is called out of scope later.",
    link: { label: "See every price", href: "/pricing" },
  },
  {
    h: "Built with the newest tools",
    b: "We build with AI at every step, which is why a custom website is live in 7 to 15 days. A person checks everything before it ships.",
  },
  {
    h: "We use what we sell",
    b: "Rankify runs on a hub we built. Our own ecommerce brand runs on another. When we tell you a dashboard or an automation is worth having, it is because we rely on one.",
  },
];

const BUILT = [
  {
    k: "Website Editor",
    h: "Change your site by asking for it",
    b: "Every Rankify website comes with a back end where you ask for a change in plain words, see it before it goes live, approve it, and undo it if you change your mind.",
    href: "/web-design-and-development",
  },
  {
    k: "Ad Sidekick",
    h: "Meta ads without signing in to Meta",
    b: "Our own product. It names your ads, builds the campaigns and tells you what to scale and what to turn off.",
    href: "/meta-ads",
  },
  {
    k: "Business hubs",
    h: "Every number on one screen",
    b: "Sales, ad spend, stock, cash and profit, read live from the systems a business already uses. We run two of our own.",
    href: "/dashboards",
  },
  {
    k: "AI agents",
    h: "Routine work, inside limits",
    b: "Assistants and agents with their own sign-in, a fixed list of what they may do, and a person approving anything that matters.",
    href: "/ai-and-automation",
  },
];

const WITH = [
  {
    h: "Adalytical",
    b: "Our Google Ads partner. Its founders led growth teams at Google. They run the campaigns and we build the page and the tracking.",
  },
  {
    h: "A specialist branding partner",
    b: "Logo and identity work is done with designers who do nothing else, so a brand gets the same attention as a build.",
  },
  {
    h: "Shopify Partner",
    b: "We are a Shopify Partner, building custom stores and working on live ones.",
  },
];

const TOOLS = [
  "Shopify",
  "Next.js",
  "Claude",
  "Stripe",
  "Meta Ads",
  "Google Ads",
  "Google Analytics",
  "Semrush",
  "Xero",
  "Zapier",
];

export default function AboutPage() {
  return (
    <>
      <Header />

      <section className="mx-auto max-w-[1400px] px-5 pb-6 pt-8 sm:px-10 sm:pt-12">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--green-text)]/30 bg-[color:var(--green-text)]/10 px-3.5 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.14em] text-[color:var(--green-text)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--green-text)]" />
            About Rankify
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-5 max-w-[980px] text-[clamp(32px,4.4vw,54px)] font-semibold leading-[1.03] tracking-[-0.04em]">
            We build the things{" "}
            <span className="text-[color:var(--green-text)]">a business runs on.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-[640px] text-[17.5px] leading-relaxed text-grey">
            Websites, online stores, ad systems and custom software for Australian businesses, built
            on the Gold Coast. {BRANDS} brands have trusted us with theirs.
          </p>
        </Reveal>
        <Reveal delay={0.15} className="mt-8">
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <Button href="/schedule-strategy-call" pulse className="w-full justify-center sm:w-auto">
              Book a strategy call
            </Button>
            <Link
              href="/projects"
              className="text-center text-[14.5px] font-semibold text-ink/60 underline-offset-4 hover:underline sm:text-left"
            >
              See our work
            </Link>
          </div>
        </Reveal>

        <dl className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            { k: "Brands worked with", v: BRANDS },
            { k: "To a live website", v: "7 to 15 days" },
            { k: "Founded by", v: "Thomas Flood" },
          ].map((s) => (
            <div key={s.k} className="rounded-2xl border border-line bg-white p-6">
              <dt className="text-[12px] font-semibold uppercase tracking-[0.14em] text-grey">{s.k}</dt>
              <dd className="mt-2 text-[24px] font-semibold tracking-[-0.03em]">{s.v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <Band dark>
        <Heading
          kicker="How we work"
          dark
          sub="Four rules. They are the reason the work is fast, the price is known and the result is yours."
        >
          Senior people, the newest tools, no layers in between.
        </Heading>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {HOW.map((d, i) => (
            <Reveal key={d.h} delay={i * 0.04}>
              <div className="h-full rounded-2xl border border-white/12 bg-white/[0.05] p-6">
                <h3 className="text-[19px] font-semibold tracking-[-0.02em]">{d.h}</h3>
                <p className="mt-2.5 text-[15.5px] leading-relaxed text-white/70">{d.b}</p>
                {d.link && (
                  <Link
                    href={d.link.href}
                    className="mt-3 inline-block text-[14.5px] font-semibold text-[color:#3fd8bb] underline-offset-4 hover:underline"
                  >
                    {d.link.label} →
                  </Link>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </Band>

      <Band>
        <Heading
          kicker="What we have built"
          sub="The clearest way to judge a builder is by what they made for themselves."
        >
          Our own products, in daily use.
        </Heading>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BUILT.map((d, i) => (
            <Reveal key={d.k} delay={i * 0.04}>
              <Link
                href={d.href}
                className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-colors hover:border-[color:var(--green-text)]"
              >
                <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-[color:var(--green-text)]">
                  {d.k}
                </span>
                <h3 className="mt-3 text-[18px] font-semibold leading-snug tracking-[-0.02em]">{d.h}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-grey">{d.b}</p>
                <span className="mt-auto pt-4 text-[14px] font-semibold text-ink">
                  See it{" "}
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Band>

      <Band>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Heading
              kicker="Who we work with"
              sub="Where a specialist does it better, we bring one in and stay on the build."
            >
              Partners, named.
            </Heading>
            <ul className="mt-8 grid gap-3">
              {WITH.map((d) => (
                <li key={d.h} className="rounded-2xl border border-line bg-white p-5">
                  <h3 className="text-[16.5px] font-semibold tracking-[-0.02em]">{d.h}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-grey">{d.b}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Heading kicker="What we build with" sub="The tools in our work every week.">
              The stack.
            </Heading>
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {TOOLS.map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-line bg-white px-4 py-2 text-[14.5px] font-medium tracking-[-0.01em]"
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Band>

      <Band dark>
        <div className="mx-auto max-w-[720px] text-center">
          <h2 className="text-[clamp(26px,3.2vw,42px)] font-semibold leading-[1.08] tracking-[-0.035em]">
            Tell us what you are trying to fix.
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[16px] leading-relaxed text-white/70">
            Fifteen minutes with the person who would build it. You will leave knowing what it
            takes and what it costs.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/schedule-strategy-call" variant="light" className="w-full justify-center sm:w-auto">
              Book a strategy call
            </Button>
          </div>
        </div>
      </Band>

      <ContactFooter />
    </>
  );
}
