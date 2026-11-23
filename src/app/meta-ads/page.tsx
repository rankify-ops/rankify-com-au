import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceFaq } from "@/components/service-page/ServiceFaq";
import { Shot } from "@/components/sidekick/Shot";
import { Band, Heading, SidekickCta, SidekickNav, SIGNUP_HREF } from "@/components/sidekick/SidekickChrome";
import { PlanFootnote, PlanMatrix, PlanPanel, PlanRow } from "@/components/ui/PlanTable";
import type { PlanColumn } from "@/components/ui/PlanTable";
import { PLAN_ROWS, SIDEKICK_FAQ, SIDEKICK_PLANS, LEARNING_NOTES } from "@/content/sidekick";
import { SIDEKICK_STAGES } from "@/content/sidekick-stages";
import { SIDEKICK_FROM, SIDEKICK_TIERS, SIDEKICK_TO } from "@/content/pricing.generated";

/**
 * Ad Sidekick, sold as its own product, on one page.
 *
 * This URL used to be a "coming soon" placeholder for done-for-you Meta
 * management. It keeps the URL because the search intent is an exact match
 * and it already ranks; what it sells is now the product.
 *
 * How it works and Pricing used to be pages of their own. They are sections
 * here, reached by the tab bar, because the three pages told one continuous
 * story and splitting it made a reader navigate to finish a sentence. The old
 * URLs still answer — they render the same content and point their canonical
 * at this page, so the ranking consolidates here rather than competing with
 * itself.
 */
export const metadata: Metadata = {
  title: "Ad Sidekick — run your Meta ads without logging into Meta | Rankify",
  description:
    `Upload your ads and Ad Sidekick names them, builds the campaigns, tells you which are working, when to scale and what to turn off. For Shopify brands. ${SIDEKICK_TIERS} a month, no contract.`,
  alternates: { canonical: "/meta-ads" },
};

const DOES = [
  {
    h: "Names and writes every ad",
    b: "Upload the file and it is named to your convention with its copy written. No more ad-3-final-v2.",
  },
  {
    h: "Builds the campaigns",
    b: "Audiences, campaigns and ad sets set up for you, with the right number of ads for your budget.",
  },
  {
    h: "Tells you what is working",
    b: "Which ads to scale, which to turn off, which to leave alone — and when, rather than on a hunch.",
  },
  {
    h: "Keeps every winner",
    b: "Winning ads are kept and analysed, so the next one is built from what already worked.",
  },
  {
    h: "A daily P&L",
    b: "Spend against revenue every day, so you know whether yesterday made money before you spend today.",
  },
  {
    h: "Teaches you as it goes",
    b: "Short notes appear at the moment the thing being explained is on screen, not in a manual nobody opens.",
  },
];

/**
 * The three plans as table columns, and the rows keyed to match.
 *
 * `PLAN_ROWS` already carries one `basic`/`pro`/`max` value per row, so the
 * column ids are the plan ids and no mapping table is needed between the two.
 */
const COLUMNS: PlanColumn[] = SIDEKICK_PLANS.map((p) => ({
  id: p.id,
  name: p.name,
  priceLabel: `$${p.priceAud}/mo`,
  featured: p.featured,
}));

const MATRIX_ROWS = PLAN_ROWS.map((r) => ({
  label: r.label,
  note: r.note,
  values: { basic: r.basic, pro: r.pro, max: r.max },
}));

