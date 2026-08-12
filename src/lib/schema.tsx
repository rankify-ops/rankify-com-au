/**
 * JSON-LD structured data.
 *
 * Everything here has to be true and visible on the page it's attached to —
 * Google penalises schema that describes content a visitor can't see. The FAQ
 * schema mirrors the FAQ accordion, the offers mirror the prices we publish.
 */

export const SITE = "https://www.rankify.com.au";

const ORG_ID = `${SITE}/#organisation`;

/** Injects a JSON-LD block. Next renders this into the static HTML. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Content is our own object, not user input — no injection surface.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * The business itself. ProfessionalService is a LocalBusiness subtype, which
 * is what earns the knowledge panel and map presence for a Gold Coast search.
 */
export const organisationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": ORG_ID,
  name: "Rankify",
  legalName: "Rankify®",
  url: SITE,
  logo: `${SITE}/assets/images/ha7iyKKaK8R1V7r8jKPhCa6P74.svg`,
  image: `${SITE}/assets/images/ha7iyKKaK8R1V7r8jKPhCa6P74.svg`,
  description:
    "Web development, Shopify builds and SEO for Australian businesses. Custom built, conversion focused, priced up front — you work directly with the developer.",
  email: "hello@rankify.com.au",
  telephone: "+611300880860",
  priceRange: "$$",
  areaServed: { "@type": "Country", name: "Australia" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Gold Coast",
    addressRegion: "QLD",
    addressCountry: "AU",
  },
  founder: { "@type": "Person", name: "Thomas Flood", jobTitle: "Director of Digital Strategy" },
  sameAs: [
    "https://www.instagram.com/rankify.au/",
    "https://www.linkedin.com/company/rankifyau/",
  ],
};

/** The site itself, so Google can attribute pages to the brand. */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE}/#website`,
  url: SITE,
  name: "Rankify",
  publisher: { "@id": ORG_ID },
  inLanguage: "en-AU",
};

/**
 * A service with a published price. `offers` only goes on pages that actually
 * state that price — otherwise it's a rich result promising something the
 * page doesn't say.
 */
export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  price?: number;
  priceCurrency?: string;
  unit?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: `${SITE}${opts.path}`,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Australia" },
    ...(opts.price
      ? {
          offers: {
            "@type": "Offer",
            price: String(opts.price),
            priceCurrency: opts.priceCurrency ?? "AUD",
            ...(opts.unit ? { description: opts.unit } : {}),
            availability: "https://schema.org/InStock",
            url: `${SITE}${opts.path}`,
          },
        }
      : {}),
  };
}

/** Mirrors the FAQ accordion. Eligible for the FAQ rich result. */
export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Blog posts. `date` in the content is "Aug 2, 2025" — ISO it for schema. */
export function articleSchema(opts: {
  title: string;
  description: string;
  slug: string;
  date: string;
  image: string;
}) {
  const iso = new Date(opts.date);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: opts.title,
    description: opts.description,
    url: `${SITE}/blog/${opts.slug}`,
    mainEntityOfPage: `${SITE}/blog/${opts.slug}`,
    image: `${SITE}${opts.image}`,
    ...(Number.isNaN(iso.getTime()) ? {} : { datePublished: iso.toISOString().slice(0, 10) }),
    author: { "@type": "Person", name: "Thomas Flood" },
    publisher: { "@id": ORG_ID },
  };
}

/** Case studies. */
export function projectSchema(opts: {
  name: string;
  description: string;
  slug: string;
  image: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: opts.name,
    description: opts.description,
    url: `${SITE}/projects/${opts.slug}`,
    image: `${SITE}${opts.image}`,
    creator: { "@id": ORG_ID },
  };
}
