import type { ReactNode } from "react";
import { Check, Minus } from "lucide-react";
import { SmartLink } from "@/components/ui/SmartLink";

/**
 * Plan and payment tables, in the same hand as the dashboards.
 *
 * Ported from the editor (`plans-dialog.tsx`) and the client billing page,
 * because those two screens are read by people deciding whether to pay us,
 * and they read calmly: one hairline, compact type, figures in `tabular-nums`
 * so a column of prices lines up instead of wobbling, and the plan's name at
 * a size that doesn't shout over its own feature list.
 *
 * What this deliberately drops from the old marketing cards:
 *
 *  - 40px prices in 30px-padded cards. Three of those side by side read as a
 *    wall of numbers with no names attached.
 *  - A filled green tick disc on every single line. A tick that never varies
 *    carries no information; the matrix below only draws one where a plan
 *    actually differs from its neighbour.
 *  - `min-w-[720px]` inside `overflow-x-auto`. A plan table you have to drag
 *    sideways on a phone is a plan table nobody compares. Below `sm` the
 *    matrix becomes one short list per plan, which is how someone on a phone
 *    reads it anyway: they have already picked a column by the time they look.
 *
 * Tokens, not hexes: `--line`, `--paper`, `--grey`, `--ink`, `--green-mid`,
 * `--green-text`. The editor's equivalents are `--line`, `--surface-2`,
 * `--muted`, `--ink`, `--accent`, `--live`, so a rebrand stays a one-file
 * change on both sides.
 */

export type MatrixValue = string | boolean;

export type PlanColumn = {
  id: string;
  name: string;
  /** The price under the column head, e.g. "$249/mo". */
  priceLabel?: string;
  featured?: boolean;
};

export type MatrixRow = {
  label: string;
  note?: string;
  values: Record<string, MatrixValue>;
};

/* --- Panel -------------------------------------------------------------- */

/**
 * The card everything else sits in.
 *
 * White even on the dark green band. A translucent panel there loses its own
 * hairlines into the gradient's grain, and the lines are what organise this.
 */
export function PlanPanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[20px] border border-line bg-white text-ink shadow-[0_1px_2px_rgba(0,0,0,0.04)] ${className}`}
    >
      {children}
    </div>
  );
}

/* --- Plan rows ---------------------------------------------------------- */

/**
 * One plan: what it is called and what it costs, on one line.
 *
 * Rows rather than columns because a row can hold a sentence. Three columns
 * cannot, which is why the old cards had to drop the explanation and lead
 * with the number.
 */
export function PlanRow({
  name,
  badge,
  meta,
  note,
  price,
  period,
  sub,
  cta,
  featured = false,
}: {
  name?: string;
  /** Small pill beside the name, e.g. "Most popular". */
  badge?: string;
  /** Live-dot line, e.g. "8 spots available". */
  meta?: string;
  note?: string;
  price: string;
  period?: string;
  sub?: string;
  cta?: { label: string; href: string };
  featured?: boolean;
}) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-5 gap-y-3 border-b border-line px-5 py-4 last:border-b-0 ${
        featured ? "bg-[color:var(--green-mid)]/[0.045]" : ""
      }`}
    >
      <div className="min-w-0 flex-1 basis-full sm:basis-0">
        {(name || badge) && (
          <p className="flex flex-wrap items-center gap-2 text-[15px] font-semibold tracking-[-0.015em]">
            {name}
            {badge && (
              <span className="rounded-full bg-[color:var(--green-mid)]/[0.09] px-2 py-0.5 text-[11px] font-medium uppercase tracking-[0.06em] text-[color:var(--green-mid)]">
                {badge}
              </span>
            )}
          </p>
        )}
        {meta && (
          <span className="mt-1 inline-flex items-center gap-2 text-[12.5px] text-grey">
            {/* Same live dot as the CTA bar. Scarcity that sits still does not
                read as scarcity. `cta-ping` is already no-op under reduced
                motion. */}
            <span className="relative flex h-1.5 w-1.5 flex-none items-center justify-center">
              <span className="cta-ping absolute inline-flex h-full w-full rounded-full bg-[#07a889]" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#07a889]" />
            </span>
            {meta}
          </span>
        )}
        {note && <p className="mt-1 max-w-[560px] text-[13px] leading-snug text-grey">{note}</p>}
      </div>

      {/* Shrinkable below sm. `shrink-0` on a flex item holds it at its
          max-content width, so a long `sub` line sets the whole block ~380px
          wide and the panel, which is overflow-hidden, cuts the end of it off
          on a phone. It only needs to resist shrinking from sm up, where it
          shares the row with the name and the CTA. */}
      <p className="max-w-full text-left sm:shrink-0 sm:text-right">
        <span className="text-[22px] font-semibold tabular-nums tracking-[-0.03em]">{price}</span>
        {period && <span className="ml-1 text-[12.5px] text-grey">{period}</span>}
        {sub && <span className="mt-0.5 block text-[12px] text-grey/80">{sub}</span>}
      </p>

      {cta && (
        <SmartLink
          href={cta.href}
          className={`w-full shrink-0 rounded-full px-4 py-2.5 text-center text-[13.5px] font-medium transition-colors sm:w-auto sm:py-2 ${
            featured
              ? "bg-[color:var(--green-mid)] text-white hover:bg-[color:var(--green-deep)]"
              : "border border-line bg-white text-ink hover:border-[color:var(--green-mid)] hover:text-[color:var(--green-mid)]"
          }`}
        >
          {cta.label}
        </SmartLink>
      )}
    </div>
  );
}

