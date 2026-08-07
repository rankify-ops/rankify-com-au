"use client";

import Image from "next/image";
import { asset } from "@/lib/basePath";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PlusIcon } from "@/components/ui/PlusIcon";

function ExternalArrow() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function ContactPrompt() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <section className="grain mx-2 mt-12 sm:mt-24 lg:mt-48 rounded-3xl bg-[radial-gradient(120%_140%_at_20%_0%,#06382a_0%,var(--green-deep)_45%,#010f0a_100%)] text-white">
        <div className="relative z-[2] mx-auto max-w-[1400px] px-5 py-16 sm:px-10 sm:py-24 lg:py-32">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
            <div>
              <Reveal className="rounded-[18px] bg-white p-7 text-ink sm:p-9">
                <p className="mb-2 text-[20px] font-semibold tracking-[-0.04em]">Rankify® </p>
                <h2 className="mb-7 text-[clamp(24px,2vw,34px)] font-semibold tracking-[-0.03em]">
                  Have a project <span className="text-black/60">in mind?</span>
                </h2>
                <form onSubmit={onSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="cf-name" className="mb-2 block text-[13.5px] font-medium">
                      Your name*
                    </label>
                    <input
                      id="cf-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="John Doe"
                      className="w-full rounded-[10px] bg-paper px-4 py-3.5 text-[15.5px] text-ink outline-none placeholder:text-grey"
                    />
                  </div>
                  <div>
                    <label htmlFor="cf-email" className="mb-2 block text-[13.5px] font-medium">
                      E-mail*
                    </label>
                    <input
                      id="cf-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="hello@site.com"
                      className="w-full rounded-[10px] bg-paper px-4 py-3.5 text-[15.5px] text-ink outline-none placeholder:text-grey"
                    />
                  </div>
                  <div>
                    <label htmlFor="cf-message" className="mb-2 block text-[13.5px] font-medium">
                      Message
                    </label>
                    <textarea
                      id="cf-message"
                      name="message"
                      placeholder="Your message"
                      className="min-h-[120px] w-full resize-y rounded-[10px] bg-paper px-4 py-3.5 text-[15.5px] text-ink outline-none placeholder:text-grey"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-full bg-ink py-3.5 text-[15px] font-semibold text-white transition-transform hover:scale-[1.02]"
                  >
                    {sent ? "Thanks — we'll be in touch!" : "Send Message"}
                  </button>
                  <p className="mt-3.5 text-[12.5px] text-grey">
                    By submitting, you agree to our{" "}
                    <Link href="/legal/terms-of-service" className="underline">
                      Terms
                    </Link>{" "}
                    and{" "}
                    <Link href="/legal/privacy-policy" className="underline">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </form>
              </Reveal>
              <Reveal delay={0.1} className="mt-6 text-[13px] text-white/50">
                © 2026 Rankify® Studio
              </Reveal>
            </div>
            <div>
              <Reveal>
                <h2 className="mb-5 text-[clamp(44px,4.5vw,80px)] font-medium leading-none tracking-[-0.05em]">
                  Let&rsquo;s talk.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mb-9 max-w-[380px] text-white/65">
                  Tell us about your project—whether it&rsquo;s a Website, SEO or Branding.
                </p>
              </Reveal>
              <div className="mt-8 grid gap-8 border-t border-white/15 pt-8 sm:grid-cols-2">
                <Reveal delay={0.15}>
                  <svg viewBox="0 0 24 24" className="mb-3 h-6 w-6" fill="none" stroke="white" strokeWidth="1.5">
                    <path d="M3 12l3-8 15 8-15 8 3-8h9" strokeLinejoin="round" strokeLinecap="round" />
                  </svg>
                  <strong className="mb-1 block text-[17px] font-semibold">Quick response.</strong>
                  <p className="max-w-[300px] text-[14.5px] text-white/60">
                    If you&rsquo;re ready to create and collaborate, we&rsquo;d love to hear from you.
                  </p>
                </Reveal>
                <Reveal delay={0.25}>
                  <svg viewBox="0 0 24 24" className="mb-3 h-6 w-6" fill="none" stroke="white" strokeWidth="1.5">
                    <path d="M4 20V15M10 20V10M16 20V13M22 20V6" strokeLinecap="round" />
                  </svg>
                  <strong className="mb-1 block text-[17px] font-semibold">Clear next steps.</strong>
                  <p className="max-w-[300px] text-[14.5px] text-white/60">
                    After the consultation, we&rsquo;ll provide you with a detailed plan and timeline.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function SiteFooter() {
  const [subscribed, setSubscribed] = useState(false);

  function onSubscribe(e: FormEvent) {
    e.preventDefault();
    setSubscribed(true);
  }

  return (
    <section className="mx-2 mt-2 rounded-3xl bg-paper text-ink">
      <footer className="mx-auto max-w-[1400px] px-5 py-16 sm:px-10 sm:py-24">
          <div className="grid gap-10 pb-10 sm:pb-16 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <p className="max-w-[420px] text-[clamp(18px,1.6vw,24px)] font-medium leading-snug tracking-[-0.02em] text-grey">
                Whether you&rsquo;re looking to build a stunning website, boost your brand, or drive
                measurable results, <span className="text-ink">we&rsquo;re here to help.</span>
              </p>
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

            <Reveal delay={0.1}>
              <h5 className="mb-5 text-[15px] font-medium">Newsletter</h5>
              <form onSubmit={onSubscribe} className="grid gap-4 border-b border-line pb-2">
                <div className="border-b border-line pb-3">
                  <label htmlFor="nl-name" className="mb-1 block text-[13px] text-grey">
                    Your first name *
                  </label>
                  <input
                    id="nl-name"
                    type="text"
                    required
                    className="w-full bg-transparent text-[15px] text-ink outline-none"
                  />
                </div>
                <div className="border-b border-line pb-3">
                  <label htmlFor="nl-email" className="mb-1 block text-[13px] text-grey">
                    Email *
                  </label>
                  <input
                    id="nl-email"
                    type="email"
                    required
                    className="w-full bg-transparent text-[15px] text-ink outline-none"
                  />
                </div>
                <Button type="submit" className="justify-self-start">
                  {subscribed ? "Subscribed!" : "Subscribe"}
                </Button>
              </form>
              <p className="mt-4 max-w-[320px] text-[14.5px] text-grey">
                Join our newsletter and stay updated on the latest trends in digital design.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-8 border-t border-line py-10 sm:py-14 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-20">
            <Reveal>
              <a
                href="mailto:hello@rankify.com.au"
                className="inline-flex items-center gap-2 text-[16px] font-medium underline"
              >
                <PlusIcon dark className="h-[18px] w-[18px]" />
                hello@rankify.com.au
              </a>
            </Reveal>
            <Reveal delay={0.05}>
              <h5 className="mb-4 text-[13.5px] font-medium text-grey">Navigation</h5>
              <div className="grid gap-2.5">
                {[
                  ["Home", "/"],
                  ["Web Development", "/web-design-and-development"],
                  ["Shopify Store Builds", "/shopify-development-services"],
                  ["Shopify Developer", "/shopify-developer"],
                  ["SEO Optimisation", "/seo"],
                  ["Google Ads", "/google-ads"],
                  ["Meta Ads", "/meta-ads"],
                  ["AI & Automation", "/ai-and-automation"],
                  // Branding is no longer in the top nav — the footer keeps the
                  // page linked so it stays crawlable and sellable.
                  ["Logo & Branding", "/professional-logo-design"],
                  ["Schedule Call", "/schedule-strategy-call"],
                  ["Contact", "/contact"],
                  ["Blog", "/blog"],
                ].map(([label, href]) => (
                  <Link key={href} href={href} className="text-[15px] opacity-80 transition-opacity hover:opacity-100">
                    {label}
                  </Link>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h5 className="mb-4 text-[13.5px] font-medium text-grey">Social</h5>
              <div className="grid gap-2.5">
                <a
                  href="https://www.instagram.com/rankify.au/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[15px] opacity-80 transition-opacity hover:opacity-100"
                >
                  Instagram <ExternalArrow />
                </a>
                <a
                  href="https://www.linkedin.com/company/rankifyau/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[15px] opacity-80 transition-opacity hover:opacity-100"
                >
                  LinkedIn <ExternalArrow />
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal scale>
            <Image
              src={asset("/assets/images/ha7iyKKaK8R1V7r8jKPhCa6P74.svg")}
              alt="Rankify®"
              width={1300}
              height={281}
              className="h-auto w-full"
            />
          </Reveal>
        </footer>

        <div className="rounded-b-3xl bg-ink px-5 py-7 text-white sm:px-10">
          <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 text-[13px] text-white/60">
            <div className="flex flex-wrap items-center gap-x-7 gap-y-2">
              <span>© 2026 Rankify® All rights reserved.</span>
              <Link href="/legal/privacy-policy" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/legal/terms-of-service" className="hover:text-white">
                Terms of Service
              </Link>
            </div>
            <span className="inline-flex items-center gap-2">
              Created by
              <Image
                src={asset("/assets/images/9aojbSSiabQ1hYLHBVPxNJIV7Q.png")}
                alt=""
                width={20}
                height={20}
                className="h-5 w-5 rounded-full object-cover"
              />
              <strong className="text-white">Rankify</strong>
            </span>
          </div>
        </div>
      </section>
  );
}

export function ContactFooter() {
  return (
    <>
      <ContactPrompt />
      <SiteFooter />
    </>
  );
}
