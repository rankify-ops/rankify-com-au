import { Reveal } from "@/components/ui/Reveal";
import { SmartLink } from "@/components/ui/SmartLink";
import { SectionHeading } from "@/components/service-page/SectionHeading";
import { NAV_ITEMS } from "@/content/nav";

/**
 * The six services as cards, on the dark band the "Websites Starting From"
 * pricing card used to occupy.
 *
 * That card sold one product at one price on a page that sells six things, and
 * it carried its own delivery estimate that contradicted the web dev page.
 * Icons and links come straight from NAV_ITEMS so this can't drift out of sync
 * with the menu — add a service to the nav and it appears here.
 */
const BLURBS: Record<string, { line: string; price: string }> = {
  "Web Development": {
    line: "Custom sites built around how your customers actually decide. Live in 7–14 days.",
    price: "From $2,999",
  },
  Shopify: {
    line: "Custom Liquid stores for brands scaling profitably. Migrations handled.",
    price: "From $5,999",
  },
  SEO: {
    line: "Priced per page instead of an open-ended retainer, reported in leads.",
    price: "$499 / page / mo",
  },
  "Google Ads": {
    line: "Search and Shopping pointed at profit, with the tracking wired up properly.",
    price: "Talk to us",
  },
  "Meta Ads": {
    line: "Creative treated as the main lever, with the pixel and CAPI set up right.",
    price: "Talk to us",
  },
  "AI & Automation": {
    line: "The repetitive work eating your week, handed to software instead of a person.",
    price: "Talk to us",
  },
};

export function ServicesShowcase() {
  return (
    <section className="grain mx-2 mt-8 rounded-3xl bg-[radial-gradient(120%_140%_at_20%_0%,#06382a_0%,var(--green-deep)_45%,#010f0a_100%)] text-white sm:mt-12 lg:mt-20">
      <div className="relative z-[2] mx-auto max-w-[1400px] px-5 py-16 sm:px-10 sm:py-24 lg:py-32">
        <SectionHeading
          label="What we do"
          heading="Everything you need to get found,"
          headingDim="and everything you need to convert."
          sub="Pick the one you came for. Each is priced up front, and you deal with the developer doing the work."
          dark
          centred
        />

        <div className="mt-10 grid gap-0 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {NAV_ITEMS.map((item, i) => {
            const b = BLURBS[item.label];
            if (!b) return null;
            return (
              <Reveal key={item.label} delay={i * 0.06}>
                {/* Same card language as the mega menu, inverted for the dark
                    band: icon tile, name with a nudging arrow, one line of
                    copy, price pinned to the bottom. */}
                <SmartLink
                  href={item.href}
                  className="group/c flex h-full flex-col gap-4 rounded-2xl border border-white/12 bg-white/[0.04] p-6 transition-all duration-300 hover:-skew-x-1 hover:border-[color:#07a889] hover:bg-white/[0.08]"
                >
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-[12px] border border-white/15 bg-white/[0.06] text-[color:#07a889] transition-transform duration-300 group-hover/c:scale-110">
                    {item.icon}
                  </span>

                  <span className="flex items-center gap-1.5 text-[19px] font-medium tracking-[-0.02em]">
                    {item.label}
                    <span
                      aria-hidden
                      className="transition-transform duration-300 group-hover/c:translate-x-1"
                    >
                      →
                    </span>
                  </span>

                  <span className="text-[14.5px] leading-snug text-white/60">{b.line}</span>

                  <span className="mt-auto pt-2 text-[14px] font-semibold text-white">{b.price}</span>
                </SmartLink>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
