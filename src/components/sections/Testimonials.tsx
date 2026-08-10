import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Stars } from "@/components/ui/Stars";
import { PlusIcon } from "@/components/ui/PlusIcon";
import { Counter } from "@/components/ui/Counter";
import { Button } from "@/components/ui/Button";
import { asset } from "@/lib/basePath";
import { marqueeHalf } from "@/lib/marquee";

const AVATARS = [
  "/assets/images/7XElicIcn53vdnwyFHTpct98.jpg",
  "/assets/images/D53nCbgrC45WamdByYxomUf9c.jpg",
  "/assets/images/fqOOPJWEd96G4368QW9n1dcVU.jpg",
  "/assets/images/lVMA2BWo8D0yz8GINpzGpDx4.jpg",
];

const STATS = [
  { to: 5, suffix: "", label: "Average Review Rating", note: "/5" },
  { to: 40, suffix: "+", label: "Successful projects launched" },
  { to: 100, suffix: "%", label: "Client satisfaction rate" },
  { to: 50, suffix: "k+", label: "Monthly visitors driven through SEO" },
];

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
  {
    name: "Gary Flood",
    role: "Google Review",
    quote:
      "We had a great experience working with Rankify on our website and SEO. They really took the time to understand our business and what we were trying to achieve. The new website looks professional and works exactly how we wanted it to, making it easier for our customers to find information and get in touch.",
  },
];

/** Initials stand in where there's no photo on the Google profile. */
function Avatar({ img, name }: { img?: string; name: string }) {
  if (img) {
    return (
      <Image
        src={asset(img)}
        alt={name}
        width={52}
        height={52}
        className="h-[52px] w-[52px] flex-none rounded-full object-cover"
      />
    );
  }
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  return (
    <span className="flex h-[52px] w-[52px] flex-none items-center justify-center rounded-full bg-[#e9f5f0] text-[17px] font-semibold text-[color:var(--green-deep)]">
      {initials}
    </span>
  );
}

const REVIEW_HALF = marqueeHalf(TESTIMONIALS, 400);
const REVIEW_RAIL = [...REVIEW_HALF, ...REVIEW_HALF];

/**
 * Reviews travel left to right. The rail repeats the set enough that one half
 * spans the widest screen — same trick as the logo marquees, otherwise the
 * loop shows a gap.
 *
 * `fullWidth` runs it edge to edge; otherwise it breaks out of the section's
 * padding just far enough to bleed off both sides.
 */
function ReviewRail({ fullWidth = false }: { fullWidth?: boolean }) {
  return (
    <div className={`overflow-hidden ${fullWidth ? "" : "-mx-5 sm:-mx-10"}`}>
      <div
        className={`flex w-max animate-[marquee-reverse_60s_linear_infinite] gap-5 hover:[animation-play-state:paused] ${
          fullWidth ? "" : "px-5 sm:px-10"
        }`}
      >
        {REVIEW_RAIL.map((t, i) => (
          <div
            key={t.name + i}
            aria-hidden={i >= TESTIMONIALS.length}
            className="neu flex w-[300px] flex-none flex-col gap-5 rounded-2xl border border-line bg-white p-7 sm:w-[380px]"
          >
            <div className="flex items-center gap-3.5">
              <Avatar img={t.img} name={t.name} />
              <div>
                <strong className="block text-base font-semibold">{t.name}</strong>
                <span className="text-[13.5px] text-grey">{t.role}</span>
              </div>
            </div>
            <Stars />
            <blockquote className="text-[16.5px] font-medium leading-snug tracking-[-0.01em]">
              {t.quote}
            </blockquote>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * `bare` strips everything but the rail — used on the service pages, where the
 * heading, the 5/5 counter and the stats grid would repeat what's already been
 * said further up. The homepage keeps the full section.
 */
export function Testimonials({ bare = false }: { bare?: boolean }) {
  if (bare) {
    return (
      <section className="mx-2 mt-8 overflow-hidden rounded-3xl bg-paper text-ink sm:mt-12 lg:mt-20">
        {/* No max-width wrapper — the rail runs the full width of the section. */}
        <div className="py-12 sm:py-16 lg:py-20">
          <ReviewRail fullWidth />
        </div>
      </section>
    );
  }

  return (
    <section className="mx-2 mt-12 sm:mt-24 lg:mt-48 rounded-3xl bg-paper text-ink">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-10 sm:py-24 lg:py-32">
        <div className="mb-10 grid gap-6 sm:mb-16 lg:mb-24">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-[15px] font-medium">
              <PlusIcon dark className="h-[18px] w-[18px]" />
              Testimonials
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="block max-w-[380px] text-base text-grey">
              We&rsquo;ve delivered 40+ projects that help companies generate real results.
            </span>
          </Reveal>
          <Reveal delay={0.15}>
            <h2 className="text-[clamp(40px,3.55vw,68px)] font-medium leading-[0.92] tracking-[-0.06em]">
              Experiences. <span className="text-grey">©2025</span>
            </h2>
          </Reveal>
        </div>

        <div className="mb-10 flex flex-col gap-8 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <div className="flex items-baseline gap-4">
              <div className="text-[clamp(56px,6vw,104px)] font-medium leading-none tracking-[-0.05em]">
                <Counter to={5} />
                <small className="text-[0.4em] text-grey">/5</small>
              </div>
              <Stars className="h-5 w-5" />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-wrap items-center gap-4">
            <div className="flex">
              {AVATARS.map((a, i) => (
                <Image
                  key={a}
                  src={asset(a)}
                  alt=""
                  width={48}
                  height={48}
                  className="-ml-3 h-12 w-12 flex-none rounded-full border-2 border-paper object-cover first:ml-0"
                  style={{ zIndex: AVATARS.length - i }}
                />
              ))}
            </div>
            <p className="max-w-[220px] text-[14.5px] text-grey sm:max-w-none">
              <strong className="text-ink">40+</strong> Trusted by clients Australia wide
            </p>
            <Button href="https://g.page/r/CaTZLZ8xYIa5EAI/review" external className="flex-none whitespace-nowrap">
              Leave a review
            </Button>
          </Reveal>
        </div>

        <ReviewRail />

        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-line pt-10 sm:mt-20 sm:pt-16 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div className="text-[clamp(40px,4vw,72px)] font-medium leading-none tracking-[-0.05em]">
                <Counter to={s.to} suffix={s.suffix} />
                {s.note && <span className="text-[0.4em] text-grey">{s.note}</span>}
              </div>
              <p className="mt-2.5 text-[14.5px] text-grey">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
