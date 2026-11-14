import Image from "next/image";
import { asset } from "@/lib/basePath";

/**
 * A product screenshot.
 *
 * Captures go in `public/assets/product/` and are referenced by name. Where a
 * capture does not exist yet the component renders a labelled frame saying so,
 * rather than a stock image or a mocked-up number — a fake dashboard on a
 * pricing page is a claim about the product, and an untrue one.
 *
 * The frame is deliberately obvious in that state. Nobody should be able to
 * ship this page believing the screenshots are done.
 */
export function Shot({
  src,
  alt,
  caption,
  wide = false,
}: {
  /** File name inside public/assets/product, without the extension. */
  src?: string;
  alt: string;
  caption?: string;
  wide?: boolean;
}) {
  return (
    <figure className={wide ? "w-full" : "w-full"}>
      <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_20px_50px_-30px_rgba(0,33,23,0.5)]">
        {src ? (
          <Image
            src={asset(`/assets/product/${src}.webp`)}
            alt={alt}
            width={1600}
            height={1000}
            className="h-auto w-full"
          />
        ) : (
          <div className="flex aspect-[16/10] w-full flex-col items-center justify-center gap-2 bg-[repeating-linear-gradient(135deg,#f5f5f5_0_12px,#efefef_12px_24px)] px-6 text-center">
            <span className="rounded-full bg-ink px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
              Screenshot to come
            </span>
            <span className="text-[14px] font-medium text-ink/70">{alt}</span>
          </div>
        )}
      </div>
      {caption && <figcaption className="mt-3 text-[13.5px] text-grey">{caption}</figcaption>}
    </figure>
  );
}
