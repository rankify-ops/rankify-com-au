"use client";

import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/basePath";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { BOTCHECK_PROPS, useWeb3Form } from "@/lib/useWeb3Form";

/**
 * Attribution options for the one optional field on the form.
 *
 * Kept short and concrete — a long list gets skimmed and "Other" gets picked.
 * These are the channels that actually send work: paid social, search, the
 * partner referrals, and word of mouth.
 */
const HEARD_OPTIONS = [
  "Google search",
  "Facebook or Instagram",
  "Referred by a friend or client",
  "Adalytical",
  "Saw a website you built",
  "LinkedIn",
  "Somewhere else",
];

export function ContactHero() {
  const { state, onSubmit } = useWeb3Form("New enquiry — contact page");

  return (
    <section className="mx-2 rounded-3xl bg-paper text-ink">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-10 sm:py-24 lg:py-32">
        <Reveal>
          <h1 className="text-[clamp(40px,3.55vw,68px)] font-medium leading-[0.92] tracking-[-0.06em]">
            Get in touch.
          </h1>
        </Reveal>

        <div className="mt-10 grid gap-12 sm:mt-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal delay={0.1}>
              <p className="max-w-[420px] text-[clamp(18px,1.6vw,24px)] font-medium leading-snug tracking-[-0.02em]">
                <span className="text-ink">Have a project in mind?</span>{" "}
                <span className="text-grey">
                  Reach out to us, and we&rsquo;ll discuss the best way to move forward.
                </span>
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-8 flex items-center gap-3.5">
                <Image
                  src={asset("/assets/images/nK7vZP41akJ7EzYYCVQPQGuVRQg.png")}
                  alt="Thomas Flood"
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-full object-cover grayscale"
                />
                <div>
                  <strong className="block text-[15px]">Thomas Flood</strong>
                  <span className="text-[13px] text-grey">Director of Digital Strategy</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.26}>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-8 text-[15px]">
                <a href="tel:1300880860" className="font-medium opacity-80 transition-opacity hover:opacity-100">
                  1300 880 860
                </a>
                <a
                  href="mailto:hello@rankify.com.au"
                  className="font-medium opacity-80 transition-opacity hover:opacity-100"
                >
                  hello@rankify.com.au
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <form onSubmit={onSubmit} className="grid gap-5">
              <input {...BOTCHECK_PROPS} />
              <div className="border-b border-line pb-3">
                <label htmlFor="c-name" className="mb-1 block text-[13px] text-grey">
                  Your name *
                </label>
                <input
                  id="c-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="John Doe"
                  className="w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-grey/70"
                />
              </div>
              <div className="border-b border-line pb-3">
                <label htmlFor="c-email" className="mb-1 block text-[13px] text-grey">
                  Email *
                </label>
                <input
                  id="c-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="hello@site.com"
                  className="w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-grey/70"
                />
              </div>
              <div className="border-b border-line pb-3">
                <label htmlFor="c-phone" className="mb-1 block text-[13px] text-grey">
                  Mobile number *
                </label>
                {/* Deliberately loose: an Australian mobile is 04xx xxx xxx,
                    but overseas enquiries and landlines are real, so this only
                    insists on enough characters to be dialable rather than on
                    a shape. `inputMode` gets the number pad on a phone.

                    The brackets, plus and hyphen are escaped because browsers
                    compile `pattern` with the regex `v` flag, where those are
                    syntax characters inside a class. Unescaped, the pattern
                    fails to compile and is dropped silently — the field then
                    accepts "abc" while looking validated. */}
                <input
                  id="c-phone"
                  name="phone"
                  type="tel"
                  required
                  inputMode="tel"
                  autoComplete="tel"
                  pattern="[0-9\s\(\)\+\-]{8,20}"
                  title="Enter a phone number we can reach you on — digits, spaces, + and () are fine."
                  placeholder="0400 000 000"
                  className="w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-grey/70"
                />
              </div>
              <div className="border-b border-line pb-3">
                <label htmlFor="c-message" className="mb-1 block text-[13px] text-grey">
                  Your message *
                </label>
                <textarea
                  id="c-message"
                  name="message"
                  required
                  placeholder="Tell us about your project"
                  className="min-h-[90px] w-full resize-y bg-transparent text-[15px] text-ink outline-none placeholder:text-grey/70"
                />
              </div>
              {/* The one optional field on the form. No asterisk, and it says
                  so — an unmarked field next to four required ones reads as an
                  oversight rather than a choice. */}
              <div className="border-b border-line pb-3">
                <label htmlFor="c-heard" className="mb-1 block text-[13px] text-grey">
                  Where did you hear about us? <span className="text-grey/70">(optional)</span>
                </label>
                <select
                  id="c-heard"
                  name="heard_about_us"
                  defaultValue=""
                  className="w-full bg-transparent text-[15px] text-ink outline-none"
                >
                  <option value="">Select…</option>
                  {HEARD_OPTIONS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
              <Button type="submit" className="justify-self-start">
                {state === "sending" ? "Sending…" : state === "sent" ? "Sent — thanks!" : "Submit"}
              </Button>
              {state === "error" && (
                <p className="text-[13.5px] text-[#c0392b]">
                  That didn&rsquo;t send. Email us at{" "}
                  <a href="mailto:hello@rankify.com.au" className="font-medium underline">
                    hello@rankify.com.au
                  </a>{" "}
                  and we&rsquo;ll pick it up.
                </p>
              )}
              <p className="text-[12.5px] text-grey">
                By submitting, you agree to our{" "}
                <Link href="/legal/terms-of-service" className="font-medium text-ink underline">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="/legal/privacy-policy" className="font-medium text-ink underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
