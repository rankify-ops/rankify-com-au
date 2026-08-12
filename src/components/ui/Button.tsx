import type { ReactNode } from "react";
import { SmartLink } from "@/components/ui/SmartLink";

export function Button({
  href,
  children,
  variant = "dark",
  external,
  className = "",
  type,
  pulse = false,
}: {
  href?: string;
  children: ReactNode;
  variant?: "dark" | "light";
  external?: boolean;
  className?: string;
  type?: "submit" | "button";
  /**
   * Rings the trailing dot, the same way the floating CTA bar's does.
   * Opt-in: on the header and hero CTAs it reads as a live prompt, but every
   * button on the page pinging at once would just be noise.
   */
  pulse?: boolean;
}) {
  // .neu-btn owns the transition so the shadow animates alongside the scale
  const cls = `group neu-btn relative inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-[15px] font-medium ease-out hover:scale-[1.04] ${
    variant === "dark" ? "neu-btn-dark bg-ink text-white" : "neu-btn-light bg-white text-ink"
  } ${className}`;

  const inner = (
    <>
      {children}
      {pulse ? (
        // bg-current on both layers, so the ring picks up whichever variant
        // the button is using. `cta-ping` is already a no-op under
        // prefers-reduced-motion.
        <span className="relative flex h-2 w-2 flex-none items-center justify-center">
          <span className="cta-ping absolute inline-flex h-full w-full rounded-full bg-current" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-current transition-transform duration-300 group-hover:scale-150" />
        </span>
      ) : (
        <span className="h-2 w-2 flex-none rounded-full bg-current transition-transform duration-300 group-hover:scale-150" />
      )}
    </>
  );

  if (type) {
    return (
      <button type={type} className={cls}>
        {inner}
      </button>
    );
  }

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  }

  // SmartLink, not next/link: the hero CTAs point at on-page anchors like
  // `#website-configurator`, and next/link treats a same-route hash as a
  // navigation that sets the hash and never scrolls.
  return (
    <SmartLink href={href ?? "#"} className={cls}>
      {inner}
    </SmartLink>
  );
}
