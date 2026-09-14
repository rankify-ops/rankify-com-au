import type Stripe from "stripe";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { stripe, cors, clip } from "./_lib.js";

/**
 * Checkout for the free home page preview offer (the PreviewGate lock screen
 * on each client's preview site, backed by rankify-previews).
 *
 *   GET  ?site=<slug>          → the price to show on the card
 *   POST { site, returnUrl }   → a hosted Checkout URL
 *
 * One Checkout, two items: the website build (one-off) and the first year of
 * hosting (recurring yearly). In subscription mode Stripe puts the one-off
 * item on the first invoice, so the client pays both today and Stripe renews
 * hosting every year after.
 *
 * Prices live here, never in the browser. The email comes from the preview
 * record, not the request, so a session is always for the client the preview
 * was set up for.
 */
const CURRENCY = "aud";
const BUILD_CENTS = 299_900; // $2,999 website build
const HOSTING_CENTS = 24_900; // $249 per year hosting, on top of the build

/** Per-client build price when Tom quotes something other than $2,999. */
const BUILD_OVERRIDES: Record<string, number> = {};

const PREVIEWS_API = "https://rankify-previews.vercel.app/api/preview";

type PreviewRecord = { email?: string; label?: string | null };

async function previewRecord(site: string): Promise<PreviewRecord | null> {
  const r = await fetch(PREVIEWS_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ site, action: "status" }),
  });
  if (!r.ok) return null;
  const data = (await r.json()) as { record?: PreviewRecord | null };
  return data.record ?? null;
}

const validSite = (s: unknown): s is string => typeof s === "string" && /^[a-z0-9-]{1,60}$/.test(s);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (cors(req, res)) return;

  try {
    if (req.method === "GET") {
      const site = req.query.site;
      if (!validSite(site)) return res.status(400).json({ error: "Bad site." });
      return res.status(200).json({
        currency: CURRENCY,
        buildCents: BUILD_OVERRIDES[site] ?? BUILD_CENTS,
        hostingCents: HOSTING_CENTS,
      });
    }

    if (req.method !== "POST") return res.status(405).json({ error: "GET or POST only" });

    const b = (typeof req.body === "string" ? JSON.parse(req.body) : req.body ?? {}) as {
      site?: string;
      returnUrl?: string;
    };
    if (!validSite(b.site)) return res.status(400).json({ error: "Bad site." });

    const record = await previewRecord(b.site);
    if (!record?.email) return res.status(404).json({ error: "Preview not set up." });

    const returnUrl =
      typeof b.returnUrl === "string" && /^https?:\/\//.test(b.returnUrl)
        ? b.returnUrl.split("?")[0].split("#")[0]
        : "https://www.rankify.com.au/";

    const business = record.label ?? "";
    const metadata: Record<string, string> = {
      source: "preview-gate",
      preview_site: b.site,
      business: clip(business, 200),
    };

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: CURRENCY,
          unit_amount: BUILD_OVERRIDES[b.site] ?? BUILD_CENTS,
          product_data: {
            name: "Website build",
            description: "Your new website, built from the home page you previewed.",
          },
        },
      },
      {
        quantity: 1,
        price_data: {
          currency: CURRENCY,
          unit_amount: HOSTING_CENTS,
          recurring: { interval: "year" },
          product_data: {
            name: "Website hosting",
            description: "Renews yearly.",
          },
        },
      },
    ];

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: lineItems,
      customer_email: record.email,
      metadata,
      subscription_data: { metadata, description: `Hosting — ${business || b.site}` },
      success_url: `${returnUrl}?checkout=success`,
      cancel_url: returnUrl,
      allow_promotion_codes: true,
      automatic_tax: { enabled: false },
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("preview-checkout failed", err);
    const message = err instanceof Error ? err.message : "";
    return res.status(500).json({ error: "Could not start checkout.", detail: message });
  }
}
