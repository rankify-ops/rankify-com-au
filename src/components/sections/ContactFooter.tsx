"use client";

import Image from "next/image";
import { asset } from "@/lib/basePath";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function ContactFooter() {
  const [sent, setSent] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  function onSubscribe(e: FormEvent) {
    e.preventDefault();
    setSubscribed(true);
  }

  return (
    <section className="grain mx-2 my-2 rounded-3xl bg-[radial-gradient(120%_140%_at_20%_0%,#06382a_0%,var(--green-deep)_45%,#010f0a_100%)] text-white">
      <div className="relative z-[2] py-16 sm:py-24 lg:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-5 sm:px-10 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
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

        <footer className="px-5 pt-14 sm:px-10 sm:pt-24">
          <div className="grid gap-10 pb-10 sm:pb-16 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-20">
            <div>
              <h5 className="mb-4 text-[13.5px] font-medium text-white/50">Newsletter</h5>
              <form onSubmit={onSubscribe} className="flex gap-2.5">
                <input
                  type="email"
                  placeholder="Your e-mail"
                  aria-label="E-mail for newsletter"
                  required
                  className="flex-1 rounded-full border border-white/15 bg-white/5 px-4 py-3 text-[14.5px] outline-none focus:border-white/50"
                />
                <Button type="submit" variant="light">
                  {subscribed ? "Subscribed!" : "Subscribe"}
                </Button>
              </form>
              <p className="mt-3.5 max-w-[320px] text-[14.5px] text-white/60">
                Join our newsletter and stay updated on the latest trends in digital design.
              </p>
              <a href="mailto:hello@rankify.com.au" className="mt-5 inline-block text-[15px] underline opacity-85">
                hello@rankify.com.au
              </a>
            </div>
            <div>
              <h5 className="mb-4 text-[13.5px] font-medium text-white/50">Navigation</h5>
              <div className="grid gap-2.5">
                {[
                  ["Home", "/"],
                  ["Logo & Branding", "/professional-logo-design"],
                  ["Web Development", "/web-design-and-development"],
                  ["SEO Optimisation", "/seo"],
                  ["Schedule Call", "/schedule-strategy-call"],
                  ["Contact", "/contact"],
                  ["Blog", "/blog"],
                ].map(([label, href]) => (
                  <Link key={href} href={href} className="text-[15px] opacity-80 transition-opacity hover:opacity-100">
                    {label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h5 className="mb-4 text-[13.5px] font-medium text-white/50">Social</h5>
              <div className="grid gap-2.5">
                <a
                  href="https://www.instagram.com/rankify.au/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[15px] opacity-80 transition-opacity hover:opacity-100"
                >
                  Instagram
                </a>
                <a
                  href="https://www.linkedin.com/company/rankifyau/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[15px] opacity-80 transition-opacity hover:opacity-100"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className="pt-6 sm:pt-14">
            <Image
              src={asset("/assets/images/n92JU5BqmoxMotdcH6fGsTpi7e4.svg")}
              alt="Rankify®"
              width={974}
              height={210}
              className="h-auto w-full opacity-95"
            />
          </div>

          <div className="flex flex-wrap items-center gap-x-7 gap-y-4 py-9 text-[13px] text-white/50">
            <span>© 2026 Rankify® All rights reserved.</span>
            <Link href="/legal/privacy-policy" className="hover:text-white/80">
              Privacy Policy
            </Link>
            <Link href="/legal/terms-of-service" className="hover:text-white/80">
              Terms of Service
            </Link>
          </div>
        </footer>
      </div>
    </section>
  );
}
