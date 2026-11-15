/**
 * Cloudflare Turnstile, loaded only when somebody actually asks something.
 *
 * The ask endpoint costs money per call and the public can reach it, so each
 * message carries a fresh proof that it came from a browser rather than a
 * loop. Tokens are single use and expire after about five minutes, which is
 * why this mints one per message instead of holding one for the whole
 * conversation.
 *
 * The widget runs in explicit-execution mode and never appears for an
 * ordinary visitor. The script is loaded lazily, because nobody reading the
 * home page should pay for it unless they type something.
 */

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

export const turnstileConfigured = Boolean(SITE_KEY);

const SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type RenderOptions = {
  sitekey: string;
  callback: (token: string) => void;
  "error-callback": (code?: string) => void;
  "timeout-callback": () => void;
  appearance: "always" | "execute" | "interaction-only";
  execution: "render" | "execute";
};

type Turnstile = {
  render: (el: HTMLElement, opts: RenderOptions) => string;
  execute: (id: string) => void;
  reset: (id: string) => void;
};

declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

let loading: Promise<Turnstile> | null = null;

function load(): Promise<Turnstile> {
  if (loading) return loading;
  loading = new Promise<Turnstile>((resolve, reject) => {
    if (window.turnstile) return resolve(window.turnstile);
    const tag = document.createElement("script");
    tag.src = SRC;
    tag.async = true;
    tag.onload = () =>
      window.turnstile ? resolve(window.turnstile) : reject(new Error("turnstile missing"));
    tag.onerror = () => {
      // Let a later attempt try again rather than caching the failure
      // forever: a flaky network should not permanently break the box.
      loading = null;
      reject(new Error("turnstile failed to load"));
    };
    document.head.appendChild(tag);
  });
  return loading;
}

let host: HTMLElement | null = null;
let widgetId: string | null = null;

function container(): HTMLElement {
  if (host) return host;
  host = document.createElement("div");
  // Positioned off screen rather than display:none. Turnstile needs a real
  // box to render into and a hidden one can stop it running at all.
  host.style.cssText = "position:fixed;left:-9999px;top:0;width:300px;height:65px";
  document.body.appendChild(host);
  return host;
}

/**
 * Whoever is currently waiting for a token.
 *
 * The widget's callbacks are bound once, at render, and cannot be swapped
 * per execution, so every solve lands in `settle` and is handed to the
 * caller waiting here. One ask is in flight at a time, because the composer
 * is disabled while a question is being answered.
 */
let waiting: ((token: string | null) => void) | null = null;

function settle(token: string | null) {
  const caller = waiting;
  waiting = null;
  caller?.(token);
}

/**
 * One fresh token, or null if we could not get one.
 *
 * Null is never treated as permission to proceed: the server refuses any
 * request without a valid token, and the caller surfaces that refusal.
 */
export async function freshToken(): Promise<string | null> {
  if (!turnstileConfigured) return null;

  try {
    const ts = await load();

    return await new Promise<string | null>((resolve) => {
      // Cloudflare can sit on a challenge indefinitely and the visitor is
      // watching a blinking cursor, so give up rather than hang.
      const bail = setTimeout(() => settle(null), 12_000);
      waiting = (token) => {
        clearTimeout(bail);
        resolve(token);
      };

      if (widgetId === null) {
        widgetId = ts.render(container(), {
          sitekey: SITE_KEY,
          appearance: "interaction-only",
          execution: "execute",
          callback: settle,
          "error-callback": () => settle(null),
          "timeout-callback": () => settle(null),
        });
      } else {
        // Rendered already, so the last token is spent: reset clears it.
        ts.reset(widgetId);
      }

      ts.execute(widgetId);
    });
  } catch {
    return null;
  }
}
