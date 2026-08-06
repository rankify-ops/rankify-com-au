import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/basePath";
import { BlogPostTemplate } from "@/components/templates/BlogPostTemplate";
import { getPostMeta, getNextPost } from "@/content/blog-posts";

const post = getPostMeta("why-your-seo-is-not-working")!;
const nextPost = getNextPost("why-your-seo-is-not-working");

export const metadata: Metadata = {
  title: `${post.title} | Rankify`,
  description: post.excerpt,
};

export default function Page() {
  return (
    <BlogPostTemplate
      title={post.title}
      date={post.date}
      heroImage={post.heroImage}
      excerpt={post.excerpt}
      nextPost={nextPost}
    >
      <p>
        If you&rsquo;ve invested in <Link href="/seo">SEO</Link> and seen little return,
        you&rsquo;re not alone. Many businesses think writing blog posts or targeting keywords is
        enough—but often the missing link is far less obvious. In this article, we&rsquo;ll
        explain <strong>why SEO isn&rsquo;t working</strong>, including overlooked elements like
        backlinks, site structure, and outdated content. You&rsquo;ll walk away with a clear
        roadmap for getting SEO to actually deliver.
      </p>

      <h2>The Usual SEO Pitfalls</h2>
      <p>Many businesses focus on on-page changes and content—but still stumble due to:</p>
      <ul>
        <li>
          <strong>Site speed</strong>: Google&rsquo;s algorithm directly factors in page load
          times. A delay of even 1–2 seconds can cause major drop-offs in traffic and conversions.{" "}
          <a
            href="https://developers.google.com/search/docs/appearance/core-web-vitals"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google&rsquo;s Core Web Vitals
          </a>{" "}
          define the specific speed and UX metrics that now impact rankings.
        </li>
        <li>
          <strong>Poor keyword targeting</strong>: Many sites chase high-volume terms without
          considering search intent. According to{" "}
          <a href="https://ahrefs.com/blog/seo-mistakes/" target="_blank" rel="noopener noreferrer">
            Ahrefs
          </a>
          , targeting the wrong keywords—or creating irrelevant content around them—is one of the
          top reasons SEO strategies fail.
        </li>
        <li>
          <strong>Thin or outdated content</strong>: Endless short posts that don&rsquo;t solve
          real problems don&apos;t get traction.
        </li>
        <li>
          <strong>Neglected internal linking</strong>: Good internal linking guides users and
          search bots—without it, authority dissipates.
        </li>
      </ul>

      <figure>
        <Image
          src={asset("/assets/images/ovaKSg9YnQQyl1Lj0qs5eX9EJY8.webp")}
          alt="Mobile screen displaying a PageSpeed Insights score of 31 with a red performance ring and “Poor” rating, indicating slow website speed issues."
          width={1024}
          height={1024}
          className="h-auto w-full"
        />
        <figcaption>
          Mobile screen displaying a PageSpeed Insights score of 31 with a red performance ring and
          &ldquo;Poor&rdquo; rating, indicating slow website speed issues.
        </figcaption>
      </figure>

      <h2>The Hidden Role of Backlinks in SEO Performance</h2>
      <p>
        Backlinks are still one of Google&rsquo;s most important ranking factors. Yet many
        businesses ignore them—or rely on poor-quality links that do more harm than good.
      </p>
      <ul>
        <li>
          Google treats backlinks as <strong>&ldquo;votes of confidence&rdquo;</strong>. The more
          links you earn from relevant, trusted sources, the more credible your site becomes. This
          is reinforced in{" "}
          <a href="https://www.mariehaynes.com/resources/eat/" target="_blank" rel="noopener noreferrer">
            Marie Haynes&rsquo; EEAT guidelines
          </a>
          , where backlinks play a critical role in establishing Authoritativeness.
        </li>
        <li>
          The <strong>quality of links</strong> is more important than quantity. A single mention
          from a respected industry site can outperform dozens of random directory listings.
        </li>
        <li>
          Poor backlinks (e.g. link farms, spammy guest posts) can hurt rankings. Tools like{" "}
          <a
            href="https://support.google.com/webmasters/answer/2648487?hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google&rsquo;s Disavow Tool
          </a>{" "}
          are there for a reason.
        </li>
        <li>
          Regular backlink audits are essential. As{" "}
          <a href="https://searchatlas.com/blog/seo-mistakes/" target="_blank" rel="noopener noreferrer">
            SearchAtlas
          </a>{" "}
          points out, failing to monitor and clean your link profile can undo months of SEO
          effort.
        </li>
      </ul>
      <p>
        If your strategy doesn&rsquo;t include an intentional, ongoing link-building process,
        it&rsquo;s incomplete.
      </p>

      <h2>How to Make SEO Work Now — A Practical Checklist</h2>
      <p>Here&rsquo;s what to focus on if you want SEO that performs:</p>
      <ul>
        <li>
          <strong>Audit your backlinks</strong> with tools like Ahrefs or SEMrush. Disavow toxic
          links and identify new opportunities.
        </li>
        <li>
          <strong>Create content worth linking to</strong>: in-depth guides, original research,
          comparison posts, or real-world case studies. These are the formats that earn mentions
          naturally.
        </li>
        <li>
          <strong>Match content to search intent</strong>: Use SERP analysis to understand what
          users want—how-tos, definitions, tools, or buying guides. Avoid publishing content that
          doesn&rsquo;t match what&rsquo;s ranking.
        </li>
        <li>
          <strong>Improve load speed and UX</strong>: Use Google&rsquo;s{" "}
          <a href="https://pagespeed.web.dev/" target="_blank" rel="noopener noreferrer">
            PageSpeed Insights
          </a>{" "}
          to identify performance blockers. Minimise plugins, optimise images, and strip
          unnecessary scripts.
        </li>
        <li>
          <strong>Strengthen internal linking</strong>: Link your pages using natural, relevant
          anchor text. It helps distribute authority and keeps users engaged longer.
        </li>
      </ul>

      <figure>
        <Image
          src={asset("/assets/images/GQ3TwWtBLiE54d0C0wn1cmnpGT0.webp")}
          alt="Close-up of a handwritten SEO checklist with red and blue pencils, placed beside a white mug labeled 'K'—symbolising content planning and optimisation."
          width={1000}
          height={1000}
          className="h-auto w-full"
        />
        <figcaption>
          Close-up of a handwritten SEO checklist with red and blue pencils, placed beside a white
          mug labeled &lsquo;K&rsquo;—symbolising content planning and optimisation.
        </figcaption>
      </figure>

      <h2>Conclusion</h2>
      <p>
        SEO fails when the fundamentals are ignored. If you&rsquo;re missing backlinks, publishing
        misaligned content, or operating with slow, outdated pages, no amount of keyword stuffing
        will help. So making sure <Link href="/web-design-and-development">web design</Link> is up
        to scratch is important.
      </p>
      <p>
        Want SEO that actually delivers? Focus on the things that matter:{" "}
        <strong>speed</strong>, <strong>trust</strong>, <strong>intent</strong>, and{" "}
        <strong>authority</strong>. And build a strategy that treats content, links, and UX as one
        system—not separate pieces.
      </p>
    </BlogPostTemplate>
  );
}
