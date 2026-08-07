import Image from "next/image";
import { asset } from "@/lib/basePath";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

/* Icon-badge rows borrowed from the Adalytical hero's value list: a 30px
   rounded badge, a 16px stroke icon, 12px gap. Gives the corner some weight
   that five bare dot points didn't have. */
const Ico = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const SERVICES = [
  {
    href: "/web-design-and-development",
    label: "Web Development",
    icon: <Ico d="m9 8-4.5 4L9 16M15 8l4.5 4L15 16" />,
  },
  {
    href: "/shopify-development-services",
    label: "Shopify",
    icon: <Ico d="M4 5h2l2 10h9l2-7H7M9.5 19.5h.01M16.5 19.5h.01" />,
  },
  {
    href: "/seo",
    label: "SEO",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
        <circle cx="11" cy="11" r="6.5" />
        <path d="m20 20-4.4-4.4" />
      </svg>
    ),
  },
  {
    href: "/google-ads",
    label: "Google Ads",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3.4" />
      </svg>
    ),
  },
  {
    href: "/meta-ads",
    label: "Meta Ads",
    icon: <Ico d="M4 10v4h3l6 4V6L7 10H4ZM17.5 9.2a4.2 4.2 0 0 1 0 5.6" />,
  },
  {
    href: "/ai-and-automation",
    label: "AI & Automation",
    icon: <Ico d="M7.5 9.5h9a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2ZM12 6.5v3M12 4.2h.01M9.5 13.5h.01M14.5 13.5h.01M3.2 12.5v3M20.8 12.5v3" />,
  },
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
            {/* Two columns of three at every width — as a single column the
                six services ate most of the phone screen. */}
            <ul className="mt-5 grid max-w-[430px] grid-cols-2 gap-x-3 gap-y-3 sm:mt-6 sm:gap-y-3.5">
              {SERVICES.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    className="group inline-flex items-center gap-2 whitespace-nowrap text-[12.5px] font-medium text-white/80 transition-colors hover:text-white sm:text-[14px]"
                  >
                    <span className="flex h-[26px] w-[26px] flex-none items-center justify-center rounded-[8px] border border-white/12 bg-white/[0.07] text-[color:#07a889] transition-all duration-300 group-hover:border-[color:#07a889]/40 group-hover:bg-[color:#07a889]/15 sm:h-7 sm:w-7 sm:rounded-[9px] [&_svg]:h-[14px] [&_svg]:w-[14px] sm:[&_svg]:h-[15px] sm:[&_svg]:w-[15px]">
                      {s.icon}
                    </span>
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
