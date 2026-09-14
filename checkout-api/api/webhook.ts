import type Stripe from "stripe";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { stripe } from "./_lib.js";
import { addPaidClient, recordPayment, crmConfigured } from "./_crm.js";

/**
 * Stripe's own callback. This — not the return page — is the source of truth
 * that an order was paid: a buyer can close the tab before being redirected,
 * and the return URL can be visited by anyone.
 *
 * Signature verification needs the exact bytes Stripe signed, so this route
 * opts out of body parsing.
 */
export const config = { api: { bodyParser: false } };

async function rawBody(req: VercelRequest): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  return Buffer.concat(chunks);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // GET is a health check: which env vars this deployment can actually see.
  // Booleans only — never the values. Saves guessing at the Vercel UI when a
  // variable is saved but scoped to no environment, or saved after the last
  // build.
  if (req.method === "GET") {
    return res.status(200).json({
      configured: {
        STRIPE_SECRET_KEY: Boolean(process.env.STRIPE_SECRET_KEY),
        STRIPE_WEBHOOK_SECRET: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
        CRM_API_URL: Boolean(process.env.CRM_API_URL),
        CRM_ROUTINE_SECRET: Boolean(process.env.CRM_ROUTINE_SECRET),
        PREVIEW_WEBHOOK_SECRET: Boolean(process.env.PREVIEW_WEBHOOK_SECRET),
      },
    });
  }

  if (req.method !== "POST") return res.status(405).end();

  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = req.headers["stripe-signature"];
  // Distinct messages: one is our misconfiguration, the other is the caller's.
  if (!secret) return res.status(500).send("Webhook secret not configured.");
  if (typeof signature !== "string") return res.status(400).send("Not signed.");

  let event;
  try {
    event = stripe.webhooks.constructEvent(await rawBody(req), signature, secret);
  } catch (err) {
    // An unverified body is either a misconfigured secret or someone poking
    // the endpoint. Either way, don't act on it.
    console.error("webhook signature check failed", err);
    return res.status(400).send("Bad signature.");
  }

  if (event.type === "checkout.session.completed") {
    const s = event.data.object;
    const m = s.metadata ?? {};

    // Everything needed to start the build, in one log line Vercel keeps.
    console.log("ORDER PAID", {
      session: s.id,
      amount: s.amount_total,
      currency: s.currency,
      email: s.customer_details?.email,
      ...m,
    });

    // Preview checkout: unlock the client's home page for everyone on the
    // link. Separate from the CRM so a CRM outage can't keep a paying client
    // locked out.
    if (m.source === "preview-gate" && m.preview_site) {
      try {
        const r = await fetch("https://rankify-previews.vercel.app/api/preview", {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-webhook-secret": process.env.PREVIEW_WEBHOOK_SECRET ?? "" },
          body: JSON.stringify({ site: m.preview_site, action: "mark_paid", stripeRef: s.id }),
        });
        console.log("PREVIEW UNLOCKED", m.preview_site, r.status);
      } catch (err) {
        console.error("Preview unlock failed for", s.id, err);
      }
    }

    // A payment always creates a client in the pipeline. The pre-payment
    // enquiry lives in the Rankify Website space, which is a different store —
    // there's no lead record to promote.
    //
    // Wrapped because a CRM outage must never make us return non-200: Stripe
    // would retry the event and we'd double-handle a payment that succeeded.
    try {
      if (crmConfigured && m.source === "preview-gate") {
        await recordPreviewPayment(s);
      } else if (crmConfigured) {
        const amount = s.amount_total ?? 0;
        await addPaidClient(
          {
            pagesMode: m.pages_mode === "rankify" ? "rankify" : "custom",
            pages: (m.pages ?? "").split(", ").filter(Boolean),
            servicePages: Number(m.service_pages ?? 0),
            totalPages: Number(m.total_pages ?? 0),
            price: Math.round(amount / 100),
            business: m.business ?? "",
            industry: m.industry ?? "",
            existing: m.existing_site ?? "",
            about: m.about ?? "",
            name: m.contact_name ?? "",
            email: s.customer_details?.email ?? "",
            phone: m.contact_phone ?? "",
          },
          `PAID $${(amount / 100).toLocaleString("en-AU")} via Stripe (${s.id}). ${m.total_pages ?? "?"} pages.`,
        );
      }
    } catch (err) {
      console.error("CRM update failed for", s.id, err);
    }
  }

  // Yearly hosting renewals for preview-gate clients. Needs `invoice.paid`
  // enabled on the webhook endpoint in the Stripe dashboard.
  if (event.type === "invoice.paid") {
    const inv = event.data.object;
    const subMeta = inv.parent?.subscription_details?.metadata ?? {};
    if (inv.billing_reason === "subscription_cycle" && subMeta.source === "preview-gate") {
      try {
        if (crmConfigured) {
          const amount = Math.round((inv.amount_paid ?? 0) / 100);
          const res2 = await recordPayment({
            stripeRef: inv.id ?? "",
            email: inv.customer_email ?? "",
            company: subMeta.business ?? "",
            source: "Free home page preview",
            renewal: true,
            items: [{ name: "Hosting renewal", amount, category: "Hosting" }],
            hosting: { amount, renewalDate: oneYearFrom(new Date()) },
            note: `Hosting renewed: PAID ${amount.toLocaleString("en-AU")} via Stripe (${inv.id}).`,
          });
          console.log("HOSTING RENEWED", inv.id, res2);
        }
      } catch (err) {
        console.error("CRM renewal update failed for", inv.id, err);
      }
    }
  }

  return res.status(200).json({ received: true });
}

const oneYearFrom = (d: Date) => {
  const n = new Date(d);
  n.setFullYear(n.getFullYear() + 1);
  return n.toISOString().split("T")[0];
};

/**
 * Free home page preview checkout: build (one-off) + hosting (yearly) in one
 * subscription-mode session. Amounts come from Stripe's line items, so a promo
 * code is reflected in the CRM as what was actually paid.
 */
async function recordPreviewPayment(s: Stripe.Checkout.Session) {
  const m = s.metadata ?? {};
  const lines = await stripe.checkout.sessions.listLineItems(s.id, { limit: 10 });
  const dollars = (c: number | null | undefined) => Math.round((c ?? 0) / 100);
  const hostingLine = lines.data.find((l) => l.price?.recurring);
  const buildLines = lines.data.filter((l) => !l.price?.recurring);
  const build = buildLines.reduce((t, l) => t + dollars(l.amount_total), 0);
  const hosting = dollars(hostingLine?.amount_total);
  const total = dollars(s.amount_total);

  const out = await recordPayment({
    stripeRef: s.id,
    email: s.customer_details?.email ?? s.customer_email ?? "",
    company: m.business ?? "",
    source: "Free home page preview",
    dealValue: build,
    services: ["Web Development"],
    items: [
      { name: "Website build", amount: build, category: "Web Development" },
      { name: "Hosting (year 1)", amount: hosting, category: "Hosting" },
    ],
    hosting: { amount: dollars(hostingLine?.price?.unit_amount), renewalDate: oneYearFrom(new Date()), type: "GitHub" },
    note: `PAID ${total.toLocaleString("en-AU")} via Stripe (${s.id}) from the free home page preview (${m.preview_site ?? "?"}): website ${build.toLocaleString("en-AU")} + hosting ${hosting.toLocaleString("en-AU")}/yr.`,
  });
  console.log("PREVIEW PAYMENT RECORDED", s.id, out);
}
