import { Reveal } from "@/components/ui/Reveal";
import type {
  ComparisonBlock,
  ComparisonIcon,
} from "@/content/service-pages/types";

const ICONS: Record<ComparisonIcon, React.ReactNode> = {
  person: (
    <>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </>
  ),
  dollar: (
    <>
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </>
  ),
  repeat: (
    <>
      <path d="M17 1l4 4-4 4" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <path d="M7 23l-4-4 4-4" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </>
  ),
  trending: (
    <>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </>
  ),
  revisions: (
    <>
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </>
  ),
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  card: (
    <>
      <rect x="1" y="4" width="22" height="16" rx="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </>
  ),
};

function RowIcon({ name }: { name: ComparisonIcon }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px] flex-none"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {ICONS[name]}
    </svg>
  );
}

/** Renders **bold** runs without pulling in a markdown dependency. */
function Rich({ text, dark = false }: { text: string; dark?: boolean }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong
            key={i}
            className={`font-semibold ${dark ? "text-white" : "text-ink"}`}
          >
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

function Cross() {
  return (
    <span className="mt-[3px] flex h-[18px] w-[18px] flex-none items-center justify-center rounded-full bg-[#fdecec] text-[10px] font-bold text-[#d94b4b]">
      ✕
    </span>
  );
}

function Tick({ onDark = false }: { onDark?: boolean }) {
  return (
    <span
      className={`mt-[3px] flex h-[18px] w-[18px] flex-none items-center justify-center rounded-full text-[10px] font-bold ${
        onDark
          ? "bg-white/15 text-white"
          : "bg-[#e9f5f0] text-[var(--green-deep)]"
      }`}
    >
      ✓
    </span>
  );
}

export function ComparisonSection({ block }: { block: ComparisonBlock }) {
  return (
    <section
      id={block.anchorId}
      className="mx-2 mt-8 scroll-mt-24 rounded-3xl bg-paper text-ink sm:mt-12 lg:mt-20"
    >
      <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-10 sm:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
          {/* Argument first when stacked — it frames the table underneath. */}
          <Reveal className="order-2 lg:order-1">
            <div className="shine-border rounded-2xl">
              <div className="neu overflow-hidden rounded-2xl border border-line bg-white">
                {/* Column headings only make sense once the row is actually
                    three columns. Below sm each row stacks and carries its own
                    "Typical Agency / Rankify" labels inline instead. */}
                <div className="border-b border-line px-5 py-5 sm:grid sm:grid-cols-[1.15fr_1fr_1fr] sm:gap-3 sm:px-6">
                  <p className="text-[14px] font-semibold leading-snug tracking-[-0.02em]">
                    {block.tableTitle}
                  </p>
                  <p className="hidden text-[10.5px] font-semibold uppercase tracking-[0.12em] text-grey sm:block">
                    {block.agencyLabel}
                  </p>
                  <p className="hidden text-[10.5px] font-semibold uppercase tracking-[0.12em] text-grey sm:block">
                    {block.usLabel}
                  </p>
                </div>

                {block.rows.map((row) => (
                  <div
                    key={row.label}
                    className={`grid gap-2 px-5 py-4 sm:grid-cols-[1.15fr_1fr_1fr] sm:gap-3 sm:px-6 ${
                      row.highlight
                        ? "grain bg-[radial-gradient(120%_140%_at_20%_0%,#06382a_0%,var(--green-deep)_45%,#010f0a_100%)] text-white"
                        : "border-b border-line last:border-b-0 sm:odd:bg-[#fafafa]"
                    }`}
                  >
                    <p
                      className={`relative z-[2] flex items-start gap-2.5 text-[13.5px] font-semibold leading-snug ${
                        row.highlight ? "text-white" : "text-ink"
                      }`}
                    >
                      <RowIcon name={row.icon} />
                      {row.label}
                    </p>
                    <p
                      className={`relative z-[2] order-2 flex items-start gap-2 pl-[26px] text-[13px] leading-snug sm:order-none sm:pl-0 ${
                        row.highlight ? "text-white/70" : "text-grey"
                      }`}
                    >
                      <Cross />
                      <span>
                        <span className={`sm:hidden ${row.highlight ? "text-white/45" : "text-grey/70"}`}>
                          {block.agencyLabel}:{" "}
                        </span>
                        {row.agency}
                      </span>
                    </p>
                    <p
                      className={`relative z-[2] order-1 flex items-start gap-2 pl-[26px] text-[13px] font-medium leading-snug sm:order-none sm:pl-0 ${
                        row.highlight ? "text-white" : "text-ink"
                      }`}
                    >
                      <Tick onDark={row.highlight} />
                      <span>
                        <span className={`font-normal sm:hidden ${row.highlight ? "text-white/45" : "text-grey/70"}`}>
                          {block.usLabel}:{" "}
                        </span>
                        {row.us}
                      </span>
                    </p>
                  </div>
                ))}

                {block.footnote && (
                  <p className="border-t border-line px-5 py-4 text-center text-[12.5px] italic text-grey sm:px-6">
                    {block.footnote}
                  </p>
                )}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="order-1 lg:order-2">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:#07a889]">
              {block.eyebrow}
            </p>
            <h2 className="text-[clamp(28px,2.7vw,44px)] font-medium leading-[1.05] tracking-[-0.04em]">
              {block.heading}
            </h2>
            <div className="mt-6 grid gap-4">
              {block.body.map((p) => (
                <p
                  key={p.slice(0, 24)}
                  className="text-[15.5px] leading-relaxed text-grey"
                >
                  <Rich text={p} />
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
