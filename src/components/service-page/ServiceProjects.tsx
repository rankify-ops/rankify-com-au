import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/service-page/SectionHeading";
import { PROJECTS } from "@/content/projects";
import type { ProjectsBlock } from "@/content/service-pages/types";

/**
 * Case studies on a service page. Same card as the homepage so a visitor who
 * has seen one recognises the other, and the same PROJECTS source so adding a
 * case study makes it appear in both places.
 */
export function ServiceProjects({ block }: { block: ProjectsBlock }) {
  return (
    <section
      id={block.anchorId}
      className="mx-2 mt-8 scroll-mt-24 rounded-3xl bg-paper text-ink sm:mt-12 lg:mt-20"
    >
      <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-10 sm:py-16 lg:py-20">
        <SectionHeading
          label={block.kicker}
          heading={block.heading}
          headingDim={block.headingDim}
          sub={block.subheading}
        />

        <div className="mt-8 grid gap-6 sm:mt-12 sm:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.href} delay={i * 0.1}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>

        {block.cta && (
          <Reveal delay={0.2} className="mt-8">
            <Link
              href={block.cta.href}
              className="inline-flex items-center gap-2 text-[15px] font-semibold text-ink underline underline-offset-4"
            >
              {block.cta.label}
              <span aria-hidden>&rarr;</span>
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
