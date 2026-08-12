import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/content/blog-posts";
import { PROJECTS } from "@/content/projects";
import { SITE } from "@/lib/schema";

/**
 * Generated from the same content the pages are built from, so it can't drift
 * out of sync the way a hand-written sitemap does.
 *
 * `/checkout/complete` is deliberately absent — it's a post-payment receipt,
 * noindex, and worthless in search.
 */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly") => ({
    url: `${SITE}${path}`,
    lastModified: new Date("2026-08-12"),
    changeFrequency,
    priority,
  });

  return [
    page("", 1, "weekly"),
    // the money pages
    page("/web-design-and-development", 0.9, "weekly"),
    page("/shopify-development-services", 0.9, "weekly"),
    page("/seo", 0.9, "weekly"),
    page("/shopify-developer", 0.8, "monthly"),
    page("/professional-logo-design", 0.7, "monthly"),
    page("/google-ads", 0.6, "monthly"),
    page("/meta-ads", 0.6, "monthly"),
    page("/ai-and-automation", 0.6, "monthly"),
    // proof and conversion
    page("/projects", 0.7, "monthly"),
    ...PROJECTS.map((p) => page(`/projects/${p.slug}`, 0.6, "yearly")),
    page("/schedule-strategy-call", 0.7, "monthly"),
    page("/contact", 0.7, "monthly"),
    // content
    page("/blog", 0.6, "weekly"),
    ...BLOG_POSTS.map((p) => page(`/blog/${p.slug}`, 0.5, "yearly")),
    // required, rarely useful
    page("/legal/privacy-policy", 0.2, "yearly"),
    page("/legal/terms-of-service", 0.2, "yearly"),
  ];
}
