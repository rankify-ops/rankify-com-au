import Image from "next/image";
import { asset } from "@/lib/basePath";
import { Reveal } from "@/components/ui/Reveal";
import { PlusIcon } from "@/components/ui/PlusIcon";

const DOT_COUNT = 6;

const STEPS = [
  {
    idx: "01",
    title: "Communication",
    desc: "A team that communicates every step",
    icon: (
      <>
        <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H10l-4 3.5V16H6.5A2.5 2.5 0 0 1 4 13.5v-7Z" />
        <circle cx="9" cy="10" r="1" fill="var(--accent)" stroke="none" />
        <circle cx="12" cy="10" r="1" fill="var(--accent)" stroke="none" />
        <circle cx="15" cy="10" r="1" fill="var(--accent)" stroke="none" />
      </>
    ),
  },
  {
    idx: "02",
    title: "Custom Solutions",
    desc: "Customised solutions for your unique needs",
    icon: (
      <>
        <path d="M9 4.5h3a1.5 1.5 0 0 1 0 3h-.5a1 1 0 0 0 0 2h3a1.5 1.5 0 0 0 1.5-1.5V4.5H19v6.5h-3.5a1 1 0 0 0 0 2h.5a1.5 1.5 0 0 1 0 3H13v3.5H4.5v-8.5H8a1.5 1.5 0 0 0 0-3h-.5a1 1 0 0 1 0-2H9v-2Z" />
        <path d="M9 4.5h3a1.5 1.5 0 0 1 0 3h-.5a1 1 0 0 0 0 2h3a1.5 1.5 0 0 0 1.5-1.5V4.5" stroke="var(--accent)" />
      </>
    ),
  },
  {
    idx: "03",
    title: "Transparent Pricing",
    desc: "Transparent pricing with no hidden fees",
    icon: (
      <>
        <rect x="4.5" y="4.5" width="10" height="10" rx="1.5" />
        <rect x="9.5" y="9.5" width="10" height="10" rx="1.5" stroke="var(--accent)" />
      </>
    ),
  },
  {
    idx: "04",
    title: "Measureable Results",
    desc: "Proven track record with measurable results",
    icon: (
      <>
        <circle cx="7.5" cy="16.5" r="3" />
        <path d="M9.6 14.4 17 7l1.5-3 2.5 2.5-3 1.5-7.4 7.4" stroke="var(--accent)" />
      </>
    ),
  },
];

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
      <div className="px-5 py-16 sm:px-10 sm:py-24 lg:py-32">
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
              <div
                className="flex h-full flex-col justify-between gap-8 rounded-2xl border border-line bg-white p-6"
                style={{ ["--accent" as string]: "#14b8a6" }}
              >
                <div className="flex items-center justify-between">
                  <ProgressDots active={i + 1} />
                  <span className="text-[10px] font-semibold tracking-[-0.06em]">{s.idx}</span>
                </div>
                <div>
                  <h4 className="mb-3 text-[19px] font-semibold tracking-[-0.02em]">{s.title}</h4>
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-[10px] border border-line bg-white">
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="var(--ink)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      {s.icon}
                    </svg>
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
