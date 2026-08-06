import Image from "next/image";
import { asset } from "@/lib/basePath";
import { Reveal } from "@/components/ui/Reveal";
import { PlusIcon } from "@/components/ui/PlusIcon";
import { ProcessIcon } from "@/components/ui/ProcessIcon";

const DOT_COUNT = 6;

const STEPS = [
  {
    idx: "01",
    title: "Communication",
    desc: "A team that communicates every step",
    icon: "communication",
  },
  {
    idx: "02",
    title: "Custom Solutions",
    desc: "Customised solutions for your unique needs",
    icon: "custom",
  },
  {
    idx: "03",
    title: "Transparent Pricing",
    desc: "Transparent pricing with no hidden fees",
    icon: "pricing",
  },
  {
    idx: "04",
    title: "Measureable Results",
    desc: "Proven track record with measurable results",
    icon: "results",
  },
] as const;

function ProgressDots({ active }: { active: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: DOT_COUNT }).map((_, i) => (
        <span
          key={i}
          className={`h-1.5 w-1.5 rounded-full ${i < active ? "bg-ink" : "bg-[#e9e9e9]"}`}
        />
      ))}
    </div>
  );
}

export function Process() {
  return (
    <section className="mx-2 mt-2 rounded-3xl bg-paper text-ink">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-10 sm:py-24 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-[minmax(180px,1fr)_2.2fr] lg:gap-20">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-[15px] font-medium">
              <PlusIcon dark className="h-[18px] w-[18px]" />
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
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.idx} delay={i * 0.08}>
              <div className="flex h-full flex-col justify-between gap-8 rounded-2xl border border-line bg-white p-6">
                <div className="flex items-center justify-between">
                  <ProgressDots active={i + 1} />
                  <span className="text-[10px] font-semibold tracking-[-0.06em]">{s.idx}</span>
                </div>
                <div>
                  <h4 className="mb-3 text-[19px] font-semibold tracking-[-0.02em]">{s.title}</h4>
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-[10px] border border-line bg-white">
                    <ProcessIcon name={s.icon} className="h-7 w-7" />
                  </div>
                  <p className="text-[15px] text-grey">{s.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal scale className="mt-10 aspect-[16/8] overflow-hidden rounded-2xl lg:mt-16">
          <Image
            src={asset("/assets/images/X1v7Yb87Igg23yIVi0lRCQBliQ.jpg")}
            alt="Rankify team at work"
            width={1280}
            height={853}
            className="h-full w-full object-cover"
          />
        </Reveal>
      </div>
    </section>
  );
}
