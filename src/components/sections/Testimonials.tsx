import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Stars } from "@/components/ui/Stars";
import { PlusIcon } from "@/components/ui/PlusIcon";
import { Counter } from "@/components/ui/Counter";
import { Button } from "@/components/ui/Button";
import { asset } from "@/lib/basePath";

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

const TESTIMONIALS = [
  {
    img: "/assets/images/x3PIV2yZWhx27F6e2PFrLp8eOw.png",
    name: "James & Kate",
    role: "Myoko Embodied",
    quote:
      "Absolutely stoked with our website overhaul by Rankify. We just got it live and Tom was there for every question and every little fix that I desired, without hesitation.",
  },
  {
    img: "/assets/images/fqqfgVGDvyoGr9nfo2bxxWiBQ.jpg",
    name: "Marlen Wolff",
    role: "Wolff Studios",
    quote: "Great experience. Instantly understood what I was after and executed everything with precision and speed.",
  },
  {
    img: "/assets/images/sTM4xoEwNsccI4dCp2aB3iY87w.jpg",
    name: "Natalina Hoffman",
    role: "The Sculpted Look",
    quote:
      "Thomas was so helpful and patient. Helped with any issues I had and everything looks great. Very happy and highly recommend.",
  },
];

export function Testimonials() {
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

        <div className="grid gap-5 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <div className="flex h-full flex-col gap-5 rounded-2xl border border-line bg-white p-7">
                <div className="flex items-center gap-3.5">
                  <Image src={asset(t.img)} alt={t.name} width={52} height={52} className="h-[52px] w-[52px] rounded-full object-cover" />
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
            </Reveal>
          ))}
        </div>

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
