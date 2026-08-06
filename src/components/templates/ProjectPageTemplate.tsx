import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/basePath";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/ui/ProjectCard";
import type { Project } from "@/content/projects";

function GalleryGrid({ images, alt }: { images: string[]; alt: string }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {images.map((src, i) => (
        <Reveal
          key={src}
          delay={i * 0.08}
          className={i === images.length - 1 && images.length % 2 === 1 ? "sm:col-span-2" : undefined}
        >
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#e9e9e9]">
            <Image src={asset(src)} alt={alt} fill className="object-cover" />
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function ProjectPageTemplate({
  project,
  nextProject,
}: {
  project: Project;
  nextProject: Project;
}) {
  const { name, intro, meta, galleryTop, challenges, liveUrl, galleryBottom, finalThoughts } = project;

  return (
    <section className="mx-2 mt-2 rounded-3xl bg-paper text-ink">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-10 sm:py-24 lg:py-32">
        {/* Title + intro */}
        <div className="mb-12 grid gap-10 sm:mb-16 lg:mb-24 lg:grid-cols-[minmax(220px,1fr)_2.2fr] lg:gap-16">
          <Reveal>
            <h1 className="text-[clamp(40px,3.55vw,68px)] font-medium leading-[0.92] tracking-[-0.06em]">
              {name}.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-[640px] text-base leading-relaxed text-grey">{intro}</p>
          </Reveal>
        </div>

        {/* Meta row */}
        <Reveal delay={0.15}>
          <div className="mb-16 grid grid-cols-2 gap-8 border-y border-line py-8 sm:mb-20 sm:grid-cols-4">
            <div>
              <span className="mb-2 block text-[13px] font-medium text-grey">Year</span>
              <span className="text-[16px] font-medium">{meta.year}</span>
            </div>
            <div>
              <span className="mb-2 block text-[13px] font-medium text-grey">Industry</span>
              <span className="text-[16px] font-medium">{meta.industry}</span>
            </div>
            <div>
              <span className="mb-2 block text-[13px] font-medium text-grey">Scope of work</span>
              <span className="text-[16px] font-medium">{meta.scope.join(" / ")}</span>
            </div>
            <div>
              <span className="mb-2 block text-[13px] font-medium text-grey">Timeline</span>
              <span className="text-[16px] font-medium">{meta.timeline}</span>
            </div>
          </div>
        </Reveal>

        {/* Gallery (top) */}
        <div className="mb-16 sm:mb-20">
          <GalleryGrid images={galleryTop} alt={`${name} project screenshot`} />
        </div>

        {/* Challenges */}
        <div className="mb-16 grid gap-6 sm:mb-20 lg:grid-cols-[minmax(220px,1fr)_2.2fr] lg:gap-16">
          <Reveal>
            <h2 className="text-[clamp(28px,2.2vw,40px)] font-medium leading-[0.95] tracking-[-0.04em]">
              Challenges
            </h2>
          </Reveal>
          <div>
            {challenges.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.08}>
                <p className="mb-4 max-w-[640px] text-base leading-relaxed text-grey last:mb-0">{p}</p>
              </Reveal>
            ))}
            {liveUrl && (
              <Reveal delay={0.1 + challenges.length * 0.08}>
                <div className="mt-8">
                  <Button href={liveUrl} external>
                    Live Project
                  </Button>
                </div>
              </Reveal>
            )}
          </div>
        </div>

        {/* Gallery (bottom) */}
        <div className="mb-16 sm:mb-20">
          <GalleryGrid images={galleryBottom} alt={`${name} project screenshot`} />
        </div>

        {/* Final thoughts */}
        <div className="mb-16 grid gap-6 sm:mb-20 lg:grid-cols-[minmax(220px,1fr)_2.2fr] lg:gap-16">
          <Reveal>
            <h2 className="text-[clamp(28px,2.2vw,40px)] font-medium leading-[0.95] tracking-[-0.04em]">
              Final thoughts
            </h2>
          </Reveal>
          <div>
            {finalThoughts.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.08}>
                <p className="mb-4 max-w-[640px] text-base leading-relaxed text-grey last:mb-0">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Next projects */}
        <div className="border-t border-line pt-16 sm:pt-20">
          <div className="mb-10 flex items-baseline justify-between gap-4 sm:mb-14">
            <Reveal>
              <h2 className="text-[clamp(32px,2.8vw,48px)] font-medium leading-[0.95] tracking-[-0.05em]">
                Next projects.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Link
                href="/projects"
                className="whitespace-nowrap text-[15px] font-medium underline underline-offset-4"
              >
                All projects
              </Link>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="max-w-[520px]">
            <ProjectCard project={nextProject} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
