import { Header } from "@/components/layout/Header";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { SmartLink } from "@/components/ui/SmartLink";
import { ServiceFaq } from "@/components/service-page/ServiceFaq";
import { Band, Heading } from "@/components/sidekick/SidekickChrome";
import { MockScreen, type Mock } from "@/components/capability/MockScreen";

/**
 * The page behind a service that is scoped on a call rather than bought from
 * a price list: dashboards, Google Ads, apps and automation.
 *
 * These three used to be "Full page coming soon" stubs. They share one shape
 * because they answer the same four questions in the same order: what is it,
 * which version of it do I want, what does it do beyond the obvious, and how
 * does it get built. One template means the three cannot drift apart in
 * layout the way the older service pages did.
 *
 * Every `segments[].id` is a menu destination. src/content/nav.tsx links to
 * them by name, so renaming one here breaks a menu choice there.
 */
export type CapabilitySegment = {
  id: string;
  kicker: string;
  heading: string;
  body: string;
  points: string[];
  mock: Mock;
};

export type CapabilityPageData = {
  kicker: string;
  h1Lead: string;
  h1Accent: string;
  intro: string;
  /** One line under the hero buttons. */
  heroNote: string;
  heroMock: Mock;
  argument: {
    kicker: string;
    heading: string[];
    sub: string;
    cards: { k: string; v: string }[];
    after?: string;
  };
  segmentsIntro: { kicker: string; heading: string; sub: string };
  segments: CapabilitySegment[];
  extras: { kicker: string; heading: string; sub: string; items: { h: string; b: string }[] };
  connects?: { kicker: string; heading: string; sub: string; items: string[]; note: string };
  process: { kicker: string; heading: string; sub: string; steps: { h: string; b: string }[] };
  /** How it is priced, in words. No figure is ever typed here. */
  pricing: { kicker: string; heading: string; sub: string; points: string[] };
  faq: { heading: string; subheading: string; items: { q: string; a: string }[] };
  close: { heading: string; sub: string };
};

const BOOK = "/schedule-strategy-call";

function Tick({ dark = false }: { dark?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`mt-[3px] h-[17px] w-[17px] flex-none ${dark ? "text-[color:#3fd8bb]" : "text-[color:var(--green-text)]"}`}
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.8 7.7-5.6 5.6a1 1 0 0 1-1.4 0l-2.6-2.6a1 1 0 1 1 1.4-1.4l1.9 1.9 4.9-4.9a1 1 0 0 1 1.4 1.4Z" />
    </svg>
  );
}

