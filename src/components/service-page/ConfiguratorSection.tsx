"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { PlusIcon } from "@/components/ui/PlusIcon";
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
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12.5px] font-medium text-white/60">{label}</span>
      {children}
    </label>
  );
}

const inputCls =
  "w-full rounded-xl border border-white/15 bg-white/[0.06] px-3.5 py-2.5 text-[14px] text-white outline-none transition-colors placeholder:text-white/30 focus:border-[color:#07a889]";

export function ConfiguratorSection({ block }: { block: ConfiguratorBlock }) {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<string[]>(block.corePages);
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

  const totalPages = selected.length + servicePages + custom.length;
  const extra = Math.max(0, totalPages - block.includedPages);
  const remaining = Math.max(0, block.includedPages - totalPages);
  const price = block.basePrice + extra * block.extraPagePrice;

  const toggle = (p: string) =>
    setSelected((cur) => (cur.includes(p) ? cur.filter((x) => x !== p) : [...cur, p]));

  const addCustom = () => {
    const v = draft.trim();
    if (!v) return;
    setCustom((c) => [...c, v]);
    setDraft("");
  };

  const summary = useMemo(
    () =>
      [
        `Pages (${totalPages}): ${[...selected, ...custom].join(", ")}` +
          (servicePages ? `, ${servicePages} dedicated service page(s)` : ""),
        `Estimate: ${money(price)}`,
        `Business: ${details.business || "—"} (${details.industry || "—"})`,
        `Existing site: ${details.existing || "—"}`,
        `About: ${details.about || "—"}`,
        `Contact: ${details.name || "—"} · ${details.email || "—"} · ${details.phone || "—"}`,
      ].join("\n"),
    [totalPages, selected, custom, servicePages, price, details]
  );

  const mailto = `mailto:hello@rankify.com.au?subject=${encodeURIComponent(
    `Website configurator — ${money(price)} estimate`
  )}&body=${encodeURIComponent(summary)}`;

  return (
    <section
      id={block.anchorId}
      className="grain mx-2 mt-8 scroll-mt-24 rounded-3xl bg-[radial-gradient(120%_140%_at_20%_0%,#06382a_0%,var(--green-deep)_45%,#010f0a_100%)] text-white sm:mt-12 lg:mt-20"
    >
      <div className="relative z-[2] mx-auto max-w-[1400px] px-5 py-12 sm:px-10 sm:py-16 lg:py-20">
        <div className="mb-8 sm:mb-12">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-[15px] font-medium">
              <PlusIcon className="h-[18px] w-[18px]" />
              {block.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 max-w-[720px] text-[clamp(32px,3.1vw,58px)] font-medium leading-[0.98] tracking-[-0.05em]">
              {block.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-3 max-w-[620px] text-[15px] text-white/60">{block.blurb}</p>
          </Reveal>
        </div>

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
                  </span>
                </div>
                <p className="text-right text-[13px] leading-snug text-white/60">
                  {totalPages} page{totalPages === 1 ? "" : "s"}
                  <br />
                  {block.includedPages} included
                  {extra > 0 && (
                    <>
                      <br />
                      {extra} extra × {money(block.extraPagePrice)}
                    </>
                  )}
                </p>
              </div>
              <p
                className={`mt-3 rounded-xl px-3 py-2 text-[12.5px] font-medium leading-snug ${
                  remaining > 0
                    ? "bg-[color:#07a889]/15 text-[color:#3fd8bb]"
                    : "bg-white/[0.06] text-white/70"
                }`}
              >
                {remaining > 0
                  ? `You can select ${remaining} more page${remaining === 1 ? "" : "s"} before the price increases!`
                  : `All ${block.includedPages} included pages used — every page after this adds ${money(block.extraPagePrice)}.`}
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
                  <p className="mt-2 max-w-[420px] text-[14.5px] text-white/60">
                    {totalPages} pages, {money(price)}. Send it through and we&rsquo;ll come back with a fixed
                    quote and a timeline, or book a call and we&rsquo;ll walk through it together.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={mailto}
                      className="neu-btn neu-btn-light rounded-full bg-white px-5 py-3 text-[14px] font-bold text-ink"
                    >
                      Send my brief
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
                      <div className="flex flex-wrap gap-2">
                        {[...block.corePages, ...block.optionalPages].map((p) => (
                          <PageChip key={p} label={p} on={selected.includes(p)} onToggle={() => toggle(p)} />
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
                              className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 text-[15px] leading-none hover:bg-white/10"
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
                              className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 text-[15px] leading-none hover:bg-white/10"
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
                    </div>
                  )}

                  {step === 3 && (
                    <div className="grid gap-4">
                      <Field label="Your name">
                        <input
                          className={inputCls}
                          value={details.name}
                          onChange={(e) => setDetails({ ...details, name: e.target.value })}
                          placeholder="John Smith"
                        />
                      </Field>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Email">
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
                      onClick={() => (step === 3 ? setSent(true) : setStep((s) => s + 1))}
                      className="neu-btn neu-btn-light rounded-full bg-white px-6 py-2.5 text-[14px] font-bold text-ink"
                    >
                      {step === 3 ? "Get my quote" : "Continue"}
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
                </div>
                <p className="mt-2 text-[13.5px] text-white/60">
                  {totalPages} page{totalPages === 1 ? "" : "s"} · {block.includedPages} included
                  {extra > 0 && (
                    <>
                      {" "}
                      · {extra} extra × {money(block.extraPagePrice)}
                    </>
                  )}
                </p>

                {/* Tells them how much room is left in the base price, which is
                    the number they're actually deciding against. */}
                <p
                  className={`mt-3 rounded-xl px-3 py-2.5 text-[13px] font-medium leading-snug ${
                    remaining > 0
                      ? "bg-[color:#07a889]/15 text-[color:#3fd8bb]"
                      : "bg-white/[0.06] text-white/70"
                  }`}
                >
                  {remaining > 0
                    ? `You can select ${remaining} more page${remaining === 1 ? "" : "s"} before the price increases!`
                    : `All ${block.includedPages} included pages used — every page after this adds ${money(block.extraPagePrice)}.`}
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

              <p className="mt-6 text-[12.5px] leading-snug text-white/45">
                Indicative only — we confirm a fixed quote before any work starts.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
