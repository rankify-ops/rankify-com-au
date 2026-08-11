"use client";

import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/basePath";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { BOTCHECK_PROPS, useWeb3Form } from "@/lib/useWeb3Form";

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
                <label htmlFor="c-message" className="mb-1 block text-[13px] text-grey">
                  Your message
                </label>
                <textarea
                  id="c-message"
                  name="message"
                  placeholder="Tell us about your project"
                  className="min-h-[90px] w-full resize-y bg-transparent text-[15px] text-ink outline-none placeholder:text-grey/70"
                />
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
