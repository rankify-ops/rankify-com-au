import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { Reveal } from "@/components/ui/Reveal";
import { Shot } from "@/components/sidekick/Shot";
import { Band, Heading, SidekickCta, SidekickNav } from "@/components/sidekick/SidekickChrome";

/**
 * One ad, from the file on your desktop to a verdict.
 *
 * The page that makes the product legible. It is mostly screenshots on
 * purpose: describing an interface convinces nobody, and this is a product
 * people have to picture themselves using before they will pay for it.
 */
export const metadata: Metadata = {
  title: "How Ad Sidekick works — one ad, start to finish | Rankify",
  description:
    "Follow a single ad through Ad Sidekick: upload, naming and copy, campaign setup, three days of testing, a verdict, and the winner kept for next time.",
  alternates: { canonical: "/meta-ads/how-it-works" },
};

type Stage = {
  n: string;
  h: string;
  b: string;
  detail?: string;
  alt: string;
  caption?: string;
};

const STAGES: Stage[] = [
  {
    n: "01",
    h: "You upload the file",
    b: "Drag in the video or image. That is the whole job at this step — no campaign to name, no ad set to configure, no decisions yet.",
    alt: "The Upload screen",
    caption: "Drop the creative in. Everything after this is handled.",
  },
  {
    n: "02",
    h: "It names it and writes the copy",
    b: "The ad is named to a convention so your account stays readable six months from now, and its primary text is drafted for you.",
    detail: "On Pro and above the convention is your own, rather than the sensible default.",
    alt: "The Review screen with a named ad and drafted copy",
    caption: "You approve it. Nothing is published without that.",
  },
  {
    n: "03",
    h: "The campaign gets built",
    b: "Audiences, campaign and ad sets are set up for you, and it tells you how many ads your budget actually supports.",
    detail:
      "This is the step people get wrong alone. One ad running by itself cannot be compared to anything, so it teaches you nothing — and Meta shifts spend toward whichever ad performs, which it can only do if there are several.",
    alt: "Guided setup: audiences and campaigns",
  },
  {
    n: "04",
    h: "Three days of testing",
    b: "The ads run against each other. Three days is roughly what it takes for the numbers to mean something.",
    detail: "Until then the honest answer is that nobody knows yet, and the app says so rather than inventing a trend.",
    alt: "The Testing screen with ads in flight",
  },
  {
    n: "05",
    h: "A verdict, not a dashboard",
    b: "Scale this one. Turn that one off. Leave the third alone. Told to you in those words, with the reason.",
    alt: "The Scale check with its recommendations",
    caption: "The difference between a report and an instruction.",
  },
  {
    n: "06",
    h: "The winner is kept",
    b: "A winning ad goes into the library and is analysed, so the next ad can be built from what already worked with a new angle.",
    detail: "This is the compounding bit. The account gets better at making ads the longer you run it.",
    alt: "The Winners library",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Header />
      <SidekickNav current="how" />

      <section className="mx-auto max-w-[1400px] px-5 pb-4 pt-6 sm:px-10">
        <Reveal>
          <h1 className="max-w-[820px] text-[clamp(32px,4.2vw,52px)] font-semibold leading-[1.04] tracking-[-0.04em]">
            One ad, from your desktop to a verdict.
          </h1>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-5 max-w-[620px] text-[17.5px] leading-relaxed text-grey">
            This is the whole loop. Six steps, about three days, and you approve everything that
            goes live.
          </p>
        </Reveal>
      </section>

      <Band>
        <div className="grid gap-16">
          {STAGES.map((s, i) => (
            <div
              key={s.n}
              className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${
                i % 2 === 1 ? "lg:[&>figure]:order-first" : ""
              }`}
            >
              <Reveal>
                <div>
                  <span className="text-[13px] font-bold tracking-[0.14em] text-[color:var(--green-text)]">
                    {s.n}
                  </span>
                  <h2 className="mt-3 text-[clamp(22px,2.6vw,32px)] font-semibold leading-[1.1] tracking-[-0.03em]">
                    {s.h}
                  </h2>
                  <p className="mt-4 max-w-[480px] text-[16px] leading-relaxed text-grey">{s.b}</p>
                  {s.detail && (
                    <p className="mt-4 max-w-[480px] border-l-2 border-[color:var(--green-text)]/30 pl-4 text-[15px] leading-relaxed text-grey">
                      {s.detail}
                    </p>
                  )}
                </div>
              </Reveal>
              <Shot alt={s.alt} caption={s.caption} />
            </div>
          ))}
        </div>
      </Band>

      <Band dark>
        <div className="mx-auto max-w-[720px] text-center">
          <h2 className="text-[clamp(26px,3.2vw,42px)] font-semibold leading-[1.08] tracking-[-0.035em]">
            That loop, every week, without you learning Meta first.
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[16px] leading-relaxed text-white/70">
            From $99 a month. No contract, no exit fee, and your whole team included.
          </p>
          <div className="mt-8 flex justify-center">
            <SidekickCta light />
          </div>
        </div>
      </Band>

      <ContactFooter />
    </>
  );
}
