"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PlusIcon } from "@/components/ui/PlusIcon";
import { asset } from "@/lib/basePath";

const SERVICES = [
  {
    title: "Web design and development",
    desc: "Modern, responsive, and user-friendly websites designed to engage visitors and drive conversions.",
    cat: "Features",
    tags: ["Mobile-Friendly", "Responsive Design", "Speed Optimised", "UX/UI Design", "Conversion-Focused", "SEO-Ready"],
    count: "6+",
    img: "/assets/images/vGSJoy0fkCYvuK5CETUzS64NNo.jpg",
  },
  {
    title: "SEO Optimisation",
    desc: "Comprehensive search optimization and engaging content that increases visibility, drives organic traffic, and establishes thought leadership.",
    cat: "Categories",
    tags: ["Technical SEO", "On-Page SEO", "Keyword Strategy", "Content Strategy", "Link Building", "Local SEO"],
    count: "4+",
    img: "/assets/images/qQlR5lTiRYzT2lPzSWLLVkcgH6Y.jpg",
  },
  {
    title: "Branding and Identity",
    desc: "Distinctive, memorable brand experiences that communicate your values and create emotional connections with your customers.",
    cat: "Categories",
    tags: ["Brand strategy", "Visual Identity", "Tone of Voice", "Logo Design", "Brand Messaging", "Brand Guidelines"],
    count: "6+",
    img: "/assets/images/9hTP0obDSaEcVCyC5kaHbx7FfI.jpg",
  },
];

export function Services() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="grain mx-2 mt-12 sm:mt-24 lg:mt-48 rounded-3xl bg-[radial-gradient(120%_140%_at_20%_0%,#06382a_0%,var(--green-deep)_45%,#010f0a_100%)] text-white">
      <div className="relative z-[2] mx-auto max-w-[1400px] px-5 py-16 sm:px-10 sm:py-24 lg:py-32">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 sm:mb-16 lg:mb-24">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-[15px] font-medium">
              <PlusIcon className="h-[18px] w-[18px]" />
              What we do
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="text-[clamp(24px,2vw,38px)] font-medium tracking-[-0.04em] text-white/40">
              (4)
            </span>
          </Reveal>
          <Reveal delay={0.15} className="w-full">
            <h2 className="text-[clamp(40px,3.55vw,68px)] font-medium leading-[0.92] tracking-[-0.06em]">
              Services.
            </h2>
          </Reveal>
        </div>

        <div className="border-t border-line-dark">
          {SERVICES.map((s, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={s.title}>
                <div className="border-b border-line-dark">
                  <button
                    onClick={() => setOpenIndex(i)}
                    className="grid w-full grid-cols-[44px_1fr_40px] items-center gap-4 py-6 text-left sm:grid-cols-[64px_1fr_44px] sm:gap-10 sm:py-8"
                  >
                    <span className="text-[15px] text-white/50">
                      ({String(i + 1).padStart(3, "0")})
                    </span>
                    <h3 className="text-[clamp(22px,2vw,34px)] font-medium leading-[1.1] tracking-[-0.04em]">
                      {s.title}
                    </h3>
                    <motion.span
                      animate={{ rotate: isOpen ? 90 : 0, backgroundColor: isOpen ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0)" }}
                      transition={{ duration: 0.35 }}
                      className="relative h-9 w-9 flex-none justify-self-end rounded-full border border-white/25 sm:h-10 sm:w-10"
                    >
                      <span className="absolute inset-0 m-auto h-[1.5px] w-3.5 bg-white" />
                      <motion.span
                        animate={{ scaleY: isOpen ? 0 : 1 }}
                        transition={{ duration: 0.35 }}
                        className="absolute inset-0 m-auto h-3.5 w-[1.5px] bg-white"
                      />
                    </motion.span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-5 pb-6 pl-[60px] pr-4 sm:flex-row sm:pb-8 sm:pl-[104px] sm:pr-10">
                      <Image
                        src={asset(s.img)}
                        alt=""
                        width={160}
                        height={110}
                        className="h-[80px] w-[110px] flex-none rounded-lg object-cover sm:h-[90px] sm:w-[120px]"
                      />
                      <div>
                        <p className="max-w-[480px] text-[15.5px] text-white/65">{s.desc}</p>
                        <div className="mt-5">
                          <p className="mb-3 text-[13px] text-white/50">{s.cat}</p>
                          <div className="flex max-w-[460px] flex-wrap gap-2">
                            {s.tags.map((t) => (
                              <span
                                key={t}
                                className="rounded-full border border-white/18 px-3.5 py-2 text-[13.5px] text-white/85"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                        <span className="mt-5 block text-[clamp(26px,2.2vw,40px)] font-medium tracking-[-0.03em] text-white/90">
                          {s.count}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="flex justify-center pt-10 sm:pt-16">
          <Button href="/schedule-strategy-call" variant="light">
            Get started
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
