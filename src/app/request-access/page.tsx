import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { SiteFooter } from "@/components/sections/ContactFooter";
import { RequestAccess } from "@/components/sidekick/RequestAccess";

export const metadata: Metadata = {
  title: "Request access to Ad Sidekick | Rankify",
  description:
    "Ad Sidekick is open by invitation while we keep an eye on every account. Leave your details and we'll call you when a spot opens.",
  alternates: { canonical: "/request-access" },
  // Nothing to gain from this page ranking: it is the back of a button, not
  // a page anyone should arrive at from a search.
  robots: { index: false, follow: true },
};

export default function RequestAccessPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-[1400px] px-5 py-14 sm:px-10 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:gap-16">
          <div>
            <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[color:var(--green-text)]">
              Ad Sidekick
            </span>
            <h1 className="mt-4 max-w-[560px] text-balance text-[clamp(30px,4vw,48px)] font-semibold leading-[1.05] tracking-[-0.035em]">
              Request access
            </h1>
            <p className="mt-5 max-w-[520px] text-[16.5px] leading-relaxed text-grey">
              Sign-up is invitation only for now. We&rsquo;re letting people in a few at a time so
              every account gets looked at properly rather than dropped into a queue.
            </p>

            <ul className="mt-8 grid max-w-[520px] gap-4">
              {[
                "We call you first, so you know what you're getting before anything is set up.",
                "You keep your own ad account. Nothing is moved and nothing is locked to us.",
                "Nothing bills until you've said yes on the phone.",
              ].map((line) => (
                <li key={line} className="flex gap-3 text-[15.5px] leading-relaxed text-ink/80">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden
                    className="mt-0.5 h-5 w-5 flex-none text-[color:var(--green-text)]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m5 12.5 4.5 4.5L19 7.5" />
                  </svg>
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <RequestAccess />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
