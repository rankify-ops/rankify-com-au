import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceFaq } from "@/components/service-page/ServiceFaq";
import { Band, Heading, SidekickCta, SidekickNav, SIGNUP_HREF } from "@/components/sidekick/SidekickChrome";
import { PlanFootnote, PlanMatrix, PlanPanel, PlanRow } from "@/components/ui/PlanTable";
import type { PlanColumn } from "@/components/ui/PlanTable";
import { PLAN_ROWS, SIDEKICK_PLANS, SIDEKICK_FAQ } from "@/content/sidekick";
import { SIDEKICK_TIERS } from "@/content/pricing.generated";

/**
 * Every row of every plan.
 *
 * The table is rendered from `PLAN_ROWS`, which mirrors `SIDEKICK_FEATURES` in
 * the editor — the file Stripe bills from and the app's own sidebar is pinned
 * to. A row here is a page somebody will or will not find when they sign in,
 * so it has to stay in step with that file rather than be rewritten by hand.
 */
export const metadata: Metadata = {
  title: `Ad Sidekick pricing — ${SIDEKICK_TIERS} a month | Rankify`,
  description:
    "Every plan includes the whole core product: upload, review, testing, winners, the scale checks and the daily P&L. Pro adds creative production, Max adds automation. No contract.",
  // Pricing is a section of /meta-ads now. The URL still answers so
  // nothing already linked or ranked breaks, and the canonical points at
  // the page that carries the whole story.
  alternates: { canonical: "/meta-ads" },
};

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

export default function SidekickPricingPage() {
  return (
    <>
      <Header />
      <SidekickNav current="pricing" />

      <section className="mx-auto max-w-[1400px] px-5 pb-4 pt-6 sm:px-10">
        <Reveal>
          <h1 className="max-w-[820px] text-[clamp(32px,4.2vw,52px)] font-semibold leading-[1.04] tracking-[-0.04em]">
            Every plan has the whole product.
          </h1>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-5 max-w-[620px] text-[17.5px] leading-relaxed text-grey">
            Basic is not a crippled tier. Upload, review, testing, winners, the scale checks, the
            budget planner and the daily P&amp;L are on all three. Pro adds the creative
            production. Max adds the automation.
          </p>
        </Reveal>
      </section>

      {/* ---------- The three ---------- */}
      <Band>
        <Reveal>
          {/* One panel, one row per plan. Three cards each with its own 40px
              price put the numbers in a row and the names nowhere — and the
              pitch, which is the only line that tells you which one you are,
              had to be squeezed to 14.5px under the heading. A row has room
              for the sentence. */}
          <PlanPanel>
            {SIDEKICK_PLANS.map((p) => (
              <PlanRow
                key={p.id}
                name={p.name}
                badge={p.featured ? "Most pick this" : undefined}
                note={p.pitch}
                price={`$${p.priceAud}`}
                period="/mo"
                sub={p.summary}
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
      </Band>

      {/* ---------- The full table ---------- */}
      <Band>
        <Heading kicker="Side by side" sub="Rendered from the same table the app enforces, so a row here is a page you will or will not find in your sidebar.">
          Everything, line by line.
        </Heading>

        {/* The old version of this was `min-w-[720px]` inside an
            `overflow-x-auto`, so on a phone the whole comparison lived behind
            a sideways drag — and the one column you cared about was never the
            one on screen. PlanMatrix gives the phone a list per plan instead. */}
        <Reveal className="mt-10">
          <PlanPanel>
            <PlanMatrix columns={COLUMNS} rows={MATRIX_ROWS} />
            <PlanFootnote>
              Prices are in Australian dollars, per month. No contract and no exit fee &mdash; turn
              it off whenever you like.
            </PlanFootnote>
          </PlanPanel>
        </Reveal>
      </Band>

      <ServiceFaq faq={SIDEKICK_FAQ} />

      <Band dark>
        <div className="mx-auto max-w-[720px] text-center">
          <h2 className="text-[clamp(26px,3.2vw,42px)] font-semibold leading-[1.08] tracking-[-0.035em]">
            Start on Basic. Move when you need to.
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[16px] leading-relaxed text-white/70">
            Nothing is locked. Change plan or stop whenever it suits you.
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
