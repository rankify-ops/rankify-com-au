"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/service-page/SectionHeading";
import { CheckoutModal } from "@/components/service-page/CheckoutModal";
import { captureLead, checkoutConfigured, type OrderPayload } from "@/lib/checkout";
import { pixelTrack } from "@/lib/pixel";
import type { ConfiguratorBlock } from "@/content/service-pages/types";

const INDUSTRIES = [
  "Trades & Construction",
  "Health & Wellness",
  "Beauty & Aesthetics",
  "Food & Hospitality",
  "Retail & Ecommerce",
  "Professional Services",
  "Real Estate",
  "Automotive",
  "Education & Training",
  "Fitness & Sport",
  "Pet Services",
  "Cleaning & Maintenance",
  "Other",
];

const money = (n: number) => `$${n.toLocaleString("en-AU")}`;

function StepDots({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            i + 1 === step ? "w-6 bg-[color:#07a889]" : i + 1 < step ? "w-1.5 bg-white/60" : "w-1.5 bg-white/20"
          }`}
        />
      ))}
    </div>
  );
}

function PageChip({
  label,
  on,
  onToggle,
}: {
  label: string;
  on: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={on}
      className={`flex items-center gap-2 rounded-full border px-3.5 py-2 text-[13.5px] font-medium transition-colors ${
        on
          ? "border-[color:#07a889] bg-[color:#07a889]/15 text-white"
          : "border-white/15 bg-white/[0.04] text-white/60 hover:border-white/30 hover:text-white"
      }`}
    >
      <span
        className={`flex h-4 w-4 flex-none items-center justify-center rounded-full text-[10px] font-bold ${
          on ? "bg-[color:#07a889] text-white" : "bg-white/10 text-white/70"
        }`}
      >
        {on ? "✓" : "+"}
      </span>
      {label}
    </button>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  /** Marks the field with an asterisk instead of explaining it below the button. */
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12.5px] font-medium text-white/60">
        {label}
        {required && (
          <span className="ml-0.5 text-[color:#07a889]" aria-hidden>
            *
          </span>
        )}
      </span>
      {children}
    </label>
  );
}

const inputCls =
  "w-full rounded-xl border border-white/15 bg-white/[0.06] px-3.5 py-2.5 text-[14px] text-white outline-none transition-colors placeholder:text-white/30 focus:border-[color:#07a889]";

export function ConfiguratorSection({ block }: { block: ConfiguratorBlock }) {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<string[]>(block.corePages);
  const [showMore, setShowMore] = useState(false);
  /**
   * Most people don't want to make ten decisions before they can pay. Default
   * to us scoping it; picking pages is the opt-in, not the toll gate.
   */
  const [pagesMode, setPagesMode] = useState<"rankify" | "custom">("rankify");
  const [servicePages, setServicePages] = useState(0);
  const [custom, setCustom] = useState<string[]>([]);
  const [draft, setDraft] = useState("");
  const [details, setDetails] = useState({
    business: "",
    industry: "",
    existing: "",
    about: "",
    name: "",
    email: "",
    phone: "",
  });
  const [sent, setSent] = useState(false);
  const [paying, setPaying] = useState(false);

  // Two pricing models share this form. "build" is a base price covering a
  // number of pages with extras on top; "per page" charges for every page
  // selected, monthly, against a minimum term.
  const perPage = block.pricePerPage != null;
  const basePrice = block.basePrice ?? 0;
  const includedPages = block.includedPages ?? 0;
  const extraPagePrice = block.extraPagePrice ?? 0;

  const byUs = pagesMode === "rankify";
  // In "we'll handle it" mode the picker isn't driving anything: the price is
  // the base build and the page list is scoped on the brief.
  const totalPages = byUs ? includedPages : selected.length + servicePages + custom.length;
  const extra = Math.max(0, totalPages - includedPages);
  const remaining = perPage ? 0 : Math.max(0, includedPages - totalPages);
  const price = byUs
    ? basePrice
    : perPage
      ? totalPages * (block.pricePerPage ?? 0)
      : basePrice + extra * extraPagePrice;
  const canCheckout = (block.checkout ?? true) && checkoutConfigured;

  const toggle = (p: string) =>
    setSelected((cur) => (cur.includes(p) ? cur.filter((x) => x !== p) : [...cur, p]));

  // Case-insensitive against both lists — adding "Blog" when Blog is already
  // selected used to bill it twice.
  const addCustom = () => {
    const v = draft.trim();
    if (!v) return;
    const taken = [
      ...selected,
      ...custom,
      ...block.corePages,
      ...block.optionalPages,
      ...(block.morePages ?? []),
    ].some(
      (p) => p.toLowerCase() === v.toLowerCase(),
    );
    if (taken) {
      setDraft("");
      return;
    }
    setCustom((c) => [...c, v]);
    setDraft("");
  };

  const email = details.email.trim();
  // enough to be repliable — a lead with no name and no address is no lead
  const canSubmit = details.name.trim().length > 1 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const [crmClientId, setCrmClientId] = useState<string | null>(null);

  const summary = useMemo(
    () =>
      [
        (byUs
          ? "Pages: Rankify to recommend (up to " + includedPages + " included)"
          : `Pages (${totalPages}): ${[...selected, ...custom].join(", ")}`) +
          (servicePages ? `, ${servicePages} dedicated service page(s)` : ""),
        `Total: ${money(price)}`,
        `Business: ${details.business || "—"} (${details.industry || "—"})`,
        `Existing site: ${details.existing || "—"}`,
        `About: ${details.about || "—"}`,
        `Contact: ${details.name || "—"} · ${details.email || "—"} · ${details.phone || "—"}`,
      ].join("\n"),
    [byUs, includedPages, totalPages, selected, custom, servicePages, price, details]
  );

  const mailto = `mailto:hello@rankify.com.au?subject=${encodeURIComponent(
    `Website order — ${money(price)}`
  )}&body=${encodeURIComponent(summary)}`;

  // Selections only — the API prices the order itself, so a tampered payload
  // can't buy a website for a dollar.
  const order: OrderPayload = {
    pagesMode,
    pages: byUs ? [] : [...selected, ...custom],
    servicePages,
    business: details.business,
    industry: details.industry,
    existing: details.existing,
    about: details.about,
    name: details.name,
    email,
    phone: details.phone,
    crmClientId: crmClientId ?? undefined,
  };

  /**
   * Send the brief to the CRM once there's an email worth following up, so a
   * visitor who configures a site and leaves is still reachable. Declared
   * after `order` because it reads it. Fires once per visit — the ref guards
   * the re-render every keystroke causes — and after a pause, so we record a
   * finished address rather than "t@e".
   */
  const leadSentRef = useRef(false);
  const orderRef = useRef(order);

  useEffect(() => {
    // Kept fresh in an effect rather than during render — the timeout below
    // needs the latest brief, not the one from the render that scheduled it.
    orderRef.current = order;
  });

  /**
   * Reaching step 2 means they've picked their pages and seen the price — the
   * closest thing this page has to an add-to-cart. Fired as the standard
   * AddToCart so Meta builds the audience itself and the event can be
   * optimised for later; a custom event name would do neither.
   *
   * Once per visit: stepping back and forward again is the same intent, not a
   * second one.
   */
  const addToCartSentRef = useRef(false);

  useEffect(() => {
    if (step < 2 || addToCartSentRef.current) return;
    addToCartSentRef.current = true;
    pixelTrack("AddToCart", {
      content_name: "Website configurator",
      content_category: "Web development",
      content_type: "product",
      value: price,
      currency: "AUD",
      num_items: totalPages,
    });
  }, [step, price, totalPages]);

  useEffect(() => {
    if (!canSubmit || leadSentRef.current) return;
    const t = setTimeout(() => {
      if (leadSentRef.current) return;
      leadSentRef.current = true;
      captureLead(orderRef.current).then(setCrmClientId);
    }, 1200);
    return () => clearTimeout(t);
  }, [canSubmit, email]);

  return (
    <section
      id={block.anchorId}
      className="grain mx-2 mt-8 scroll-mt-24 rounded-3xl bg-[radial-gradient(120%_140%_at_20%_0%,#06382a_0%,var(--green-deep)_45%,#010f0a_100%)] text-white sm:mt-12 lg:mt-20"
    >
      <div className="relative z-[2] mx-auto max-w-[1400px] px-5 py-12 sm:px-10 sm:py-16 lg:py-20">
        <SectionHeading
          label={block.eyebrow}
          heading={block.heading}
          sub={block.blurb}
          dark
          className="mb-8 sm:mb-12"
        />

        <Reveal delay={0.2} className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04]">
          <div className="grid lg:grid-cols-[1.35fr_1fr]">
            {/* ---- running total, phone only ----
                Stacked, the desktop right-hand column lands below the form,
                so the number you're deciding against is off-screen while you
                tap the chips. This puts it above them; the panel underneath
                keeps the page list. */}
            <div className="border-b border-white/10 bg-white/[0.06] px-7 py-5 sm:px-10 lg:hidden">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-white/50">
                    Your build
                  </p>
                  <span className="mt-1.5 block text-[36px] font-semibold leading-none tracking-[-0.05em]">
                    {money(price)}
                    {perPage && <span className="text-[15px] font-medium text-white/50">/mo</span>}
                  </span>
                </div>
                <p className="text-right text-[13px] leading-snug text-white/60">
                  {totalPages} page{totalPages === 1 ? "" : "s"}
                  <br />
                  {perPage ? (
                    <>× {money(block.pricePerPage ?? 0)} / mo</>
                  ) : (
                    <>
                      {includedPages} included
                      {extra > 0 && (
                        <>
                          <br />
                          {extra} extra × {money(extraPagePrice)}
                        </>
                      )}
                    </>
                  )}
                </p>
              </div>
              <p className="mt-3 flex items-center gap-1.5 text-[12px] font-medium text-white/70">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 flex-none text-[color:#07a889]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3.2 19 5.7v5.6c0 4.4-3 7.4-7 9.1-4-1.7-7-4.7-7-9.1V5.7z" /><path d="m9.2 11.9 2 2 3.6-3.8" /></svg>
                100% money-back guarantee, 30 days
              </p>
              <p
                className={`mt-3 rounded-xl px-3 py-2 text-[12.5px] font-medium leading-snug ${
                  remaining > 0
                    ? "bg-[color:#07a889]/15 text-[color:#3fd8bb]"
                    : "bg-white/[0.06] text-white/70"
                }`}
              >
                {perPage
                  ? `${money(price * (block.minMonths ?? 1))} over the ${block.minMonths ?? 1} month minimum.`
                  : remaining > 0
                    ? `You can select ${remaining} more page${remaining === 1 ? "" : "s"} before the price increases!`
                    : `All ${includedPages} included pages used — every page after this adds ${money(extraPagePrice)}.`}
              </p>
            </div>

            {/* ---- form ---- */}
            <div className="p-7 sm:p-10">
              {sent ? (
                <div className="flex h-full flex-col justify-center py-6">
                  <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[color:#07a889] text-[22px]">
                    ✓
                  </span>
                  <p className="text-[22px] font-medium tracking-[-0.03em]">That&rsquo;s your build mapped out.</p>
                  {/* Card payment is being wired up — until it is, the order
                      still has to reach us, so the same details go by email. */}
                  <p className="mt-2 max-w-[420px] text-[14.5px] text-white/60">
                    {totalPages} pages, {money(price)} in full. Card checkout goes live shortly — send
                    your order through now and we&rsquo;ll get started, or book a call and we&rsquo;ll
                    walk through it together first.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={mailto}
                      className="neu-btn neu-btn-light rounded-full bg-white px-5 py-3 text-[14px] font-bold text-ink"
                    >
                      Send my order
                    </a>
                    <Link
                      href={block.ctaHref}
                      className="rounded-full border border-white/20 px-5 py-3 text-[14px] font-semibold transition-colors hover:bg-white/10"
                    >
                      Book a call
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <p className="text-[12.5px] font-semibold uppercase tracking-[0.12em] text-white/50">
                      Step {step} of 3 —{" "}
                      {step === 1 ? "Your pages" : step === 2 ? "Your business" : "Your details"}
                    </p>
                    <StepDots step={step} total={3} />
                  </div>

                  {step === 1 && (
                    <>
                      {/* Two ways in, stated plainly. Default is us deciding —
                          picking pages is for people who want to, not a gate
                          everyone has to pass to reach the price. */}
                      <div className="mb-5 grid gap-2 sm:grid-cols-2">
                        {(
                          [
                            ["rankify", "Let us handle it", "We'll recommend the pages your business needs"],
                            ["custom", "I'll pick my pages", "Choose exactly what you want built"],
                          ] as const
                        ).map(([mode, title, sub]) => (
                          <button
                            key={mode}
                            type="button"
                            onClick={() => setPagesMode(mode)}
                            aria-pressed={pagesMode === mode}
                            className={`rounded-2xl border p-4 text-left transition-colors ${
                              pagesMode === mode
                                ? "border-[color:#07a889] bg-[color:#07a889]/12"
                                : "border-white/15 bg-white/[0.04] hover:bg-white/[0.07]"
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <span
                                className={`flex h-4 w-4 flex-none items-center justify-center rounded-full border ${
                                  pagesMode === mode
                                    ? "border-[color:#07a889] bg-[color:#07a889]"
                                    : "border-white/35"
                                }`}
                              >
                                {pagesMode === mode && (
                                  <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="#04231a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </span>
                              <span className="text-[14.5px] font-semibold">{title}</span>
                            </span>
                            <span className="mt-1.5 block pl-6 text-[13px] leading-snug text-white/60">
                              {sub}
                            </span>
                          </button>
                        ))}
                      </div>

                      {byUs ? (
                        <div className="rounded-2xl border border-white/12 bg-white/[0.04] p-5">
                          <p className="text-[15px] font-medium">
                            We&rsquo;ll scope the pages for you.
                          </p>
                          <p className="mt-2 text-[14px] leading-relaxed text-white/65">
                            After you order you&rsquo;ll get a short onboarding form. We take what
                            you tell us about your business and build the page structure that
                            converts best for it &mdash; up to {includedPages} pages included, at
                            the same price.
                          </p>
                          <ul className="mt-4 grid gap-2">
                            {[
                              "The pages your competitors rank for, not a template",
                              "A dedicated page per service where it earns one",
                              "Same 30-day money-back guarantee either way",
                            ].map((t) => (
                              <li key={t} className="flex items-start gap-2.5 text-[13.5px] leading-snug text-white/80">
                                <span className="mt-[3px] flex h-[15px] w-[15px] flex-none items-center justify-center rounded-full bg-[color:#07a889]">
                                  <svg viewBox="0 0 24 24" className="h-2 w-2" fill="none" stroke="#04231a" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 13l4 4L19 7" />
                                  </svg>
                                </span>
                                {t}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                      <>
                      <div className="flex flex-wrap gap-2">
                        {[...block.corePages, ...block.optionalPages].map((p) => (
                          <PageChip key={p} label={p} on={selected.includes(p)} onToggle={() => toggle(p)} />
                        ))}
                        {/* Hidden suggestions stay mounted once opened so a
                            selection isn't lost by collapsing the list. */}
                        {showMore &&
                          (block.morePages ?? []).map((p) => (
                            <PageChip key={p} label={p} on={selected.includes(p)} onToggle={() => toggle(p)} />
                          ))}
                        {/* A selected suggestion stays visible when collapsed —
                            otherwise you'd be paying for a page you can't see. */}
                        {!showMore &&
                          (block.morePages ?? [])
                            .filter((p) => selected.includes(p))
                            .map((p) => (
                              <PageChip key={p} label={p} on onToggle={() => toggle(p)} />
                            ))}
                        {custom.map((c) => (
                          <PageChip
                            key={c}
                            label={c}
                            on
                            onToggle={() => setCustom((x) => x.filter((v) => v !== c))}
                          />
                        ))}
                      </div>

                      {(block.morePages?.length ?? 0) > 0 && (
                        <button
                          type="button"
                          onClick={() => setShowMore((v) => !v)}
                          aria-expanded={showMore}
                          className="mt-3 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-white/70 transition-colors hover:text-white"
                        >
                          {showMore ? "Fewer options" : "More page suggestions"}
                          <svg
                            viewBox="0 0 24 24"
                            className={`h-3.5 w-3.5 transition-transform duration-300 ${showMore ? "rotate-180" : ""}`}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </button>
                      )}

                      <div className="mt-6 rounded-2xl border border-[color:#07a889]/25 bg-[color:#07a889]/10 p-4">
                        <p className="text-[13.5px] leading-snug text-white/80">
                          <strong className="font-semibold text-white">Tip.</strong> {block.tip}
                        </p>
                        <div className="mt-3 flex items-center gap-3">
                          <span className="text-[13.5px] text-white/70">Dedicated service pages</span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              aria-label="Fewer service pages"
                              onClick={() => setServicePages((n) => Math.max(0, n - 1))}
                              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-[16px] leading-none hover:bg-white/10"
                            >
                              −
                            </button>
                            <span className="w-6 text-center text-[15px] font-semibold tabular-nums">
                              {servicePages}
                            </span>
                            <button
                              type="button"
                              aria-label="More service pages"
                              onClick={() => setServicePages((n) => n + 1)}
                              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-[16px] leading-none hover:bg-white/10"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5">
                        <p className="mb-2 text-[12.5px] font-medium text-white/60">
                          Don&rsquo;t see a page you need? Add it here.
                        </p>
                        <div className="flex gap-2">
                          <input
                            value={draft}
                            onChange={(e) => setDraft(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                addCustom();
                              }
                            }}
                            placeholder="e.g. Finance Options"
                            className={inputCls}
                          />
                          <button
                            type="button"
                            onClick={addCustom}
                            className="flex-none rounded-xl border border-white/20 px-4 text-[14px] font-semibold hover:bg-white/10"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                      </>
                      )}
                    </>
                  )}

                  {step === 2 && (
                    <div className="grid gap-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Business name">
                          <input
                            className={inputCls}
                            value={details.business}
                            onChange={(e) => setDetails({ ...details, business: e.target.value })}
                            placeholder="Acme Plumbing"
                          />
                        </Field>
                        <Field label="Industry">
                          <select
                            className={inputCls}
                            value={details.industry}
                            onChange={(e) => setDetails({ ...details, industry: e.target.value })}
                          >
                            <option value="">Select…</option>
                            {INDUSTRIES.map((i) => (
                              <option key={i} className="bg-[var(--green-deep)]">
                                {i}
                              </option>
                            ))}
                          </select>
                        </Field>
                      </div>
                      <Field label="Existing website (if you have one)">
                        <input
                          className={inputCls}
                          value={details.existing}
                          onChange={(e) => setDetails({ ...details, existing: e.target.value })}
                          placeholder="https://…"
                        />
                      </Field>
                      <Field label="What does your business do?">
                        <textarea
                          rows={3}
                          className={inputCls}
                          value={details.about}
                          onChange={(e) => setDetails({ ...details, about: e.target.value })}
                          placeholder="What you do, who you serve, what makes you different."
                        />
                      </Field>
                      {/* Heads off the "is this everything they need?" worry —
                          a few lines here shouldn't feel like the whole brief. */}
                      <p className="-mt-1 flex items-start gap-2 rounded-xl bg-white/[0.06] px-3.5 py-3 text-[13px] leading-snug text-white/60">
                        <span className="mt-[3px] text-[color:#07a889]">✓</span>
                        A sentence or two is plenty here. Once you order, we&rsquo;ll take you through a
                        proper onboarding to get the additional information we need.
                      </p>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="grid gap-4">
                      <Field label="Your name" required>
                        <input
                          className={inputCls}
                          value={details.name}
                          onChange={(e) => setDetails({ ...details, name: e.target.value })}
                          placeholder="John Smith"
                        />
                      </Field>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Email" required>
                          <input
                            type="email"
                            className={inputCls}
                            value={details.email}
                            onChange={(e) => setDetails({ ...details, email: e.target.value })}
                            placeholder="john@acme.com.au"
                          />
                        </Field>
                        <Field label="Phone">
                          <input
                            type="tel"
                            className={inputCls}
                            value={details.phone}
                            onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                            placeholder="0400 000 000"
                          />
                        </Field>
                      </div>
                    </div>
                  )}

                  <div className="mt-7 flex items-center gap-3">
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={() => setStep((s) => s - 1)}
                        className="rounded-full border border-white/20 px-5 py-2.5 text-[14px] font-semibold transition-colors hover:bg-white/10"
                      >
                        Back
                      </button>
                    )}
                    <button
                      type="button"
                      disabled={step === 3 && !canSubmit}
                      onClick={() => {
                        if (step < 3) return setStep((s) => s + 1);
                        // Falls back to the email brief until the Stripe keys
                        // are set — better than a dead button.
                        // The moment the card form opens — the gap between
                        // this and Purchase is your checkout drop-off.
                        pixelTrack("InitiateCheckout", {
                          content_name: "Website configurator",
                          content_type: "product",
                          value: price,
                          currency: "AUD",
                          num_items: totalPages,
                        });
                        return canCheckout ? setPaying(true) : setSent(true);
                      }}
                      className="neu-btn neu-btn-light whitespace-nowrap rounded-full bg-white px-6 py-2.5 text-[14px] font-bold text-ink disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {step === 3
                        ? perPage
                          ? `Get started — ${money(price)}/mo`
                          : `Checkout — ${money(price)}`
                        : "Continue"}
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* ---- running total ---- */}
            <div className="border-t border-white/10 bg-white/[0.04] p-7 sm:p-10 lg:border-l lg:border-t-0">
              <p className="text-[12.5px] font-semibold uppercase tracking-[0.12em] text-white/50">
                <span className="lg:hidden">Your pages</span>
                <span className="hidden lg:inline">Your build</span>
              </p>

              {/* Repeated on a phone by the bar above the form. */}
              <div className="hidden lg:block">
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="text-[46px] font-semibold leading-none tracking-[-0.05em]">
                    {money(price)}
                  </span>
                  {perPage && <span className="text-[18px] font-medium text-white/50">/mo</span>}
                </div>
                <p className="mt-2 text-[13.5px] text-white/60">
                  {perPage ? (
                    <>
                      {totalPages} page{totalPages === 1 ? "" : "s"} × {money(block.pricePerPage ?? 0)}
                      {block.minMonths ? ` · ${block.minMonths} month minimum` : ""}
                    </>
                  ) : (
                    <>
                      {totalPages} page{totalPages === 1 ? "" : "s"} · {includedPages} included
                      {extra > 0 && (
                        <>
                          {" "}
                          · {extra} extra × {money(extraPagePrice)}
                        </>
                      )}
                    </>
                  )}
                </p>
                {/* The guarantee belongs with the number it applies to — the
                    objection it answers happens at the price, not in a section
                    further down the page. */}
                <p className="mt-2.5 flex items-center gap-1.5 text-[12.5px] font-medium text-white/70">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 flex-none text-[color:#07a889]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3.2 19 5.7v5.6c0 4.4-3 7.4-7 9.1-4-1.7-7-4.7-7-9.1V5.7z" /><path d="m9.2 11.9 2 2 3.6-3.8" /></svg>
                  100% money-back guarantee, 30 days
                </p>

                {/* Tells them how much room is left in the base price, which is
                    the number they're actually deciding against. */}
                <p
                  className={`mt-3 rounded-xl px-3 py-2.5 text-[13px] font-medium leading-snug ${
                    perPage || remaining > 0
                      ? "bg-[color:#07a889]/15 text-[color:#3fd8bb]"
                      : "bg-white/[0.06] text-white/70"
                  }`}
                >
                  {perPage
                    ? `${money(price * (block.minMonths ?? 1))} over the ${block.minMonths ?? 1} month minimum, then month to month.`
                    : remaining > 0
                      ? `You can select ${remaining} more page${remaining === 1 ? "" : "s"} before the price increases!`
                      : `All ${includedPages} included pages used — every page after this adds ${money(extraPagePrice)}.`}
                </p>
              </div>

              <ul className="mt-4 grid gap-2 border-t border-white/10 pt-5 lg:mt-6">
                {[...selected, ...custom].map((p) => (
                  <li key={p} className="flex items-center gap-2 text-[13.5px] text-white/75">
                    <span className="text-[color:#07a889]">✓</span>
                    {p}
                  </li>
                ))}
                {servicePages > 0 && (
                  <li className="flex items-center gap-2 text-[13.5px] text-white/75">
                    <span className="text-[color:#07a889]">✓</span>
                    {servicePages} dedicated service page{servicePages === 1 ? "" : "s"}
                  </li>
                )}
              </ul>

              {block.includes && (
                <ul className="mt-5 grid gap-2 border-t border-white/10 pt-5">
                  {block.includes.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[13px] text-white/60">
                      <span className="mt-[3px] text-[color:#07a889]">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              )}

              {/* Fixed price, paid in one go — not an estimate to be quoted
                  against later. */}
              <p className="mt-6 text-[12.5px] leading-snug text-white/45">
                {perPage
                  ? "Billed monthly. Cancel any time after the minimum term."
                  : "Charged in full at checkout. One payment, no deposit and no invoices later."}
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      {paying && (
        <CheckoutModal
          order={order}
          summary={`${totalPages} page${totalPages === 1 ? "" : "s"} · ${money(price)}`}
          onClose={() => setPaying(false)}
        />
      )}
    </section>
  );
}
