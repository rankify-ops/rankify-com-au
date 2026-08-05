import Image from "next/image";
import { asset } from "@/lib/basePath";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function Pricing() {
  return (
    <section className="mx-2 mt-2 rounded-3xl bg-paper text-ink">
      <div className="px-5 py-16 sm:px-10 sm:py-24 lg:py-32">
        <div className="mb-10 sm:mb-16 lg:mb-24">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-[15px] font-medium">
              <span className="h-[18px] w-[18px] rounded-full bg-current opacity-80" />
              Simple pricing
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 text-[clamp(40px,3.55vw,68px)] font-medium leading-[0.92] tracking-[-0.06em]">
              Websites Starting From
            </h2>
          </Reveal>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          <Reveal className="flex flex-col gap-7 rounded-2xl border border-line bg-white p-7 sm:p-12">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="mb-2.5 text-sm text-grey">Per project</p>
                <div className="text-[clamp(56px,5.5vw,96px)] font-medium leading-none tracking-[-0.05em]">
                  $3,999 <small className="text-[0.28em] font-medium text-grey">/project</small>
                </div>
              </div>
              <Button href="/contact">Get in touch</Button>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-line bg-paper px-5 py-4 text-[14.5px]">
              <div>
                <strong className="block text-[15px]">
                  Add setup and 2 months of SEO for traffic and leads?
                </strong>
                <span className="text-[13.5px] text-grey">
                  Get marketing and SEO that starts with your goals.
                </span>
              </div>
              <span className="whitespace-nowrap font-semibold">+$1,499</span>
            </div>
            <ul className="border-t border-line">
              {[
                ["Homepage + up to 5 inner pages", ""],
                ["Design and Development", ""],
                ["Mobile-Optimised Design", ""],
                ["Delivery time", "3–4 weeks"],
              ].map(([label, value]) => (
                <li
                  key={label}
                  className="flex justify-between gap-4 border-b border-line py-3.5 text-[15.5px] font-medium"
                >
                  <span>{label}</span>
                  {value && <span className="font-normal text-grey">{value}</span>}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15} className="grain flex flex-col gap-6 overflow-hidden rounded-2xl bg-green-deep p-7 text-white sm:p-12">
            <h3 className="text-[clamp(24px,2vw,36px)] font-medium tracking-[-0.04em]">Looking for more?</h3>
            <p className="text-[15.5px] text-white/70">
              Add marketing, SEO, or Branding—flexible tools to strengthen your project. We&rsquo;ll shape a
              solution that fits your business, not ours.
            </p>
            <div className="mt-auto flex items-center gap-3.5">
              <Image
                src={asset("/assets/images/nK7vZP41akJ7EzYYCVQPQGuVRQg.png")}
                alt="Thomas Flood"
                width={56}
                height={56}
                className="h-14 w-14 rounded-full object-cover grayscale"
              />
              <div>
                <strong className="block text-[15.5px]">Thomas Flood</strong>
                <span className="text-[13px] text-white/60">Director of Digital Strategy</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
