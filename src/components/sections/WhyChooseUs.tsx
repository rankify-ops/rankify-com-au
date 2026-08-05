import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { Button } from "@/components/ui/Button";

export function WhyChooseUs() {
  return (
    <section className="mx-2 mt-2 rounded-3xl bg-paper text-ink">
      <div className="px-5 py-16 sm:px-10 sm:py-24 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-[minmax(200px,1fr)_2.2fr] lg:gap-20">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-[15px] font-medium">
              <span className="h-[18px] w-[18px] rounded-full bg-current opacity-80" />
              Why choose us
            </span>
          </Reveal>
          <div>
            <Reveal>
              <h2 className="text-[clamp(40px,3.55vw,68px)] font-medium leading-[0.92] tracking-[-0.06em]">
                Proven results for every project,{" "}
                <span className="text-grey">with a focus on design and functionality.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-10 flex flex-wrap items-center gap-5">
                <Button href="/contact">Let&rsquo;s talk</Button>
                <p className="max-w-[240px] text-[15px] text-grey">
                  Your digital journey begins with a conversation. Let&rsquo;s talk today.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid gap-10 lg:mt-28 lg:grid-cols-[minmax(220px,380px)_1fr] lg:gap-20">
          <Reveal scale>
            <div className="aspect-[0.72] max-w-[380px] overflow-hidden rounded-2xl">
              <Image
                src="/assets/images/kcxjwUcQKZbRLbLzb6nVeWSrM.jpg"
                alt=""
                width={736}
                height={1313}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <p className="text-[clamp(20px,1.7vw,32px)] font-semibold leading-tight tracking-[-0.06em]">
                No fluff, just results.{" "}
                <span className="text-grey">
                  Thoughtful design and tools that make your work easier. We focus on smart design and
                  useful features, project after project.
                </span>
              </p>
            </Reveal>

            <div className="mt-10 border-t border-line lg:mt-16">
              <Reveal>
                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-6 border-b border-line py-7">
                  <span className="min-w-[2.6ch] text-[clamp(56px,6vw,104px)] font-medium leading-none tracking-[-0.05em]">
                    <Counter to={40} suffix="+" />
                  </span>
                  <span className="text-sm text-grey">01</span>
                  <span className="text-right text-[clamp(18px,1.4vw,24px)] font-semibold tracking-[-0.02em]">
                    Successful projects completed
                    <small className="mt-1 block text-sm font-normal text-grey">
                      We&rsquo;ve delivered 40 projects that help companies generate real results.
                    </small>
                  </span>
                </div>
              </Reveal>
              <Reveal>
                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-6 border-b border-line py-7">
                  <span className="text-[clamp(56px,6vw,104px)] font-medium leading-none tracking-[-0.05em]">
                    <Counter to={100} suffix="%" />
                  </span>
                  <span className="text-sm text-grey">02</span>
                  <span className="text-right text-[clamp(18px,1.4vw,24px)] font-semibold tracking-[-0.02em]">
                    Customer satisfaction rate
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
