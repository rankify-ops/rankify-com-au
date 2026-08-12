import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { JsonLd, projectSchema } from "@/lib/schema";
import { ProjectPageTemplate } from "@/components/templates/ProjectPageTemplate";
import { getProjectBySlug, getOtherProject } from "@/content/projects";

const project = getProjectBySlug("myoko-embodied")!;
const nextProject = getOtherProject("myoko-embodied");

export const metadata: Metadata = {
  title: `${project.name} | Rankify Projects`,
  description: project.intro,
  alternates: { canonical: "/projects/myoko-embodied" },
};

export default function MyokoEmbodiedPage() {
  return (
    <>
      <JsonLd data={projectSchema({ name: project.name, description: project.intro, slug: project.slug, image: project.photo })} />
      <Header />
      <ProjectPageTemplate project={project} nextProject={nextProject} />
      <ContactFooter />
    </>
  );
}
