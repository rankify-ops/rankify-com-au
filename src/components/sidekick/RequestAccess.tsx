"use client";

import { useState } from "react";
import { CHECKOUT_API } from "@/lib/checkout";
import { SIDEKICK_LOGIN } from "@/components/sidekick/SidekickChrome";

/**
 * The form behind every "Get started" on the Ad Sidekick pages.
 *
 * Sign-up is built but switched off, so this is the honest version of that
 * button: it says so, takes the details, and says what happens next. It does
 * not pretend to create an account, and it does not promise a date.
 *
 * Name, email and mobile are required for the same reason the VSL form
 * requires them — a request with no way to call them back is not a request.
 */

const SPENDS = [
  "Not running ads yet",
  "Under $2,000 a month",
  "$2,000 – $10,000 a month",
  "$10,000 – $50,000 a month",
  "$50,000+ a month",
];

type State = "idle" | "sending" | "done" | "error";

export function RequestAccess() {
  const [state, setState] = useState<State>("idle");
  const [problem, setProblem] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;

    const data = new FormData(e.currentTarget);
    setState("sending");
    setProblem("");

    try {
      const res = await fetch(`${CHECKOUT_API}/api/request-access`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          business: data.get("business"),
          spend: data.get("spend"),
        }),
      });
      if (!res.ok) {
        const out = (await res.json().catch(() => ({}))) as { error?: string };
        setProblem(out.error ?? "We could not record that. Email tom@rankify.com.au.");
        setState("error");
        return;
      }
      setState("done");
    } catch {
      setProblem("We could not reach the server. Email tom@rankify.com.au and we'll add you.");
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-3xl border border-line bg-white p-7 sm:p-9">
        <h2 className="text-[clamp(22px,2.2vw,28px)] font-semibold tracking-[-0.03em]">
          You&rsquo;re on the list.
        </h2>
        <p className="mt-3 max-w-[460px] text-[15.5px] leading-relaxed text-grey">
          We&rsquo;ll be in touch on the mobile you gave us when there&rsquo;s a spot. Access is
          going out in small batches while we keep an eye on every account, so it won&rsquo;t be
          instant.
        </p>
        <a
          href={SIDEKICK_LOGIN}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex text-[14.5px] font-semibold text-[color:var(--green-text)] underline-offset-4 hover:underline"
        >
          Already a customer? Sign in
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-3xl border border-line bg-white p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" name="name" autoComplete="name" required />
        <Field label="Email address" name="email" type="email" autoComplete="email" required />
        {/* The pattern is escaped for the regex `v` flag the browser compiles
            it with: an unescaped bracket or a trailing dash fails to compile
            and the whole pattern is then ignored without a word of warning. */}
        <Field
          label="Mobile number"
          name="phone"
          type="tel"
          autoComplete="tel"
          required
          pattern="[0-9\s\(\)\+\-]{8,20}"
          hint="So we can call you when a spot opens."
        />
        <Field label="Business name" name="business" autoComplete="organization" />
      </div>

      <label className="mt-4 block">
        <span className="text-[14px] font-semibold">What do you spend on Meta now?</span>
        <select
          name="spend"
          defaultValue=""
          className="mt-1.5 w-full rounded-xl border border-black/15 bg-white px-4 py-3.5 text-[16px] outline-none focus:border-[color:#07a889]"
        >
          <option value="">Prefer not to say</option>
          {SPENDS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>

      {state === "error" && (
        <p role="alert" className="mt-4 text-[14.5px] font-medium text-[#b42318]">
          {problem}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        className="neu-btn neu-btn-dark mt-6 inline-flex w-full items-center justify-center rounded-full bg-[color:var(--green-text)] px-7 py-3.5 text-[16px] font-bold text-white transition-transform hover:-skew-x-3 disabled:opacity-60 sm:w-auto"
      >
        {state === "sending" ? "Sending…" : "Request access"}
      </button>

      <p className="mt-4 text-[13.5px] leading-relaxed text-grey">
        No payment details, and nothing starts billing. We&rsquo;ll call you before anything is
        set up.
      </p>
    </form>
  );
}

function Field({
  label,
  hint,
  ...props
}: { label: string; hint?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-[14px] font-semibold">
        {label}
        {!props.required && <span className="font-normal text-grey"> (optional)</span>}
      </span>
      <input
        {...props}
        className="mt-1.5 w-full rounded-xl border border-black/15 px-4 py-3.5 text-[16px] outline-none placeholder:text-ink/40 focus:border-[color:#07a889]"
      />
      {hint && <span className="mt-1.5 block text-[13px] text-grey">{hint}</span>}
    </label>
  );
}
