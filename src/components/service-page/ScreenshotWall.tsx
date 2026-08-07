import Image from "next/image";
import { asset } from "@/lib/basePath";

/**
 * Three columns of store screenshots — the outer two drift down, the middle
 * one up. Each column gets its own shots, so no screenshot appears twice,
 * and the durations are deliberately mismatched so columns 1 and 3 never fall
 * into step with each other.
 *
 * Each track holds its own images twice; the keyframes travel exactly half the
 * track, which is what makes the loop seamless.
 */
const COLUMNS: { images: string[]; up?: boolean; duration: string; delay: string }[] = [
  { images: ["01", "04", "07", "10", "13", "16"], duration: "46s", delay: "0s" },
  { images: ["02", "05", "08", "11", "14"], up: true, duration: "34s", delay: "-6s" },
  { images: ["03", "06", "09", "12", "15"], duration: "52s", delay: "-19s" },
];

export function ScreenshotWall() {
  return (
    <div
      className="screenshot-wall relative h-full w-full overflow-hidden"
      aria-hidden
      // the fade is a mask so it works over any section background
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent 0%, #000 11%, #000 89%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, #000 11%, #000 89%, transparent 100%)",
      }}
    >
      {/* No gap between columns and nothing behind the shots — they ship with
          their own transparent surrounds and device framing baked in, so a
          card, border or rounded clip would only fight it. */}
      <div className="grid h-full grid-cols-3">
        {COLUMNS.map((col, i) => (
          <div key={i} className="relative overflow-hidden">
            <div
              className={`flex flex-col gap-2.5 sm:gap-3 ${col.up ? "wall-up" : "wall-down"}`}
              style={{ animationDuration: col.duration, animationDelay: col.delay }}
            >
              {[...col.images, ...col.images].map((n, j) => (
                <Image
                  key={`${n}-${j}`}
                  src={asset(`/assets/showcase/${n}.webp`)}
                  alt=""
                  width={420}
                  height={747}
                  className="h-auto w-full"
                  // Eager, not lazy: the track carries these into view by
                  // itself, and a lazy image starts downloading only once it
                  // gets there — so it pops in mid-scroll instead of arriving
                  // already drawn. All sixteen come to ~350KB.
                  loading="eager"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
