"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { asset } from "@/lib/basePath";

/**
 * The tools we build with, orbiting the ask box on an ellipse.
 *
 * Orbit and cursor-push are computed together in one rAF loop and written as
 * a single transform per mark. As two nested elements — a CSS animation
 * outside, JS inside — they were two transforms competing for the same
 * element every frame; one loop is simpler and smoother.
 *
 * Styles go straight to the nodes. A re-render per frame, ten marks deep,
 * would be the most expensive thing on the page.
 *
 * The loop stops when the hero scrolls out of view, and never starts under
 * prefers-reduced-motion — the marks just sit on the ellipse.
 *
 * On a phone they are scenery: smaller, dimmer, and pointer-events-none, so
 * nothing here can swallow a tap meant for the field.
 */

type Mark = {
  label: string;
  /** A brand mark in public/assets/partners. */
  src?: string;
  /** A stroke glyph instead, for things that are not a brand. */
  d?: string;
};

/** Order is the order round the ellipse, starting at the right. */
const MARKS: Mark[] = [
  { label: "Shopify", src: "/assets/partners/shopify.svg" },
  { label: "Claude", src: "/assets/partners/claude.svg" },
  { label: "Firecrawl", src: "/assets/partners/firecrawl-white.svg" },
  { label: "Grok", src: "/assets/partners/grok.svg" },
  { label: "Semrush", src: "/assets/partners/semrush.svg" },
  { label: "Google", src: "/assets/partners/google.svg" },
  { label: "Meta", src: "/assets/partners/meta.svg" },
  { label: "Stripe", src: "/assets/partners/stripe.svg" },
  { label: "Next.js", src: "/assets/partners/nextjs.svg" },
  // Not a brand: the work itself, so a glyph rather than somebody's logo.
  { label: "Code", d: "m9 8-4.5 4L9 16M15 8l4.5 4L15 16" },
];

/**
 * Half-width and half-height of the ellipse, as a share of the hero.
 *
 * A phone hero is tall and narrow, so the desktop ellipse would run the marks
 * straight through the ask box. The phone one is narrower and much taller:
 * the marks ring the box instead of crossing it, and where they do pass
 * behind the glass they read as depth rather than clutter.
 */
const ELLIPSE = {
  phone: { rx: 0.46, ry: 0.4 },
  desktop: { rx: 0.37, ry: 0.3 },
};
/** One lap in seconds. Slow enough to read as drift, not as a carousel. */
const PERIOD = 70;
/** How near the cursor gets before a mark gives way, and how hard. */
const RADIUS = 170;
const PUSH = 42;

export function FloatingPartners() {
  const host = useRef<HTMLDivElement>(null);
  const nodes = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const box = host.current;
    if (!box) return;

    const still = Boolean(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);
    let mx = -9999;
    let my = -9999;
    let frame = 0;
    let running = false;

    const place = (t: number) => {
      const r = box.getBoundingClientRect();
      const cx = r.width / 2;
      const cy = r.height / 2;
      const { rx: fx, ry: fy } = window.innerWidth >= 1024 ? ELLIPSE.desktop : ELLIPSE.phone;
      const rx = r.width * fx;
      const ry = r.height * fy;

      nodes.current.forEach((el, i) => {
        if (!el) return;
        const base = (i / MARKS.length) * Math.PI * 2;
        const angle = still ? base : base + (t / (PERIOD * 1000)) * Math.PI * 2;
        let x = cx + Math.cos(angle) * rx;
        let y = cy + Math.sin(angle) * ry;

        const dx = r.left + x - mx;
        const dy = r.top + y - my;
        const dist = Math.hypot(dx, dy);
        if (dist < RADIUS && dist > 0) {
          const force = (1 - dist / RADIUS) ** 2 * PUSH;
          x += (dx / dist) * force;
          y += (dy / dist) * force;
        }

        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    };

    const tick = (t: number) => {
      place(t);
      if (running) frame = requestAnimationFrame(tick);
    };
    const start = () => {
      if (running || still) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    place(0);

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (still) place(0);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    // No point animating a hero nobody is looking at.
    const seen = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), {
      threshold: 0,
    });
    seen.observe(box);

    const onResize = () => place(performance.now());
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      seen.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div ref={host} aria-hidden className="pointer-events-none absolute inset-0 z-[2]">
      {MARKS.map((m, i) => (
        <span
          key={m.label}
          ref={(el) => {
            nodes.current[i] = el;
          }}
          // Half the mark in negative margin, so the transform positions its
          // centre rather than its corner.
          className="group absolute left-0 top-0 -ml-[15px] -mt-[15px] flex h-[30px] w-[30px] items-center justify-center lg:pointer-events-auto lg:-ml-[21px] lg:-mt-[21px] lg:h-[42px] lg:w-[42px]"
          title={m.label}
        >
          <span className="block opacity-25 transition-all duration-300 lg:opacity-65 lg:group-hover:scale-125 lg:group-hover:opacity-100 lg:group-hover:drop-shadow-[0_0_14px_rgba(63,216,187,0.75)]">
            {m.src ? (
              <Image
                src={asset(m.src)}
                alt=""
                width={96}
                height={96}
                className="h-[26px] w-[26px] object-contain lg:h-[38px] lg:w-[38px]"
              />
            ) : m.d ? (
              <svg
                viewBox="0 0 24 24"
                className="h-[26px] w-[26px] text-white lg:h-[38px] lg:w-[38px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={m.d} />
              </svg>
            ) : null}
          </span>
        </span>
      ))}
    </div>
  );
}
