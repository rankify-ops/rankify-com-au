import { Reveal } from "@/components/ui/Reveal";

export function StatsManifesto() {
  return (
    <section className="mx-2 mt-2 rounded-3xl bg-paper text-ink">
      <div className="px-5 py-16 sm:px-10 sm:py-24 lg:py-32">
        <div className="max-w-[1080px]">
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
