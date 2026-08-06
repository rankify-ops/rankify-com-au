export type ProjectCategory = "Web Design" | "SEO";

export interface ProjectMeta {
  year: string;
  industry: string;
  scope: string[];
  timeline: string;
}

export interface Project {
  slug: string;
  href: string;
  name: string;
  /** Card/preview image used on the homepage + projects index grid */
  photo: string;
  /** Logo mark overlaid on the preview image */
  logo: string;
  categories: ProjectCategory[];
  year: string;
  /** Case study page intro paragraph */
  intro: string;
  meta: ProjectMeta;
  /** Gallery images shown before the Challenges paragraph */
  galleryTop: string[];
  /** Challenges paragraphs */
  challenges: string[];
  liveUrl: string;
  /** Gallery images shown after the Live Project button */
  galleryBottom: string[];
  /** Final thoughts paragraphs */
  finalThoughts: string[];
}

export const PROJECTS: Project[] = [
  {
    slug: "myoko-embodied",
    href: "/projects/myoko-embodied",
    name: "Myoko Embodied",
    photo: "/assets/images/WRjXIBfZxMI8DrDHJoRoBdiFgds.webp",
    logo: "/assets/images/lRNcR8O5y55ArWKxP92bLXu9k.png",
    categories: ["Web Design", "SEO"],
    year: "2026",
    intro:
      "In 2026, Myoko Embodied, a founder-led beef tallow skincare brand rooted in ancestral wellness, approached Rankify to rebuild their online store from the ground up. The goal was to create a modern, high-performance Shopify storefront that matched the integrity of the product — pure, slow-crafted skincare built from grass-fed tallow — while improving brand perception, educating new customers, and driving organic search visibility from day one.",
    meta: {
      year: "2026",
      industry: "Beef Tallow Skincare / Natural Beauty",
      scope: ["Web Design", "SEO"],
      timeline: "6 weeks",
    },
    galleryTop: [
      "/assets/images/CMGOUIguCih3rip7ekndIF2fRQ.webp",
      "/assets/images/WiZqj37IZRso3pmDcwAJrC7bda4.webp",
      "/assets/images/WRjXIBfZxMI8DrDHJoRoBdiFgds.webp",
    ],
    challenges: [
      "The old site was functional but off-brand. It didn't show what made Myoko different, didn't educate customers on a product most have never knowingly used, and wasn't built to be found in search.",
      "We had to solve all three at once — without losing the earthy, honest tone the brand is built on.",
    ],
    liveUrl: "https://myokoembodied.au/",
    galleryBottom: [
      "/assets/images/MGx5fTQinzB6YajYCktNS8W9gE.webp",
      "/assets/images/2kEZu9hBGHh2lBPV8y1HA5XMqHo.webp",
      "/assets/images/etx6o7VHM46vMCVBdulQ2RRY5mE.webp",
    ],
    finalThoughts: [
      "The new Myoko Embodied store is the brand's first real digital home — built to sell today, built to rank tomorrow.",
      "For us at Rankify, this project was a chance to do what we do best: pair considered design with the technical SEO scaffolding most boutique ecommerce stores never get.",
    ],
  },
  {
    slug: "hawker-studio",
    href: "/projects/hawker-studio",
    name: "Hawker Studios",
    photo: "/assets/images/RDhRQ4WWoWivfy4MLnSL2MKu2qA.webp",
    logo: "/assets/images/nqynozke2KURfAvDnstCnT89oE.png",
    categories: ["Web Design", "SEO"],
    year: "2026",
    intro:
      "In 2026, Hawker Studios — a Gold Coast natural light photo studio with two Currumbin Waters locations — approached Rankify to rebuild their online presence. The goal was to create a fast, intuitive booking experience that let creators see the studios, check availability, and lock in a session in minutes, not back-and-forth emails.",
    meta: {
      year: "2026",
      industry: "Photo & Content Studio",
      scope: ["Web Design", "SEO"],
      timeline: "4 weeks",
    },
    galleryTop: [
      "/assets/images/ygPGnusqkFaGOxEjENqhPDhrEaI.png",
      "/assets/images/q6BtQtJtJ2ZVoSwjCez5XNvTM.webp",
      "/assets/images/RDhRQ4WWoWivfy4MLnSL2MKu2qA.webp",
    ],
    challenges: [
      "The old site made booking feel slow and uncertain. Creators couldn't get a real feel for the spaces, availability was unclear, and the path from \"this looks cool\" to \"I'm booked in\" had too many steps.",
      "For a studio doing 500+ shoots a year across two locations, the booking flow had to be effortless — and the spaces had to sell themselves before anyone clicked book.",
    ],
    liveUrl: "https://www.hawker-studios.com/",
    galleryBottom: [
      "/assets/images/OByNLH0mrOhVR0kJbjM7OgmuDA.webp",
      "/assets/images/W5OcvPBW89HR2nzMBhrBguQcO4.webp",
      "/assets/images/LYN7orwCSBUJG1cRGVCt1HUGrxI.webp",
    ],
    finalThoughts: [
      "The new Hawker Studios site is the front door to two of the Gold Coast's best creative spaces — built for creators who want to book fast and shoot faster.",
      "For us at Rankify, this project was a chance to strip the friction out of a booking experience and let the studios do what they do best: look beautiful in natural light.",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getOtherProject(slug: string): Project {
  return PROJECTS.find((p) => p.slug !== slug) ?? PROJECTS[0];
}
