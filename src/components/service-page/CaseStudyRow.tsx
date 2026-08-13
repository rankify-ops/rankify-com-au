"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { asset } from "@/lib/basePath";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/service-page/SectionHeading";
import type { CaseStudyRowBlock } from "@/content/service-pages/types";

type Item = CaseStudyRowBlock["items"][number];

/**
 * Client logos that open their results in a popup rather than navigating away.
 *
 * Ads land on this page, so sending someone to a separate case study page
 * costs the visit. The proof opens over the top and closing it puts them back
 * exactly where they were, next to the configurator.
 *
 * An item with no `logo` renders its name in the same box, and one marked
 * `placeholder` isn't clickable — a card that opens an empty popup is worse
 * than a card that doesn't open.
 */
export function CaseStudyRow({ block }: { block: CaseStudyRowBlock }) {
  const [open, setOpen] = useState<Item | null>(null);

  const close = useCallback(() => setOpen(null), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  return (
    <section
      id={block.anchorId}
      className="mx-2 mt-8 scroll-mt-24 rounded-3xl bg-paper text-ink sm:mt-12 lg:mt-20"
    >
      <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-10 sm:py-16 lg:py-20">
        <SectionHeading
          label={block.kicker}
          heading={block.heading}
          headingDim={block.headingDim}
          sub={block.subheading}
          centred
        />

        {/* Columns follow the count so the row always fills — five cards in a
            six-column grid left a hole on the end. */}
        <div
          className={`mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-3 ${
            block.items.length === 4
              ? "lg:grid-cols-4"
              : block.items.length === 5
                ? "lg:grid-cols-5"
                : "lg:grid-cols-6"
          }`}
        >
          {block.items.map((c, i) => {
            // Openable on a client quote alone — hard numbers are better, but
            // a named quote with a face is still worth the click.
            const ready = !c.placeholder && (!!c.results?.length || !!c.quote);
            return (
              <Reveal key={c.name} delay={i * 0.05}>
                <button
                  type="button"
                  disabled={!ready}
                  onClick={() => ready && setOpen(c)}
                  className={`neu group flex h-full w-full flex-col items-center justify-between gap-3 rounded-2xl border border-line bg-white p-4 text-left transition-all duration-300 ${
                    ready
                      ? "cursor-pointer hover:-translate-y-0.5 hover:border-[color:#07a889]"
                      : "cursor-default opacity-70"
                  }`}
                >
                  <span className="flex h-12 w-full items-center justify-center">
                    {c.logo ? (
                      <Image
                        src={asset(c.logo)}
                        alt={c.name}
                        width={200}
                        height={60}
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <span className="text-center text-[14px] font-semibold tracking-[-0.02em]">
                        {c.name}
                      </span>
                    )}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] transition-colors ${
                      ready
                        ? "bg-[#f1f1f1] text-grey group-hover:bg-[#e9f5f0] group-hover:text-[var(--green-deep)]"
                        : "bg-[#f1f1f1] text-grey"
                    }`}
                  >
                    {ready ? (c.label ?? "See results") : "Coming soon"}
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>

      {open && <ResultsModal item={open} onClose={close} />}
    </section>
  );
}

/** Google Ads mark, in its own colours. */
function GoogleAdsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 flex-none" aria-hidden>
      <path fill="#FBBC04" d="M1.7 17.3 8.9 4.8a2.6 2.6 0 0 1 4.5 2.6L6.2 19.9a2.6 2.6 0 1 1-4.5-2.6Z" />
      <path fill="#4285F4" d="M22.3 17.3 15.1 4.8a2.6 2.6 0 0 0-4.5 2.6l7.2 12.5a2.6 2.6 0 1 0 4.5-2.6Z" />
      <circle fill="#34A853" cx="4" cy="18.6" r="2.6" />
    </svg>
  );
}

function ResultsModal({ item, onClose }: { item: Item; onClose: () => void }) {
  // No mounted guard needed: this only ever renders from a click, so it never
  // runs during SSR and document is always there.
  // Portalled to body: the section is inside a transformed Reveal, which would
  // otherwise become the containing block and trap a fixed overlay inside it.
  return createPortal(
    <div
      className="fixed inset-0 z-[130] flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.name} results`}
    >
      {/* Kept deliberately small. This is a proof snippet, not a case study
          page — at 600px wide it scrolled on a laptop to show four lines. */}
      <div className="neu relative max-h-[85vh] w-full max-w-[420px] overflow-y-auto rounded-[20px] bg-white p-6 text-ink">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#f1f1f1] text-[16px] leading-none text-grey transition-colors hover:bg-[#e6e6e6]"
        >
          &times;
        </button>

        <div className="flex h-14 items-center">
          {item.logo ? (
            <Image
              src={asset(item.logo)}
              alt={item.name}
              width={220}
              height={66}
              className="max-h-full w-auto object-contain"
            />
          ) : (
            <span className="text-[16px] font-semibold tracking-[-0.03em]">{item.name}</span>
          )}
        </div>

        {/* Two chips rather than one joined sentence: at 420px the combined
            string broke mid-phrase and left the icon stranded on its own line.
            Each chip is nowrap, so if they don't fit side by side the second
            drops whole. */}
        {(item.industry || item.timeline) && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {item.industry && (
              <span className="inline-flex items-start gap-1.5 whitespace-normal rounded-full bg-[#f1f1f1] px-2.5 py-1 text-[12px] font-medium leading-snug text-ink sm:items-center sm:whitespace-nowrap sm:text-[12.5px]">
                {item.industryIcon === "google-ads" && <GoogleAdsIcon />}
                {item.industry}
              </span>
            )}
            {item.timeline && (
              <span className="inline-flex items-center whitespace-normal rounded-full bg-[#e9f5f0] px-2.5 py-1 text-[12px] font-medium leading-snug text-[var(--green-deep)] sm:whitespace-nowrap sm:text-[12.5px]">
                {item.timeline}
              </span>
            )}
          </div>
        )}

        {/* Summary only stands in when there are no results — with them it
            just repeats the same facts in longer form. */}
        {item.summary && !item.results?.length && (
          <p className="mt-3 text-[14px] leading-snug text-grey">{item.summary}</p>
        )}

        {item.results && (
          <ul className="mt-4 grid gap-2">
            {item.results.map((r) => (
              <li key={r} className="flex items-start gap-2.5 text-[14px] leading-snug">
                <span className="mt-[3px] flex h-[15px] w-[15px] flex-none items-center justify-center rounded-full bg-[var(--green-mid)]">
                  <svg viewBox="0 0 24 24" className="h-2 w-2" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {r}
              </li>
            ))}
          </ul>
        )}

        {item.quote && (
          <figure className="mt-4 border-t border-line pt-4">
            <blockquote className="text-[13.5px] italic leading-snug text-grey">
              &ldquo;{item.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-2.5 flex items-center gap-2.5">
              {item.quoteAvatar && (
                <Image
                  src={asset(item.quoteAvatar)}
                  alt={item.quoteName ?? item.name}
                  width={96}
                  height={96}
                  className="h-12 w-12 flex-none rounded-full object-cover"
                />
              )}
              {/* Face and name carry the authority — they stay full size even
                  though everything around them was cut back. Role drops to its
                  own line so the name isn't competing with it. */}
              <span className="text-[12.5px] text-grey">
                <strong className="block text-[15px] font-semibold tracking-[-0.01em] text-ink">
                  {item.quoteName}
                </strong>
                {item.quoteRole}
              </span>
            </figcaption>
          </figure>
        )}

        <a
          href="#website-configurator"
          onClick={onClose}
          className="neu-btn neu-btn-dark mt-5 block whitespace-nowrap rounded-full bg-[var(--green-deep)] px-5 py-2.5 text-center text-[14px] font-bold text-white hover:-skew-x-3"
        >
          Get results like these
        </a>
        {item.liveUrl && (
          <a
            href={item.liveUrl}
            target={item.liveUrl.startsWith("http") ? "_blank" : undefined}
            rel={item.liveUrl.startsWith("http") ? "noopener noreferrer" : undefined}
            className="mt-3 block text-center text-[13px] font-semibold text-grey underline underline-offset-4 hover:text-ink"
          >
            {item.liveLabel ?? "Visit the site"}
          </a>
        )}
      </div>
    </div>,
    document.body,
  );
}
