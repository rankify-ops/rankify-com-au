import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { FloatingCta } from "@/components/layout/FloatingCta";
import { JsonLd, organisationSchema, websiteSchema } from "@/lib/schema";

/** Meta pixel, Rankify ad account. */
const META_PIXEL_ID = "1757904242196710";
/** Apollo website tracker — identifies visiting companies for outbound. */
const APOLLO_APP_ID = "6a9d53e292ba99001c4e39c5";

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
  // Rendered into <head> at build time. Meta's crawler rejects a tag injected
  // by JavaScript, so this can't be a Script.
  verification: {
    other: { "facebook-domain-verification": "uh3hhus94ih2116ti54tqymyha9e3p" },
  },
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
        {/* Meta pixel. `afterInteractive` rather than in <head>: the snippet
            injects its own async script tag either way, and deferring it keeps
            it off the critical path for LCP. PageView still fires on load. */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>

        {/* Apollo's visitor tracker. Their instructions say to put it before
            </head>; `afterInteractive` is the same thing done later — the
            snippet appends its own async script either way, and identifying a
            visitor is worth nothing if it costs the page its LCP. */}
        <Script id="apollo-tracker" strategy="afterInteractive">
          {`function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");
o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,
o.onload=function(){window.trackingFunctions.onLoad({appId:"${APOLLO_APP_ID}"})},
document.head.appendChild(o)}initApollo();`}
        </Script>

        <JsonLd data={organisationSchema} />
        <JsonLd data={websiteSchema} />
        <SmoothScroll />
        {children}
        <FloatingCta />
      </body>
    </html>
  );
}
