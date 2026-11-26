"use client";

import { useEffect } from "react";

/**
 * A page that only sends you somewhere else.
 *
 * The site is a static export on GitHub Pages, so there is no server to answer
 * with a 301. This does the next best thing three ways: a meta refresh (which
 * React hoists into the head and which works without JavaScript), a
 * `location.replace` so the old address does not stay in the back button, and
 * a plain link for anything that follows neither.
 */
export function RedirectPage({ to, label }: { to: string; label: string }) {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-[640px] flex-col items-start justify-center px-5 py-24">
      <meta httpEquiv="refresh" content={`0; url=${to}`} />
      <p className="text-[17px] text-grey">This page has moved.</p>
      <a href={to} className="mt-3 text-[20px] font-semibold text-ink underline underline-offset-4">
        {label}
      </a>
    </main>
  );
}
