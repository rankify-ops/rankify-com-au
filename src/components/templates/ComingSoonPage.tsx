import { Header } from "@/components/layout/Header";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PlusIcon } from "@/components/ui/PlusIcon";

export function ComingSoonPage({
  kicker,
  heading,
  intro,
  bullets,
}: {
  kicker: string;
  heading: string;
  intro: string;
  bullets: string[];
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
              <Button href="/schedule-strategy-call" variant="light">
                Book a strategy call
              </Button>
              <Button href="/contact">Get in touch</Button>
            </div>
          </Reveal>
        </div>
      </section>
      <ContactFooter />
    </>
  );
}
