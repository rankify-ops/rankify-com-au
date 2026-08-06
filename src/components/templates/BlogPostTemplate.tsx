import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/basePath";
import { Header } from "@/components/layout/Header";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { Reveal } from "@/components/ui/Reveal";
import type { BlogPostMeta } from "@/content/blog-posts";
import type { ReactNode } from "react";

const AUTHOR_IMAGE = "/assets/images/nK7vZP41akJ7EzYYCVQPQGuVRQg.png";

export function BlogPostTemplate({
  title,
  date,
  heroImage,
  excerpt,
  children,
  nextPost,
}: {
  title: string;
  date: string;
  heroImage: string;
  excerpt: string;
  children: ReactNode;
  nextPost?: BlogPostMeta;
}) {
  return (
    <>
      <Header />

      <section className="mx-2 rounded-3xl bg-paper text-ink">
        <div className="mx-auto max-w-[1400px] px-5 pt-10 pb-16 sm:px-10 sm:pt-14 sm:pb-24 lg:pb-32">
          <Reveal>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[14px] font-medium text-grey transition-opacity hover:opacity-70"
            >
              ← Blog
            </Link>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-[#e9e9e9] sm:aspect-[21/9]">
              <Image src={asset(heroImage)} alt={title} fill priority className="object-cover" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-8 text-[14px] text-grey">{date}</p>
            <h1 className="mt-3 max-w-[900px] text-[clamp(32px,4.2vw,64px)] font-medium leading-[0.98] tracking-[-0.05em]">
              {title}
            </h1>
            <p className="mt-6 max-w-[680px] text-[18px] leading-snug text-grey">{excerpt}</p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10 flex items-center gap-3.5 border-t border-line pt-8">
              <Image
                src={asset(AUTHOR_IMAGE)}
                alt="Thomas Flood"
                width={52}
                height={52}
                className="h-[52px] w-[52px] flex-none rounded-full object-cover grayscale"
              />
              <div>
                <strong className="block text-[15px]">Thomas Flood</strong>
                <span className="text-[13px] text-grey">Director of Digital Strategy</span>
              </div>
            </div>
            <p className="mt-6 max-w-[680px] text-[15.5px] text-grey">
              At Rankify®, we specialise in crafting high-performance websites, SEO Strategies and
              Branding that not only makes you look great but also delivers measurable results.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-2 mt-12 sm:mt-24 lg:mt-48 rounded-3xl bg-paper text-ink">
        <div className="mx-auto max-w-[820px] px-5 py-16 sm:px-10 sm:py-24 lg:py-32">
          <Reveal>
            <div
              className="grid gap-6 text-[16.5px] leading-relaxed text-[#333]
                [&_h2]:mt-4 [&_h2]:text-[clamp(24px,2.2vw,34px)] [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:tracking-[-0.03em] [&_h2]:text-ink
                [&_h3]:mt-2 [&_h3]:text-[19px] [&_h3]:font-semibold [&_h3]:text-ink
                [&_p]:text-[16.5px] [&_p]:leading-relaxed [&_p]:text-[#333]
                [&_ul]:grid [&_ul]:gap-2.5 [&_ul]:pl-5
                [&_li]:list-disc [&_li]:pl-1 [&_li]:text-[16.5px] [&_li]:leading-relaxed [&_li]:text-[#333]
                [&_strong]:font-semibold [&_strong]:text-ink
                [&_a]:underline [&_a]:decoration-1 [&_a]:underline-offset-2
                [&_figure]:my-2 [&_figure]:overflow-hidden [&_figure]:rounded-2xl
                [&_figcaption]:mt-2.5 [&_figcaption]:text-[13px] [&_figcaption]:text-grey"
            >
              {children}
            </div>
          </Reveal>
        </div>
      </section>

      {nextPost && (
        <section className="mx-2 mt-12 sm:mt-24 lg:mt-48 rounded-3xl bg-paper text-ink">
          <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-10 sm:py-24 lg:py-32">
            <Reveal>
              <span className="text-[13.5px] font-medium text-grey">Next</span>
            </Reveal>
            <Reveal delay={0.05}>
              <Link
                href={`/blog/${nextPost.slug}`}
                className="group mt-5 grid gap-6 sm:grid-cols-[1fr_1.4fr] sm:items-center"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#e9e9e9]">
                  <Image
                    src={asset(nextPost.heroImage)}
                    alt={nextPost.title}
                    fill
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                  />
                </div>
                <div>
                  <p className="text-[13px] text-grey">{nextPost.date}</p>
                  <h3 className="mt-2 text-[clamp(24px,2.4vw,38px)] font-medium leading-tight tracking-[-0.03em]">
                    {nextPost.title}
                  </h3>
                  <p className="mt-3 max-w-[520px] text-[15px] text-grey">{nextPost.excerpt}</p>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      <ContactFooter />
    </>
  );
}
