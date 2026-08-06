"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

const FAQS = [
  {
    q: "How long does it take to build a website?",
    a: "The timeline for building a website depends on its complexity and specific requirements. Website can take between 2-5 weeks on average. We'll provide a detailed timeline during the initial consultation to ensure clear expectations.",
  },
  {
    q: "Do you offer custom websites or use templates?",
    a: "We create fully custom websites tailored to your brand. No generic templates—just unique, high-performing designs.",
  },
  {
    q: "What's included in your SEO services?",
    a: "We optimise your site structure, content, and speed, ensuring better search rankings and visibility.",
  },
  {
    q: "How does the monthly SEO subscription model work?",
    a: "You pay a fixed monthly fee, and we handle everything—design, updates, and ongoing support. No large upfront costs, just a seamless experience.",
  },
  {
    q: "Can you redesign my existing website?",
    a: "Yes! We can refresh your current site while improving its design, functionality, and performance.",
  },
  {
    q: "How do I get started?",
    a: "Just reach out! We'll discuss your needs, create a plan, and get to work on your website.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-2 mt-2 rounded-3xl bg-paper text-ink">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-10 sm:py-24 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-[minmax(220px,1fr)_2.2fr] lg:gap-16">
          <div>
            <Reveal>
              <h2 className="text-[clamp(40px,3.55vw,68px)] font-medium leading-[0.92] tracking-[-0.06em]">
                FAQ.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-[300px] text-grey">
                Got questions? We&rsquo;ve got answers. Here&rsquo;s everything you need to know about
                working with us.
              </p>
            </Reveal>
          </div>

          <div>
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q}>
                <div className="mb-3 overflow-hidden rounded-xl border border-line bg-white">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-[clamp(16px,1.2vw,19px)] font-semibold tracking-[-0.01em]"
                  >
                    {f.q}
                    <motion.span
                      animate={{ rotate: isOpen ? 90 : 0 }}
                      transition={{ duration: 0.35 }}
                      className="relative h-[22px] w-[22px] flex-none"
                    >
                      <span className="absolute inset-0 m-auto h-0.5 w-3.5 bg-ink" />
                      <motion.span
                        animate={{ scaleY: isOpen ? 0 : 1 }}
                        transition={{ duration: 0.35 }}
                        className="absolute inset-0 m-auto h-3.5 w-0.5 bg-ink"
                      />
                    </motion.span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-[720px] px-6 pb-6 text-[15.5px] text-[#555]">{f.a}</p>
                  </motion.div>
                </div>
              </Reveal>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
}
