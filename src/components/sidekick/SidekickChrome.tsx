import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Shared furniture for the Ad Sidekick pages.
 *
 * `SIGNUP_HREF` is the one line that changes on launch day. Public sign-up is
 * built and deployed at sidekick.rankify.com.au/signup but switched off, and
 * that page currently says invite-only — so every "Get started" points at the
 * request form until Tom turns it on, and then this constant changes and
 * nothing else does.
 */
export const SIGNUP_HREF = "/request-access";

/** Where it will point once sign-up is switched on. Kept here so it is findable. */
export const SIGNUP_LIVE_HREF = "https://sidekick.rankify.com.au/signup";

export const SIDEKICK_LOGIN = "https://sidekick.rankify.com.au/login";

export function SidekickCta({
  light = false,
  label = "Get started",
}: {
  light?: boolean;
  label?: string;
}) {
  return (
    <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
      <Link
        href={SIGNUP_HREF}
        className={`neu-btn inline-flex w-full items-center justify-center rounded-full px-7 py-3.5 text-[16px] font-bold transition-transform hover:-skew-x-3 sm:w-auto ${
          light ? "neu-btn-light bg-white text-ink" : "neu-btn-dark bg-[color:var(--green-text)] text-white"
        }`}
      >
        {label}
      </Link>
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

export function SidekickNav({ current }: { current: "overview" | "how" | "pricing" }) {
  const tabs = [
    { href: "/meta-ads", label: "Overview", key: "overview" as const },
    { href: "/meta-ads/how-it-works", label: "How it works", key: "how" as const },
    { href: "/meta-ads/pricing", label: "Pricing", key: "pricing" as const },
  ];
  return (
    <nav className="mx-auto flex max-w-[1400px] gap-1 overflow-x-auto px-5 pb-2 pt-6 sm:px-10">
      {tabs.map((t) => (
        <Link
          key={t.key}
          href={t.href}
          className={`whitespace-nowrap rounded-full px-4 py-2 text-[14px] font-semibold transition-colors ${
            current === t.key ? "bg-ink text-white" : "text-ink/60 hover:bg-black/5"
          }`}
        >
          {t.label}
        </Link>
      ))}
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
