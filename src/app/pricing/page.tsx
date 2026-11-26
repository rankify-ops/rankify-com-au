import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { PricingGlance } from "@/components/sections/PricingGlance";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Band } from "@/components/sidekick/SidekickChrome";
import { WEBSITE_FROM, SEO_PER_PAGE, SIDEKICK_FROM } from "@/content/pricing.generated";

/**
 * One page, every price.
 *
 * The table is the same component the home page renders, so the two cannot
 * disagree, and every figure in it is read from the HQ price record.
 */
export const metadata: Metadata = {
  title: "Pricing | Websites, Shopify, SEO, Ads and Apps | Rankify",
  description: `Every Rankify price on one page. Websites from ${WEBSITE_FROM}, SEO at ${SEO_PER_PAGE} per page, Ad Sidekick from ${SIDEKICK_FROM} a month. Fixed prices, agreed before work starts.`,
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <Header />
      <section className="mx-auto max-w-[1400px] px-5 pb-2 pt-8 sm:px-10 sm:pt-12">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--green-text)]/30 bg-[color:var(--green-text)]/10 px-3.5 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.14em] text-[color:var(--green-text)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--green-text)]" />
            Pricing
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-5 max-w-[900px] text-[clamp(32px,4.4vw,54px)] font-semibold leading-[1.03] tracking-[-0.04em]">
            What it costs, <span className="text-[color:var(--green-text)]">before you ask.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-[600px] text-[17.5px] leading-relaxed text-grey">
            Every service we sell and what it costs. The price you see is the price on the invoice,
            and it is agreed before any work starts.
          </p>
        </Reveal>
      </section>

      <PricingGlance id="prices" />

      <Band dark>
        <div className="mx-auto max-w-[720px] text-center">
          <h2 className="text-[clamp(26px,3.2vw,42px)] font-semibold leading-[1.08] tracking-[-0.035em]">
            Not sure which one you need?
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[16px] leading-relaxed text-white/70">
            Tell us what you are trying to fix. We will tell you which of these does it, and what it
            will cost.
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
