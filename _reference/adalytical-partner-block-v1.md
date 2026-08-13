# Adalytical partner block — v1 (ads-led framing)

Saved 2026-08-13 before reframing. This version led with the Google Ads
credentials and sat directly under the client logo marquee at the top of
/web-design-and-development.

Tom liked this version specifically. Kept so it can be restored verbatim:
paste it back into `blocks` in
`src/content/service-pages/web-design-and-development.ts` and it works as-is —
the `partner` block type and `PartnerCard` component are unchanged.

```ts
    // Straight under the client logos: an ads agency vouching for the builds
    // their own campaigns depend on is the strongest proof on the page, so it
    // runs before anything we say about ourselves.
    {
      type: "partner",
      anchorId: "partner",
      kicker: "Who trusts the work",
      logo: "/assets/logos-web/adalytical.webp",
      name: "Adalytical",
      chips: [
        { label: "Google Ads Partner", icon: "google-ads" },
        { label: "Australia's fastest growing Google Ads business", accent: true },
      ],
      body:
        "Ex-Google growth team leaders, now founders of Adalytical. They rely on Rankify when their clients need new websites, landing pages and the conversion elements that make their ads perform — their ads get the click, the page has to book the job or get the sale.",
      quote:
        "We partner with Rankify when our clients are in need of a new website, Shopify store or landing pages — high-performance builds we know will convert.",
      people: [
        { name: "Jackson Wallace", avatar: "/assets/images/jackson-adalytical.webp" },
        { name: "Jackson Sharp", avatar: "/assets/images/jackson-sharp-adalytical.webp" },
      ],
      peopleRole: "Founders, Adalytical · Ex-Google growth team",
    },
```

## Why it moved

It was the first thing after the logos, so a visitor who came for a website
met an ads agency before any website proof. The v2 rewrite keeps the same
endorsement but leads with the builds and puts the ex-Google credential
second, and sits after the review rail instead.