export default function MetaAdsPage() {
  return (
    <>
      <Header />
      <SidekickNav current="overview" />

      {/* ---------- Hero ---------- */}
      <section id="overview" className="mx-auto max-w-[1400px] scroll-mt-24 px-5 pb-6 pt-6 sm:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--green-text)]/30 bg-[color:var(--green-text)]/10 px-3.5 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.14em] text-[color:var(--green-text)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--green-text)]" />
                Ad Sidekick
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-5 text-[clamp(32px,4.4vw,54px)] font-semibold leading-[1.03] tracking-[-0.04em]">
                Run your Meta ad account{" "}
                <span className="text-[color:var(--green-text)]">without ever logging into Meta.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-[540px] text-[17.5px] leading-relaxed text-grey">
                Upload your ads. It names them, builds the campaigns, and tells you which are
                working, when to raise spend, and what to turn off. For Shopify brands who want
                ads to be easy.
              </p>
            </Reveal>
            <Reveal delay={0.15} className="mt-8">
              <SidekickCta />
              <p className="mt-3.5 text-[13.5px] text-grey">
                From {SIDEKICK_FROM}/mo. No contract, no exit fee.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Shot alt="The Ad Sidekick dashboard" caption="Every number for the brand, in one place." />
          </Reveal>
        </div>
      </section>

      {/* ---------- The argument ---------- */}
      <Band dark>
        <Heading kicker="Why this exists" dark sub="An agency retainer does not buy ads. It buys the decisions about ads — and those decisions are a system that can be written down. Pay for the system, and the rest of the money goes on actually reaching customers.">
          You are not paying an agency for ads.
          <br />
          You are paying for their system.
        </Heading>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: "Your retainer", v: "whatever you pay now" },
            { k: "Ad Sidekick", v: `${SIDEKICK_FROM} – ${SIDEKICK_TO}/mo` },
            { k: "The difference", v: "goes into ad spend" },
            { k: "To know an ad works", v: "about 3 days" },
          ].map((c) => (
            <div key={c.k} className="rounded-2xl border border-white/12 bg-white/[0.05] p-6">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/50">{c.k}</p>
              <p className="mt-2 text-[20px] font-semibold tracking-[-0.02em]">{c.v}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-[720px] text-[15.5px] leading-relaxed text-white/60">
          The other half of the argument is that you are better placed to run this than an agency
          is. You know the brand and the customer better than they ever will, and you actually
          care whether it works. This is the system, handed to the person with the most at stake.
        </p>
      </Band>

      {/* ---------- What it does ---------- */}
      <Band>
        <Heading kicker="What it does" sub="Every one of these is on every plan, Basic included.">
          The whole job, not a dashboard.
        </Heading>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DOES.map((d, i) => (
            <Reveal key={d.h} delay={i * 0.04}>
              <div className="h-full rounded-2xl border border-line bg-white p-6">
                <h3 className="text-[18px] font-semibold tracking-[-0.02em]">{d.h}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-grey">{d.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* ---------- How it works ----------

          The whole of the old /meta-ads/how-it-works page, section rather than
          page. The four-step summary that used to sit here said the same thing
          as stages 01-06 immediately above them, so it went: one telling of
          the loop, in the detail that actually makes the product legible. */}
      <Band id="how-it-works">
        <Heading
          kicker="How it works"
          sub="This is the whole loop. Six steps, about three days, and you approve everything that goes live."
        >
          One ad, from your desktop to a verdict.
        </Heading>

        <div className="mt-12 grid gap-16">
          {SIDEKICK_STAGES.map((s, i) => (
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
                  <h3 className="mt-3 text-[clamp(22px,2.6vw,32px)] font-semibold leading-[1.1] tracking-[-0.03em]">
                    {s.h}
                  </h3>
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

        <p className="mt-14 max-w-[620px] text-[17px] font-medium leading-relaxed">
          That loop, every week, without you learning Meta first.
        </p>
      </Band>

      {/* ---------- It teaches ---------- */}
      <Band dark>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Heading kicker="It teaches, it does not just run" dark sub="Short notes appear while you work, at the moment the thing being explained is on screen. The audience is people learning Meta, and every note has to change what you do next or it does not exist.">
              You will understand your own ads.
            </Heading>
            <ul className="mt-8 grid gap-2.5">
              {LEARNING_NOTES.map((n) => (
                <li key={n} className="flex items-center gap-3 text-[15.5px] text-white/85">
                  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] flex-none text-[color:#3fd8bb]" fill="currentColor">
                    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.8 7.7-5.6 5.6a1 1 0 0 1-1.4 0l-2.6-2.6a1 1 0 1 1 1.4-1.4l1.9 1.9 4.9-4.9a1 1 0 0 1 1.4 1.4Z" />
                  </svg>
                  {n}
                </li>
              ))}
            </ul>
          </div>
          <Shot alt="A Learning Note shown inside the app" caption="Taught at the moment it matters." />
        </div>
      </Band>

      {/* ---------- Pricing ----------

          The whole of the old /meta-ads/pricing page. This page used to carry
          its own copy of the three plan cards with the price at a different
          size, which is how two screens showing the same three numbers came to
          disagree about how to show them. One copy now, and the full table is
          here rather than a click away. */}
      <Band id="pricing">
        <Heading
          kicker="Pricing"
          sub={
            "Basic is not a crippled tier. Upload, review, testing, winners, the scale checks, the budget planner and the daily P&L are on all three. Pro adds the creative production. Max adds the automation."
          }
        >
          Every plan has the whole product.
        </Heading>

        <Reveal className="mt-10">
          <PlanPanel>
            {SIDEKICK_PLANS.map((p) => (
              <PlanRow
                key={p.id}
                name={p.name}
                badge={p.featured ? "Most pick this" : undefined}
                note={p.pitch}
                price={`$${p.priceAud}`}
                period="/mo"
                sub={`${p.brands} · ${p.creatives}`}
                cta={{ label: "Get started", href: SIGNUP_HREF }}
                featured={p.featured}
              />
            ))}
            <PlanFootnote>
              Every plan includes your whole team at no extra cost. Each extra brand is charged
              per month and is shown in the table below.
            </PlanFootnote>
          </PlanPanel>
        </Reveal>

        <div className="mt-16">
          <Heading kicker="Side by side" sub="Rendered from the same table the app enforces, so a row here is a page you will or will not find in your sidebar.">
            Everything, line by line.
          </Heading>

          <Reveal className="mt-10">
            <PlanPanel>
              <PlanMatrix columns={COLUMNS} rows={MATRIX_ROWS} />
              <PlanFootnote>
                Prices are in Australian dollars, per month. No contract and no exit fee &mdash; turn
                it off whenever you like.
              </PlanFootnote>
            </PlanPanel>
          </Reveal>
        </div>

        <div className="mt-10">
          <SidekickCta />
        </div>
      </Band>

      <ServiceFaq faq={SIDEKICK_FAQ} />

      {/* ---------- Close ---------- */}
      <Band dark>
        <div className="mx-auto max-w-[720px] text-center">
          <h2 className="text-[clamp(26px,3.2vw,42px)] font-semibold leading-[1.08] tracking-[-0.035em]">
            Stop paying for decisions. Buy the system.
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[16px] leading-relaxed text-white/70">
            No contract, no exit fee, and your whole team included. Turn it off whenever you like.
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
