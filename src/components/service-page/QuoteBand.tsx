import Image from "next/image";
import { asset } from "@/lib/basePath";
import { Reveal } from "@/components/ui/Reveal";
import { Stars } from "@/components/ui/Stars";
import type { QuoteBlock } from "@/content/service-pages/types";

/** One quote between two sections. Deliberately quiet — it's punctuation. */
export function QuoteBand({ block }: { block: QuoteBlock }) {
  return (
    <section className="mx-2 mt-8 rounded-3xl bg-paper text-ink sm:mt-12 lg:mt-20">
      <div className="mx-auto max-w-[1400px] px-5 py-10 sm:px-10 sm:py-14">
        <Reveal>
          <figure className="mx-auto max-w-[860px] text-center">
            {block.context && (
              <p className="mx-auto mb-4 max-w-[620px] text-[13px] font-medium uppercase tracking-[0.08em] text-[color:#07a889]">
                {block.context}
              </p>
            )}
            <Stars className="h-4 w-4" wrapperClassName="justify-center" />
            <blockquote className="mt-5 text-[clamp(19px,2.1vw,28px)] font-medium leading-[1.25] tracking-[-0.03em]">
              &ldquo;{block.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 flex items-center justify-center gap-3 text-[14px] text-grey">
              {block.avatar && (
                <Image
                  src={asset(block.avatar)}
                  alt={block.name}
                  width={96}
                  height={96}
                  className="h-14 w-14 flex-none rounded-full object-cover"
                />
              )}
              <span className="text-left">
              <strong className="block text-[16px] font-semibold tracking-[-0.01em] text-ink">{block.name}</strong>
              {block.role && <span className="block text-[13.5px]">{block.role}</span>}
              {block.placeholder && (
                <span className="ml-2 rounded-full border border-line px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-grey">
                  Placeholder
                </span>
              )}
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
