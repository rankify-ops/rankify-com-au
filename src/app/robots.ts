import type { MetadataRoute } from "next";
import { SITE } from "@/lib/schema";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // A payment receipt has nothing to offer search, and the URL carries a
      // Stripe session id.
      disallow: ["/checkout/"],
    },
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
