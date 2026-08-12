import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { JsonLd, projectSchema } from "@/lib/schema";
import { ProjectPageTemplate } from "@/components/templates/ProjectPageTemplate";
import { getProjectBySlug, getOtherProject } from "@/content/projects";

const project = getProjectBySlug("hawker-studio")!;
const nextProject = getOtherProject("hawker-studio");

export const metadata: Metadata = {
  title: `${project.name} | Rankify Projects`,
  description: project.intro,
  alternates: { canonical: "/projects/hawker-studio" },
};

export default function HawkerStudioPage() {
  return (
    <>
      <JsonLd data={projectSchema({ name: project.name, description: project.intro, slug: project.slug, image: project.photo })} />
      <Header />
      <ProjectPageTemplate project={project} nextProject={nextProject} />
      <ContactFooter />
    </>
  );
}
