import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/service-page/SectionHeading";
import { LottieIcon } from "@/components/ui/LottieIcon";

// Titles double as the Lottie lookup key — see src/content/lottie-map.json.
const STEPS = [
  { idx: "01", title: "Communication", desc: "A team that communicates every step" },
  { idx: "02", title: "Custom Solutions", desc: "Customised solutions for your unique needs" },
  { idx: "03", title: "Transparent Pricing", desc: "Transparent pricing with no hidden fees" },
  { idx: "04", title: "Measureable Results", desc: "Proven track record with measurable results" },
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
          heading="How we launch websites and deliver"
          headingDim="branding & SEO services."
          sub="See how our team combines creativity, technology, and strategy to build powerful digital solutions."
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
                  <LottieIcon name={s.title} className="h-[50px] w-[58px] flex-none" />
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
