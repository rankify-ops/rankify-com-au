import type { Metadata } from "next";
import { BlogPostTemplate } from "@/components/templates/BlogPostTemplate";
import { getPostMeta, getNextPost } from "@/content/blog-posts";

const post = getPostMeta("do-you-need-seo")!;
const nextPost = getNextPost("do-you-need-seo");

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
      <h2>Do Small Businesses Need SEO?</h2>
      <p>
        Many small business owners wonder if SEO is worth the effort. The answer:{" "}
        <strong>yes—if you want visibility in search engines</strong>. Small businesses
        especially benefit because:
      </p>
      <ul>
        <li>Local searches like “near me” terms drive foot traffic.</li>
        <li>Organic search traffic is reusable and compounding.</li>
        <li>Compared to paid ads, SEO delivers long‑term, cost‑effective results.</li>
      </ul>
      <p>
        If you&rsquo;re asking <em>do small businesses need SEO</em>, the short answer is
        generally yes—especially if you&rsquo;re relying on customers finding your products or
        services online.
      </p>

      <h2>Why Do You Need SEO — Quick Stats</h2>
      <p>Let&rsquo;s back up that claim with data:</p>
      <ul>
        <li>
          Over <strong>50% of all website traffic</strong> comes from organic search (Search
          Engine Journal)
        </li>
        <li>
          Nearly <strong>90% of global web traffic</strong> is via Google search, image, and map
          results (Investopedia)
        </li>
        <li>
          Local searches: <strong>76% of smartphone users searching locally</strong> visited a
          business within 24 hours, and <strong>28% made a purchase</strong>.
        </li>
      </ul>
      <p>
        These figures show <strong>why you need SEO</strong>: it drives high-intent traffic,
        especially for small or local businesses.
      </p>

      <h2>Do Local Businesses Need SEO — Common Concerns</h2>
      <p>
        A frequent question: <em>do local businesses need SEO</em> if they already rely on
        word-of-mouth or offline channels? Here&rsquo;s how to unpack it:
      </p>
      <ul>
        <li>Yes, if you rely on local discovery. Without SEO (especially local SEO), businesses get buried.</li>
        <li>Concerns include cost, technical complexity, or slow ROI.</li>
        <li>
          It&rsquo;s okay to start small: optimise Google Business Profile, ensure correct NAP
          data, collect reviews, and target local intent keywords like &ldquo;service +
          suburb.&rdquo;
        </li>
      </ul>

      <h2>Do eCommerce Sites Need SEO?</h2>
      <p>
        For eCommerce sites, questions like <em>do ecommerce sites need SEO</em> come up
        frequently:
      </p>
      <ul>
        <li>Yes—product pages, category landing pages, and long-tail terms help bring qualified buyers.</li>
        <li>Searchers often use very specific queries before purchasing (&ldquo;best running shoes under $100&rdquo;).</li>
        <li>
          Investing in SEO can reduce reliance on paid ads and improve margins long-term, if well
          executed.
        </li>
      </ul>

      <h2>When You Might Not Need SEO Yet</h2>
      <p>
        If you&rsquo;re asking <em>do you need SEO</em>, there may be valid situations where not
        yet:
      </p>
      <ul>
        <li>Your business is very new, with little content or product inventory.</li>
        <li>You don&rsquo;t have a website or are not ready to invest in ongoing content development.</li>
        <li>Your audience is reached primarily through referrals or exclusive channels.</li>
      </ul>
      <p>In those cases, you may wait until you have some traction before committing to SEO.</p>

      <h2>To recap:</h2>
      <ul>
        <li>
          <em>Do you need SEO?</em> If you aim to be found online—especially as a small, local, or
          eCommerce site—then yes, SEO matters.
        </li>
        <li>
          We examined <em>do small businesses need SEO</em>, why you need SEO (with stats),{" "}
          <em>do local businesses need SEO</em>, and <em>do ecommerce sites need SEO</em>.
        </li>
        <li>
          We also discussed when it might make sense to wait on SEO—for example, in early-stage
          ventures or niche referral-only models.
        </li>
      </ul>
      <p>
        <strong>
          Ready to improve your search presence? Start by auditing your site, choosing relevant
          keywords, and creating useful content—then contact us or subscribe to get practical SEO
          guides.
        </strong>
      </p>
    </BlogPostTemplate>
  );
}
