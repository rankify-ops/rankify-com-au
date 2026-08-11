import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { PROJECTS } from "@/content/projects";

export function Projects() {
  return (
    <section className="mx-2 mt-8 sm:mt-12 lg:mt-20 rounded-3xl bg-paper text-ink">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-10 sm:py-24 lg:py-32">
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
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
