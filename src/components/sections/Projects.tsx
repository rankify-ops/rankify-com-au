import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

const PROJECTS = [
  {
    href: "/projects/myoko-embodied",
    name: "Myoko Embodied",
    photo: "/assets/images/WRjXIBfZxMI8DrDHJoRoBdiFgds.webp",
    logo: "/assets/images/lRNcR8O5y55ArWKxP92bLXu9k.png",
    tags: ["Web Design", "SEO", "/", "2026"],
  },
  {
    href: "/projects/hawker-studio",
    name: "Hawker Studios",
    photo: "/assets/images/RDhRQ4WWoWivfy4MLnSL2MKu2qA.webp",
    logo: "/assets/images/nqynozke2KURfAvDnstCnT89oE.png",
    tags: ["Web Design", "SEO", "/", "2026"],
  },
];

export function Projects() {
  return (
    <section className="mx-2 rounded-3xl bg-paper text-ink">
      <div className="px-5 py-16 sm:px-10 sm:py-24 lg:py-32">
        <div className="mb-10 grid gap-6 sm:mb-16 lg:mb-24">
          <Reveal>
            <span className="text-[clamp(24px,2vw,38px)] font-medium tracking-[-0.04em] text-[#b5b5b5]">
              (27)
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="block max-w-[380px] text-base text-grey">
              We&rsquo;ve helped businesses across industries achieve their goals. Here are some of our
              recent projects.
            </span>
          </Reveal>
          <Reveal delay={0.15}>
            <h2 className="text-[clamp(40px,3.55vw,68px)] font-medium leading-[0.92] tracking-[-0.06em]">
              Latest Projects. <span className="text-grey">©2026</span>
            </h2>
          </Reveal>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.href} delay={i * 0.15}>
              <Link href={p.href} className="group block">
                <div className="relative aspect-[4/3.4] overflow-hidden rounded-2xl bg-[#e9e9e9]">
                  <Image
                    src={p.photo}
                    alt={`${p.name} website`}
                    fill
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                  />
                  <Image
                    src={p.logo}
                    alt=""
                    width={220}
                    height={220}
                    className="absolute inset-0 z-[2] m-auto w-[clamp(120px,14vw,220px)] h-auto drop-shadow-[0_6px_24px_rgba(0,0,0,0.25)]"
                  />
                </div>
                <div className="flex items-baseline gap-3.5 pt-4 text-sm text-grey">
                  <strong className="mr-auto text-[clamp(20px,1.6vw,28px)] font-semibold tracking-[-0.03em] text-ink">
                    {p.name}
                  </strong>
                  {p.tags.map((t, ti) => (
                    <span key={ti}>{t}</span>
                  ))}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
