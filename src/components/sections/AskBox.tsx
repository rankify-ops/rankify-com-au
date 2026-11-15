"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/basePath";
import { AskDialog } from "@/components/sections/AskDialog";

/**
 * The ask box in the hero.
 *
 * It is a doorway, not a chat window. Somebody says what they need and the
 * answer opens in `AskDialog`, which has room to read: a conversation
 * squeezed into a 60px glass pill is unreadable, and one that grows pushes
 * the whole hero around while they are still typing.
 *
 * So nothing here holds a conversation. It takes one question and hands it
 * over. The suggestions are the three things people actually arrive wanting,
 * for anyone who would rather click than type.
 *
 * Glass rules again: no <Reveal> around this, and no hover transform,
 * because either cancels the backdrop-filter that draws it.
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
  "I want a dashboard for my numbers",
  "I need a web developer",
  "I want to connect Claude to my Shopify store",
];

const TYPED_NARROW = [
  "I need a new website",
  "I want a Shopify store",
  "I need Meta ads",
  "I want a dashboard",
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
  const [draft, setDraft] = useState("");
  const [focused, setFocused] = useState(false);
  /** The question the dialog is open on. Null means closed. */
  const [asking, setAsking] = useState<string | null>(null);
  const typed = useTypedPlaceholder(!draft && !focused && !asking);
  const field = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!window.matchMedia?.("(min-width: 1024px)").matches) return;
    field.current?.focus({ preventScroll: true });
  }, []);

  function ask(text: string) {
    const question = text.trim();
    if (!question) return;
    setDraft("");
    setAsking(question);
  }

  return (
    // The same lit edge the door cards had: a bright hairline along the top
    // and a diagonal sheen falling from the top left, which is what makes the
    // surface read as glass rather than a tinted panel. Pseudo-elements only,
    // and no transform or opacity on this wrapper, because either would
    // cancel the backdrop-filter underneath it.
    <div className="w-full max-w-[680px]">
      <div className="mb-4 flex items-center justify-center gap-3 text-left sm:mb-5 sm:gap-4">
        <Image
          src={asset("/assets/images/fZdV1icYbXIkqfVAekWtJEAifo.png")}
          alt="Thomas Flood"
          width={104}
          height={118}
          className="h-12 w-12 flex-none rounded-full object-cover object-top grayscale sm:h-16 sm:w-16"
        />
        <p className="max-w-[440px] text-balance text-[15px] leading-snug text-white/75 sm:text-[16px]">
          <span className="font-semibold text-white">Hey, I&rsquo;m Thomas.</span> Tell me below
          how our team can help, and we&rsquo;ll take it from there.
        </p>
      </div>

      <div className="relative w-full max-w-[680px] rounded-[28px] ring-1 ring-white/20 before:pointer-events-none before:absolute before:inset-0 before:z-[3] before:rounded-[28px] before:bg-[linear-gradient(135deg,rgba(255,255,255,0.45)_0%,rgba(255,255,255,0.06)_26%,rgba(255,255,255,0)_52%)] after:pointer-events-none after:absolute after:inset-x-8 after:top-0 after:z-[3] after:h-px after:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.75),transparent)]">
        {/* Only the standard backdrop-filter, via Tailwind. Hand-writing a
            -webkit- one alongside it makes Lightning CSS drop the unprefixed
            property and the blur disappears from the shipped stylesheet. */}
        <div className="w-full rounded-[28px] bg-white/[0.07] backdrop-blur-xl backdrop-saturate-150">
          <div className="flex w-full flex-col p-4 sm:p-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(draft);
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
                  className="w-full bg-transparent text-[16px] text-white outline-none"
                />
                {!draft && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 left-0 flex items-center gap-[3px] whitespace-nowrap text-[16px] text-white/50"
                  >
                    <span
                      className={`${typed.still ? "" : "caret-blink "}inline-block h-[19px] w-px bg-white/80`}
                    />
                    {typed.text}
                  </span>
                )}
              </span>
              <button
                type="submit"
                disabled={!draft.trim()}
                aria-label="Send"
                className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[color:#07a889] text-white transition-opacity disabled:opacity-35"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-[18px] w-[18px]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h13M12 5.5 18.5 12 12 18.5" />
                </svg>
              </button>
            </form>

            <p className="mt-4 whitespace-nowrap text-center text-[13px] text-white/40">
              {SUGGESTIONS.map((sug, i) => (
                <span key={sug.label}>
                  {i > 0 && <span className="px-1.5 text-white/25">·</span>}
                  <button
                    type="button"
                    onClick={() => ask(sug.ask)}
                    className="underline-offset-4 transition-colors hover:text-white/75 hover:underline"
                  >
                    {sug.label}
                  </button>
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>

      {asking && <AskDialog first={asking} onClose={() => setAsking(null)} />}
    </div>
  );
}
