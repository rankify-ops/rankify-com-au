import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Stars } from "@/components/ui/Stars";
import { PlusIcon } from "@/components/ui/PlusIcon";
import { Counter } from "@/components/ui/Counter";
import { Button } from "@/components/ui/Button";
import { ReviewRail } from "@/components/sections/ReviewRail";
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
