# Checkout API

Three Stripe endpoints for the website configurator on rankify.com.au.

The site is a static export on GitHub Pages, so it has no server of its own to
create a Checkout Session with. This is that server — a separate Vercel project
deployed from this subdirectory.

| Endpoint | What it does |
|---|---|
| `POST /api/lead` | Records the brief in rankify-crm as soon as a valid email is typed, before the card form. Returns the CRM client id. |
| `POST /api/create-checkout-session` | Prices the order **server-side** from the page count and returns a client secret for embedded Checkout. |
| `GET /api/session-status?session_id=` | What the return page asks to show paid / not paid. |
| `POST /api/webhook` | Stripe's callback. The real confirmation that an order was paid — and what flips the CRM record to a client. |

## Where an order ends up

1. Valid email typed → `/api/lead` → CRM record, `status: lead`, with the pages,
   business details and estimated value. Its id rides along as
   `crm_client_id` in the Stripe session metadata.
2. Reaches the card form and leaves → the Stripe session keeps the whole brief,
   and `after_expiration.recovery` emails them a link back to it.
3. Pays → webhook sets that CRM record to `status: active` with the amount and
   the Stripe session id in the notes. If no lead was captured (they moved
   faster than the debounce) the webhook creates the record from the session
   metadata instead, so a paid order can't go missing.

A CRM outage never fails a payment: the webhook catches and logs, and still
returns 200 so Stripe doesn't retry an event we've already handled.

## Pricing lives here, not in the browser

`create-checkout-session.ts` holds `BASE_CENTS`, `INCLUDED_PAGES` and
`EXTRA_PAGE_CENTS`. The browser posts the *selections* only — never an amount —
so a tampered request can't buy a website for a dollar. **Keep these three
numbers in step with the configurator block** in
`src/content/service-pages/web-design-and-development.ts`.

## Deploy

1. In Vercel, **Add New → Project**, import `rankify-ops/rankify-com-au`.
2. Set **Root Directory** to `checkout-api`. This is the important bit — it
   keeps the deploy away from the Next.js site at the repo root.
3. Framework preset: **Other**.
4. Add environment variables:

   | Name | Value |
   |---|---|
   | `STRIPE_SECRET_KEY` | `rk_test_…` to start, `rk_live_…` when you go live |
   | `STRIPE_WEBHOOK_SECRET` | from step 5 |
   | `CRM_API_URL` | origin of rankify-crm, e.g. `https://rankify-crm.vercel.app` |
   | `CRM_ROUTINE_SECRET` | the same value as `ROUTINE_SECRET` in the CRM project |

   And, for the ask box on the home page — **all four, or it will not answer**:

   | Name | Value |
   |---|---|
   | `ANTHROPIC_API_KEY` | from console.anthropic.com |
   | `TURNSTILE_SECRET_KEY` | the secret half of the Cloudflare Turnstile pair |
   | `KV_REST_API_URL` | set for you by the Vercel KV / Upstash integration |
   | `KV_REST_API_TOKEN` | likewise |

   `ASK_DAILY_CAP` is optional and defaults to 1500 model calls a day.

5. Once deployed, in the Stripe dashboard: **Developers → Webhooks → Add
   endpoint**, URL `https://<your-deployment>.vercel.app/api/webhook`, event
   `checkout.session.completed`. Copy the signing secret into
   `STRIPE_WEBHOOK_SECRET` and redeploy.
6. Put the deployment origin into the site's `NEXT_PUBLIC_CHECKOUT_API`, and
   the publishable key into `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`.

## Allowed origins

`_lib.ts` holds an explicit allow-list, and it is **enforced**: a request whose
`Origin` isn't on it gets a 403 before any Stripe call. Header-only CORS would
protect browsers and nothing else — curl sends no `Origin` and ignores response
headers. Add new domains to that array; never widen it to `*`.

The webhook is exempt — Stripe sends no `Origin` and authenticates by
signature. That's why `webhook.ts` doesn't call `cors()`.

## Testing

With `sk_test_…` set, card `4242 4242 4242 4242`, any future expiry, any CVC.
`stripe listen --forward-to localhost:3000/api/webhook` replays webhooks
locally against `vercel dev`.

## What stops the ask box becoming a bill

`/api/ask` calls a paid API and anybody on the internet can reach it. The
origin allow-list above does not help here: it only binds browsers, and one
`-H "Origin: https://rankify.com.au"` walks straight past it. So the endpoint
assumes every caller is hostile and counts them.

Four layers, in the order a request meets them:

1. **Input caps** (`MAX_TURNS`, `MAX_CHARS` in `ask.ts`). Six turns of a
   thousand characters. A padded question is refused rather than truncated,
   because answering a padded one still costs us the call.
2. **Rate limits** (`_limits.ts`). Ten per address per ten minutes, forty per
   address per day, and `ASK_DAILY_CAP` model calls a day across everybody.
   That last one is the real ceiling: the worst possible day is that many
   calls, which at Haiku's rates is about two US dollars.
3. **Turnstile** (`_turnstile.ts`). A fresh single-use solve per message. The
   limiter decides how fast you may call; this decides whether you are a
   browser at all, which is what stops a botnet spreading its traffic across
   a thousand addresses to stay under the per-address caps.
4. **The model choice.** Haiku 5.5 rather than Opus 5.5, roughly forty times
   cheaper per token. Opus 5.5 also rejects forced `tool_choice` outright, so
   the answer-shaping tool call would 400 on every request there.

**It fails closed, deliberately.** If the KV store cannot be reached, or
either key is missing, the box stops calling the model and serves the
book-a-call fallback. A quiet hour of "book a call with Tom" is a far better
failure than an uncounted bill. The trade is that a missing key looks like a
working site that never answers, so if the box goes quiet in production, check
the environment variables before anything else.

**None of this is a substitute for a spend cap on the Anthropic account.**
Everything above is code, and code can have a bug in it. The cap is the only
limit that holds when the code is wrong.
