import Image from "next/image";
import { asset } from "@/lib/basePath";

/**
 * Three columns of screenshots — the outer two drift down, the middle one up.
 * Each column gets its own shots, so no screenshot appears twice, and the
 * durations are deliberately mismatched so columns 1 and 3 never fall into
 * step with each other.
 *
 * Each track holds its own images twice; the keyframes travel exactly half the
 * track, which is what makes the loop seamless.
 */
export type ScreenshotSet = "shopify" | "web";

/** Shopify has sixteen shots, web dev fifteen — hence the uneven first column. */
const SETS: Record<ScreenshotSet, { dir: string; columns: string[][] }> = {
  shopify: {
    dir: "showcase",
    columns: [
      ["01", "04", "07", "10", "13", "16"],
      ["02", "05", "08", "11", "14"],
      ["03", "06", "09", "12", "15"],
    ],
  },
  web: {
    dir: "showcase-web",
    columns: [
      ["01", "04", "07", "10", "13"],
      ["02", "05", "08", "11", "14"],
      ["03", "06", "09", "12", "15"],
    ],
  },
};

/**
 * Every column travels at the same pixel speed. The animation runs the height
 * of one copy of the column, so a column holding more shots has further to go
 * and needs proportionally longer — a flat duration made the shorter columns
 * visibly quicker. 6.8s per shot is the middle column's old pace (34s / 5).
 *
 * Only the start offsets differ now, so the columns don't all begin on a seam.
 */
const SECONDS_PER_SHOT = 6.8;
const MOTION = [{ delay: "0s" }, { delay: "-6s", up: true }, { delay: "-19s" }];

export function ScreenshotWall({ set = "shopify" }: { set?: ScreenshotSet }) {
  const { dir, columns } = SETS[set];

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
        {columns.map((images, i) => (
          <div key={i} className="relative overflow-hidden">
            <div
              className={`flex flex-col gap-2.5 sm:gap-3 ${MOTION[i].up ? "wall-up" : "wall-down"}`}
              style={{
                animationDuration: `${(images.length * SECONDS_PER_SHOT).toFixed(1)}s`,
                animationDelay: MOTION[i].delay,
              }}
            >
              {[...images, ...images].map((n, j) => (
                <Image
                  key={`${n}-${j}`}
                  src={asset(`/assets/${dir}/${n}.webp`)}
                  alt=""
                  width={420}
                  height={747}
                  className="h-auto w-full"
                  // Eager, not lazy: the track carries these into view by
                  // itself, and a lazy image starts downloading only once it
                  // gets there — so it pops in mid-scroll instead of arriving
                  // already drawn. A whole set comes to under 400KB.
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
