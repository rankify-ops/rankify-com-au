import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

const STEPS = [
  { idx: "01", title: "Communication", desc: "A team that communicates every step" },
  { idx: "02", title: "Custom Solutions", desc: "Customised solutions for your unique needs" },
  { idx: "03", title: "Transparent Pricing", desc: "Transparent pricing with no hidden fees" },
  { idx: "04", title: "Measureable Results", desc: "Proven track record with measurable results" },
];

export function Process() {
  return (
    <section className="mx-2 mt-2 rounded-3xl bg-paper text-ink">
      <div className="px-5 py-16 sm:px-10 sm:py-24 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-[minmax(180px,1fr)_2.2fr] lg:gap-20">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-[15px] font-medium">
              <span className="h-[18px] w-[18px] rounded-full bg-current opacity-80" />
              About us
            </span>
          </Reveal>
          <div>
            <Reveal>
              <p className="mb-3.5 font-semibold">Rankify®</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-[clamp(40px,3.55vw,68px)] font-medium leading-[0.92] tracking-[-0.06em]">
                How we launch <span className="text-grey">websites and deliver branding &amp; SEO services.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-4 max-w-[380px] text-base text-grey">
                See how our team combines creativity, technology, and strategy to build powerful digital
                solutions.
              </p>
            </Reveal>

            <div className="mt-10 border-t border-line lg:mt-16">
              {STEPS.map((s) => (
                <Reveal key={s.idx}>
                  <div className="grid grid-cols-[40px_1fr] items-baseline gap-6 border-b border-line py-6 sm:grid-cols-[64px_1fr_1.2fr]">
                    <span className="text-sm text-grey">{s.idx}</span>
                    <h4 className="text-[clamp(18px,1.5vw,26px)] font-semibold tracking-[-0.02em]">
                      {s.title}
                    </h4>
                    <p className="col-span-2 text-[15px] text-grey sm:col-span-1">{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal scale className="mt-10 aspect-[16/8] overflow-hidden rounded-2xl lg:mt-16">
              <Image
                src="/assets/images/X1v7Yb87Igg23yIVi0lRCQBliQ.jpg"
                alt="Rankify team at work"
                width={1280}
                height={853}
                className="h-full w-full object-cover"
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
