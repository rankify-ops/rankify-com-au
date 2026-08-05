import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

const SERVICES = [
  { href: "/shopify-development-services", label: "Shopify Web Development" },
  { href: "/web-design-and-development", label: "Web Design & Development" },
  { href: "/seo", label: "SEO Optimisation" },
  { href: "/professional-logo-design", label: "Professional Logo Design" },
  { href: "/professional-logo-design", label: "Branding & Identity" },
];

export function Hero() {
  return (
    <section className="grain relative mx-2 overflow-hidden rounded-3xl bg-[radial-gradient(120%_140%_at_20%_0%,#06382a_0%,var(--green-deep)_45%,#010f0a_100%)] text-white">
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-50"
        src="/assets/hero-bg.mp4"
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
              src="/assets/images/n92JU5BqmoxMotdcH6fGsTpi7e4.svg"
              alt="Rankify®"
              width={974}
              height={210}
              priority
              className="h-auto w-full lg:w-[62vw] lg:max-w-[1180px]"
            />
          </Reveal>
          <Reveal delay={0.15}>
            <h1 className="mb-5 max-w-[430px] text-[clamp(20px,1.5vw,28px)] font-bold leading-tight tracking-[-0.04em]">
              Web Developer, SEO &amp; Branding Studio
            </h1>
            <ul className="grid gap-2.5">
              {SERVICES.map((s, i) => (
                <li key={s.label + i}>
                  <a
                    href={s.href}
                    className="group inline-flex items-center gap-2.5 text-[15px] font-medium opacity-95 transition-all hover:translate-x-1 hover:opacity-100"
                  >
                    <span className="h-4 w-4 flex-none rounded-full bg-white [mask-image:radial-gradient(circle,black_55%,transparent_60%)]" />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mt-auto flex flex-col items-start justify-between gap-8 pt-16 lg:flex-row lg:items-end">
          <Reveal delay={0.25}>
            <p className="max-w-[480px] text-[clamp(17px,1.25vw,22px)] font-semibold leading-snug tracking-[-0.02em]">
              No generic websites. No empty marketing promises.{" "}
              <span className="text-white/65">
                Just tools and strategies that help your business grow and your brand shine.
              </span>
            </p>
          </Reveal>
          <span className="order-3 text-[13px] text-white/55 lg:order-none">© 2026 Rankify®</span>
          <Reveal delay={0.35}>
            <div className="flex max-w-[400px] gap-4 rounded-2xl border border-white/15 bg-white/5 p-3 backdrop-blur-md">
              <Image
                src="/assets/images/fZdV1icYbXIkqfVAekWtJEAifo.png"
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
