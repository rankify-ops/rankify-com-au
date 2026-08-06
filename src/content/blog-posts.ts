export type BlogPostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  heroImage: string;
};

// Newest first — matches the order shown on the live blog index AND the
// Next/Previous chain confirmed inside each scraped article (each post's
// "Next" link points to the next entry in this array).
export const BLOG_POSTS: BlogPostMeta[] = [
  {
    slug: "do-you-need-seo",
    title: "Do You Need SEO? Why It Matters — And When You Don’t",
    date: "Aug 2, 2025",
    excerpt:
      "Do you need SEO? That’s a question many website owners ask—and it's exactly the question we'll be answering here.",
    heroImage: "/assets/images/iLrboFlB139yq6ZT5883I5GcbU.png",
  },
  {
    slug: "how-important-is-branding-for-seo",
    title: "How Important Is Branding for SEO? Boost Rankings and Click‑Throughs",
    date: "Jul 2, 2025",
    excerpt:
      "How important is branding for SEO? It’s a critical question for businesses aiming to get noticed online—and this article answers it fully.",
    heroImage: "/assets/images/OmmsH91plsx4IVce3dN6BxPFlSI.webp",
  },
  {
    slug: "is-tiktok-shop-in-australia",
    title: "Is TikTok Shop in Australia? What You Need to Know in 2025",
    date: "Jun 2, 2025",
    excerpt:
      "Is TikTok Shop in Australia? It’s one of the most searched questions by local brands and creators in 2025—and the answer is more relevant than ever.",
    heroImage: "/assets/images/3acAbt9Qqonub4vqQ01A8i06jEM.webp",
  },
  {
    slug: "why-modern-websites-perform-better",
    title: "Why Modern Websites Perform Better — And What Most Sites Get Wrong in 2025",
    date: "May 2, 2025",
    excerpt:
      "Websites from just a few years ago are falling behind—fast. What passed as “modern” in 2020 now feels clunky, slow, or confusing.",
    heroImage: "/assets/images/ZTBgR8Csg8BlUvV7ir219BfRc.webp",
  },
  {
    slug: "why-your-seo-is-not-working",
    title: "Why Your SEO Isn’t Working — And What to Do About It",
    date: "Apr 2, 2025",
    excerpt:
      "If you’ve invested in SEO and seen little return, you're not alone. Many businesses think writing blog posts or targeting keywords is enough—but often the missing link is far less obvious.",
    heroImage: "/assets/images/URQINWKZTbHKragALXXCsBvTs.webp",
  },
  {
    slug: "what-kind-of-content-does-google-actually-like-in-2025",
    title: "What Kind of Content Does Google Actually Like in 2025?",
    date: "Mar 2, 2025",
    excerpt:
      "Everyone wants to rank. Few know what kind of content Google actually likes in today’s landscape. In 2025, ranking isn’t about keyword stuffing or length.",
    heroImage: "/assets/images/S1uBHPgfu5BxEnsY5OQUVTfw.webp",
  },
  {
    slug: "why-logo-design-is-important",
    title: "Why Logo Design Is Still One of the Most Important Parts of Your Brand",
    date: "Feb 2, 2025",
    excerpt:
      "Your logo is often the first thing people notice about your business. But beyond aesthetics, a good logo does real work—it builds recognition, signals trust, and sets the tone for your entire brand.",
    heroImage: "/assets/images/XUbaooB779UW0rO4igFy0O8MrQc.webp",
  },
];

export function getPostMeta(slug: string): BlogPostMeta | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getNextPost(slug: string): BlogPostMeta | undefined {
  const idx = BLOG_POSTS.findIndex((p) => p.slug === slug);
  if (idx === -1) return undefined;
  return BLOG_POSTS[idx + 1];
}
