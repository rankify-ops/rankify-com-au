import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { LegalPageTemplate, type LegalSection } from "@/components/templates/LegalPageTemplate";

export const metadata: Metadata = {
  title: "Terms of Service | Rankify",
  description: "The terms that govern your access to and use of rankify.com.au.",
  alternates: { canonical: "/legal/terms-of-service" },
};

const SECTIONS: LegalSection[] = [
  {
    heading: "1. Use of the Site",
    blocks: [
      {
        type: "p",
        text: "You agree to use the Site only for lawful purposes and in compliance with these Terms. You may not:",
      },
      {
        type: "list",
        items: [
          "Violate any applicable laws or regulations",
          "Engage in unauthorised access or data collection (scraping, crawling, etc.)",
          "Disrupt or interfere with the Site's functionality",
          "Impersonate another person or entity",
        ],
      },
    ],
  },
  {
    heading: "2. Intellectual Property",
    blocks: [
      {
        type: "p",
        text: "All content on the Site, including text, graphics, logos, and software, is the property of Rankify and is protected by copyright and trademark laws. You may not reproduce, modify, or distribute any content without prior written consent.",
      },
    ],
  },
  {
    heading: "3. 30-Day Money-Back Guarantee",
    blocks: [
      {
        type: "p",
        text: "Website builds carry a 30-day money-back guarantee. If you are not satisfied with the website we deliver, email us within 30 days of your purchase and we will refund the project fee in full. You do not need to give a reason.",
      },
      {
        type: "p",
        text: "A refund ends the engagement. The website, its source code, and any assets we produced remain the property of Rankify: the site is taken offline, and hosting, deployment and any access we provided are withdrawn. You keep any content, images or copy you supplied to us.",
      },
      {
        type: "p",
        text: "The guarantee covers the project fee for the build itself. It does not cover third-party costs paid on your behalf — domain registration, paid apps, stock imagery or advertising spend — which are non-refundable once incurred.",
      },
      {
        type: "p",
        text: "Nothing in this clause limits your rights under the Australian Consumer Law. Where those rights apply, they operate in addition to this guarantee.",
      },
    ],
  },
  {
    heading: "4. Service Availability",
    blocks: [
      {
        type: "p",
        text: "We strive to keep our Site accessible but do not guarantee uninterrupted service. We reserve the right to modify or discontinue any part of the Site at any time without notice.",
      },
    ],
  },
  {
    heading: "5. Limitation of Liability",
    blocks: [
      {
        type: "p",
        text: "To the fullest extent permitted by law, Rankify is not liable for any damages arising from your use of the Site, including but not limited to:",
      },
      {
        type: "list",
        items: [
          "Loss of data or business opportunities",
          "Service interruptions or security breaches",
          "Third-party actions beyond our control",
        ],
      },
    ],
  },
  {
    heading: "6. Third-Party Services",
    blocks: [
      {
        type: "p",
        text: "Our Site may include links to third-party services. We do not endorse or take responsibility for these external sites or their content.",
      },
    ],
  },
  {
    heading: "7. Indemnification",
    blocks: [
      {
        type: "p",
        text: "You agree to indemnify and hold harmless Rankify, its affiliates, and employees from any claims, damages, or expenses arising from your violation of these Terms.",
      },
    ],
  },
  {
    heading: "8. Governing Law",
    blocks: [
      {
        type: "p",
        text: "These Terms are governed by and construed in accordance with the laws of Australia. Any disputes shall be resolved in the appropriate courts within Australia.",
      },
    ],
  },
  {
    heading: "9. Changes to These Terms",
    blocks: [
      {
        type: "p",
        text: "We reserve the right to modify these Terms at any time. Continued use of the Site after changes are posted constitutes acceptance of the updated Terms.",
      },
    ],
  },
  {
    heading: "10. Contact Us",
    blocks: [
      { type: "p", text: "If you have any questions about these Terms, contact us at:" },
      { type: "contact" },
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <>
      <Header />
      <LegalPageTemplate
        title="Terms of service."
        lastUpdated="Mar 4, 2025"
        intro='These Terms of Service ("Terms") govern your access to and use of rankify.com.au (the "Site"). By accessing or using our Site, you agree to these Terms.'
        sections={SECTIONS}
      />
      <ContactFooter />
    </>
  );
}
