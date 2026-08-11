"use client";

import { useState, type FormEvent } from "react";

/**
 * Posts a form to Web3Forms.
 *
 * The site is a static export with no server of its own, so forms need a
 * third-party endpoint. Web3Forms takes a POST and emails it on — the access
 * key is designed to sit in the client (it can only submit to the address the
 * key is registered to), which is why it's a NEXT_PUBLIC_ var.
 *
 * Three states, not two. The old forms flipped straight to "Submitted!" on
 * submit without sending anything, so a visitor could be thanked for a message
 * nobody received. This only says sent when Web3Forms says so.
 */
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

export type FormState = "idle" | "sending" | "sent" | "error";

export function useWeb3Form(subject: string) {
  const [state, setState] = useState<FormState>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Web3Forms' own honeypot: bots fill every field, people can't see it.
    if (data.get("botcheck")) return;

    if (!ACCESS_KEY) {
      // Better a visible failure with a mailto fallback than a fake thank you.
      console.error("NEXT_PUBLIC_WEB3FORMS_KEY is not set — form not sent");
      setState("error");
      return;
    }

    data.append("access_key", ACCESS_KEY);
    data.append("subject", subject);
    data.append("from_name", "rankify.com.au");

    setState("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      const out = await res.json();
      if (out.success) {
        setState("sent");
        form.reset();
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  return { state, onSubmit };
}

/** Hidden field every form needs for the honeypot to work. */
export const BOTCHECK_PROPS = {
  type: "checkbox" as const,
  name: "botcheck",
  className: "hidden",
  style: { display: "none" },
  tabIndex: -1,
  autoComplete: "off",
};
