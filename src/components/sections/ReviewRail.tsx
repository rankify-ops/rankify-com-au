"use client";

import Image from "next/image";
import { useState } from "react";
import { Stars } from "@/components/ui/Stars";
import { asset } from "@/lib/basePath";
import { marqueeHalf } from "@/lib/marquee";

/**
 * Transcribed from the Google Business profile, newest first. Only three have
 * a photo on file — the rest fall back to initials rather than a stock face.
 * Wording is verbatim; don't tidy it.
 */
const TESTIMONIALS: { img?: string; name: string; role: string; quote: string }[] = [
  {
    name: "Dominique Nurtsch",
    role: "Google Review",
    quote:
      "The Rankify team worked so fast and produced such a high quality website for us, very impressed and highly recommended to anyone needing web development or marketing!",
  },
  {
    img: "/assets/images/x3PIV2yZWhx27F6e2PFrLp8eOw.png",
    name: "James Fabre",
    role: "Myoko Embodied",
    quote:
      "Absolutely stoked with our website overhaul by Rankify. We just got it live and Tom was there for every question and every little fix that I desired, without hesitation. Great job, Highly recommend and will definitely use again!",
  },
  {
    name: "Ben Cavallo",
    role: "Google Review",
    quote:
      "Rankify did an awesome job on my website. The design looks professional, and the process was super smooth from start to finish. Great communication and attention to detail — highly recommend their services.",
  },
  {
    name: "MJB Electrical Contractors",
    role: "Electrical Contractor",
    quote:
      "Really happy with the website Rankify built for my electrical business. They made the whole process easy, quick, and professional. The site looks great and already helps bring in new leads. Highly recommend!",
  },
  {
    name: "Maggie Belford",
    role: "Google Review",
    quote:
      "I recently had my website built by Rankify and I couldn’t be happier with the outcome. From start to finish, the process was seamless, professional, and efficient. Tom took the time to really understand my business and brand, and turned that vision into a clean and user-friendly site. Highly recommend Rankify for anyone needing a standout website that reflects their business perfectly.",
  },
  {
    img: "/assets/images/sTM4xoEwNsccI4dCp2aB3iY87w.jpg",
    name: "Natalina Hoffman",
    role: "The Sculpted Look",
    quote:
      "Thomas was so helpful and patient. Helped with any issues I had and everything looks great. Very happy and highly recommend.",
  },
  {
    img: "/assets/images/fqqfgVGDvyoGr9nfo2bxxWiBQ.jpg",
    name: "Marlen Wolff",
    role: "Wolff Studios",
    quote:
      "Great experience working with Thomas. He instantly understood what I was after, even with some custom Shopify tweaks, and executed everything with precision and speed. Professional, responsive, and super skilled — I couldn’t be happier with the result. I’ll keep working with him in future projects, highly recommend.",
  },
  {
    name: "Jacob Gregory",
    role: "Roofing",
    quote:
      "Was great dealing with Tom for our roofing companies website development and SEO. Tom was upfront with costs, and provided updates along each step, wrapped with the outcome. Highly recommend!",
  },
  {
    name: "Veith Nurtsch",
    role: "Google Review",
    quote:
      "Had a quick call and Tom helped me and set all up for my homepage! It has increased my views and engagement on my page as well! Thank you so much again!",
  },
];

const REVIEW_HALF = marqueeHalf(TESTIMONIALS, 340);
const REVIEW_RAIL = [...REVIEW_HALF, ...REVIEW_HALF];

/** Initials stand in where there's no photo on the Google profile. */
function Avatar({ img, name }: { img?: string; name: string }) {
  if (img) {
    return (
      <Image
        src={asset(img)}
        alt={name}
        width={44}
        height={44}
        className="h-11 w-11 flex-none rounded-full object-cover"
      />
    );
  }
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  return (
    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-[#e9f5f0] text-[15px] font-semibold text-[color:var(--green-deep)]">
      {initials}
    </span>
  );
}

/**
 * Cards stretch to the tallest in the row, so one 380-character review used to
 * set the height for all of them. Quotes clamp to four lines and open on
 * demand instead.
 */
function ReviewCard({
  review,
  hidden,
}: {
  review: (typeof TESTIMONIALS)[number];
  hidden: boolean;
}) {
  const [open, setOpen] = useState(false);
  // roughly the point where four lines run out at this width
  const long = review.quote.length > 150;

  return (
    <div
      aria-hidden={hidden}
      // self-start once expanded so the card grows on its own — stretched, it
      // dragged every other card in the rail up to its new height
      className={`neu flex w-[260px] flex-none flex-col gap-3.5 rounded-2xl border border-line bg-white p-5 sm:w-[320px] sm:p-6 ${
        open ? "self-start" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <Avatar img={review.img} name={review.name} />
        <div className="min-w-0">
          <strong className="block truncate text-[14.5px] font-semibold">{review.name}</strong>
          <span className="text-[12.5px] text-grey">{review.role}</span>
        </div>
      </div>
      <Stars className="h-3.5 w-3.5" />
      <blockquote
        className={`text-[13.5px] leading-[1.45] tracking-[-0.01em] sm:text-[14.5px] ${
          open ? "" : "line-clamp-4"
        }`}
      >
        {review.quote}
      </blockquote>
      {long && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          tabIndex={hidden ? -1 : undefined}
          // mt-auto so the link sits on the card's baseline rather than
          // wherever that particular quote happened to stop
          // -mb/-ml pull the padded hit area back so it doesn't shift the text
          className="-mb-2 -ml-2 mt-auto flex min-h-[34px] items-center self-start px-2 pt-0.5 text-[12.5px] font-semibold text-[color:var(--green-deep)] underline-offset-2 hover:underline"
        >
          {open ? "Show less" : "Learn more"}
        </button>
      )}
    </div>
  );
}

/**
 * Reviews travel left to right. The rail repeats the set enough that one half
 * spans the widest screen — same trick as the logo marquees, otherwise the
 * loop shows a gap.
 *
 * `fullWidth` runs it edge to edge; otherwise it breaks out of the section's
 * padding just far enough to bleed off both sides.
 */
export function ReviewRail({ fullWidth = false }: { fullWidth?: boolean }) {
  return (
    <div className={`overflow-hidden ${fullWidth ? "" : "-mx-5 sm:-mx-10"}`}>
      <div
        // stretch, not items-start: every card matches the tallest in the rail
        className={`flex w-max animate-[marquee-reverse_60s_linear_infinite] gap-4 hover:[animation-play-state:paused] sm:gap-5 ${
          fullWidth ? "" : "px-5 sm:px-10"
        }`}
      >
        {REVIEW_RAIL.map((t, i) => (
          <ReviewCard key={t.name + i} review={t} hidden={i >= TESTIMONIALS.length} />
        ))}
      </div>
    </div>
  );
}
