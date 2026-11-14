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
  "I need a new website",
  "Help with my Meta ads",
  "I need a custom app or tool",
  "Can you fix my Shopify store?",
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
    <div className="w-full max-w-[520px]">
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
        <div className="flex w-full flex-col p-5 sm:p-6">
          <div className="flex items-center gap-3.5">
            <Image
              src={asset("/assets/images/fZdV1icYbXIkqfVAekWtJEAifo.png")}
              alt="Thomas Flood"
              width={104}
              height={118}
              className="h-[52px] w-[52px] flex-none rounded-full object-cover object-top grayscale"
            />
            <div className="min-w-0">
              <p className="text-[16.5px] font-semibold leading-tight text-white">
                What can I help you with today?
              </p>
              <p className="mt-0.5 text-[12.5px] text-white/55">
                Thomas Flood, Director. Ask anything about your business.
              </p>
            </div>
          </div>

          {turns.length > 0 && (
            <div
              ref={scroller}
              className="mt-4 max-h-[220px] overflow-y-auto overscroll-contain pr-1"
            >
              <div className="grid gap-2.5">
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

          {turns.length === 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => void send(s)}
                  className="rounded-full border border-white/20 bg-white/[0.08] px-3.5 py-2 text-[13px] font-medium text-white/85 transition-colors hover:border-white/40 hover:bg-white/15"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void send(draft);
            }}
            className="mt-4 flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.08] py-1.5 pl-4 pr-1.5 focus-within:border-white/45"
          >
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Ask anything…"
              aria-label="Ask a question"
              className="min-w-0 flex-1 bg-transparent py-2 text-[15px] text-white outline-none placeholder:text-white/45"
            />
            <button
              type="submit"
              disabled={busy || !draft.trim()}
              aria-label="Send"
              className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[color:#07a889] text-white transition-opacity disabled:opacity-40"
            >
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h13M12 5.5 18.5 12 12 18.5" />
              </svg>
            </button>
          </form>
        </div>
      </GlassSurface>
    </div>
  );
}
