"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BASE_PATH } from "@/lib/basePath";
import { pixelTrack } from "@/lib/pixel";
import { CHECKOUT_API } from "@/lib/checkout";

/**
 * The qualifying form that sits between the landing page and the calendar.
 *
 * Every CTA on the funnel opens this instead of linking straight to the
 * booking page. Two steps, deliberately: the name and email are captured
 * first, so a visitor who turns out not to qualify is still a lead we have,
 * and the budget question is asked second, once they are already committed to
 * finishing.
 *
 * Only a budget at or above the $3,000 band reaches the calendar. The free
 * homepage costs nothing, but it exists to start a full build, and a call with
 * someone who could never buy one wastes the slot and their time.
 *
 * It is driven by a window event rather than React state threaded through the
 * page, because the buttons that open it live in three different subtrees (the
 * hero, inside the video component, and the sticky bar) and the page itself is
 * a server component.
 */

const OPEN_EVENT = "rankify:qualify";
const BOOK = `${BASE_PATH}/free-homepage/book`;
const REDIRECT_SECONDS = 10;

/** The band below which the offer isn't a fit. */
const BUDGETS = [
  { label: "$0 - $2,999", qualifies: false },
  { label: "$3,000 - $6,000", qualifies: true },
  { label: "$6,000 - $9,000", qualifies: true },
  { label: "$9,000+", qualifies: true },
];

/** Opens the form from anywhere on the page. */
export function openQualify() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(OPEN_EVENT));
}

type Stage = "details" | "budget" | "qualified" | "declined";

/**
 * Sends a capture to the CRM. Fire and forget, with `keepalive` so it survives
 * the redirect that follows a qualifying answer — a form must never wait on,
 * or fail because of, a CRM call.
 *
 * Resolves to the card id the server made, when there is one.
 */
