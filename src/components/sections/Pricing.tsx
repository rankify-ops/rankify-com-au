import Image from "next/image";
import { asset } from "@/lib/basePath";
import { Reveal } from "@/components/ui/Reveal";
import { PlusIcon } from "@/components/ui/PlusIcon";
import { Button } from "@/components/ui/Button";

const FEATURES = ["Homepage + up to 5 inner pages", "Design and Development", "Mobile-Optimised Design"];

function FeatureBadgeIcon() {
  return (
    <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-white/10">
      <span className="relative h-2.5 w-2.5">
        <span className="absolute left-1/2 top-0 h-full w-[1.5px] -translate-x-1/2 bg-white" />
        <span className="absolute top-1/2 left-0 h-[1.5px] w-full -translate-y-1/2 bg-white" />
      </span>
    </span>
  );
}

export function Pricing() {
  return (
    <section className="grain mx-2 mt-8 sm:mt-12 lg:mt-20 rounded-3xl bg-[radial-gradient(120%_140%_at_20%_0%,#06382a_0%,var(--green-deep)_45%,#010f0a_100%)] text-white">
      <div className="relative z-[2] mx-auto max-w-[1400px] px-5 py-16 sm:px-10 sm:py-24 lg:py-32">
        <div className="mb-8 sm:mb-12">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-[15px] font-medium">
              <PlusIcon className="h-[18px] w-[18px]" />
              Simple pricing
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 text-[clamp(40px,3.55vw,68px)] font-medium leading-[0.92] tracking-[-0.06em]">
              Websites Starting From
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="mt-8">
            <span className="inline-block rounded-full bg-white px-5 py-2.5 text-[14px] font-semibold text-ink">
              Per project
            </span>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04]">
          <div className="grid gap-10 p-7 sm:p-10 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-between gap-8">
              <div>
                <p className="text-[15.5px] font-medium">Add setup and 2 months of SEO for traffic and leads?</p>
                <p className="mt-2 text-[14.5px] text-white/60">Get marketing and SEO that starts with your goals.</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[27px] font-semibold tracking-[-0.06em]">+$1,499</span>
                <span className="relative inline-flex h-6 w-11 flex-none items-center rounded-full bg-white">
                  <span className="ml-auto mr-1 h-4 w-4 rounded-full bg-[#131313]" />
                </span>
              </div>
            </div>

            <div>
              <div className="mb-8">
                <span className="text-[56px] font-semibold leading-none tracking-[-0.06em]">$3,999</span>
                <span className="ml-1 text-[15px] text-white/60">/project</span>
              </div>
              <ul className="grid gap-3">
                {FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-[14.5px] text-white">
                    <FeatureBadgeIcon />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 px-7 py-6 sm:px-10">
            <div className="flex items-center gap-2 text-[14.5px]">
              <span className="text-white/60">Delivery time</span>
              <span>3-4 weeks</span>
            </div>
            <Button href="/contact" variant="light">
              Get in touch
            </Button>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:mt-20 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-16">
          <Reveal>
            <span className="text-[15px] text-white/60">Looking for more?</span>
          </Reveal>
          <div>
            <Reveal delay={0.1}>
              <p className="max-w-[620px] text-[19px] font-medium leading-snug tracking-[-0.02em]">
                <span className="text-white">Add marketing, SEO, or Branding—</span>
                <span className="text-white/60">
                  flexible tools to strengthen your project. We&rsquo;ll shape a solution that fits your
                  business, not ours.
                </span>
              </p>
            </Reveal>
            <Reveal delay={0.2} className="mt-8 flex items-center gap-3.5">
              <Image
                src={asset("/assets/images/nK7vZP41akJ7EzYYCVQPQGuVRQg.png")}
                alt="Thomas Flood"
                width={44}
                height={44}
                className="h-11 w-11 rounded-full object-cover grayscale"
              />
              <div>
                <strong className="block text-[15px]">Thomas Flood</strong>
                <span className="text-[13px] text-white/60">Director of Digital Strategy</span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
