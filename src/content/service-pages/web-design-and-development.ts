import type { ServicePageData } from "./types";

const CLOSING_NOTE =
  "We believe that a website should be more than just a digital presence—it should be a tool that works for your business. That's why we prioritise performance, user experience in everything we create. We build websites that are fast, efficient, and easy to manage, so you can focus on what matters—running your business.";

export const webDesignAndDevelopment: ServicePageData = {
  hero: {
    variant: "content",
    kicker: "About us",
    heading: "Web Design & Development",
    intro:
      "We are a digital studio specialising in website design & development. We offer services to existing websites and new website builds, our focus is on creating functional, fast, and well structured websites that meet business goals without unnecessary complexity.",
    note: "No overcomplicated processes, just effective solutions tailored to your needs.",
    ctaPrimary: { label: "View Pricing", href: "#pricing" },
    ctaSecondary: { label: "Schedule free strategy Call", href: "/schedule-strategy-call" },
  },
  blocks: [
    {
      type: "cardgrid",
      theme: "paper",
      columns: 3,
      bottomImage: "/assets/images/BvhgaZCeNF3QqrLv6UbtoFydlGU.jpg",
      items: [
        {
          idx: "01",
          title: "Shopify Web Development",
          image: "/assets/images/jhdHQKz8nA2pnUVTCJ9a9QfqMuI.svg",
          desc: "Need a developer for Shopify? Hire me via this page for hourly work or for getting a new website on Shopify. We recommend Shopify for businesses selling products online.",
          cta: { label: "View Shopify Page", href: "/shopify-development-services" },
        },
        {
          idx: "02",
          title: "Framer Web Development",
          image: "/assets/images/wJ32OUMRhl9dcQUVtCrCYJb00oQ.png",
          desc: "Need a developer for Framer? Hire me via this page for hourly work or for getting a new website on Framer. We recommend Framer for all new websites that are not e-commerce.",
          cta: { label: "Schedule a call", href: "/schedule-strategy-call" },
        },
        {
          idx: "03",
          title: "Wordpress Web Development",
          image: "/assets/images/QxH1zvpw4UjNkSmwlty8dYAxUPY.png",
          desc: "Need a developer for Wordpress? Hire me via this page for hourly work or for getting a new website on Wordpress. We don't recommend using Wordpress as we consider it an outdated platform.",
          cta: { label: "Schedule a call", href: "/schedule-strategy-call" },
        },
      ],
    },
    {
      type: "cardgrid",
      theme: "paper",
      kicker: "About us",
      eyebrow: "Rankify®",
      heading: "Our process to launch new websites.",
      subheading:
        "See how our team combines creativity, technology, and strategy to build powerful digital solutions.",
      columns: 4,
      bottomImage: "/assets/images/Jz7xVlXPS5OtC5L5UzoV5v38coA.jpg",
      items: [
        {
          idx: "01",
          title: "Your Goals",
          desc: "We start with a call to understand your goals, brand, and users. This sets the direction for everything that follows.",
        },
        {
          idx: "02",
          title: "Design",
          desc: "We create a custom website that fits your brand and audience—clean, modern, and built to convert.",
        },
        {
          idx: "03",
          title: "SEO Ready",
          desc: "We build your site using clean code and modern tech. Mobile-friendly, SEO-ready, and fast.",
        },
        {
          idx: "04",
          title: "Support",
          desc: "After testing and launch, we stick around for updates and support.",
        },
      ],
    },
    {
      type: "portfolio",
      eyebrow: "(2024-25©)",
      heading: "Our Website Clients",
      subheading: "A few of the businesses we've built and launched websites for recently.",
      items: [
        { name: "Hiatus Collection", sub: "View Live Website | 2025", image: "/assets/images/WRjXIBfZxMI8DrDHJoRoBdiFgds.webp", logo: "/assets/images/slyRihVSReT5BPI1GoT4o8EG0Q8.png" },
        { name: "Tintek", sub: "View Live Website | 2025", image: "/assets/images/RDhRQ4WWoWivfy4MLnSL2MKu2qA.webp", logo: "/assets/images/8stgJ2tUk2iS12WWBvhVMVtUs.png" },
        { name: "Rankify", sub: "View Live Website | 2025", image: "/assets/images/X1v7Yb87Igg23yIVi0lRCQBliQ.jpg", logo: "/assets/images/obmy72UpDOVaDmxxpPltJniBY.png" },
        { name: "Hawker Studios", sub: "Coming Soon | 2025", image: "/assets/images/kcxjwUcQKZbRLbLzb6nVeWSrM.jpg", logo: "/assets/images/RdBvsWhCLhy3Rw3vkfbtVPk.png" },
      ],
    },
    {
      type: "pricing",
      eyebrow: "Simple pricing",
      heading: "Websites Starting From",
      tag: "Per project",
      addon: { label: "Want more traffic and leads?", sub: "Get marketing and SEO that starts with your goals.", price: "+$1,999" },
      lookingForMore: true,
      tiers: [
        {
          price: "$5,999",
          period: "/project",
          note: "Delivery time 3-4 weeks",
          features: ["Homepage + up to 4 inner pages", "Design and Development", "Mobile-Optimised Design"],
          ctaLabel: "Get in touch",
          ctaHref: "/contact",
        },
      ],
    },
  ],
  faq: {
    heading: "FAQ.",
    subheading: "Got questions? We've got answers. Here's everything you need to know about working with us.",
    closingNote: CLOSING_NOTE,
    items: [
      {
        q: "How much does web design cost, and how long does it take?",
        a: "Web design costs vary depending on the complexity of the project, the features required, and the level of customisation. A basic business website typically costs between $3,000 and $10,000 and takes 2–6 weeks to complete. More complex projects, such as eCommerce or custom functionality, may require a higher budget and a longer timeline. Contact us for a tailored quote based on your specific needs.",
      },
      {
        q: "Why is web design important for my business?",
        a: "Your website is your digital storefront—often the first impression customers have of your brand. A professionally designed website builds trust, improves user experience, and helps convert visitors into paying customers. It's essential for showcasing your brand, driving traffic, and staying competitive in today's digital world.",
      },
      {
        q: "What is included in your web design services?",
        a: "Our web design services include custom website design tailored to your brand, mobile-responsive layouts, SEO-ready development to boost search visibility, and integration of contact forms, eCommerce solutions, and analytics tools. We use user-friendly content management systems (CMS) like WordPress, and we also offer post-launch support to ensure your site stays updated and secure.",
      },
      {
        q: "How do you ensure my website is mobile-friendly?",
        a: "We use responsive design techniques to create websites that adapt seamlessly to any device—desktops, tablets, and smartphones. This ensures your site looks great and functions smoothly, providing an excellent user experience across all platforms.",
      },
      {
        q: "Do you provide SEO as part of the web design process?",
        a: "Yes! Our web design process incorporates SEO best practices from the start. This includes optimising page structure, metadata, image compression, and fast loading speeds to improve your website's visibility on search engines like Google.",
      },
      {
        q: "Can you help with content creation for my website?",
        a: "Absolutely. Our team can assist with creating or optimising website content, including text, images, and videos. We focus on crafting engaging and SEO-friendly content that aligns with your brand and speaks directly to your target audience.",
      },
      {
        q: "Do you offer eCommerce website design?",
        a: "Yes, we specialise in designing eCommerce websites that are visually appealing and optimised for sales. Whether you need a simple product showcase or a full-featured online store, we can integrate platforms like Shopify, Framer or WooCommerce / WordPress to meet your business needs.",
      },
      {
        q: "What platform do you use to build websites?",
        a: "We primarily use Framer & Shopify for e-commerce. Non-eCommerce websites will use Framer or WordPress. We also work with other platforms depending on your requirements.",
      },
      {
        q: "What kind of businesses do you work with?",
        a: "We work with businesses across a wide range of industries, including retail and eCommerce, professional services (lawyers, accountants, etc.), healthcare and allied health, hospitality and tourism, real estate and construction, and nonprofits and educational institutions. Whether you're a startup or an established business, we can design a website tailored to your needs.",
      },
      {
        q: "What support do you provide after the website launch?",
        a: "We offer ongoing support to ensure your website remains secure and up-to-date. Our post-launch services include regular updates and maintenance, technical support and troubleshooting, security monitoring, and content updates as needed. We're here to help you keep your website running smoothly as your business grows.",
      },
      {
        q: "Can you redesign my existing website?",
        a: "Yes, we can refresh and modernise your existing website to align with your current branding and business goals. Our redesign services focus on improving user experience, enhancing visuals, and incorporating new features to maximise conversions.",
      },
      {
        q: "Do you work with clients outside the Gold Coast?",
        a: "Absolutely! While we're based on the Gold Coast, we provide web design services to clients across Australia, including Sydney, Melbourne, Brisbane, Perth, and Adelaide. We also serve international clients, collaborating remotely to deliver exceptional results.",
      },
    ],
  },
};
