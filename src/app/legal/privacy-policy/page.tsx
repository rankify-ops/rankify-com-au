import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { LegalPageTemplate, type LegalSection } from "@/components/templates/LegalPageTemplate";

export const metadata: Metadata = {
  title: "Privacy Policy | Rankify",
  description: "How Rankify collects, uses, and shares information about visitors to rankify.com.au.",
};

const SECTIONS: LegalSection[] = [
  {
    heading: "1. Information We Collect",
    blocks: [
      { type: "h3", text: "1.1 Personal Information" },
      {
        type: "p",
        text: "When you interact with our Site, we may collect personal information that you voluntarily provide to us, including:",
      },
      {
        type: "list",
        items: [
          "Name",
          "Email address",
          "Phone number",
          "Company name",
          "Any other information you provide when contacting us or signing up for our services",
        ],
      },
      { type: "h3", text: "1.2 Non-Personal Information" },
      {
        type: "p",
        text: "We automatically collect non-personal information when you visit our Site, including:",
      },
      {
        type: "list",
        items: [
          "IP address",
          "Browser type and version",
          "Device type",
          "Referring URL",
          "Pages visited and time spent on the Site",
          "Cookies and similar tracking technologies",
        ],
      },
    ],
  },
  {
    heading: "2. How We Use Your Information",
    blocks: [
      { type: "p", text: "We use the collected information to:" },
      {
        type: "list",
        items: [
          "Provide, operate, and improve our services",
          "Communicate with you about enquiries or services",
          "Personalise user experience",
          "Monitor and analyse Site usage to enhance functionality",
          "Ensure security and prevent fraudulent activities",
        ],
      },
    ],
  },
  {
    heading: "3. How We Share Your Information",
    blocks: [
      {
        type: "p",
        text: "We do not sell your personal information. However, we may share it in the following circumstances:",
      },
      {
        type: "list",
        items: [
          "Service Providers: We may share information with third-party vendors who assist us in website hosting, analytics, and customer service.",
          "Legal Compliance: If required by law, we may disclose information to comply with legal obligations, enforce agreements, or protect our rights.",
          "Business Transfers: In case of a merger, acquisition, or sale of assets, your information may be transferred to a successor entity.",
        ],
      },
    ],
  },
  {
    heading: "4. Cookies and Tracking Technologies",
    blocks: [
      {
        type: "p",
        text: "We use cookies and similar tracking technologies to enhance user experience and collect analytical data. You can disable cookies in your browser settings, but some features of the Site may not function properly.",
      },
    ],
  },
  {
    heading: "5. Data Retention",
    blocks: [
      {
        type: "p",
        text: "We retain personal information for as long as necessary to fulfil the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.",
      },
    ],
  },
  {
    heading: "6. Security",
    blocks: [
      {
        type: "p",
        text: "We take reasonable precautions to protect your information. However, no data transmission over the internet is 100% secure. You acknowledge that you provide your information at your own risk.",
      },
    ],
  },
  {
    heading: "7. Third-Party Links",
    blocks: [
      {
        type: "p",
        text: "Our Site may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. Please review their policies before providing personal information.",
      },
    ],
  },
  {
    heading: "8. Your Rights and Choices",
    blocks: [
      { type: "p", text: "Depending on your jurisdiction, you may have the right to:" },
      {
        type: "list",
        items: [
          "Access the personal information we hold about you",
          "Request correction or deletion of your information",
          "Opt out of marketing communications",
          "Withdraw consent for data processing",
        ],
      },
      { type: "p", text: "To exercise these rights, contact us at hello@rankify.com.au." },
    ],
  },
  {
    heading: "9. Changes to This Privacy Policy",
    blocks: [
      {
        type: "p",
        text: "We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised effective date. Your continued use of the Site constitutes acceptance of the updated policy.",
      },
    ],
  },
  {
    heading: "10. Contact Us",
    blocks: [
      { type: "p", text: "If you have any questions about this Privacy Policy, you can reach us at:" },
      { type: "contact" },
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <LegalPageTemplate
        title="Privacy policy."
        lastUpdated="Mar 5, 2025"
        intro='Rankify ("we," "our," or "us") values your privacy. This Privacy Policy explains how we collect, use, and share information about you when you visit our website, rankify.com.au (the "Site").'
        sections={SECTIONS}
      />
      <ContactFooter />
    </>
  );
}
