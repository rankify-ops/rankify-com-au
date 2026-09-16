import type { VercelRequest, VercelResponse } from "@vercel/node";
import { stripe } from "./_lib.js";

// TEMPORARY (17 Sep 2026): confirms which Stripe account STRIPE_SECRET_KEY belongs
// to. Token-guarded, returns no secrets. Delete after the check.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.query.t !== "711334c9bf0e8b83d8b35644e30c00bf") return res.status(404).end();
  const key = process.env.STRIPE_SECRET_KEY ?? "";
  const out: Record<string, unknown> = { keyType: key.slice(0, 8) };
  try {
    const a = await stripe.accounts.retrieve();
    const ext = a.external_accounts?.data?.[0] as { bank_name?: string; last4?: string; currency?: string } | undefined;
    Object.assign(out, {
      id: a.id,
      businessName: a.business_profile?.name,
      businessUrl: a.business_profile?.url,
      supportEmail: a.business_profile?.support_email,
      accountEmail: a.email,
      country: a.country,
      defaultCurrency: a.default_currency,
      businessType: a.business_type,
      legalName: a.company?.name ?? [a.individual?.first_name, a.individual?.last_name].filter(Boolean).join(" "),
      statementDescriptor: a.settings?.payments?.statement_descriptor,
      chargesEnabled: a.charges_enabled,
      payoutsEnabled: a.payouts_enabled,
      payoutBank: ext ? `${ext.bank_name ?? "bank"} ****${ext.last4} (${ext.currency})` : null,
    });
  } catch (err) {
    out.accountError = err instanceof Error ? err.message : String(err);
  }
  try {
    const bal = await stripe.balance.retrieve();
    out.balanceCurrencies = bal.available.map((b) => b.currency);
  } catch (err) {
    out.balanceError = err instanceof Error ? err.message : String(err);
  }
  try {
    const p = await stripe.prices.list({ lookup_keys: ["preview_hosting_yearly_aud_249"], limit: 1 });
    out.previewHostingPriceFound = p.data.length > 0;
  } catch (err) {
    out.pricesError = err instanceof Error ? err.message : String(err);
  }
  return res.status(200).json(out);
}
