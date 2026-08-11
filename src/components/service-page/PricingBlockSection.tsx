import Image from "next/image";
import { asset } from "@/lib/basePath";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PlusIcon } from "@/components/ui/PlusIcon";
import { SectionHeading } from "@/components/service-page/SectionHeading";
import type { PricingBlock } from "@/content/service-pages/types";

function FeatureBadgeIcon() {
  return (
    <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-white/10">
      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );
}

function TierCard({ tier }: { tier: PricingBlock["tiers"][number] }) {
  return (
    <div
      className={`neu flex flex-col overflow-hidden rounded-[22px] ${
        tier.highlighted ? "ring-2 ring-white" : ""
      }`}
    >
      {tier.badge && (
        <div className="bg-white py-2 text-center text-[12px] font-semibold tracking-[0.04em] text-[var(--green-deep)]">
          {tier.badge}
        </div>
      )}
      <div className="flex flex-1 flex-col bg-white p-7 text-ink">
        <div className="mb-5">
          {tier.name && <p className="mb-1 text-[15.5px] font-semibold">{tier.name}</p>}
          {tier.spots && (
            <span className="inline-flex items-center gap-1.5 text-[12.5px] text-grey">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--green-deep)]" />
              {tier.spots}
            </span>
          )}
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-[36px] font-semibold tracking-[-0.04em]">{tier.price}</span>
            <span className="text-[13.5px] text-grey">{tier.period}</span>
          </div>
          {tier.note && <p className="mt-2 text-[13.5px] text-grey">{tier.note}</p>}
          <p className="mt-2 flex items-center gap-1.5 text-[12px] text-grey">
            <PlusIcon dark className="h-3.5 w-3.5" /> 100% Money back guarantee
          </p>
        </div>
        <Button href={tier.ctaHref} className="mb-6 w-full justify-center bg-[var(--green-deep)] text-white">
          {tier.ctaLabel}
        </Button>
        <ul className="grid gap-2.5 border-t border-line pt-5">
          {tier.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-[14px] text-ink">
              <span className="mt-0.5 flex h-4 w-4 flex-none items-center justify-center rounded-full bg-[#e9f5f0]">
                <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="var(--green-deep)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </span>
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function PricingBlockSection({ block, index }: { block: PricingBlock; index: number }) {
  // The wide panel used to be gated on `block.addon`, so removing the SEO
  // add-on silently collapsed this whole section into a 400px card. The layout
  // is about having one headline offer, not about the add-on.
  const tierCount = block.tiers.length;
  const usePanel = tierCount === 1 && Boolean(block.tiers[0]?.features.length);
  const tier = block.tiers[0];

  return (
    <section
      id={block.anchorId ?? (index === 0 ? "pricing" : undefined)}
      className="grain mx-2 mt-8 scroll-mt-24 rounded-3xl bg-[radial-gradient(120%_140%_at_20%_0%,#06382a_0%,var(--green-deep)_45%,#010f0a_100%)] text-white sm:mt-12 lg:mt-20"
    >
      <div className="relative z-[2] mx-auto max-w-[1400px] px-5 py-12 sm:px-10 sm:py-16 lg:py-20">
        <div className="mb-8 sm:mb-12">
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

        {usePanel && tier ? (
          <>
            <Reveal delay={0.2} className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04]">
              <div className="grid gap-10 p-7 sm:p-10 lg:grid-cols-2 lg:gap-16">
                {/* Left column: the add-on when there is one, otherwise what
                    the price actually buys — never the add-on's copy with no
                    add-on under it. */}
                <div className="flex flex-col justify-between gap-8">
                  {block.addon ? (
                    <>
                      <div>
                        <p className="text-[15.5px] font-medium">{block.addon.label}</p>
                        <p className="mt-2 text-[14.5px] text-white/60">{block.addon.sub}</p>
                      </div>
                      <span className="text-[27px] font-semibold tracking-[-0.06em]">
                        {block.addon.price}
                      </span>
                    </>
                  ) : (
                    <>
                      <div>
                        {tier.name && <p className="text-[15.5px] font-medium">{tier.name}</p>}
                        {tier.spots && (
                          <span className="mt-2 inline-flex items-center gap-1.5 text-[13px] text-white/60">
                            <span className="h-1.5 w-1.5 rounded-full bg-[color:#07a889]" />
                            {tier.spots}
                          </span>
                        )}
                        <p className="mt-3 max-w-[320px] text-[14.5px] text-white/60">
                          Everything below is included. Fixed quote before any work starts, and
                          nothing gets billed that wasn&rsquo;t agreed.
                        </p>
                      </div>
                      <p className="inline-flex items-center gap-2 text-[14px] text-white/70">
                        <PlusIcon className="h-4 w-4" /> 100% money back guarantee
                      </p>
                    </>
                  )}
                </div>

                <div>
                  <div className="mb-8">
                    <span className="text-[56px] font-semibold leading-none tracking-[-0.06em]">{tier.price}</span>
                    <span className="ml-1 text-[15px] text-white/60">{tier.period}</span>
                  </div>
                  <ul className="grid gap-3">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-[14.5px] text-white">
                        <FeatureBadgeIcon />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 px-7 py-6 sm:px-10">
                <div className="flex items-center gap-2 text-[14.5px]">
                  {tier.note && <span className="text-white/60">{tier.note}</span>}
                </div>
                <Button href={tier.ctaHref} variant="light">
                  {tier.ctaLabel}
                </Button>
              </div>
            </Reveal>
          </>
        ) : (
          <div
            className={
              block.tiers.length === 1
                ? "mx-auto max-w-[400px]"
                : "grid gap-6 lg:grid-cols-3"
            }
          >
            {block.tiers.map((t) => (
              <Reveal key={t.name ?? t.price} scale>
                <TierCard tier={t} />
              </Reveal>
            ))}
          </div>
        )}

        {block.lookingForMore && (
          <div className="mt-14 grid gap-4 sm:mt-20 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-16">
            <Reveal>
              <span className="text-[15px] text-white/60">Looking for more?</span>
            </Reveal>
            <div>
              <Reveal delay={0.1}>
                <p className="max-w-[620px] text-[19px] font-medium leading-snug tracking-[-0.02em]">
                  <span className="text-white">Add marketing, SEO, or Branding—</span>
                  <span className="text-white/60">
                    flexible tools to strengthen your project. We&rsquo;ll shape a solution that fits your
                    business, not ours.
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
