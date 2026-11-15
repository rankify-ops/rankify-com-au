/**
 * Service icons drifting around the ask box.
 *
 * The first pass used the partner logos from the carousel. They are
 * wordmarks, not icons, and shrunk into chips and inverted they looked like
 * clip art. These are the same stroke icons the nav uses for each service, so
 * they are genuinely icons, already part of the site's vocabulary, and nobody
 * else's trademark.
 *
 * Hidden below lg: on a phone the ask box fills the width and these would
 * land on top of it.
 *
 * Siblings of the ask box, never ancestors — each animates `transform`, and a
 * transform on an ancestor cancels the backdrop-filter the box is drawn with.
 * They carry no blur of their own for the same reason.
 */

type Mark = { label: string; d: string; className: string; delay: string };

const MARKS: Mark[] = [
  { label: "Web development", d: "m9 8-4.5 4L9 16M15 8l4.5 4L15 16", className: "left-[15%] top-[28%]", delay: "0s" },
  { label: "Shopify", d: "M4 5h2l2 10h9l2-7H7M9.5 19.5h.01M16.5 19.5h.01", className: "left-[23%] top-[64%]", delay: "-2.4s" },
  { label: "Meta ads", d: "M4 10v4h3l6 4V6L7 10H4ZM17.5 9.2a4.2 4.2 0 0 1 0 5.6", className: "right-[17%] top-[25%]", delay: "-1.2s" },
  { label: "Automation", d: "M7.5 9.5h9a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2ZM12 6.5v3M12 4.2h.01M9.5 13.5h.01M14.5 13.5h.01M3.2 12.5v3M20.8 12.5v3", className: "right-[22%] top-[66%]", delay: "-3.6s" },
  { label: "SEO", d: "M11 17.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13ZM20 20l-4.4-4.4", className: "left-[9%] top-[47%]", delay: "-4.8s" },
  { label: "Analytics", d: "M4.5 19.5V13M9.5 19.5V6.5M14.5 19.5v-8M19.5 19.5V9", className: "right-[10%] top-[46%]", delay: "-6s" },
];

export function FloatingPartners() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[2] hidden lg:block">
      {MARKS.map((m) => (
        <span
          key={m.label}
          className={`float-soft absolute flex h-[54px] w-[54px] items-center justify-center rounded-2xl border border-white/12 bg-white/[0.06] text-[color:#3fd8bb] ${m.className}`}
          style={{ animationDelay: m.delay }}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-[22px] w-[22px]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={m.d} />
          </svg>
        </span>
      ))}
    </div>
  );
}
