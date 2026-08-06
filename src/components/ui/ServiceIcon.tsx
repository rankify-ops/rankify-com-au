"use client";

import { useInViewOnce } from "@/lib/useInViewOnce";
import { SERVICE_ICONS } from "@/content/service-icons";

/**
 * Renders the real Lottie-derived icon geometry with a scroll-triggered draw-on,
 * using the same .icon-draw / data-inview system as the homepage Process icons.
 */
export function ServiceIcon({
  name,
  className = "h-7 w-7",
  dark = false,
}: {
  name: string;
  className?: string;
  dark?: boolean;
}) {
  const paths = SERVICE_ICONS[name];
  const [ref, inView] = useInViewOnce<HTMLSpanElement>();

  if (!paths) return null;

  return (
    <span ref={ref} data-inview={inView} className={`block ${className}`}>
      <svg
        viewBox="0 0 430 430"
        className="h-full w-full"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {paths.map((p, i) => (
          <path
            key={i}
            className="icon-draw"
            pathLength={1}
            d={p.d}
            stroke={p.c === "s" ? "#07a889" : dark ? "#ffffff" : "var(--ink)"}
            strokeWidth={p.w}
            style={{ transitionDelay: `${i * 55}ms` }}
          />
        ))}
      </svg>
    </span>
  );
}
