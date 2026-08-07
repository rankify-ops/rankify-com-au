import Image from "next/image";
import { asset } from "@/lib/basePath";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

// Short labels matching the top nav — these sit under the hero tagline.
const SERVICES = [
  { href: "/web-design-and-development", label: "Web Development" },
  { href: "/shopify-development-services", label: "Shopify" },
  { href: "/seo", label: "SEO" },
  { href: "/google-ads", label: "Google Ads" },
  { href: "/meta-ads", label: "Meta Ads" },
];

export function Hero() {
  return (
    <section className="grain relative mx-2 overflow-hidden rounded-3xl bg-[radial-gradient(120%_140%_at_20%_0%,#06382a_0%,var(--green-deep)_45%,#010f0a_100%)] text-white">
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-50"
        src={asset("/assets/hero-bg.mp4")}
        autoPlay
        muted
        loop
        playsInline
      />
      {[2.5, 26, 50, 74].map((left) => (
        <span
          key={left}
          className="absolute z-[1] select-none text-[22px] font-light text-white/35"
          style={{ top: "52%", left: `${left}%` }}
        >
          +
        </span>
      ))}
      <div className="relative z-[2] flex min-h-[calc(100svh-60px)] flex-col px-5 py-8 sm:px-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <Reveal>
            <Image
              src={asset("/assets/images/n92JU5BqmoxMotdcH6fGsTpi7e4.svg")}
              alt="Rankify®"
              width={974}
              height={210}
              priority
              className="h-auto w-full lg:w-[62vw] lg:max-w-[1180px]"
            />
          </Reveal>
          <Reveal delay={0.15}>
            {/* same type treatment as the big page headings (weight 500,
                leading 0.92, tracking -0.05em), scaled to fit the corner */}
            <h1 className="max-w-[430px] text-[clamp(26px,2.65vw,38px)] font-medium leading-[0.92] tracking-[-0.05em]">
              Performance Marketing &amp; Web Development
            </h1>
            <ul className="mt-5 grid max-w-[430px] gap-2">
              {SERVICES.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    className="group inline-flex items-center gap-2.5 text-[15.5px] font-medium text-white/80 transition-all hover:translate-x-1 hover:text-white"
                  >
                    <span className="h-[5px] w-[5px] flex-none rounded-full bg-[color:#07a889]" />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mt-auto flex flex-col items-start justify-between gap-8 pt-16 lg:flex-row lg:items-end">
          <Reveal delay={0.25}>
            <p className="max-w-[480px] text-[clamp(19px,1.6vw,26px)] font-medium leading-[0.98] tracking-[-0.05em]">
              You work directly with us, and the goal is profit.{" "}
              <span className="text-white/65">
                Not clicks, not views — the business performance that actually matters.
              </span>
            </p>
          </Reveal>
          <span className="order-3 text-[13px] text-white/55 lg:order-none">© 2026 Rankify®</span>
          <Reveal delay={0.35}>
            <div className="flex max-w-[400px] gap-4 rounded-2xl border border-white/15 bg-white/5 p-3 backdrop-blur-md">
              <Image
                src={asset("/assets/images/fZdV1icYbXIkqfVAekWtJEAifo.png")}
                alt="Thomas Flood"
                width={104}
                height={118}
                className="h-[118px] w-[104px] flex-none rounded-lg object-cover grayscale"
              />
              <div className="flex flex-col gap-1">
                <strong className="text-base font-semibold">Have a project in mind?</strong>
                <span className="text-[12.5px] text-white/60">
                  Thomas Flood – Director of Digital Strategy
                </span>
                <div className="mt-auto self-start">
                  <Button href="/schedule-strategy-call" variant="light" className="px-5 py-2.5 text-[13.5px]">
                    Let&rsquo;s talk
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