export function CapabilityPage({ data }: { data: CapabilityPageData }) {
  const first = data.segments[0];
  return (
    <>
      <Header />

      {/* ---------- Hero ---------- */}
      <section className="mx-auto max-w-[1400px] px-5 pb-6 pt-8 sm:px-10 sm:pt-12">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--green-text)]/30 bg-[color:var(--green-text)]/10 px-3.5 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.14em] text-[color:var(--green-text)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--green-text)]" />
                {data.kicker}
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-5 text-[clamp(32px,4.4vw,54px)] font-semibold leading-[1.03] tracking-[-0.04em]">
                {data.h1Lead} <span className="text-[color:var(--green-text)]">{data.h1Accent}</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-[540px] text-[17.5px] leading-relaxed text-grey">{data.intro}</p>
            </Reveal>
            <Reveal delay={0.15} className="mt-8">
              <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <Button href={BOOK} pulse className="w-full justify-center sm:w-auto">
                  Book a strategy call
                </Button>
                <SmartLink
                  href={`#${first.id}`}
                  className="text-center text-[14.5px] font-semibold text-ink/60 underline-offset-4 hover:underline sm:text-left"
                >
                  See what we build
                </SmartLink>
              </div>
              <p className="mt-3.5 max-w-[460px] text-[13.5px] leading-snug text-grey">{data.heroNote}</p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <MockScreen mock={data.heroMock} />
          </Reveal>
        </div>
      </section>

      {/* ---------- The argument ---------- */}
      <Band dark>
        <Heading kicker={data.argument.kicker} dark sub={data.argument.sub}>
          {data.argument.heading.map((line, i) => (
            <span key={line} className="block">
              {line}
              {i < data.argument.heading.length - 1 ? " " : ""}
            </span>
          ))}
        </Heading>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.argument.cards.map((c) => (
            <div key={c.k} className="rounded-2xl border border-white/12 bg-white/[0.05] p-6">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/50">{c.k}</p>
              <p className="mt-2 text-[18px] font-semibold leading-snug tracking-[-0.02em]">{c.v}</p>
            </div>
          ))}
        </div>
        {data.argument.after && (
          <p className="mt-8 max-w-[720px] text-[15.5px] leading-relaxed text-white/60">{data.argument.after}</p>
        )}
      </Band>

      {/* ---------- The versions of it ---------- */}
      <Band>
        <Heading kicker={data.segmentsIntro.kicker} sub={data.segmentsIntro.sub}>
          {data.segmentsIntro.heading}
        </Heading>

        <div className="mt-12 grid gap-16 sm:gap-20">
          {data.segments.map((s, i) => (
            <div
              key={s.id}
              id={s.id}
              className={`grid scroll-mt-28 items-center gap-8 lg:grid-cols-2 lg:gap-14 ${
                i % 2 === 1 ? "lg:[&>figure]:order-first" : ""
              }`}
            >
              <Reveal>
                <div>
                  <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-[color:var(--green-text)]">
                    {s.kicker}
                  </span>
                  <h3 className="mt-3 text-[clamp(22px,2.6vw,32px)] font-semibold leading-[1.1] tracking-[-0.03em]">
                    {s.heading}
                  </h3>
                  <p className="mt-4 max-w-[500px] text-[16px] leading-relaxed text-grey">{s.body}</p>
                  <ul className="mt-5 grid max-w-[500px] gap-2.5">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-[15px] leading-snug">
                        <Tick />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <MockScreen mock={s.mock} />
            </div>
          ))}
        </div>
      </Band>

      {/* ---------- Beyond the obvious ---------- */}
      <Band dark>
        <Heading kicker={data.extras.kicker} dark sub={data.extras.sub}>
          {data.extras.heading}
        </Heading>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.extras.items.map((d, i) => (
            <Reveal key={d.h} delay={i * 0.04}>
              <div className="h-full rounded-2xl border border-white/12 bg-white/[0.05] p-6">
                <h3 className="text-[18px] font-semibold tracking-[-0.02em]">{d.h}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-white/65">{d.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* ---------- What it connects to ---------- */}
      {data.connects && (
        <Band>
          <Heading kicker={data.connects.kicker} sub={data.connects.sub}>
            {data.connects.heading}
          </Heading>
          <ul className="mt-9 flex flex-wrap gap-2.5">
            {data.connects.items.map((c) => (
              <li
                key={c}
                className="rounded-full border border-line bg-white px-4 py-2 text-[14.5px] font-medium tracking-[-0.01em]"
              >
                {c}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-[620px] text-[15px] leading-relaxed text-grey">{data.connects.note}</p>
        </Band>
      )}

      {/* ---------- How it gets built ---------- */}
      <Band>
        <Heading kicker={data.process.kicker} sub={data.process.sub}>
          {data.process.heading}
        </Heading>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.process.steps.map((s, i) => (
            <Reveal key={s.h} delay={i * 0.04}>
              <li className="h-full rounded-2xl border border-line bg-white p-6">
                <span className="text-[13px] font-bold tracking-[0.14em] text-[color:var(--green-text)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.02em]">{s.h}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-grey">{s.b}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Band>

      {/* ---------- How it is priced ---------- */}
      <Band dark>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
          <Heading kicker={data.pricing.kicker} dark sub={data.pricing.sub}>
            {data.pricing.heading}
          </Heading>
          <div>
            <ul className="grid gap-3">
              {data.pricing.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-[15.5px] leading-snug text-white/85">
                  <Tick dark />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href={BOOK} variant="light" className="w-full justify-center sm:w-auto">
                Book a strategy call
              </Button>
            </div>
          </div>
        </div>
      </Band>

      <ServiceFaq faq={data.faq} />

      {/* ---------- Close ---------- */}
      <Band dark>
        <div className="mx-auto max-w-[720px] text-center">
          <h2 className="text-[clamp(26px,3.2vw,42px)] font-semibold leading-[1.08] tracking-[-0.035em]">
            {data.close.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[16px] leading-relaxed text-white/70">{data.close.sub}</p>
          <div className="mt-8 flex justify-center">
            <Button href={BOOK} variant="light" className="w-full justify-center sm:w-auto">
              Book a strategy call
            </Button>
          </div>
        </div>
      </Band>

      <ContactFooter />
    </>
  );
}
