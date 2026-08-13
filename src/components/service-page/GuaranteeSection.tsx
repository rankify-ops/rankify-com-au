import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/service-page/SectionHeading";
import type { GuaranteeBlock } from "@/content/service-pages/types";

/**
 * Risk reversal, given a section instead of a 12px line inside a pricing card.
 * The offer was always there — nobody could see it.
 */
export function GuaranteeSection({ block }: { block: GuaranteeBlock }) {
  return (
    <section
      id={block.anchorId}
      className="grain mx-2 mt-8 scroll-mt-24 rounded-3xl bg-[radial-gradient(120%_140%_at_20%_0%,#06382a_0%,var(--green-deep)_45%,#010f0a_100%)] text-white sm:mt-12 lg:mt-20"
    >
      <div className="relative z-[2] mx-auto max-w-[1400px] px-5 py-12 sm:px-10 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[820px] text-center">
          <Reveal>
            {/* The shield reads as a guarantee before a word is read. */}
            <span className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] text-[color:#07a889]">
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3.2 19.5 6v6c0 4.8-3.2 8-7.5 9.8C7.7 20 4.5 16.8 4.5 12V6z" />
                <path d="m8.8 12.2 2.2 2.2 4.2-4.4" />
              </svg>
            </span>
          </Reveal>

          <SectionHeading
            label={block.kicker}
            heading={block.heading}
            headingDim={block.headingDim}
            dark
            centred
          />

          <Reveal delay={0.15}>
            <p className="mx-auto mt-5 max-w-[640px] text-[16.5px] leading-relaxed text-white/70">
              {block.promise}
            </p>
          </Reveal>

          {block.points && (
            <Reveal delay={0.2}>
              <ul className="mt-8 grid gap-3 text-left sm:grid-cols-3">
                {block.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-2.5 rounded-2xl border border-white/12 bg-white/[0.04] p-4 text-[14.5px] leading-snug text-white/85"
                  >
                    <span className="mt-px flex h-[18px] w-[18px] flex-none items-center justify-center rounded-full bg-[var(--green-mid)]">
                      <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          {block.link && (
            <Reveal delay={0.25}>
              <p className="mt-7 text-[13.5px] text-white/50">
                Full terms in our{" "}
                <Link href={block.link.href} className="text-white underline underline-offset-4">
                  {block.link.label}
                </Link>
                .
              </p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
