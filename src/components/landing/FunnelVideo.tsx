"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
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
 * The controls are hand-built rather than the browser's own, for one reason:
 * the chapters are marked as dots on the scrubber, and the native control bar
 * lives in a closed shadow root that nothing can be drawn into. A six minute
 * video asks a cold visitor for more than most will give, and being able to
 * see — and hit — the part they came for is what keeps them on the page.
 */

export type Chapter = { t: number; label: string };

const POSTER = "/assets/images/vsl-poster.webp";

const mmss = (s: number) =>
  `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

export function FunnelVideo({
  src,
  chapters,
  children,
}: {
  src: string;
  chapters: Chapter[];
  /**
   * Rendered under the player. The CTA goes here: the button has to be the
   * first thing below the video.
   */
  children?: ReactNode;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [full, setFull] = useState(false);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [now, setNow] = useState(0);
  const [dur, setDur] = useState(0);
  /** Controls fade out while playing, the way every other player behaves. */
  const [ui, setUi] = useState(true);
  const hide = useRef<ReturnType<typeof setTimeout> | null>(null);

  /**
   * Shows the controls and restarts the idle countdown. Called on play and on
   * any pointer or touch activity over the player.
   *
   * It only ever hides while the video is playing: a paused player with no
   * visible controls looks broken, and there is nothing to get out of the way
   * of.
   */
  const nudge = useCallback(() => {
    setUi(true);
    if (hide.current) clearTimeout(hide.current);
    hide.current = setTimeout(() => {
      if (ref.current && !ref.current.paused) setUi(false);
    }, 3000);
  }, []);

  /**
   * Full screen, on the player rather than the <video>.
   *
   * Fullscreening the video element itself puts a `controls={false}` video on
   * screen with nothing to drive it and no visible way back. Taking the
   * wrapper full screen carries our own controls up with it.
   *
   * iOS Safari supports neither on a div, so it falls back to the video's own
   * `webkitEnterFullscreen`, which hands over to the native player.
   */
  const toggleFull = useCallback(() => {
    const el = wrapRef.current;
    const v = ref.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    if (document.fullscreenElement) {
      void document.exitFullscreen().catch(() => {});
      return;
    }
    if (el?.requestFullscreen) void el.requestFullscreen().catch(() => {});
    else v?.webkitEnterFullscreen?.();
  }, []);

  useEffect(() => {
    const sync = () => setFull(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", sync);
    return () => document.removeEventListener("fullscreenchange", sync);
  }, []);

  // A pending timer must not fire into an unmounted component.
  useEffect(() => () => {
    if (hide.current) clearTimeout(hide.current);
  }, []);

  /** Seeks and plays. Doubles as the play button: `start` has no timestamp. */
  const seek = useCallback((t?: number) => {
    const v = ref.current;
    if (!v) return;
    setStarted(true);
    if (t !== undefined) {
      v.currentTime = t;
      setNow(t);
    }
    void v.play().catch(() => {});
  }, []);

  const toggle = useCallback(() => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) void v.play().catch(() => {});
    else v.pause();
  }, []);

  /** Click anywhere on the track to scrub there. */
  const scrub = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = trackRef.current;
      const v = ref.current;
      if (!el || !v || !dur) return;
      const r = el.getBoundingClientRect();
      const pct = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      v.currentTime = pct * dur;
      setNow(pct * dur);
    },
    [dur],
  );

  const pct = dur ? (now / dur) * 100 : 0;

  return (
    <div className="mx-auto w-full max-w-[880px]">
      <div
        ref={wrapRef}
        onPointerMove={nudge}
        onTouchStart={nudge}
        className={`group/player relative overflow-hidden bg-black ${
          full
            ? "flex h-screen w-screen items-center justify-center"
            : "rounded-3xl border border-white/10"
        }`}
      >
        <video
          ref={ref}
          src={src}
          poster={asset(POSTER)}
          playsInline
          preload="none"
          onClick={toggle}
          onPlay={() => {
            setStarted(true);
            setPlaying(true);
            nudge();
          }}
          onPause={() => {
            setPlaying(false);
            // Straight back on, and no countdown while paused.
            if (hide.current) clearTimeout(hide.current);
            setUi(true);
          }}
          onLoadedMetadata={(e) => setDur(e.currentTarget.duration || 0)}
          onTimeUpdate={(e) => setNow(e.currentTarget.currentTime)}
          className={`cursor-pointer ${full ? "max-h-full w-full object-contain" : "aspect-video w-full"}`}
        />

        {/* The poster is a frame of the video, so before first play the <video>
            and this overlay are the same picture: the button just lands on top
            of it. Gone for good once playback starts. */}
        {!started && (
          <button
            type="button"
            onClick={() => seek()}
            aria-label="Play the video"
            className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors hover:bg-black/[0.04]"
          >
            <Image
              src={asset(POSTER)}
              alt=""
              width={1920}
              height={1080}
              priority
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* A rounded rectangle, part-transparent: the frame behind it is
                the sell, so the button sits over the picture rather than
                punching a hole in it. */}
            <span className="relative flex h-[42px] w-[62px] items-center justify-center rounded-xl bg-[color:#07a889]/85 shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:scale-105 sm:h-[52px] sm:w-[76px]">
              <svg viewBox="0 0 24 24" className="ml-0.5 h-[22px] w-[22px] sm:h-7 sm:w-7" fill="#fff">
                <path d="M8 5.5v13l11-6.5z" />
              </svg>
            </span>
          </button>
        )}

        {/* ---------- Controls ---------- */}
        {started && (
          <div
            className={`pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-4 pb-3 pt-10 transition-opacity duration-300 sm:px-5 ${
              ui ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* The track sits above the buttons so the chapter dots get the
                full width to spread across. */}
            <div
              ref={trackRef}
              onClick={scrub}
              className={`relative h-1.5 cursor-pointer rounded-full bg-white/25 ${ui ? "pointer-events-auto" : "pointer-events-none"}`}
            >
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-[color:#07a889]"
                style={{ width: `${pct}%` }}
              />
              {/* Playhead */}
              <span
                className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow"
                style={{ left: `${pct}%` }}
              />

              {/* Chapter dots. Hidden until the player is hovered, and never
                  shown below sm: on a phone fifteen markers across a 330px bar
                  are clutter you cannot hit accurately anyway. `opacity-0`
                  alone would leave them clickable, so pointer events come back
                  only with the hover. */}
              {dur > 0 &&
                chapters.map((c) => {
                  const at = c.t / dur;
                  // A tooltip centred on a dot near either end hangs off the
                  // player. Pin it to whichever edge it's closest to instead.
                  const tip =
                    at < 0.25
                      ? "left-0"
                      : at > 0.75
                        ? "right-0"
                        : "left-1/2 -translate-x-1/2";
                  return (
                    <button
                      key={c.t}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        seek(c.t);
                      }}
                      aria-label={`${mmss(c.t)} ${c.label}`}
                      className="group/dot pointer-events-none absolute top-1/2 hidden h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center opacity-0 transition-opacity duration-200 group-hover/player:pointer-events-auto group-hover/player:opacity-100 sm:flex"
                      style={{ left: `${at * 100}%` }}
                    >
                      <span className="h-[6px] w-[6px] rounded-full bg-white/70 ring-1 ring-black/40 transition-transform duration-200 group-hover/dot:scale-[1.6] group-hover/dot:bg-white" />
                      <span
                        className={`pointer-events-none absolute bottom-6 hidden whitespace-nowrap rounded-lg bg-black/90 px-2.5 py-1.5 text-[12.5px] font-medium text-white shadow-lg group-hover/dot:block sm:bottom-7 ${tip}`}
                      >
                        <span className="mr-2 font-mono text-[11.5px] text-[color:#3fd8bb]">
                          {mmss(c.t)}
                        </span>
                        {c.label}
                      </span>
                    </button>
                  );
                })}
            </div>

            <div className={`mt-2.5 flex items-center gap-3 ${ui ? "pointer-events-auto" : "pointer-events-none"}`}>
              <button
                type="button"
                onClick={toggle}
                aria-label={playing ? "Pause" : "Play"}
                className="flex h-8 w-8 flex-none items-center justify-center rounded-full text-white transition-colors hover:bg-white/15"
              >
                {playing ? (
                  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
                    <path d="M7 5h3.2v14H7zM13.8 5H17v14h-3.2z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="ml-0.5 h-[18px] w-[18px]" fill="currentColor">
                    <path d="M8 5.5v13l11-6.5z" />
                  </svg>
                )}
              </button>
              <span className="font-mono text-[12.5px] tabular-nums text-white/80">
                {mmss(now)} / {mmss(dur)}
              </span>
              <span className="flex-1" />
              <button
                type="button"
                onClick={toggleFull}
                aria-label={full ? "Exit full screen" : "Full screen"}
                className="flex h-8 w-8 flex-none items-center justify-center rounded-full text-white transition-colors hover:bg-white/15"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-[17px] w-[17px]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={full ? "M4 8h4V4M20 8h-4V4M4 16h4v4M20 16h-4v4" : "M8 4H4v4M16 4h4v4M8 20H4v-4M16 20h4v-4"} />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {children}
    </div>
  );
}