async function capture(body: Record<string, unknown>): Promise<string | null> {
  if (!CHECKOUT_API) return null;
  try {
    const res = await fetch(`${CHECKOUT_API}/api/qualify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      keepalive: true,
    });
    const out = (await res.json().catch(() => null)) as { id?: string } | null;
    return out?.id ?? null;
  } catch {
    // Never surfaced: they are mid-form.
    return null;
  }
}

export function QualifyModal() {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<Stage>("details");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [left, setLeft] = useState(REDIRECT_SECONDS);
  /** The CRM card step one created, so the budget answer updates it. */
  const cardId = useRef<string | null>(null);
  const firstField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const show = () => {
      setStage("details");
      setLeft(REDIRECT_SECONDS);
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, show);
    return () => window.removeEventListener(OPEN_EVENT, show);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  // Escape closes, and the page behind it stops scrolling while it's up.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstField.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  // The countdown on the qualified screen. Cleared on unmount so closing the
  // form mid-count can't navigate the page out from under them.
  useEffect(() => {
    if (stage !== "qualified") return;
    const id = setInterval(() => {
      setLeft((n) => {
        if (n <= 1) {
          clearInterval(id);
          window.location.href = BOOK;
          return 0;
        }
        return n - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [stage]);

  const submitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    // Before the qualifying question, deliberately: someone who answers this
    // screen and leaves is still a record we hold.
    void capture({ stage: "details", name: name.trim(), email: email.trim() }).then((id) => {
      cardId.current = id;
    });
    setStage("budget");
  };

  const pickBudget = (b: (typeof BUDGETS)[number]) => {
    const [first, ...rest] = name.trim().split(/\s+/);
    // Fires whichever way it goes: a disqualified visitor is still a lead, and
    // the pixel is the only place this pair of details is recorded.
    pixelTrack(
      "Lead",
      { content_name: "Free homepage qualifier", budget: b.label, qualified: b.qualifies },
      { email: email.trim(), first_name: first, last_name: rest.join(" ") || undefined },
    );
    void capture({
      stage: "budget",
      // Absent only if step one hasn't come back yet, in which case the server
      // writes a complete card rather than losing the answer.
      id: cardId.current ?? undefined,
      name: name.trim(),
      email: email.trim(),
      budget: b.label,
      qualified: b.qualifies,
    });
    setStage(b.qualifies ? "qualified" : "declined");
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Get your free homepage"
      className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-black/70 px-4 py-8"
      onMouseDown={(e) => e.target === e.currentTarget && close()}
    >
      <div className="relative w-full max-w-[520px] rounded-3xl bg-white p-6 text-ink shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute -top-3 -right-3 flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white shadow-lg transition-transform hover:scale-105"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {(stage === "details" || stage === "budget") && (
          <>
            <h2 className="text-center text-[clamp(21px,2.6vw,26px)] font-bold tracking-[-0.03em]">
              Get your free homepage:
            </h2>

            {/* Both steps are always labelled, so at step one it's clear there
                is exactly one more. */}
            <div className="mt-5 grid grid-cols-2 text-center text-[13.5px] font-bold uppercase tracking-[0.08em]">
              {(["Step 1", "Final step"] as const).map((s, i) => {
                const active = (stage === "details") === (i === 0);
                return (
                  <span
                    key={s}
                    className={`border-b-[3px] pb-2.5 ${
                      active
                        ? "border-[color:var(--green-text)] text-[color:var(--green-text)]"
                        : "border-black/10 text-ink/35"
                    }`}
                  >
                    {s}
                  </span>
                );
              })}
            </div>
          </>
        )}

        {/* ---------- Step 1 ---------- */}
        {stage === "details" && (
          <form onSubmit={submitDetails} className="mt-6">
            <input
              ref={firstField}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
              placeholder="Full Name..."
              className="w-full rounded-xl border border-black/15 px-4 py-3.5 text-[16px] outline-none placeholder:text-ink/40 focus:border-[color:#07a889]"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              autoComplete="email"
              placeholder="Email Address..."
              className="mt-3 w-full rounded-xl border border-black/15 px-4 py-3.5 text-[16px] outline-none placeholder:text-ink/40 focus:border-[color:#07a889]"
            />
            <button
              type="submit"
              className="mt-4 w-full rounded-xl bg-[color:var(--green-text)] px-6 py-4 text-[clamp(24px,3.4vw,30px)] font-bold tracking-[-0.02em] text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              NEXT STEP
            </button>
            <p className="mt-3 text-center text-[13.5px] text-ink/50">
              Delivered in under 48 HOURS!
            </p>
          </form>
        )}

        {/* ---------- Final step ---------- */}
        {stage === "budget" && (
          <div className="mt-6">
            <p className="text-center text-[17px] font-semibold tracking-[-0.01em]">
              What kind of budget do you have for a new website?
            </p>
            <div className="mt-4 grid gap-2.5">
              {BUDGETS.map((b) => (
                <button
                  key={b.label}
                  type="button"
                  onClick={() => pickBudget(b)}
                  className="w-full rounded-xl border border-black/15 px-5 py-3.5 text-[17px] font-semibold transition-colors hover:border-[color:#07a889] hover:bg-[color:#07a889]/10"
                >
                  {b.label}
                </button>
              ))}
            </div>
            <p className="mt-3 text-center text-[13.5px] text-ink/50">
              The homepage is free. This tells me whether the full build is worth us both
              getting on a call about.
            </p>
          </div>
        )}

        {/* ---------- Qualified ---------- */}
        {stage === "qualified" && (
          <div className="py-2 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--green-text)]">
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
            </span>
            <h2 className="mt-5 text-[clamp(23px,3vw,30px)] font-bold tracking-[-0.03em]">
              Congrats, you qualify!
            </h2>
            <p className="mt-3 text-[16px] text-ink/60">
              Redirecting you in {left} second{left === 1 ? "" : "s"}.
            </p>
            <a
              href={BOOK}
              className="mt-5 inline-block text-[15px] font-semibold text-[color:var(--green-text)] underline underline-offset-4"
            >
              If it doesn&rsquo;t redirect, click here
            </a>
          </div>
        )}

        {/* ---------- Not a fit ---------- */}
        {stage === "declined" && (
          <div className="py-2 text-center">
            <h2 className="text-[clamp(21px,2.6vw,27px)] font-bold tracking-[-0.03em]">
              Not a fit right now
            </h2>
            <p className="mx-auto mt-3 max-w-[380px] text-[16px] leading-relaxed text-ink/60">
              The free homepage is there to start a full build, and those start at $3,000.
              If your budget changes, come back and we&rsquo;ll pick this up.
            </p>
            <button
              type="button"
              onClick={close}
              className="mt-6 rounded-xl border border-black/15 px-6 py-3 text-[15px] font-semibold transition-colors hover:bg-black/5"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
