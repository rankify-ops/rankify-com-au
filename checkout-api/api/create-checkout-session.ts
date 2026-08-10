import type Stripe from "stripe";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { stripe, cors, clip } from "./_lib.js";

/**
 * Creates an embedded Checkout Session for a website build.
 *
 * Pricing is computed here, from the page count only. The browser never sends
 * an amount — if it did, anyone could POST $1 and get a website. Keep these
 * three numbers in step with the configurator block in
 * src/content/service-pages/web-design-and-development.ts.
 */
const CURRENCY = "aud";
const BASE_CENTS = 299_900; // $2,999 — charged whether it's one page or ten
const INCLUDED_PAGES = 10;
const EXTRA_PAGE_CENTS = 20_000; // $200 per page beyond the included ten

type Body = {
  pages?: string[];
  servicePages?: number;
  business?: string;
  industry?: string;
  existing?: string;
  about?: string;
  name?: string;
  email?: string;
  phone?: string;
  returnUrl?: string;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (cors(req, res)) return;
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

  try {
    const b: Body = typeof req.body === "string" ? JSON.parse(req.body) : req.body ?? {};

    const pages = Array.isArray(b.pages) ? b.pages.filter((p) => typeof p === "string") : [];
    const servicePages = Math.max(0, Math.min(50, Number(b.servicePages) || 0));
    const totalPages = pages.length + servicePages;
    const extra = Math.max(0, totalPages - INCLUDED_PAGES);

    const email = typeof b.email === "string" ? b.email.trim() : "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "A valid email is required." });
    }

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: CURRENCY,
          unit_amount: BASE_CENTS,
          product_data: {
            name: "Website build",
            description: `Custom website, ${INCLUDED_PAGES} pages included, built in 7–14 days.`,
          },
        },
      },
    ];

    if (extra > 0) {
      lineItems.push({
        quantity: extra,
        price_data: {
          currency: CURRENCY,
          unit_amount: EXTRA_PAGE_CENTS,
          product_data: { name: "Additional page" },
        },
      });
    }

    // The brief rides along with the payment so the order arrives complete in
    // the Stripe dashboard rather than in a separate email.
    const metadata: Record<string, string> = {
      total_pages: String(totalPages),
      pages: clip(pages.join(", ")),
      service_pages: String(servicePages),
      business: clip(b.business, 200),
      industry: clip(b.industry, 100),
      existing_site: clip(b.existing, 200),
      about: clip(b.about),
      contact_name: clip(b.name, 100),
      contact_phone: clip(b.phone, 40),
    };

    const returnUrl =
      typeof b.returnUrl === "string" && /^https?:\/\//.test(b.returnUrl)
        ? b.returnUrl
        : "https://www.rankify.com.au/checkout/complete";

    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      mode: "payment",
      line_items: lineItems,
      customer_email: email,
      metadata,
      payment_intent_data: { metadata },
      return_url: `${returnUrl}${returnUrl.includes("?") ? "&" : "?"}session_id={CHECKOUT_SESSION_ID}`,
      automatic_tax: { enabled: false },
    });

    return res.status(200).json({ clientSecret: session.client_secret });
  } catch (err) {
    console.error("create-checkout-session failed", err);
    return res.status(500).json({ error: "Could not start checkout." });
  }
}
