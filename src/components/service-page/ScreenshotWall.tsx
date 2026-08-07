import Image from "next/image";
import { asset } from "@/lib/basePath";

/**
 * Three columns of store screenshots — the outer two drift down, the middle
 * one up. Each column gets its own six shots, so no screenshot appears twice,
 * and the durations are deliberately mismatched so columns 1 and 3 never fall
 * into step with each other.
 *
 * Each track holds its own images twice; the keyframes travel exactly half the
 * track, which is what makes the loop seamless.
 */
const COLUMNS: { images: string[]; up?: boolean; duration: string; delay: string }[] = [
  { images: ["01", "04", "07", "10", "13", "16"], duration: "46s", delay: "0s" },
  { images: ["02", "05", "08", "11", "14", "17"], up: true, duration: "38s", delay: "-6s" },
  { images: ["03", "06", "09", "12", "15", "18"], duration: "52s", delay: "-19s" },
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
      <div className="grid h-full grid-cols-3 gap-2.5 sm:gap-3">
        {COLUMNS.map((col, i) => (
          <div key={i} className="relative overflow-hidden">
            <div
              className={`flex flex-col gap-2.5 sm:gap-3 ${col.up ? "wall-up" : "wall-down"}`}
              style={{ animationDuration: col.duration, animationDelay: col.delay }}
            >
              {[...col.images, ...col.images].map((n, j) => (
                <div
                  key={`${n}-${j}`}
                  className="overflow-hidden rounded-xl border border-black/[0.06] bg-white shadow-[0_6px_20px_rgba(0,0,0,0.08)] sm:rounded-2xl"
                >
                  <Image
                    src={asset(`/assets/showcase/${n}.webp`)}
                    alt=""
                    width={420}
                    height={747}
                    className="h-auto w-full"
                    // only the first row is anywhere near the fold
                    loading={j < 2 ? "eager" : "lazy"}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
