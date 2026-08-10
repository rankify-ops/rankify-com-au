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
  title: "Rankify | Performance Marketing & Web Development",
  description:
    "High-performance websites, Shopify stores and SEO for Australian businesses. Custom built, conversion focused, and priced up front — you work directly with the developer.",
  metadataBase: new URL("https://www.rankify.com.au"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Rankify | Performance Marketing & Web Development",
    description:
      "No generic websites. No empty marketing promises. Just work that shows up in your sales, revenue and profit.",
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
