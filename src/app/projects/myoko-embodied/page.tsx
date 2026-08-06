import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { ProjectPageTemplate } from "@/components/templates/ProjectPageTemplate";
import { getProjectBySlug, getOtherProject } from "@/content/projects";

const project = getProjectBySlug("myoko-embodied")!;
const nextProject = getOtherProject("myoko-embodied");

export const metadata: Metadata = {
  title: `${project.name} | Rankify Projects`,
  description: project.intro,
};

export default function MyokoEmbodiedPage() {
  return (
    <>
      <Header />
      <ProjectPageTemplate project={project} nextProject={nextProject} />
      <ContactFooter />
    </>
  );
}
