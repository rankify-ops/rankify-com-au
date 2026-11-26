import { Reveal } from "@/components/ui/Reveal";

export function StatsManifesto() {
  return (
    <section className="mx-2 mt-8 sm:mt-12 lg:mt-20 rounded-3xl bg-paper text-ink">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-10 sm:py-24 lg:py-32">
        <div className="max-w-[1080px]">
          <Reveal>
            <p className="mb-5 font-semibold">Rankify®</p>
          </Reveal>
          <Reveal>
            <p className="mb-8 text-[clamp(28px,2.8vw,52px)] font-medium leading-[1.08] tracking-[-0.05em]">
              We build things that keep earning after launch day.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-[780px] text-[clamp(17px,1.3vw,22px)] font-medium tracking-[-0.02em] text-grey">
              A website that loads fast and turns visitors into enquiries. A store that sells. An ad
              account that reports profit. Software that takes a job off your desk.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-[18px] max-w-[780px] text-[clamp(17px,1.3vw,22px)] font-medium tracking-[-0.02em] text-grey">
              Each one is built by people who do this every day, with the newest tools, at a price
              you know before we start.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
