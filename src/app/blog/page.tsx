import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/basePath";
import { Header } from "@/components/layout/Header";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { Reveal } from "@/components/ui/Reveal";
import { PlusIcon } from "@/components/ui/PlusIcon";
import { BLOG_POSTS } from "@/content/blog-posts";

export const metadata: Metadata = {
  title: "Blog | Rankify",
  description:
    "Practical breakdowns of what works in web design, branding, and digital performance today. From design principles to technical optimisations—everything you need for digital success.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  return (
    <>
      <Header />

      <section className="mx-2 rounded-3xl bg-paper text-ink">
        <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-10 sm:py-24 lg:py-32">
          <div className="mb-10 grid gap-6 sm:mb-16 lg:mb-24">
            <Reveal>
              <span className="inline-flex items-center gap-2 text-[15px] font-medium">
                <PlusIcon dark className="h-[18px] w-[18px]" />
                Blog
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <span className="block max-w-[380px] text-base text-grey">
                Practical breakdowns of what works in web design, branding, and digital performance
                today.
              </span>
            </Reveal>
            <Reveal delay={0.15}>
              <h1 className="text-[clamp(40px,3.55vw,68px)] font-medium leading-[0.92] tracking-[-0.06em]">
                Blog: Technical Meets Creative
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="max-w-[520px] text-[16.5px] text-grey">
                From design principles to technical optimisations—everything you need for digital
                success.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 0.1}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="relative aspect-[4/3.4] overflow-hidden rounded-2xl bg-[#e9e9e9]">
                    <Image
                      src={asset(post.heroImage)}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-4 text-[13px] text-grey">{post.date}</p>
                  <h2 className="mt-2 text-[19px] font-semibold leading-snug tracking-[-0.02em] text-ink">
                    {post.title}
                  </h2>
                  <p className="mt-2.5 text-[14.5px] leading-relaxed text-grey">{post.excerpt}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactFooter />
    </>
  );
}
