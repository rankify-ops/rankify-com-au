"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { Button } from "@/components/ui/Button";
import { PlusIcon } from "@/components/ui/PlusIcon";

const GlassSurface = dynamic(() => import("@/components/GlassSurface"), { ssr: false });

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/web-design-and-development", label: "Web Development" },
  { href: "/seo", label: "SEO" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <>
      <Header />
      <section className="grain relative mx-2 mt-2 flex min-h-[calc(100dvh-60px-8px)] items-center justify-center overflow-hidden rounded-3xl bg-[radial-gradient(120%_140%_at_20%_0%,#06382a_0%,var(--green-deep)_45%,#010f0a_100%)] px-5 py-24">
        <span className="pointer-events-none absolute inset-0 z-[1] flex select-none items-center justify-center text-[clamp(180px,32vw,460px)] font-semibold leading-none tracking-[-0.06em] text-white/10">
          404
        </span>

        <div className="relative z-[2] flex justify-center">
          <GlassSurface
            width="min(560px, 90vw)"
            height={340}
            borderRadius={28}
            blur={14}
            backgroundOpacity={0.08}
            saturation={1.4}
            distortionScale={-140}
          >
            <div className="flex flex-col items-center px-8 py-10 text-center">
              <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[13px] font-medium text-white">
                <PlusIcon className="h-[16px] w-[16px]" />
                Page not found
              </span>
              <h1 className="mb-3 text-[clamp(28px,3.5vw,40px)] font-medium leading-[1.05] tracking-[-0.03em] text-white">
                This page doesn&rsquo;t exist.
              </h1>
              <p className="mb-8 max-w-[380px] text-[15px] text-white/65">
                The page you&rsquo;re looking for has been moved, renamed, or never
                existed. Let&rsquo;s get you back on track.
              </p>
              <Button href="/" variant="light">
                Back to homepage
              </Button>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-white/15 pt-6">
                {LINKS.slice(1).map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="text-[13.5px] text-white/60 underline-offset-4 transition-colors hover:text-white hover:underline"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </GlassSurface>
        </div>
      </section>
      <ContactFooter />
    </>
  );
}
