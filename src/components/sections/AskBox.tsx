"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/basePath";
import { CHECKOUT_API } from "@/lib/checkout";

/**
 * The ask box in the hero.
 *
 * Somebody lands here and can say what they need straight away, instead of
 * reading six service pages to find out whether we do it. The suggestions are
 * the four things people actually arrive wanting, so the box works for anyone
 * who would rather click than type.
 *
 * It answers from `/api/ask`, where the system prompt holds what Rankify
 * actually does. A box that confidently offers a service we do not sell costs
 * a real meeting, so the prompt is narrow and the model is told to say "no,
 * but here is what we would do" rather than improvise.
 *
 * Glass rules again: no <Reveal> around this, and no hover transform, because
 * either cancels the backdrop-filter that draws it.
 */

/**
 * The articles are dropped on purpose: this row must stay on one line down to
 * a 320px phone, and "a new website · Meta ads · a custom app" overflowed it.
 */
const SUGGESTIONS = [
  { label: "new website", ask: "I need a new website" },
  { label: "Meta ads", ask: "I need help with my Meta ads" },
  { label: "custom app", ask: "I need a custom app or internal tool built" },
];

type Turn = { role: "user" | "assistant"; content: string };

/**
 * What the placeholder types out, in the visitor's own words.
 *
 * Two sets, because a phone's type bar is about 225px wide and the long
 * phrases measure up to 350px: on a narrow screen they wrapped inside the
 * pill and broke the card. The short set says the same thing in under 28
 * characters, which fits on one line with room to spare.
 */
const TYPED_WIDE = [
  "I need a new Shopify store for my brand",
  "I want to run some Meta ads",
  "I want to set up some automations",
  "I need a web developer",
  "I want to connect Claude to my Shopify store",
];

const TYPED_NARROW = [
  "I need a new website",
  "I want a Shopify store",
  "I need Meta ads",
  "I want automations",
  "I need a developer",
];

/**
 * Types a phrase, holds it, deletes it, moves to the next.
 *
 * It only runs while the field is empty and unfocused, so it can never fight
 * with somebody typing, and it stops dead for anyone who has asked for
 * reduced motion — a looping animation in the first thing on the page is
 * exactly what that setting exists for.
 */
function useTypedPlaceholder(active: boolean) {
  const [text, setText] = useState("");
  const [still, setStill] = useState(false);
  // Null until mounted, so the server and the first client render agree on an
  // empty placeholder and nothing has to be guessed from a user agent.
  const [wide, setWide] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!active || wide === null) return;
    const TYPED = wide ? TYPED_WIDE : TYPED_NARROW;

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setText(TYPED[0]);
      setStill(true);
      return;
    }

    let phrase = 0;
    let chars = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const full = TYPED[phrase];
      chars += deleting ? -1 : 1;
      setText(full.slice(0, chars));

      let wait = deleting ? 28 : 58;
      if (!deleting && chars === full.length) {
        wait = 1700;
        deleting = true;
      } else if (deleting && chars === 0) {
        wait = 320;
        deleting = false;
        phrase = (phrase + 1) % TYPED.length;
      }
      timer = setTimeout(tick, wait);
    };

    timer = setTimeout(tick, 600);
    return () => {
      clearTimeout(timer);
      setText("");
    };
  }, [active, wide]);

  return { text, still };
}