/* --- Matrix ------------------------------------------------------------- */

/** A tick, a dash, or the words, whichever says more. */
function Cell({ value }: { value: MatrixValue }) {
  if (value === true)
    return (
      <Check
        aria-label="Included"
        className="mx-auto h-4 w-4 text-[color:var(--green-text)]"
        strokeWidth={2.5}
      />
    );
  if (value === false)
    return <Minus aria-label="Not included" className="mx-auto h-4 w-4 text-grey/45" strokeWidth={2.5} />;
  return <span className="text-[12.5px] font-medium leading-snug text-ink/80">{value}</span>;
}

/**
 * The side-by-side comparison.
 *
 * Desktop is a real `<table>` so a screen reader announces each cell with its
 * row and column. Below `sm` it is one list per plan, with the rows a plan
 * does not have simply absent rather than drawn as a dash: a phone has no
 * room to spend on the things you do not get.
 */
export function PlanMatrix({
  rowsHeading = "What you get",
  columns,
  rows,
}: {
  rowsHeading?: string;
  columns: PlanColumn[];
  rows: MatrixRow[];
}) {
  const colWidth = `${Math.floor(58 / Math.max(columns.length, 1))}%`;

  return (
    <>
      <div className="hidden sm:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-line bg-paper/70">
              <th scope="col" className="px-5 py-3 text-[12px] font-medium text-grey">
                {rowsHeading}
              </th>
              {columns.map((c) => (
                <th
                  key={c.id}
                  scope="col"
                  style={{ width: colWidth }}
                  className={`px-3 py-3 text-center text-[12.5px] font-semibold ${
                    c.featured ? "text-[color:var(--green-mid)]" : "text-ink/80"
                  }`}
                >
                  {c.name}
                  {c.priceLabel && (
                    <span className="mt-0.5 block text-[11.5px] font-normal tabular-nums text-grey">
                      {c.priceLabel}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-b border-line last:border-0">
                <th scope="row" className="px-5 py-3 text-left align-top font-normal">
                  <span className="block text-[13.5px] font-medium leading-snug">{r.label}</span>
                  {r.note && (
                    <span className="mt-0.5 block max-w-[460px] text-[11.5px] leading-snug text-grey/85">
                      {r.note}
                    </span>
                  )}
                </th>
                {columns.map((c) => (
                  <td
                    key={c.id}
                    className={`px-3 py-3 text-center align-top ${
                      c.featured ? "bg-[color:var(--green-mid)]/[0.035]" : ""
                    }`}
                  >
                    <Cell value={r.values[c.id]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phone: a list per plan, no sideways drag. */}
      <div className="divide-y divide-line sm:hidden">
        {columns.map((c) => (
          <div key={c.id} className="px-5 py-4">
            <p className="flex flex-wrap items-baseline gap-x-2 text-[13.5px] font-semibold">
              <span className={c.featured ? "text-[color:var(--green-mid)]" : ""}>{c.name}</span>
              {c.priceLabel && (
                <span className="text-[12px] font-normal tabular-nums text-grey">{c.priceLabel}</span>
              )}
            </p>
            <ul className="mt-2 grid gap-1.5">
              {rows.map((r) => {
                const v = r.values[c.id];
                if (v === false || v === undefined) return null;
                return (
                  <li key={r.label} className="flex items-start gap-2 text-[13px] leading-snug">
                    <Check
                      aria-hidden
                      className="mt-[3px] h-3.5 w-3.5 flex-none text-[color:var(--green-text)]"
                      strokeWidth={2.5}
                    />
                    <span>
                      {r.label}
                      {typeof v === "string" && <span className="text-grey"> &mdash; {v}</span>}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

/* --- Feature list ------------------------------------------------------- */

/**
 * A plan's own inclusions, for where the plans do not share a parallel set of
 * rows and a matrix would have to invent them.
 *
 * Shopify's "Overflow hours $149/hr" and branding's "Everything in Basic +"
 * are not features another column either has or does not, so forcing them
 * into a grid would print a row of dashes that means nothing.
 */
export function FeatureList({ items, heading }: { items: string[]; heading?: string }) {
  return (
    <div>
      {heading && (
        <p className="mb-2.5 text-[12px] font-medium uppercase tracking-[0.08em] text-grey">{heading}</p>
      )}
      <ul className="grid gap-2">
        {items.map((f) => (
          <li key={f} className="flex items-start gap-2 text-[13.5px] leading-snug">
            <Check
              aria-hidden
              className="mt-[3px] h-3.5 w-3.5 flex-none text-[color:var(--green-text)]"
              strokeWidth={2.5}
            />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** A quiet line under a table: prices, currency, the cancel terms. */
export function PlanFootnote({ children }: { children: ReactNode }) {
  return (
    <p className="border-t border-line bg-paper/60 px-5 py-3.5 text-[12.5px] leading-relaxed text-grey">
      {children}
    </p>
  );
}
