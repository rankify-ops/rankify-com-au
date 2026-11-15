"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { asset } from "@/lib/basePath";

/**
 * The tools we work with, drifting around the ask box and pushing away from
 * the cursor.
 *
 * **These need real icon files.** Drop transparent SVG or PNG marks into
 * `public/assets/partners/` as `shopify.svg`, `claude.svg`, `firecrawl.svg`,
 * `grok.svg` and `semrush.svg`, then set `src` below. Until a mark has a file
 * it renders as a monogram so the motion is visible — obviously a placeholder,
 * and not a brand mark drawn from memory, which would be both wrong and not
 * ours to invent.
 *
 * Two layers per icon, deliberately: the outer span runs the CSS float, the
 * inner one takes the cursor push. One element cannot hold two transforms, and
 * combining them in JS would mean reimplementing the float by hand.
 *
 * Hidden below lg, where the ask box already fills the width. The whole thing
 * is `pointer-events-none`, so none of it can swallow a click meant for the
 * box underneath.
 */

type Mark = {
  label: string;
  /** Set once the file exists in public/assets/partners. */
  src?: string;
  className: string;
  delay: string;
};

const MARKS: Mark[] = [
  { label: "Shopify", className: "left-[15%] top-[26%]", delay: "0s" },
  { label: "Claude", className: "left-[22%] top-[66%]", delay: "-2.4s" },
  { label: "Firecrawl", className: "right-[16%] top-[24%]", delay: "-1.2s" },
  { label: "Grok", className: "right-[21%] top-[68%]", delay: "-3.6s" },
  { label: "Semrush", className: "left-[8%] top-[46%]", delay: "-4.8s" },
];

/** How close the cursor gets before a mark starts moving, and how hard. */
const RADIUS = 190;
const PUSH = 46;

export function FloatingPartners() {
  const wrap = useRef<HTMLDivElement>(null);
  const inners = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const host = wrap.current;
    if (!host) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let mx = -9999;
    let my = -9999;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    // Styles are written straight to the nodes rather than through state: this
    // runs on every pointer move, and a re-render per frame would be the most
    // expensive thing on the page.
    const apply = () => {
      frame = 0;
      for (const el of inners.current) {
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const dx = r.x + r.width / 2 - mx;
        const dy = r.y + r.height / 2 - my;
        const dist = Math.hypot(dx, dy);
        if (dist > RADIUS || dist === 0) {
          el.style.transform = "translate3d(0,0,0)";
          continue;
        }
        const force = (1 - dist / RADIUS) ** 2 * PUSH;
        el.style.transform = `translate3d(${(dx / dist) * force}px, ${(dy / dist) * force}px, 0)`;
      }
    };

    const onLeave = () => {
      mx = -9999;
      my = -9999;
      apply();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={wrap} aria-hidden className="pointer-events-none absolute inset-0 z-[2] hidden lg:block">
      {MARKS.map((m, i) => (
        <span key={m.label} className={`float-soft absolute ${m.className}`} style={{ animationDelay: m.delay }}>
          <span
            ref={(el) => {
              inners.current[i] = el;
            }}
            className="block transition-transform duration-500 ease-out will-change-transform"
          >
            {m.src ? (
              <Image
                src={asset(m.src)}
                alt=""
                width={96}
                height={96}
                className="h-[46px] w-[46px] object-contain opacity-70"
              />
            ) : (
              <span className="flex h-[46px] w-[46px] items-center justify-center rounded-full border border-dashed border-white/25 text-[13px] font-semibold text-white/45">
                {m.label[0]}
              </span>
            )}
          </span>
        </span>
      ))}
    </div>
  );
}
