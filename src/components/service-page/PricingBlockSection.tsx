import Image from "next/image";
import { asset } from "@/lib/basePath";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PlusIcon } from "@/components/ui/PlusIcon";
import { FeatureList, PlanFootnote, PlanPanel, PlanRow } from "@/components/ui/PlanTable";
import { SectionHeading } from "@/components/service-page/SectionHeading";
import type { PricingBlock } from "@/content/service-pages/types";

export function PricingBlockSection({ block, index }: { block: PricingBlock; index: number }) {
  // One layout for every pricing block now, so there is no branch that can
  // collapse the section when a field is absent. The old `usePanel` gate was
  // keyed on `block.addon`, and dropping the SEO add-on quietly turned this
  // whole band into a single 400px card.
  const tierCount = block.tiers.length;
  const featureCols = tierCount >= 3 ? "sm:grid-cols-2 lg:grid-cols-3" : tierCount === 2 ? "sm:grid-cols-2" : "";

  return (
    <section
      id={block.anchorId ?? (index === 0 ? "pricing" : undefined)}
      className="grain mx-2 mt-8 scroll-mt-24 rounded-3xl bg-[radial-gradient(120%_140%_at_20%_0%,#06382a_0%,var(--green-deep)_45%,#010f0a_100%)] text-white sm:mt-12 lg:mt-20"
    >
      <div className="relative z-[2] mx-auto max-w-[1400px] px-5 py-12 sm:px-10 sm:py-16 lg:py-20">
        {/* Heading in the same column as the panel, left-aligned, edges
            lining up — the shape the billing page uses. It used to centre
            itself for multi-tier blocks and left-align for single-tier ones,
            which meant the same section changed alignment depending on how
            many plans happened to be in it. */}
        <div className="mx-auto mb-8 max-w-[940px] sm:mb-12">
          {/* Same heading treatment as every other section — this one was still
              on the old 32-58px scale with a plus-icon kicker. */}
          <SectionHeading
            label={block.eyebrow}
            heading={block.heading}
            sub={block.subheading}
            dark
          />
          {block.tag && (
            <Reveal delay={0.15} className="mt-8">
              <span className="inline-block rounded-full bg-white px-5 py-2.5 text-[14px] font-semibold text-ink">
                {block.tag}
              </span>
            </Reveal>
          )}
        </div>

        {/* The dashboards' table, not three price cards.
            
            Each tier used to be a 30px-padded card with its name at 26-30px
            and its price at 40px, so a row of them read as a wall of numbers
            with the names lost above them and the sentence that tells you
            which plan you are squeezed underneath. A row holds the sentence,
            and the prices still line up because they are `tabular-nums` in
            one column instead of three separate cards.
            
            White panel rather than the old translucent one: on this gradient
            a `bg-white/[0.04]` panel loses its own hairlines into the grain,
            and the hairlines are what organise a table. */}
        <Reveal delay={0.2} className="mx-auto max-w-[940px]">
          <PlanPanel>
            {/* Typed but unused by any page today. Rendered as a row rather
                than its own layout branch, so the type stays honest without
                a second design to maintain. */}
            {block.addon && (
              <PlanRow name={block.addon.label} note={block.addon.sub} price={block.addon.price} />
            )}

            {block.tiers.map((t) => (
              <PlanRow
                key={t.name ?? t.price}
                name={t.name}
                badge={t.badge}
                meta={t.spots}
                note={t.note}
                price={t.price}
                period={t.period}
                cta={{ label: t.ctaLabel, href: t.ctaHref }}
                featured={Boolean(t.highlighted)}
              />
            ))}

            {/* Inclusions under the prices, one column per tier.
                
                Deliberately not a matrix: "Everything in Basic +" and
                "Overflow hours $149/hr" are not features another column
                either has or does not, so a shared grid would have to invent
                rows and print dashes that mean nothing. */}
            {block.tiers.some((t) => t.features.length > 0) && (
              <div className={`grid gap-7 border-t border-line px-5 py-6 ${featureCols}`}>
                {block.tiers.map((t) =>
                  t.features.length ? (
                    <FeatureList
                      key={t.name ?? t.price}
                      heading={tierCount > 1 ? (t.name ?? "Included") : undefined}
                      items={t.features}
                    />
                  ) : null,
                )}
              </div>
            )}

            {block.assurance && (
              <PlanFootnote>
                <span className="inline-flex items-center gap-1.5 font-medium text-[color:var(--green-mid)]">
                  <PlusIcon dark className="h-3.5 w-3.5" />
                  {block.assurance}
                </span>
              </PlanFootnote>
            )}
          </PlanPanel>
        </Reveal>

        {block.lookingForMore && (
          <div className="mt-14 grid gap-4 sm:mt-20 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-16">
            <Reveal>
              <span className="text-[15px] text-white/60">Looking for more?</span>
            </Reveal>
            <div>
              <Reveal delay={0.1}>
                <p className="max-w-[620px] text-[19px] font-medium leading-snug tracking-[-0.02em]">
                  <span className="text-white">Add marketing, SEO or branding.</span>{" "}
                  <span className="text-white/60">
                    Each one can be added to your project. We&rsquo;ll scope it around your business,
                    not ours.
                  </span>
                </p>
              </Reveal>
              {block.lookingForMoreCta && (
                <Reveal delay={0.15} className="mt-6">
                  <Button href={block.lookingForMoreCta.href} variant="light">
                    {block.lookingForMoreCta.label}
                  </Button>
                </Reveal>
              )}
              <Reveal delay={0.2} className="mt-8 flex items-center gap-3.5">
                <Image
                  src={asset("/assets/images/nK7vZP41akJ7EzYYCVQPQGuVRQg.png")}
                  alt="Thomas Flood"
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-full object-cover grayscale"
                />
                <div>
                  <strong className="block text-[15px]">Thomas Flood</strong>
                  <span className="text-[13px] text-white/60">Director of Digital Strategy</span>
                </div>
              </Reveal>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
