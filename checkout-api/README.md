# Checkout API

Three Stripe endpoints for the website configurator on rankify.com.au.

The site is a static export on GitHub Pages, so it has no server of its own to
create a Checkout Session with. This is that server — a separate Vercel project
deployed from this subdirectory.

| Endpoint | What it does |
|---|---|
| `POST /api/create-checkout-session` | Prices the order **server-side** from the page count and returns a client secret for embedded Checkout. |
| `GET /api/session-status?session_id=` | What the return page asks to show paid / not paid. |
| `POST /api/webhook` | Stripe's callback. The real confirmation that an order was paid. |

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
   | `STRIPE_SECRET_KEY` | `sk_test_…` to start, `sk_live_…` when you go live |
   | `STRIPE_WEBHOOK_SECRET` | from step 5 |

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
