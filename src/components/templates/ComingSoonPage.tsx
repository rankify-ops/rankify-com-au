import { Header } from "@/components/layout/Header";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PlusIcon } from "@/components/ui/PlusIcon";

/**
 * A vertical the page is being sold into. These exist so the nav's intent
 * chooser has a real anchor to land on — a menu item that promises
 * "Google Ads for e-commerce" and drops you at the top of a coming-soon page
 * is worse than no menu item at all.
 */
export type ComingSoonSegment = {
  id: string;
  title: string;
  blurb: string;
  bullets?: string[];
};

export function ComingSoonPage({
  kicker,
  heading,
  intro,
  bullets,
  segments,
}: {
  kicker: string;
  heading: string;
  intro: string;
  bullets: string[];
  segments?: ComingSoonSegment[];
}) {
  return (
    <>
      <Header />
      <section className="grain mx-2 rounded-3xl bg-[radial-gradient(120%_140%_at_20%_0%,#06382a_0%,var(--green-deep)_45%,#010f0a_100%)] text-white">
        <div className="relative z-[2] mx-auto max-w-[1400px] px-5 py-20 sm:px-10 sm:py-28 lg:py-36">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-[15px] font-medium">
              <PlusIcon className="h-[18px] w-[18px]" />
              {kicker}
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 max-w-[15ch] text-[clamp(44px,6vw,104px)] font-medium leading-[0.92] tracking-[-0.05em]">
              {heading}
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-[520px] text-[17px] text-white/65">{intro}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <ul className="mt-10 grid max-w-[620px] gap-3 sm:grid-cols-2">
              {bullets.map((b) => (
                <li key={b} className="inline-flex items-center gap-2.5 text-[15px] text-white/80">
                  <PlusIcon className="h-[16px] w-[16px]" />
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-12 flex flex-wrap gap-3">
              <Button href="/schedule-strategy-call" variant="light" pulse>
                Book a strategy call
              </Button>
              <Button href="/contact" pulse>Get in touch</Button>
            </div>
          </Reveal>
        </div>
      </section>

      {segments && (
        <section className="mx-2 mt-12 rounded-3xl bg-paper text-ink sm:mt-12 lg:mt-20">
          <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-10 sm:py-16 lg:py-20">
            <Reveal>
              <h2 className="mb-10 text-[clamp(32px,3.1vw,58px)] font-medium leading-[0.96] tracking-[-0.05em] sm:mb-16">
                Who we run {kicker.toLowerCase()} for.
              </h2>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {segments.map((s, i) => (
                <Reveal key={s.id} delay={i * 0.06}>
                  <div
                    id={s.id}
                    className="neu flex h-full scroll-mt-28 flex-col gap-[30px] rounded-2xl border border-line bg-white p-[30px]"
                  >
                    <h3 className="text-[18px] font-semibold tracking-[-0.02em]">{s.title}</h3>
                    <p className="text-[14.5px] leading-snug text-grey">{s.blurb}</p>
                    {s.bullets && (
                      <ul className="grid gap-1.5">
                        {s.bullets.map((b) => (
                          <li key={b} className="flex gap-2 text-[14px] leading-snug text-grey">
                            <span className="mt-2 h-1 w-1 flex-none rounded-full bg-current" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                    <a
                      href="/schedule-strategy-call"
                      className="mt-auto inline-flex items-center gap-1.5 text-[13.5px] font-medium text-ink underline"
                    >
                      Book a strategy call
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactFooter />
    </>
  );
}
