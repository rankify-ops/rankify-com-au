import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/basePath";
import type { Project } from "@/content/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={project.href} className="group block">
      <div className="relative aspect-[4/3.4] overflow-hidden rounded-2xl bg-[#e9e9e9]">
        <Image
          src={asset(project.photo)}
          alt={`${project.name} website`}
          fill
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
        />
        <Image
          src={asset(project.logo)}
          alt=""
          width={220}
          height={220}
          className="absolute inset-0 z-[2] m-auto w-[clamp(120px,14vw,220px)] h-auto drop-shadow-[0_6px_24px_rgba(0,0,0,0.25)]"
        />
      </div>
      <div className="flex items-baseline gap-3.5 pt-4 text-sm text-grey">
        <strong className="mr-auto text-[clamp(20px,1.6vw,28px)] font-semibold tracking-[-0.03em] text-ink">
          {project.name}
        </strong>
        {[...project.categories, "/", project.year].map((t, ti) => (
          <span key={ti}>{t}</span>
        ))}
      </div>
    </Link>
  );
}
