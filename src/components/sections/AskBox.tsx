"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { asset } from "@/lib/basePath";
import { CHECKOUT_API } from "@/lib/checkout";
import GlassSurface from "@/components/GlassSurface";

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

const SUGGESTIONS = [
  { label: "a new website", ask: "I need a new website" },
  { label: "Meta ads", ask: "I need help with my Meta ads" },
  { label: "a custom app", ask: "I need a custom app or internal tool built" },
];

type Turn = { role: "user" | "assistant"; content: string };

export function AskBox() {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);

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
    <div className="relative w-full max-w-[520px] rounded-[28px] ring-1 ring-white/20 before:pointer-events-none before:absolute before:inset-0 before:z-[3] before:rounded-[28px] before:bg-[linear-gradient(135deg,rgba(255,255,255,0.45)_0%,rgba(255,255,255,0.06)_26%,rgba(255,255,255,0)_52%)] after:pointer-events-none after:absolute after:inset-x-8 after:top-0 after:z-[3] after:h-px after:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.75),transparent)]">
      <GlassSurface
        width="100%"
        height="100%"
        borderRadius={28}
        blur={14}
        backgroundOpacity={0.08}
        saturation={1.4}
        distortionScale={-140}
        className="w-full"
      >
        <div className="flex w-full flex-col p-4 sm:p-5">
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
            className="flex items-center gap-3 rounded-full border border-white/20 bg-white/[0.08] py-2 pl-2 pr-2 transition-colors focus-within:border-white/45"
          >
            <Image
              src={asset("/assets/images/fZdV1icYbXIkqfVAekWtJEAifo.png")}
              alt="Thomas Flood"
              width={104}
              height={118}
              className="h-9 w-9 flex-none rounded-full object-cover object-top grayscale"
            />
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="What can we help you with?"
              aria-label="Tell us what you need help with"
              className="min-w-0 flex-1 bg-transparent text-[15px] text-white outline-none placeholder:text-white/50"
            />
            <button
              type="submit"
              disabled={busy || !draft.trim()}
              aria-label="Send"
              className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[color:#07a889] text-white transition-opacity disabled:opacity-35"
            >
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h13M12 5.5 18.5 12 12 18.5" />
              </svg>
            </button>
          </form>

          {turns.length === 0 && (
            <p className="mt-3 text-center text-[13px] text-white/40">
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
      </GlassSurface>
    </div>
  );
}
