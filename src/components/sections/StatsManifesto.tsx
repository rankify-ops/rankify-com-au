import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";

const STATS = [
  { to: 5, suffix: "", label: "Average Review Rating", note: "/5" },
  { to: 40, suffix: "+", label: "Successful projects launched" },
  { to: 100, suffix: "%", label: "Client satisfaction rate" },
  { to: 10, suffix: "k+", label: "Monthly visitors driven through SEO" },
];

export function StatsManifesto() {
  return (
    <section className="grain mx-2 mt-2 rounded-3xl bg-[radial-gradient(120%_140%_at_20%_0%,#06382a_0%,var(--green-deep)_45%,#010f0a_100%)] text-white">
      <div className="relative z-[2] px-5 py-16 sm:px-10 sm:py-24 lg:py-32">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-line-dark pt-10 sm:pt-16 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div className="text-[clamp(48px,5vw,92px)] font-medium leading-none tracking-[-0.05em]">
                <Counter to={s.to} suffix={s.suffix} />
                {s.note && <span className="text-white/50 text-[0.4em]">{s.note}</span>}
              </div>
              <p className="mt-2.5 text-[14.5px] text-white/60">{s.label}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 max-w-[1080px] sm:mt-24 lg:mt-32">
          <Reveal>
            <p className="mb-5 font-semibold">Rankify®</p>
          </Reveal>
          <Reveal>
            <p className="mb-8 text-[clamp(28px,2.8vw,52px)] font-medium leading-[1.08] tracking-[-0.05em]">
              Every project we take on is designed for long-term success.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-[780px] text-[clamp(17px,1.3vw,22px)] font-medium tracking-[-0.02em] text-grey">
              Our approach is simple: we focus on functionality, speed, and clarity, ensuring that every
              project serves a clear purpose without unnecessary complexity.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-[18px] max-w-[780px] text-[clamp(17px,1.3vw,22px)] font-medium tracking-[-0.02em] text-grey">
              We don&rsquo;t overpromise or use flashy marketing language. We simply build well-designed,
              functional websites and strategies that help businesses succeed.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
