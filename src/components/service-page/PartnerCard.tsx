import Image from "next/image";
import { asset } from "@/lib/basePath";
import { Reveal } from "@/components/ui/Reveal";
import { Stars } from "@/components/ui/Stars";
import { SectionHeading } from "@/components/service-page/SectionHeading";
import type { PartnerBlock } from "@/content/service-pages/types";

/** Google Ads mark, in its own colours. */
function GoogleAdsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 flex-none" aria-hidden>
      <path fill="#FBBC04" d="M1.7 17.3 8.9 4.8a2.6 2.6 0 0 1 4.5 2.6L6.2 19.9a2.6 2.6 0 1 1-4.5-2.6Z" />
      <path fill="#4285F4" d="M22.3 17.3 15.1 4.8a2.6 2.6 0 0 0-4.5 2.6l7.2 12.5a2.6 2.6 0 1 0 4.5-2.6Z" />
      <circle fill="#34A853" cx="4" cy="18.6" r="2.6" />
    </svg>
  );
}

/**
 * The partner card, open on the page.
 *
 * This started as a popup like the client case studies, but an ads specialist
 * vouching for the builds his own campaigns depend on is the strongest proof
 * on the page — it shouldn't need a click to be seen.
 */
export function PartnerCard({ block }: { block: PartnerBlock }) {
  return (
    <section
      id={block.anchorId}
      className="mx-2 mt-8 scroll-mt-24 rounded-3xl bg-paper text-ink sm:mt-12 lg:mt-20"
    >
      <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-10 sm:py-16 lg:py-20">
        {block.heading && (
          <SectionHeading
            label={block.kicker}
            heading={block.heading}
            headingDim={block.headingDim}
            centred
            className="mb-8 sm:mb-12"
          />
        )}
        <Reveal scale>
          <div className="neu mx-auto max-w-[860px] rounded-[24px] border border-line bg-white p-7 sm:p-10">
            <div className="grid gap-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
              <div>
                {block.logo ? (
                  <Image
                    src={asset(block.logo)}
                    alt={block.name}
                    width={260}
                    height={78}
                    className="h-14 w-auto object-contain"
                  />
                ) : (
                  <p className="text-[24px] font-semibold tracking-[-0.03em]">{block.name}</p>
                )}
              </div>

              {block.chips && (
                <div className="flex flex-wrap gap-2 sm:justify-end">
                  {block.chips.map((c) => (
                    <span
                      key={c.label}
                      // nowrap only once there's room for it. On a phone the
                      // long chip is wider than the card, so it has to wrap
                      // inside itself rather than overflow.
                      className={`inline-flex items-start gap-1.5 whitespace-normal rounded-full px-3 py-1.5 text-[12px] font-medium leading-snug sm:items-center sm:whitespace-nowrap sm:text-[12.5px] ${
                        c.accent
                          ? "bg-[#e9f5f0] text-[var(--green-deep)]"
                          : "bg-[#f1f1f1] text-ink"
                      }`}
                    >
                      {c.icon === "google-ads" && <GoogleAdsIcon />}
                      {c.label}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <p className="mt-7 text-[clamp(17px,1.7vw,21px)] font-medium leading-[1.35] tracking-[-0.02em]">
              {block.body}
            </p>

            <figure className="mt-7 border-t border-line pt-7">
              <Stars className="h-4 w-4" />
              <blockquote className="mt-3.5 text-[16px] italic leading-relaxed text-grey">
                &ldquo;{block.quote}&rdquo;
              </blockquote>
              {/* Two founders, so the faces stack the way a team photo does
                  rather than repeating the same caption block twice. */}
              <figcaption className="mt-5 flex items-center gap-3.5">
                {block.people.some((x) => x.avatar) && (
                  <span className="flex flex-none">
                    {block.people.map((x, i) =>
                      x.avatar ? (
                        <Image
                          key={x.name}
                          src={asset(x.avatar)}
                          alt={x.name}
                          width={112}
                          height={112}
                          className="-ml-3 h-14 w-14 flex-none rounded-full border-2 border-white object-cover first:ml-0"
                          style={{ zIndex: block.people.length - i }}
                        />
                      ) : null,
                    )}
                  </span>
                )}
                <span className="text-[13.5px] text-grey">
                  <strong className="block text-[16px] font-semibold tracking-[-0.01em] text-ink">
                    {block.people.map((x) => x.name).join(" & ")}
                  </strong>
                  {block.peopleRole}
                </span>
              </figcaption>
            </figure>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
