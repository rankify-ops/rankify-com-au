import { Reveal } from "@/components/ui/Reveal";

/**
 * One heading treatment for every section: a small teal label, then the
 * headline underneath at a readable size.
 *
 * Replaces the old kicker-left / title-right split grid, which pushed the
 * headline into a 58px column of its own and set the section label in grey
 * beside a plus icon. This is the shape the comparison section already used —
 * "One developer. Whole-agency output." over "A developer who knows AI…".
 */
export function SectionHeading({
  label,
  heading,
  headingDim,
  sub,
  dark = false,
  className = "",
}: {
  /** Small teal line above the headline. */
  label?: string;
  heading: string;
  /** Trailing half of the headline, set back in grey. */
  headingDim?: string;
  sub?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      {label && (
        <Reveal>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:#07a889]">
            {label}
          </p>
        </Reveal>
      )}
      <Reveal delay={0.1}>
        <h2 className="max-w-[860px] text-[clamp(28px,2.7vw,44px)] font-medium leading-[1.05] tracking-[-0.04em]">
          {heading}
          {headingDim && <span className={dark ? "text-white/50" : "text-grey"}> {headingDim}</span>}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.15}>
          <p className={`mt-4 max-w-[560px] text-[15.5px] leading-relaxed ${dark ? "text-white/60" : "text-grey"}`}>
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}
