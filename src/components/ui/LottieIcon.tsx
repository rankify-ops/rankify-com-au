"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/basePath";
import { useInViewOnce } from "@/lib/useInViewOnce";
import { SERVICE_ICONS } from "@/content/service-icons";
import LOTTIE_MAP from "@/content/lottie-map.json";

const MAP = LOTTIE_MAP as Record<string, string>;

/**
 * Plays the real Lottie animation lifted from the live site.
 *
 * The static flattened-path version renders immediately so there's no blank
 * box or layout shift, then the (fairly heavy) animation JSON and the player
 * are both fetched lazily once the icon scrolls into view and swapped in.
 * Offscreen icons never download anything.
 */
export function LottieIcon({
  name,
  className = "h-11 w-11",
  dark = false,
}: {
  name: string;
  className?: string;
  dark?: boolean;
}) {
  const file = MAP[name];
  const staticPaths = SERVICE_ICONS[name];
  const [wrapRef, inView] = useInViewOnce<HTMLSpanElement>();
  const holder = useRef<HTMLSpanElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!inView || !file || !holder.current) return;
    let cancelled = false;
    let anim: { destroy: () => void } | null = null;

    (async () => {
      try {
        const [{ default: lottie }, data] = await Promise.all([
          import("lottie-web/build/player/lottie_light"),
          fetch(asset(`/assets/lottie/${file}`)).then((r) => r.json()),
        ]);
        if (cancelled || !holder.current) return;
        anim = lottie.loadAnimation({
          container: holder.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: data,
        });
        setPlaying(true);
      } catch {
        // leave the static icon in place if anything fails
      }
    })();

    return () => {
      cancelled = true;
      anim?.destroy();
    };
  }, [inView, file]);

  if (!staticPaths && !file) return null;

  return (
    <span ref={wrapRef} className={`relative block ${className}`}>
      {/* real animation */}
      <span
        ref={holder}
        aria-hidden
        className={`absolute inset-0 block [&_svg]:h-full [&_svg]:w-full ${playing ? "opacity-100" : "opacity-0"}`}
      />
      {/* instant static fallback, hidden once the animation is running */}
      {staticPaths && (
        <span data-inview={inView} className={playing ? "hidden" : "block h-full w-full"}>
          <svg viewBox="0 0 430 430" className="h-full w-full" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {staticPaths.map((p, i) => (
              <path
                key={i}
                d={p.d}
                stroke={p.c === "s" ? "#07a889" : dark ? "#ffffff" : "var(--ink)"}
                strokeWidth={p.w}
              />
            ))}
          </svg>
        </span>
      )}
    </span>
  );
}
