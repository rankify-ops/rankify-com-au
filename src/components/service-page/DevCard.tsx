import Image from "next/image";
import { asset } from "@/lib/basePath";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import type { DevCardBlock } from "@/content/service-pages/types";

/**
 * "Here's who's actually building it", on the light sections.
 *
 * Started as the homepage's white-on-dark frosted card. On paper the glass had
 * nothing to blur and the white text was invisible, so it's a plain light card
 * in the same language as the rest of the page — the point was always the face
 * and the promise, not the effect.
 */
export function DevCard({ block }: { block: DevCardBlock }) {
  return (
    <section id={block.anchorId} className="mx-2 mt-8 scroll-mt-24 sm:mt-12 lg:mt-20">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-10">
        <Reveal scale>
          <div className="neu mx-auto flex max-w-[980px] flex-col items-center gap-6 rounded-3xl border border-line bg-white p-6 text-ink sm:flex-row sm:items-start sm:gap-8 sm:p-9">
            <Image
              src={asset(block.photo)}
              alt={block.name}
              width={208}
              height={236}
              className="h-[150px] w-[132px] flex-none rounded-xl object-cover grayscale sm:h-[176px] sm:w-[155px]"
            />

            <div className="min-w-0 text-center sm:text-left">
              <h2 className="text-[clamp(22px,2.2vw,30px)] font-medium leading-[1.15] tracking-[-0.03em]">
                {block.heading}
              </h2>
              <p className="mt-3 max-w-[620px] text-[15.5px] leading-relaxed text-grey">
                {block.body}
              </p>
              <p className="mt-4 text-[13.5px] text-grey">
                <strong className="font-semibold text-ink">{block.name}</strong>
                {block.role && <> &middot; {block.role}</>}
              </p>

              {(block.cta || block.ctaSecondary) && (
                <div className="mt-5 flex flex-wrap justify-center gap-3 sm:justify-start">
                  {block.cta && (
                    <Button href={block.cta.href} pulse className="bg-[var(--green-deep)] text-white">
                      {block.cta.label}
                    </Button>
                  )}
                  {block.ctaSecondary && (
                    <Button href={block.ctaSecondary.href} variant="light">
                      {block.ctaSecondary.label}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
