import Image from "next/image";
import { asset } from "@/lib/basePath";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PlusIcon } from "@/components/ui/PlusIcon";
import { IconPop } from "@/components/ui/IconPop";
import { LottieIcon } from "@/components/ui/LottieIcon";
import { SERVICE_ICONS } from "@/content/service-icons";
import type { CardGridBlock } from "@/content/service-pages/types";

const COL_CLASS: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

function CardProgressDots({ total, active, dark }: { total: number; active: number; dark: boolean }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`h-1.5 w-1.5 rounded-full ${
            i < active ? (dark ? "bg-white" : "bg-ink") : dark ? "bg-white/20" : "bg-[#e9e9e9]"
          }`}
        />
      ))}
    </div>
  );
}

export function CardGridSection({ block }: { block: CardGridBlock }) {
  const dark = block.theme === "dark";
  const cols = block.columns ?? (block.items.length >= 4 ? 4 : block.items.length === 3 ? 3 : 2);

  return (
    <section
      className={
        dark
          ? "grain mx-2 mt-12 sm:mt-24 lg:mt-48 rounded-3xl bg-[radial-gradient(120%_140%_at_20%_0%,#06382a_0%,var(--green-deep)_45%,#010f0a_100%)] text-white"
          : "mx-2 mt-12 sm:mt-24 lg:mt-48 rounded-3xl bg-paper text-ink"
      }
    >
      <div className="relative z-[2] mx-auto max-w-[1400px] px-5 py-16 sm:px-10 sm:py-24 lg:py-32">
        {block.heading && (
          <div className="grid gap-8 lg:grid-cols-[minmax(180px,1fr)_2.2fr] lg:gap-20">
            {block.kicker ? (
              <Reveal>
                <span className="inline-flex items-center gap-2 text-[15px] font-medium">
                  <PlusIcon dark={!dark} className="h-[18px] w-[18px]" />
                  {block.kicker}
                </span>
              </Reveal>
            ) : (
              <span />
            )}
            <div>
              {block.eyebrow && (
                <Reveal>
                  <p className={`mb-3.5 font-semibold ${dark ? "text-white/70" : "text-grey"}`}>{block.eyebrow}</p>
                </Reveal>
              )}
              <Reveal delay={0.1}>
                <h2 className="text-[clamp(32px,3.1vw,58px)] font-medium leading-[0.96] tracking-[-0.05em]">
                  {block.heading}
                </h2>
              </Reveal>
              {block.subheading && (
                <Reveal delay={0.15}>
                  <p className={`mt-4 max-w-[420px] text-base ${dark ? "text-white/65" : "text-grey"}`}>
                    {block.subheading}
                  </p>
                </Reveal>
              )}
              {block.cta && (
                <Reveal delay={0.2} className="mt-6">
                  <Button href={block.cta.href} variant={dark ? "light" : "dark"}>
                    {block.cta.label}
                  </Button>
                </Reveal>
              )}
            </div>
          </div>
        )}

        <div className={`grid gap-4 ${block.heading ? "mt-10 sm:mt-16" : ""} ${COL_CLASS[cols]}`}>
          {block.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div
                className={`flex h-full flex-col gap-5 overflow-hidden rounded-2xl border p-6 ${
                  dark ? "border-white/12 bg-white/[0.04]" : "border-line bg-white"
                }`}
              >
                {item.idx && (
                  <div className="flex items-center justify-between">
                    <CardProgressDots total={block.items.length} active={i + 1} dark={dark} />
                    <span className={`text-[10px] font-semibold tracking-[-0.06em] ${dark ? "text-white/50" : "text-grey"}`}>
                      {item.idx}
                    </span>
                  </div>
                )}
                {item.image ? (
                  // These illustrations are 2:1 and already contain their own
                  // panel background and numbered badge — show them whole at
                  // full width rather than cropping to a fixed aspect.
                  <div className="mb-2 overflow-hidden rounded-xl">
                    <Image
                      src={asset(item.image)}
                      alt=""
                      width={792}
                      height={393}
                      className="h-auto w-full"
                    />
                  </div>
                ) : SERVICE_ICONS[item.title] ? (
                  <LottieIcon name={item.title} dark={dark} className="h-11 w-11" />
                ) : (
                  <IconPop>
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-[10px] border ${
                        dark ? "border-white/15" : "border-line"
                      }`}
                    >
                      <PlusIcon dark={!dark} className="h-5 w-5" />
                    </span>
                  </IconPop>
                )}
                <div>
                  <h4 className="mb-2 text-[18px] font-semibold tracking-[-0.02em]">{item.title}</h4>
                  {Array.isArray(item.desc) ? (
                    <ul className="grid gap-1.5">
                      {item.desc.map((d) => (
                        <li key={d} className={`flex gap-2 text-[14px] leading-snug ${dark ? "text-white/65" : "text-grey"}`}>
                          <span className="mt-2 h-1 w-1 flex-none rounded-full bg-current" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className={`text-[14.5px] leading-snug ${dark ? "text-white/65" : "text-grey"}`}>{item.desc}</p>
                  )}
                  {item.cta && (
                    <a
                      href={item.cta.href}
                      className={`mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-medium underline ${
                        dark ? "text-white" : "text-ink"
                      }`}
                    >
                      {item.cta.label}
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {block.bottomImage && (
          <Reveal scale className="mt-10 aspect-[16/8] overflow-hidden rounded-2xl lg:mt-16">
            <Image
              src={asset(block.bottomImage)}
              alt=""
              width={1280}
              height={853}
              className="h-full w-full object-cover"
            />
          </Reveal>
        )}
      </div>
    </section>
  );
}
