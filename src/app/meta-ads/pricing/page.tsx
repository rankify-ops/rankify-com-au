import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceFaq } from "@/components/service-page/ServiceFaq";
import { Band, Heading, SidekickCta, SidekickNav } from "@/components/sidekick/SidekickChrome";
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
  alternates: { canonical: "/meta-ads/pricing" },
};

function Cell({ v }: { v: string | boolean }) {
  if (v === true)
    return (
      <svg viewBox="0 0 24 24" className="mx-auto h-5 w-5 text-[color:var(--green-text)]" fill="currentColor">
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.8 7.7-5.6 5.6a1 1 0 0 1-1.4 0l-2.6-2.6a1 1 0 1 1 1.4-1.4l1.9 1.9 4.9-4.9a1 1 0 0 1 1.4 1.4Z" />
      </svg>
    );
  if (v === false) return <span className="text-grey/50">—</span>;
  return <span className="text-[14.5px] font-medium">{v}</span>;
}

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
        <div className="grid gap-4 lg:grid-cols-3">
          {SIDEKICK_PLANS.map((p) => (
            <Reveal key={p.id}>
              <div
                className={`flex h-full flex-col rounded-2xl border p-7 ${
                  p.featured
                    ? "border-[color:var(--green-text)] bg-white shadow-[0_24px_60px_-34px_rgba(0,33,23,0.6)]"
                    : "border-line bg-white"
                }`}
              >
                {p.featured && (
                  <span className="mb-3 self-start rounded-full bg-[color:var(--green-text)] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white">
                    Most pick this
                  </span>
                )}
                <h2 className="text-[22px] font-semibold tracking-[-0.025em]">{p.name}</h2>
                <p className="mt-1 text-[14.5px] text-grey">{p.pitch}</p>
                <p className="mt-5 text-[40px] font-semibold leading-none tracking-[-0.04em]">
                  ${p.priceAud}
                  <span className="text-[15px] font-medium text-grey">/mo</span>
                </p>
                <ul className="mt-5 grid gap-2 text-[14.5px] text-grey">
                  <li>{p.brands}</li>
                  <li>{p.creatives}</li>
                  <li>Each extra brand ${p.extraBrandAud}/mo</li>
                  <li>Your whole team, at no extra cost</li>
                </ul>
                <div className="mt-7">
                  <SidekickCta />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* ---------- The full table ---------- */}
      <Band>
        <Heading kicker="Side by side" sub="Rendered from the same table the app enforces, so a row here is a page you will or will not find in your sidebar.">
          Everything, line by line.
        </Heading>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-b border-line">
                <th className="py-4 pr-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-grey">
                  What you get
                </th>
                {SIDEKICK_PLANS.map((p) => (
                  <th key={p.id} className="px-4 py-4 text-center">
                    <span className="block text-[16px] font-semibold tracking-[-0.02em]">{p.name}</span>
                    <span className="block text-[13px] text-grey">${p.priceAud}/mo</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PLAN_ROWS.map((r) => (
                <tr key={r.label} className="border-b border-line/70">
                  <td className="py-4 pr-4 align-top">
                    <span className="block text-[15px] font-medium leading-snug">{r.label}</span>
                    {r.note && <span className="mt-1 block max-w-[420px] text-[13.5px] text-grey">{r.note}</span>}
                  </td>
                  <td className="px-4 py-4 text-center align-top">
                    <Cell v={r.basic} />
                  </td>
                  <td className="px-4 py-4 text-center align-top">
                    <Cell v={r.pro} />
                  </td>
                  <td className="px-4 py-4 text-center align-top">
                    <Cell v={r.max} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 max-w-[620px] text-[14.5px] leading-relaxed text-grey">
          Prices are in Australian dollars, per month. No contract and no exit fee — turn it off
          whenever you like.
        </p>
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
