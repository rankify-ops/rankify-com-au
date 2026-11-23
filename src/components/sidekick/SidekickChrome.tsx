import type { ReactNode } from "react";
import { SmartLink } from "@/components/ui/SmartLink";

/**
 * Shared furniture for the Ad Sidekick pages.
 *
 * Ad Sidekick now has a website of its own at adsidekick.io, and the app
 * moved to app.adsidekick.io on 22 Nov 2026. So this page no longer tries to
 * be the place you sign up: every "Get started" hands the reader over to the
 * product's own site, which is where pricing, sign-up and the app itself now
 * live. rankify.com.au/meta-ads keeps the URL because the search intent is an
 * exact match and it already ranks.
 */
export const SIDEKICK_SITE = "https://adsidekick.io";

/** Where "Get started" goes. One line to change if the site ever moves. */
export const SIGNUP_HREF = SIDEKICK_SITE;

/**
 * The app. sidekick.rankify.com.au/login still 308s here, but linking the old
 * address would send every customer through a redirect for no reason.
 */
export const SIDEKICK_LOGIN = "https://app.adsidekick.io/login";

/**
 * The request-access form on this site. Nothing links to it from these pages
 * any more now that adsidekick.io takes sign-ups, but the page is still live
 * for anyone who was sent the address.
 */
export const REQUEST_ACCESS_HREF = "/request-access";

export function SidekickCta({
  light = false,
  label = "Get started",
}: {
  light?: boolean;
  label?: string;
}) {
  return (
    <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
      <a
        href={SIGNUP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className={`neu-btn inline-flex w-full items-center justify-center rounded-full px-7 py-3.5 text-[16px] font-bold transition-transform hover:-skew-x-3 sm:w-auto ${
          light ? "neu-btn-light bg-white text-ink" : "neu-btn-dark bg-[color:var(--green-text)] text-white"
        }`}
      >
        {label}
      </a>
      <a
        href={SIDEKICK_LOGIN}
        className={`text-[14.5px] font-semibold underline-offset-4 hover:underline ${
          light ? "text-white/80" : "text-ink/60"
        }`}
      >
        Already a customer? Sign in
      </a>
    </div>
  );
}

/**
 * The tab bar.
 *
 * How it works and Pricing are sections of the overview page now, not pages
 * of their own, so these are anchors. SmartLink, not next/link: on the page
 * the anchor lives on, the App Router treats `/meta-ads#pricing` as a route
 * navigation, updates the hash and stops, so the tab reads as dead. From the
 * two sub-pages that still answer at their old URLs these stay ordinary links
 * that land on the same sections.
 */
export function SidekickNav({ current }: { current: "overview" | "how" | "pricing" }) {
  const tabs = [
    { href: "/meta-ads#overview", label: "Overview", key: "overview" as const },
    { href: "/meta-ads#how-it-works", label: "How it works", key: "how" as const },
    { href: "/meta-ads#pricing", label: "Pricing", key: "pricing" as const },
  ];
  return (
    <nav className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-5 gap-y-2 px-5 pb-2 pt-6 sm:px-10">
      <div className="flex gap-1 overflow-x-auto">
        {tabs.map((t) => (
          <SmartLink
            key={t.key}
            href={t.href}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-[14px] font-semibold transition-colors ${
              current === t.key ? "bg-ink text-white" : "text-ink/60 hover:bg-black/5"
            }`}
          >
            {t.label}
          </SmartLink>
        ))}
      </div>

      {/* The product's own site. Right-aligned from sm up; on a phone it drops
          to its own row left-aligned rather than being squeezed next to the
          pills, which already scroll sideways on a narrow screen. */}
      <a
        href={SIDEKICK_SITE}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 whitespace-nowrap text-[14px] font-semibold text-[color:var(--green-text)] underline-offset-4 hover:underline sm:ml-auto"
      >
        Visit Ad Sidekick website
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17 17 7M9 7h8v8" />
        </svg>
      </a>
    </nav>
  );
}

export function Band({ children, dark = false, id }: { children: ReactNode; dark?: boolean; id?: string }) {
  return (
    <section
      id={id}
      className={`mx-2 mt-8 scroll-mt-24 rounded-3xl sm:mt-12 ${
        dark
          ? "grain bg-[radial-gradient(120%_140%_at_20%_0%,#06382a_0%,var(--green-deep)_45%,#010f0a_100%)] text-white"
          : ""
      }`}
    >
      <div className="relative z-[2] mx-auto max-w-[1400px] px-5 py-14 sm:px-10 sm:py-20">{children}</div>
    </section>
  );
}

export function Heading({
  kicker,
  children,
  sub,
  dark = false,
}: {
  kicker?: string;
  children: ReactNode;
  sub?: string;
  dark?: boolean;
}) {
  return (
    <div className="max-w-[760px]">
      {kicker && (
        <p
          className={`mb-3 text-[12px] font-semibold uppercase tracking-[0.16em] ${
            dark ? "text-[color:#3fd8bb]" : "text-[color:var(--green-text)]"
          }`}
        >
          {kicker}
        </p>
      )}
      <h2 className="text-[clamp(26px,3.4vw,42px)] font-semibold leading-[1.06] tracking-[-0.035em]">
        {children}
      </h2>
      {sub && (
        <p className={`mt-4 text-[17px] leading-relaxed ${dark ? "text-white/70" : "text-grey"}`}>{sub}</p>
      )}
    </div>
  );
}
