import type { Metadata } from "next";
import { BlogPostTemplate } from "@/components/templates/BlogPostTemplate";
import { getPostMeta, getNextPost } from "@/content/blog-posts";

const post = getPostMeta("why-modern-websites-perform-better")!;
const nextPost = getNextPost("why-modern-websites-perform-better");

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
      <h2>Why Older Sites Are Failing Faster Than Expected</h2>
      <p>Most websites built in the early 2020s were created for a different set of expectations:</p>
      <ul>
        <li>More desktop use, less mobile-first thinking</li>
        <li>Heavy reliance on themes, plugins, and stock elements</li>
        <li>Little attention to site speed or scroll logic</li>
        <li>Designs focused more on &ldquo;looking nice&rdquo; than guiding user actions</li>
      </ul>
      <p>Fast-forward to 2025, and things have shifted:</p>
      <ul>
        <li>
          <strong>Speed is critical</strong>: Slow sites get penalised and ignored
        </li>
        <li>
          <strong>Mobile is the priority</strong>: Not just responsive—fully built for
          mobile-first flow
        </li>
        <li>
          <strong>Attention spans are shorter</strong>: Users decide in seconds if they&rsquo;ll
          stay or bounce
        </li>
      </ul>
      <p>What worked a few years ago now actively works against you.</p>

      <h2>What Makes Modern Websites Work So Well</h2>
      <p>Modern websites are designed with a different mindset:</p>
      <ul>
        <li>
          <strong>Clear hierarchy</strong>: Headlines, spacing, and layout guide attention
        </li>
        <li>
          <strong>Lean code and assets</strong>: Less weight = faster load times
        </li>
        <li>
          <strong>Trust-first approach</strong>: Reviews, case studies, and credentials up front
        </li>
        <li>
          <strong>Designed for conversion</strong>: Each section moves the visitor toward action
        </li>
        <li>
          <strong>Built for scrolling, not clicking</strong>: Pages flow naturally without clutter
        </li>
      </ul>
      <p>
        These aren&rsquo;t trends—they&rsquo;re responses to how people use the internet now. And
        performance isn&rsquo;t just about speed—it&rsquo;s about{" "}
        <strong>clarity, structure, and purpose</strong>.
      </p>

      <h2>How We Built Rankify&rsquo;s Site With Performance in Mind</h2>
      <p>
        When we built the Rankify site, the goal wasn&rsquo;t to be flashy—it was to be fast,
        direct, and frictionless. We focused on:
      </p>
      <ul>
        <li>Keeping layouts minimal and easy to digest</li>
        <li>Using language that respects the reader&rsquo;s time</li>
        <li>Avoiding unnecessary animations or elements that slow things down</li>
        <li>Making sure each page has a purpose—whether that&rsquo;s education or enquiry</li>
      </ul>
      <p>
        It reflects the kind of websites we build for clients: modern, clean, high-performing, and
        focused on results. If you&rsquo;re scanning the Rankify site, you&rsquo;ll notice
        it&rsquo;s deliberately light—because light wins.
      </p>

      <h2>What Your Current Website Might Be Costing You</h2>
      <p>If your website hasn&rsquo;t been updated recently, it may be:</p>
      <ul>
        <li>
          <strong>Driving users away with slow load times</strong>
        </li>
        <li>
          <strong>Creating confusion due to poor UX or messaging</strong>
        </li>
        <li>
          <strong>Hurting your rankings due to outdated structure or heavy code</strong>
        </li>
        <li>
          <strong>Costing you conversions by making users work too hard to act</strong>
        </li>
      </ul>
      <p>
        These issues don&rsquo;t always show up right away—but they add up. Every bounce, every
        missed enquiry, every user who clicks away is a lost opportunity.
      </p>

      <h2>Conclusion</h2>
      <p>
        Modern websites aren&rsquo;t about trends—they&rsquo;re about survival. The way users
        interact with the web has changed dramatically in just a few years, and businesses that
        don&rsquo;t adapt are falling behind.
      </p>
      <p>
        At Rankify, we see this every day. The difference between a website that looks okay and
        one that performs well is often the difference between growth and stagnation.
      </p>
      <p>
        If your site feels dated, slow, or unclear—it probably is. And now is the time to fix it.
      </p>
    </BlogPostTemplate>
  );
}
