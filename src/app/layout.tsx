import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { FloatingCta } from "@/components/layout/FloatingCta";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Rankify | Web Design, Branding & Digital Growth",
  description:
    "Rankify is a web design, SEO and branding studio. No generic websites. No empty marketing promises. Just tools and strategies that help your business grow.",
  metadataBase: new URL("https://www.rankify.com.au"),
  openGraph: {
    title: "Rankify | Web Design, Branding & Digital Growth",
    description:
      "No generic websites. No empty marketing promises. Just tools and strategies that help your business grow and your brand shine.",
    url: "https://www.rankify.com.au/",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-AU" className={inter.variable}>
      <body>
        <SmoothScroll />
        {children}
        <FloatingCta />
      </body>
    </html>
  );
}
