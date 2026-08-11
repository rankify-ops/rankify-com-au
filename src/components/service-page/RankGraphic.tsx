/**
 * SEO hero visual: keywords climbing the results, and the traffic that follows.
 *
 * Deliberately not a screenshot wall — phones sliding past say "we make
 * websites". This says "we move you up the page", which is the thing being
 * bought. Pure SVG and CSS: no chart library, no canvas, nothing to hydrate.
 *
 * White card on the paper hero, matching the rest of the site's surfaces — a
 * dark slab here read as a foreign object dropped onto a light page.
 */

const KEYWORDS = [
  { term: "emergency plumber gold coast", from: 14, to: 1, delay: "0s" },
  { term: "hot water repairs near me", from: 9, to: 2, delay: "-1.2s" },
  { term: "blocked drain specialist", from: 22, to: 3, delay: "-2.4s" },
  { term: "bathroom renovation quotes", from: 31, to: 5, delay: "-3.6s" },
];

/** Monthly organic clicks, indexed — the shape matters, not the units. */
const BARS = [18, 26, 24, 38, 47, 61, 74, 96];

export function RankGraphic() {
  return (
    <div className="neu rounded-3xl border border-line bg-white p-6 text-ink sm:p-8">
      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:#07a889]">
          Positions won
        </p>
        <span className="rounded-full border border-line bg-paper px-3 py-1 text-[11.5px] font-medium text-grey">
          Last 6 months
        </span>
      </div>

      <ul className="grid gap-2.5">
        {KEYWORDS.map((k) => (
          <li
            key={k.term}
            className="flex items-center gap-3 rounded-xl border border-line bg-paper px-3.5 py-3"
          >
            <span className="min-w-0 flex-1 truncate text-[13.5px] text-grey">{k.term}</span>
            <span className="text-[12.5px] tabular-nums text-grey/60 line-through">#{k.from}</span>
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 flex-none text-[color:#07a889]" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h13M13 7l5 5-5 5" />
            </svg>
            {/* The badge pulses on a stagger so the list reads as live
                movement rather than a static screenshot of a report. */}
            <span
              className="rank-pop flex h-7 min-w-[36px] items-center justify-center rounded-lg bg-[var(--green-deep)] px-2 text-[13px] font-bold tabular-nums text-white"
              style={{ animationDelay: k.delay }}
            >
              #{k.to}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-6 rounded-2xl border border-line bg-paper p-4">
        <div className="mb-3 flex items-baseline justify-between">
          <span className="text-[12.5px] text-grey">Organic clicks / month</span>
          <span className="text-[15px] font-semibold text-[color:var(--green-deep)]">+433%</span>
        </div>
        {/* Bars grow from the baseline on a loop — transform only, so it
            stays on the compositor. */}
        <div className="flex h-[92px] items-end gap-1.5" aria-hidden>
          {BARS.map((h, i) => (
            <span
              key={i}
              className="rank-bar flex-1 rounded-t-[3px] bg-[linear-gradient(to_top,var(--green-deep),#07a889)]"
              style={{ height: `${h}%`, animationDelay: `${i * 0.12}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
