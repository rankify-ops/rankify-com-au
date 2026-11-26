import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { Reveal } from "@/components/ui/Reveal";
import { Shot } from "@/components/sidekick/Shot";
import { Band, SidekickCta, SidekickNav } from "@/components/sidekick/SidekickChrome";
import { SIDEKICK_STAGES } from "@/content/sidekick-stages";
import { SIDEKICK_FROM } from "@/content/pricing.generated";

/**
 * One ad, from the file on your desktop to a verdict.
 *
 * The page that makes the product legible. It is mostly screenshots on
 * purpose: describing an interface convinces nobody, and this is a product
 * people have to picture themselves using before they will pay for it.
 */
export const metadata: Metadata = {
  title: "How Ad Sidekick works: one ad, from upload to verdict | Rankify",
  description:
    "Follow a single ad through Ad Sidekick: upload, naming and copy, campaign setup, three days of testing, a verdict, and the winner kept for next time.",
  // This page is now a section of /meta-ads. The URL still answers so
  // nothing already linked or ranked breaks, and the canonical points at
  // the page that carries the whole story.
  alternates: { canonical: "/meta-ads" },
};

export default function HowItWorksPage() {
  return (
    <>
      <Header />
      <SidekickNav current="how" />

      <section className="mx-auto max-w-[1400px] px-5 pb-4 pt-6 sm:px-10">
        <Reveal>
          <h1 className="max-w-[820px] text-[clamp(32px,4.2vw,52px)] font-semibold leading-[1.04] tracking-[-0.04em]">
            One ad, from your desktop to a verdict.
          </h1>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-5 max-w-[620px] text-[17.5px] leading-relaxed text-grey">
            This is the whole loop. Six steps, about three days, and you approve everything that
            goes live.
          </p>
        </Reveal>
      </section>

      <Band>
        <div className="grid gap-16">
          {SIDEKICK_STAGES.map((s, i) => (
            <div
              key={s.n}
              className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${
                i % 2 === 1 ? "lg:[&>figure]:order-first" : ""
              }`}
            >
              <Reveal>
                <div>
                  <span className="text-[13px] font-bold tracking-[0.14em] text-[color:var(--green-text)]">
                    {s.n}
                  </span>
                  <h2 className="mt-3 text-[clamp(22px,2.6vw,32px)] font-semibold leading-[1.1] tracking-[-0.03em]">
                    {s.h}
                  </h2>
                  <p className="mt-4 max-w-[480px] text-[16px] leading-relaxed text-grey">{s.b}</p>
                  {s.detail && (
                    <p className="mt-4 max-w-[480px] border-l-2 border-[color:var(--green-text)]/30 pl-4 text-[15px] leading-relaxed text-grey">
                      {s.detail}
                    </p>
                  )}
                </div>
              </Reveal>
              <Shot alt={s.alt} caption={s.caption} mock={s.mock} />
            </div>
          ))}
        </div>
      </Band>

      <Band dark>
        <div className="mx-auto max-w-[720px] text-center">
          <h2 className="text-[clamp(26px,3.2vw,42px)] font-semibold leading-[1.08] tracking-[-0.035em]">
            That loop, every week, without you learning Meta first.
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[16px] leading-relaxed text-white/70">
            From {SIDEKICK_FROM} a month. No contract, no exit fee, and your whole team included.
          </p>
          <div className="mt-8 flex justify-center">
            <SidekickCta light />
          </div>
        </div>
      </Band>

      <ContactFooter />
    </>
  );
}