export function AskBox() {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [focused, setFocused] = useState(false);
  const typed = useTypedPlaceholder(!draft && !focused && turns.length === 0);
  const scroller = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!window.matchMedia?.("(min-width: 1024px)").matches) return;
    field.current?.focus({ preventScroll: true });
  }, []);

  async function send(text: string) {
    const question = text.trim();
    if (!question || busy) return;

    const next: Turn[] = [...turns, { role: "user", content: question }];
    setTurns(next);
    setDraft("");
    setBusy(true);

    try {
      const res = await fetch(`${CHECKOUT_API}/api/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const out = (await res.json()) as { reply?: string };
      setTurns([
        ...next,
        {
          role: "assistant",
          content:
            out.reply ??
            "I could not answer that one. Book a call with Tom and he will sort it.",
        },
      ]);
    } catch {
      setTurns([
        ...next,
        {
          role: "assistant",
          content:
            "I could not reach the server. Book a fifteen minute call with Tom and he will answer it himself.",
        },
      ]);
    } finally {
      setBusy(false);
      requestAnimationFrame(() => {
        scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
      });
    }
  }

  return (
    // The same lit edge the door cards had: a bright hairline along the top
    // and a diagonal sheen falling from the top left, which is what makes the
    // surface read as glass rather than a tinted panel. Pseudo-elements only,
    // and no transform or opacity on this wrapper, because either would
    // cancel the backdrop-filter underneath it.
    <div className="w-full max-w-[680px]">
        <div className="mb-5 flex items-center justify-center gap-4 text-left">
          <Image
            src={asset("/assets/images/fZdV1icYbXIkqfVAekWtJEAifo.png")}
            alt="Thomas Flood"
            width={104}
            height={118}
            className="h-16 w-16 flex-none rounded-full object-cover object-top grayscale"
          />
          <p className="max-w-[440px] text-balance text-[15px] leading-snug text-white/75 sm:text-[16px]">
            <span className="font-semibold text-white">Hey, I&rsquo;m Thomas.</span> Tell me
            below how our team can help, and we&rsquo;ll take it from there.
          </p>
        </div>
      <div className="relative w-full max-w-[680px] rounded-[28px] ring-1 ring-white/20 before:pointer-events-none before:absolute before:inset-0 before:z-[3] before:rounded-[28px] before:bg-[linear-gradient(135deg,rgba(255,255,255,0.45)_0%,rgba(255,255,255,0.06)_26%,rgba(255,255,255,0)_52%)] after:pointer-events-none after:absolute after:inset-x-8 after:top-0 after:z-[3] after:h-px after:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.75),transparent)]">
  
        {/* Only the standard backdrop-filter, via Tailwind. Hand-writing a
            -webkit- one alongside it makes Lightning CSS drop the unprefixed
            property and the blur disappears from the shipped stylesheet. */}
        <div className="w-full rounded-[28px] bg-white/[0.07] backdrop-blur-xl backdrop-saturate-150">
          <div className="flex w-full flex-col p-4 sm:p-6">
            {turns.length > 0 && (
              <div
                ref={scroller}
                className="mb-3 max-h-[240px] overflow-y-auto overscroll-contain pr-1"
              >
                <div className="grid gap-2.5 text-left">
                  {turns.map((t, i) => (
                    <p
                      key={i}
                      className={
                        t.role === "user"
                          ? "ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-white/15 px-3.5 py-2.5 text-[14px] text-white"
                          : "max-w-[92%] rounded-2xl rounded-bl-sm bg-black/25 px-3.5 py-2.5 text-[14px] leading-relaxed text-white/90"
                      }
                    >
                      {t.content}
                    </p>
                  ))}
                  {busy && (
                    <p className="max-w-[92%] rounded-2xl rounded-bl-sm bg-black/25 px-3.5 py-2.5 text-[14px] text-white/50">
                      Thinking…
                    </p>
                  )}
                </div>
              </div>
            )}
  
            {/* One row: his face, a field, a button. The heading, the subtitle
                and the four chips that used to sit above this were seven lines
                of furniture before anyone could type, and on a phone they
                wrapped against his head. */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void send(draft);
              }}
              className="flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.08] py-2.5 pl-4 pr-2 transition-colors focus-within:border-white/45 sm:gap-3 sm:pl-6 sm:pr-2.5"
            >
              {/* The placeholder is drawn rather than native so a caret can
                  blink in front of it: the field looks ready to type in without
                  autofocus, which on load would yank the page's scroll
                  position to the hero.

                  16px is the floor for the input itself — below that, iOS
                  Safari zooms the whole page when the field takes focus. */}
              {/* overflow-hidden is the backstop: if a phrase ever outgrows a
                  very narrow field it gets cut off here rather than running
                  out under the send button. */}
              <span className="relative min-w-0 flex-1 overflow-hidden">
                <input
                  ref={field}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  aria-label="Tell us what you need help with"
                  className="w-full bg-transparent text-[16px] text-white outline-none sm:text-[16.5px]"
                />
                {!draft && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 left-0 flex items-center gap-[3px] whitespace-nowrap text-[16px] text-white/50 sm:text-[16.5px]"
                  >
                    <span className={`${typed.still ? "" : "caret-blink "}inline-block h-[19px] w-px bg-white/80`} />
                    {typed.text}
                  </span>
                )}
              </span>
              <button
                type="submit"
                disabled={busy || !draft.trim()}
                aria-label="Send"
                className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[color:#07a889] text-white transition-opacity disabled:opacity-35"
              >
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h13M12 5.5 18.5 12 12 18.5" />
                </svg>
              </button>
            </form>
  
            {turns.length === 0 && (
              <p className="mt-4 whitespace-nowrap text-center text-[13px] text-white/40 sm:text-[14px]">
                {SUGGESTIONS.map((sug, i) => (
                  <span key={sug.label}>
                    {i > 0 && <span className="px-1.5 text-white/25">·</span>}
                    <button
                      type="button"
                      onClick={() => void send(sug.ask)}
                      className="underline-offset-4 transition-colors hover:text-white/75 hover:underline"
                    >
                      {sug.label}
                    </button>
                  </span>
                ))}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
  