"use client";

import Image from "next/image";
import { useCallback, useRef, useState, type ReactNode } from "react";
import { asset } from "@/lib/basePath";

/**
 * The VSL player for the funnel pages.
 *
 * The file is the untouched 1080p master, served from Vercel Blob rather than
 * the repo: GitHub Pages refuses anything over 100MB, and re-encoding it to fit
 * would mean shipping a worse video than the one that was recorded. It has a
 * faststart atom, so the browser can start playing while the rest downloads.
 *
 * `preload="none"` plus a poster: a 109MB file must not start downloading for
 * every visitor who scrolls past it. Nothing is fetched until the play button
 * is pressed.
 *
 * The chapters are the point of this component. A six minute video asks a cold
 * visitor for more than most will give, and a list of what's in it lets them
 * jump to the part they actually came for instead of bouncing.
 */

export type Chapter = { t: number; label: string };

const POSTER = "/assets/images/vsl-poster.jpg";

const mmss = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

export function FunnelVideo({
  src,
  chapters,
  children,
}: {
  src: string;
  chapters: Chapter[];
  /**
   * Rendered between the player and the chapter list. The CTA goes here: the
   * button has to be the first thing under the video, and a fifteen item
   * contents list above it would push it off a phone screen entirely.
   */
  children?: ReactNode;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [active, setActive] = useState(-1);

  /** Seeks and plays. Doubles as the play button: `start` has no timestamp. */
  const seek = useCallback((t?: number) => {
    const v = ref.current;
    if (!v) return;
    setStarted(true);
    if (t !== undefined) v.currentTime = t;
    void v.play().catch(() => {});
  }, []);

  /**
   * Which chapter we're in: the last one that has started. Cheap enough to run
   * on every timeupdate (roughly 4Hz) against a list this short.
   */
  const onTime = useCallback(() => {
    const now = ref.current?.currentTime ?? 0;
    let i = -1;
    for (let n = 0; n < chapters.length; n++) if (chapters[n].t <= now) i = n;
    setActive(i);
  }, [chapters]);

  return (
    <div className="mx-auto w-full max-w-[880px]">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black">
        <video
          ref={ref}
          src={src}
          poster={asset(POSTER)}
          controls={started}
          playsInline
          preload="none"
          onTimeUpdate={onTime}
          onPlay={() => setStarted(true)}
          className="aspect-video w-full"
        />

        {/* The poster is a frame of the video, so before first play the <video>
            and this overlay are the same picture — the button just lands on
            top of it. Gone for good once playback starts. */}
        {!started && (
          <button
            type="button"
            onClick={() => seek()}
            aria-label="Play the video"
            className="absolute inset-0 flex items-center justify-center bg-black/35 transition-colors hover:bg-black/25"
          >
            <Image
              src={asset(POSTER)}
              alt=""
              width={1920}
              height={1080}
              priority
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span className="relative flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[color:#07a889] shadow-[0_10px_34px_rgba(7,168,137,0.5)] transition-transform duration-300 hover:scale-105">
              <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8" fill="#fff">
                <path d="M8 5.5v13l11-6.5z" />
              </svg>
            </span>
          </button>
        )}
      </div>

      {children}

      {/* ---------- Chapters ---------- */}
      <p className="mt-10 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/40">
        Jump to
      </p>
      <ul className="mt-3 grid gap-x-6 gap-y-0.5 sm:grid-cols-2">
        {chapters.map((c, i) => (
          <li key={c.t}>
            <button
              type="button"
              onClick={() => seek(c.t)}
              className={`flex w-full items-baseline gap-3 rounded-lg px-2.5 py-1.5 text-left text-[14.5px] transition-colors hover:bg-white/[0.06] ${
                i === active ? "text-white" : "text-white/60"
              }`}
            >
              <span
                className={`flex-none font-mono text-[12.5px] tabular-nums ${
                  i === active ? "text-[color:#3fd8bb]" : "text-white/35"
                }`}
              >
                {mmss(c.t)}
              </span>
              <span className="leading-snug">{c.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
