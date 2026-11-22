"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * The login chooser.
 *
 * Rankify has two places to sign in and they are for different people: a
 * website client who wants to change their site, and an Ad Sidekick customer.
 * Both titles are two words and both lines are one sentence, so the two cards
 * sit the same height and their "Sign in" rows line up -- a card that wraps to
 * a third line drags its own button out of step with the one beside it.
 * A single login link would send half of them to the wrong app, so the header
 * icon opens this instead of guessing.
 *
 * Both open in a new tab: somebody signing in has not finished with the
 * marketing site, and taking the tab away from them is how you lose the other
 * thing they came to read.
 */

const DOORS = [
  {
    title: "Website Editor",
    line: "Change your site by asking. See it before it goes live.",
    href: "https://app.rankify.com.au/login",
    icon: (
      <path d="m9 8-4.5 4L9 16M15 8l4.5 4L15 16" />
    ),
  },
  {
    title: "Ad Sidekick",
    line: "What to upload, what to scale, and the daily P&L.",
    href: "https://sidekick.rankify.com.au/login",
    icon: <path d="M4 10v4h3l6 4V6L7 10H4ZM17.5 9.2a4.2 4.2 0 0 1 0 5.6" />,
  },
];

/**
 * The button is a circle on a phone, where it sits at the right edge of an
 * app bar and only has to read as "account". It grows a label at xl.
 */
export function LoginMenu() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="flex h-10 w-10 items-center justify-center gap-2 rounded-full border border-line text-[14px] font-medium transition-colors hover:border-ink/30 hover:bg-white xl:w-auto xl:px-4"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-[18px] w-[18px] flex-none"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="8.5" r="3.5" />
          <path d="M5 19.5a7 7 0 0 1 14 0" />
        </svg>
        <span className="hidden xl:inline">Login</span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Choose where to sign in"
          className="fixed inset-0 z-[130] flex items-center justify-center overflow-y-auto bg-black/60 px-3 py-6 sm:px-4 sm:py-8"
          onMouseDown={(e) => e.target === e.currentTarget && close()}
        >
          <div className="relative w-full max-w-[640px] rounded-3xl bg-white p-4 shadow-2xl sm:p-8">
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute -right-3 -top-3 flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white shadow-lg transition-transform hover:scale-105"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <h2 className="text-center text-[19px] font-bold tracking-[-0.03em] sm:text-[26px]">
              Where are you signing in?
            </h2>
            <p className="mx-auto mt-2 max-w-[420px] text-balance text-center text-[13.5px] text-grey sm:text-[14.5px]">
              Two different apps. Pick the one you are a customer of.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-2.5 sm:mt-6 sm:gap-3">
              {DOORS.map((d) => (
                <a
                  key={d.title}
                  href={d.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  className="group flex flex-col rounded-2xl border border-line p-3.5 transition-colors hover:border-[color:var(--green-text)] hover:bg-[color:var(--green-text)]/[0.06] sm:p-5"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-[color:var(--green-text)]/10 text-[color:var(--green-text)] sm:h-11 sm:w-11 sm:rounded-[13px]">
                    <svg viewBox="0 0 24 24" className="h-[19px] w-[19px] sm:h-[22px] sm:w-[22px]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      {d.icon}
                    </svg>
                  </span>
                  <span className="mt-3 text-[14.5px] font-semibold leading-tight tracking-[-0.02em] sm:mt-4 sm:text-[17px]">
                    {d.title}
                  </span>
                  <span className="mt-1.5 flex-1 text-[12.5px] leading-snug text-grey sm:text-[14px]">
                    {d.line}
                  </span>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[color:var(--green-text)] sm:mt-4 sm:text-[14px]">
                    Sign in
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 4h6v6M20 4l-8.5 8.5M18 14v4.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10" />
                    </svg>
                  </span>
                </a>
              ))}
            </div>

            <p className="mt-5 text-center text-[13.5px] text-grey">
              Not a customer yet?{" "}
              <a href="/schedule-strategy-call" className="font-semibold text-ink underline underline-offset-4">
                Book a call
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
