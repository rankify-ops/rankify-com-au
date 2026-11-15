"use client";

import Link from "next/link";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { asset } from "@/lib/basePath";
import { CHECKOUT_API } from "@/lib/checkout";

/**
 * Where a question asked in the hero actually gets answered.
 *
 * The hero box is a doorway, not a chat window: a conversation squeezed into
 * a 60px glass pill is unreadable, and one that grows pushes the whole page
 * around. So the first question opens this instead, which has room.
 *
 * Every answer ends in buttons rather than link text. The endpoint returns
 * destinations it picked from a fixed list, so the links are always real
 * pages, and the point of the box is to get somebody to one of them or onto
 * a call rather than to keep them talking here.
 *
 * Light, not glass. This sits over the whole page and has to be read, and
 * the glass belongs to the hero behind it.
 */

export type AskAction = { key: string; label: string; href: string };

export type AskTurn = {
  role: "user" | "assistant";
  content: string;
  followUp?: string;
  actions?: AskAction[];
};

export function AskDialog({
  first,
  onClose,
}: {
  /** The question typed in the hero, sent the moment this opens. */
  first: string;
  onClose: () => void;
}) {
  const [turns, setTurns] = useState<AskTurn[]>([{ role: "user", content: first }]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const logId = useRef<string | undefined>(undefined);
  const scroller = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);
  const sent = useRef(false);

  const send = useCallback(async (next: AskTurn[]) => {
    setTurns(next);
    setBusy(true);
    try {
      const res = await fetch(`${CHECKOUT_API}/api/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map((t) => ({ role: t.role, content: t.content })),
          logId: logId.current,
        }),
      });
      const out = (await res.json()) as {
        reply?: string;
        followUp?: string;
        actions?: AskAction[];
        logId?: string;
      };
      if (out.logId) logId.current = out.logId;
      setTurns([
        ...next,
        {
          role: "assistant",
          content: out.reply ?? "I could not answer that one. Book a call and Tom will sort it.",
          followUp: out.followUp,
          actions: out.actions ?? [],
        },
      ]);
    } catch {
      setTurns([
        ...next,
        {
          role: "assistant",
          content:
            "I could not reach the server. Book fifteen minutes with Tom and he will answer it himself.",
          actions: [{ key: "call", label: "Book a 15 minute call with Thomas", href: "/schedule-strategy-call" }],
        },
      ]);
    } finally {
      setBusy(false);
    }
  }, []);

  // The question from the hero goes the moment this mounts. The ref guards
  // against React's development double-mount asking it twice.
  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    void send([{ role: "user", content: first }]);
  }, [first, send]);

  // Escape closes, and the page behind does not scroll while this is open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
    if (!busy) field.current?.focus({ preventScroll: true });
  }, [turns, busy]);

  // Mounted only on the client: this is portalled, and document does not
  // exist while the page is being prerendered.
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) return null;

  // Straight onto body. The hero that owns this box is `isolation: isolate`,
  // which would scope the dialog's z-index inside the hero's stacking context
  // and let the header and later sections paint over the top of it.
  return createPortal(
    <div className="fixed inset-0 z-[90] flex items-end justify-center p-0 sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Ask Rankify"
        className="relative flex max-h-[92svh] w-full max-w-[680px] flex-col overflow-hidden rounded-t-[28px] bg-white shadow-[0_40px_120px_-40px_rgba(0,33,23,0.6)] sm:max-h-[80svh] sm:rounded-[28px]"
      >
        <header className="flex items-center gap-3 border-b border-line px-5 py-4 sm:px-7">
          <Image
            src={asset("/assets/images/fZdV1icYbXIkqfVAekWtJEAifo.png")}
            alt=""
            width={104}
            height={118}
            className="h-10 w-10 flex-none rounded-full object-cover object-top grayscale"
          />
          <p className="min-w-0 flex-1 text-[14.5px] leading-tight">
            <span className="font-semibold">Rankify</span>
            <span className="block text-grey">Answers about what we do, then points you at it.</span>
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 flex-none items-center justify-center rounded-full text-grey transition-colors hover:bg-black/5 hover:text-ink"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </header>

        <div ref={scroller} className="flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-7">
          <div className="grid gap-4">
            {turns.map((t, i) =>
              t.role === "user" ? (
                <p
                  key={i}
                  className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-[color:var(--green-text)] px-4 py-2.5 text-[15px] leading-relaxed text-white"
                >
                  {t.content}
                </p>
              ) : (
                <div key={i} className="max-w-[92%]">
                  <p className="rounded-2xl rounded-bl-md bg-paper px-4 py-3 text-[15px] leading-relaxed text-ink">
                    {t.content}
                    {t.followUp && <span className="mt-2 block font-semibold">{t.followUp}</span>}
                  </p>
                  {t.actions && t.actions.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {t.actions.map((a) => (
                        <Link
                          key={a.key}
                          href={a.href}
                          onClick={onClose}
                          className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[14px] font-semibold transition-colors ${
                            a.key === "call"
                              ? "bg-[color:var(--green-text)] text-white hover:bg-[color:#046655]"
                              : "border border-line text-ink hover:border-[color:var(--green-text)] hover:text-[color:var(--green-text)]"
                          }`}
                        >
                          {a.label}
                          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h13M12 5.5 18.5 12 12 18.5" />
                          </svg>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ),
            )}
            {busy && (
              <p className="max-w-[92%] rounded-2xl rounded-bl-md bg-paper px-4 py-3 text-[15px] text-grey">
                Thinking…
              </p>
            )}
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const q = draft.trim();
            if (!q || busy) return;
            setDraft("");
            void send([...turns, { role: "user", content: q }]);
          }}
          className="flex items-center gap-2 border-t border-line px-4 py-3.5 sm:px-6"
        >
          <input
            ref={field}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Ask something else"
            aria-label="Ask something else"
            className="min-w-0 flex-1 bg-transparent px-2 text-[16px] text-ink outline-none placeholder:text-ink/40"
          />
          <button
            type="submit"
            disabled={busy || !draft.trim()}
            aria-label="Send"
            className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[color:var(--green-text)] text-white transition-opacity disabled:opacity-35"
          >
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h13M12 5.5 18.5 12 12 18.5" />
            </svg>
          </button>
        </form>
      </div>
    </div>,
    document.body,
  );
}
