/**
 * A drawn screen, not a screenshot.
 *
 * The real dashboards we build hold real businesses' numbers, so they cannot
 * go on a public page. This draws the same layout with figures that belong to
 * nobody, and says so in the frame: every screen carries a "Sample data" tag,
 * so nothing here can be read as a result we are claiming.
 *
 * Everything is data, so a page describes a screen rather than marking one up.
 */
export type MockTile = { k: string; v: string; d?: string; tone?: "up" | "down" | "flat" };
export type MockRow = { l: string; r: string; tone?: "ok" | "warn" | "muted" };

export type Mock = {
  title: string;
  tiles: MockTile[];
  /** Bar heights, 0 to 100. */
  bars?: number[];
  barsLabel?: string;
  rows?: MockRow[];
  rowsLabel?: string;
};

const TONE: Record<NonNullable<MockTile["tone"]>, string> = {
  up: "text-[color:var(--green-text)]",
  down: "text-[#b4441f]",
  flat: "text-grey",
};

const DOT: Record<NonNullable<MockRow["tone"]>, string> = {
  ok: "bg-[color:var(--green-text)]",
  warn: "bg-[#d98a1c]",
  muted: "bg-ink/20",
};

export function MockScreen({ mock, className = "" }: { mock: Mock; className?: string }) {
  return (
    <figure className={`w-full ${className}`}>
      <div className="overflow-hidden rounded-2xl border border-line bg-white text-ink shadow-[0_24px_60px_-34px_rgba(0,33,23,0.55)]">
        {/* window bar */}
        <div className="flex items-center gap-3 border-b border-line bg-paper px-4 py-2.5">
          <span className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          </span>
          <span className="min-w-0 truncate text-[12.5px] font-semibold tracking-[-0.01em]">{mock.title}</span>
          <span className="ml-auto flex-none rounded-full border border-line bg-white px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-grey">
            Sample data
          </span>
        </div>

        <div className="grid gap-3 p-4 sm:gap-4 sm:p-5">
          {/* tiles */}
          <div className={`grid grid-cols-2 gap-2.5 sm:gap-3 ${mock.tiles.length > 2 ? "lg:grid-cols-4" : ""}`}>
            {mock.tiles.map((t) => (
              <div key={t.k} className="rounded-xl border border-line bg-paper px-3.5 py-3">
                <p className="truncate text-[11px] font-semibold uppercase tracking-[0.1em] text-grey">{t.k}</p>
                <p className="mt-1.5 text-[clamp(17px,1.5vw,22px)] font-semibold leading-none tracking-[-0.03em]">
                  {t.v}
                </p>
                {t.d && <p className={`mt-1.5 text-[11.5px] font-medium ${TONE[t.tone ?? "flat"]}`}>{t.d}</p>}
              </div>
            ))}
          </div>

          <div className={`grid gap-3 sm:gap-4 ${mock.bars && mock.rows ? "sm:grid-cols-[1.25fr_1fr]" : ""}`}>
            {mock.bars && (
              <div className="rounded-xl border border-line px-3.5 pb-3 pt-3">
                {mock.barsLabel && (
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-grey">{mock.barsLabel}</p>
                )}
                <div className="mt-3 flex h-[92px] items-end gap-[5px]" aria-hidden>
                  {mock.bars.map((h, i) => (
                    <span
                      key={i}
                      className={`flex-1 rounded-t-[3px] ${
                        i === mock.bars!.length - 1 ? "bg-[color:var(--green-text)]" : "bg-[color:var(--green-text)]/25"
                      }`}
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {mock.rows && (
              <div className="rounded-xl border border-line px-3.5 py-3">
                {mock.rowsLabel && (
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-grey">{mock.rowsLabel}</p>
                )}
                <ul className="mt-2 grid">
                  {mock.rows.map((r) => (
                    <li
                      key={r.l}
                      className="flex items-center gap-2.5 border-b border-line py-[7px] text-[12.5px] last:border-b-0"
                    >
                      <span className={`h-1.5 w-1.5 flex-none rounded-full ${DOT[r.tone ?? "muted"]}`} aria-hidden />
                      <span className="min-w-0 flex-1 truncate">{r.l}</span>
                      <span className="flex-none font-semibold tabular-nums">{r.r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </figure>
  );
}
