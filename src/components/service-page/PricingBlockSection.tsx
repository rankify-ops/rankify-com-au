import Image from "next/image";
import { asset } from "@/lib/basePath";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { SmartLink } from "@/components/ui/SmartLink";
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

/** The circular arrow that sits on the end of a pricing CTA. */
function ArrowBadge({ onGreen }: { onGreen?: boolean }) {
  return (
    <span
      className={`flex h-9 w-9 flex-none items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5 ${
        onGreen ? "bg-white" : "bg-[var(--green-mid)]"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        className={`h-3.5 w-3.5 ${onGreen ? "text-[var(--green-mid)]" : "text-white"}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 17L17 7M9 7h8v8" />
      </svg>
    </span>
  );
}

/**
 * Retainer/hourly pricing card.
 *
 * Measured against the Framer original rather than eyeballed: tier name 30px
 * at weight 500, price 40px at 600, the MOST POPULAR band 18px white on
 * #006B4B, 20px card radius, 30px padding. The old card had the name at
 * 15.5px — smaller than its own feature list — so the plans read as a wall of
 * prices with no names attached.
 */
function TierCard({ tier }: { tier: PricingBlock["tiers"][number] }) {
  const hot = Boolean(tier.highlighted);

  return (
    // Every column is the same box; the plain ones just carry an empty slot
    // where the featured card has its band. A margin can't do this — `mt` plus
    // `h-full` makes the column overflow the row by the margin, which is what
    // left the featured card's bottom edge 44px short of its neighbours.
    <div className="flex h-full flex-col">
      {tier.badge ? (
        <div className="flex h-11 items-center justify-center rounded-t-[20px] bg-[var(--green-mid)] px-6 text-center text-[16px] font-normal leading-none text-white sm:text-[18px]">
          {tier.badge}
        </div>
      ) : (
        <div className="hidden h-11 lg:block" aria-hidden />
      )}

      <div
        className={`neu flex flex-1 flex-col bg-white p-[26px] text-ink sm:p-[30px] ${
          tier.badge ? "rounded-b-[20px]" : "rounded-[20px]"
        }`}
      >
        {tier.name && (
          <p className="text-[26px] font-medium leading-none tracking-[-0.03em] sm:text-[30px]">
            {tier.name}
          </p>
        )}

        {tier.spots && (
          <span className="mt-3.5 inline-flex items-center gap-2 self-start text-[13px] text-grey">
            <span className="h-2 w-2 rounded-full bg-[#07a889]" />
            {tier.spots}
          </span>
        )}

        <div className="mt-3.5 flex items-baseline gap-2">
          <span className="text-[40px] font-semibold leading-none tracking-[-0.04em]">
            {tier.price}
          </span>
          <span className="text-[14px] text-grey">{tier.period}</span>
        </div>

        {tier.note && <p className="mt-4 text-[14px] leading-snug text-grey">{tier.note}</p>}

        <p className="mt-4 flex items-center gap-1.5 text-[12.5px] font-medium text-[var(--green-mid)]">
          <PlusIcon dark className="h-3.5 w-3.5" /> 100% Money back guarantee
        </p>

        {/* Not the shared Button — this one carries the arrow badge and has to
            invert on the featured card. */}
        <SmartLink
          href={tier.ctaHref}
          className={`neu-btn group mt-5 flex items-center justify-between gap-3 rounded-full py-1.5 pl-6 pr-1.5 text-[15px] font-medium ${
            hot
              ? "neu-btn-dark bg-[var(--green-mid)] text-white"
              : "neu-btn-light border border-line bg-white text-ink"
          }`}
        >
          {tier.ctaLabel}
          <ArrowBadge onGreen={hot} />
        </SmartLink>

        <ul className="mt-7 grid gap-3 border-t border-line pt-6">
          {tier.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-[14px] leading-snug text-ink">
              <span className="mt-px flex h-[18px] w-[18px] flex-none items-center justify-center rounded-full bg-[var(--green-mid)]">
                <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
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
        <div className={`mb-8 sm:mb-12 ${!usePanel && tierCount > 1 ? "text-center" : ""}`}>
          {/* Same heading treatment as every other section — this one was still
              on the old 32-58px scale with a plus-icon kicker. */}
          <SectionHeading
            label={block.eyebrow}
            heading={block.heading}
            sub={block.subheading}
            dark
            centred={!usePanel && tierCount > 1}
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
                : "mx-auto grid max-w-[1120px] items-stretch gap-6 lg:grid-cols-3"
            }
          >
            {block.tiers.map((t) => (
              // h-full so the cards in a row match height and the featured
              // card's lift shows at the top rather than shortening it.
              <Reveal key={t.name ?? t.price} scale className="h-full">
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
