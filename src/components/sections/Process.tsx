import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/service-page/SectionHeading";
import { LottieIcon } from "@/components/ui/LottieIcon";

// `icon` is the Lottie lookup key (see src/content/lottie-map.json). It used
// to be the title itself, which meant a card could not be reworded without
// losing its animation.
const STEPS = [
  {
    idx: "01",
    icon: "Communication",
    title: "You talk to the builder",
    desc: "The developer doing the work is the one who answers you.",
  },
  {
    idx: "02",
    icon: "Custom Solutions",
    title: "Built for your business",
    desc: "Custom code around how your customers buy. No templates.",
  },
  {
    idx: "03",
    icon: "Transparent Pricing",
    title: "The price comes first",
    desc: "Published, or quoted as one fixed figure, before work starts.",
  },
  {
    idx: "04",
    icon: "Measureable Results",
    title: "Measured in sales",
    desc: "Tracking is wired in, so results are counted in leads and revenue.",
  },
] as const;

export function Process() {
  return (
    <section className="mx-2 mt-8 sm:mt-12 lg:mt-20 rounded-3xl bg-paper text-ink">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-10 sm:py-24 lg:py-32">
        {/* Was a kicker-left / headline-right split at 68px, which pushed the
            grey half of the sentence onto its own oversized lines. Same
            treatment as every other section now. */}
        <SectionHeading
          label="How we work"
          heading="How every project runs,"
          headingDim="whatever we are building."
          sub="Four rules we hold to on every job."
        />

        <div className="mt-10 grid gap-0 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.idx} delay={i * 0.08}>
              {/* Same card shape as the service pages: index row, heading,
                  then the animated icon beside the copy — no border box
                  around the icon, matching the live site. */}
              {/* The icon leads, the copy follows. It used to sit beside the
                  text with a six-dot progress meter above it that filled up
                  1-of-6 through 4-of-6 across four cards — a progress bar
                  measuring nothing. */}
              <div className="neu flex h-full flex-col gap-5 rounded-2xl border border-line bg-white p-[30px]">
                <div className="flex items-start justify-between gap-4">
                  <LottieIcon name={s.icon} className="h-[50px] w-[58px] flex-none" />
                  <span className="text-[13px] font-semibold tracking-[-0.04em] text-grey">{s.idx}</span>
                </div>
                <h4 className="text-[19px] font-semibold tracking-[-0.02em]">{s.title}</h4>
                <p className="text-[15px] leading-snug text-grey">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
