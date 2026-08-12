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
  centred = false,
  className = "",
}: {
  /** Small teal line above the headline. */
  label?: string;
  heading: string;
  /** Trailing half of the headline, set back in grey. */
  headingDim?: string;
  sub?: string;
  dark?: boolean;
  /** Centres the stack — used by the pricing sections. */
  centred?: boolean;
  className?: string;
}) {
  return (
    <div className={`${centred ? "text-center" : ""} ${className}`}>
      {label && (
        <Reveal>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:#07a889]">
            {label}
          </p>
        </Reveal>
      )}
      <Reveal delay={0.1}>
        <h2
          className={`text-[clamp(28px,2.7vw,44px)] font-medium leading-[1.05] tracking-[-0.04em] ${
            centred ? "mx-auto max-w-[900px]" : "max-w-[860px]"
          }`}
        >
          {heading}
          {headingDim && <span className={dark ? "text-white/50" : "text-grey"}> {headingDim}</span>}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.15}>
          <p
            className={`mt-4 text-[15.5px] leading-relaxed ${dark ? "text-white/60" : "text-grey"} ${
              centred ? "mx-auto max-w-[640px]" : "max-w-[560px]"
            }`}
          >
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}
