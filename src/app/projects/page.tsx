import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { SiteFooter } from "@/components/sections/ContactFooter";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PROJECTS, type ProjectCategory } from "@/content/projects";

export const metadata: Metadata = {
  title: "Latest Projects | Rankify",
  description:
    "We've helped businesses across industries achieve their goals. Here are some of our recent projects.",
  alternates: { canonical: "/projects" },
};

function ProjectGrid({ category }: { category?: ProjectCategory }) {
  const projects = category ? PROJECTS.filter((p) => p.categories.includes(category)) : PROJECTS;

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {projects.map((p, i) => (
        <Reveal key={p.href} delay={i * 0.15}>
          <ProjectCard project={p} />
        </Reveal>
      ))}
    </div>
  );
}

export default function ProjectsIndexPage() {
  return (
    <>
      <Header />
      <section className="mx-2 mt-2 rounded-3xl bg-paper text-ink">
        <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-10 sm:py-24 lg:py-32">
          <div className="mb-10 grid gap-6 sm:mb-16 lg:mb-24">
            <Reveal>
              <span className="text-[clamp(24px,2vw,38px)] font-medium tracking-[-0.04em] text-[#b5b5b5]">
                (2016-25©)
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <span className="block max-w-[380px] text-base text-grey">
                We&rsquo;ve helped businesses across industries achieve their goals. Here are some of our
                recent projects.
              </span>
            </Reveal>
            <Reveal delay={0.15}>
              <h1 className="text-[clamp(40px,3.55vw,68px)] font-medium leading-[0.92] tracking-[-0.06em]">
                Latest Projects.
              </h1>
            </Reveal>
          </div>

          <Tabs defaultValue="all">
            <Reveal delay={0.2}>
              <TabsList className="mb-10 h-auto w-fit gap-1 rounded-full border border-line bg-white p-1.5 sm:mb-14">
                <TabsTrigger
                  value="all"
                  className="rounded-full px-5 py-2.5 text-[14px] font-medium text-grey data-active:bg-ink data-active:text-white data-active:shadow-none"
                >
                  All categories
                </TabsTrigger>
                <TabsTrigger
                  value="SEO"
                  className="rounded-full px-5 py-2.5 text-[14px] font-medium text-grey data-active:bg-ink data-active:text-white data-active:shadow-none"
                >
                  SEO
                </TabsTrigger>
                <TabsTrigger
                  value="Web Design"
                  className="rounded-full px-5 py-2.5 text-[14px] font-medium text-grey data-active:bg-ink data-active:text-white data-active:shadow-none"
                >
                  Web Design
                </TabsTrigger>
              </TabsList>
            </Reveal>

            <TabsContent value="all">
              <ProjectGrid />
            </TabsContent>
            <TabsContent value="SEO">
              <ProjectGrid category="SEO" />
            </TabsContent>
            <TabsContent value="Web Design">
              <ProjectGrid category="Web Design" />
            </TabsContent>
          </Tabs>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
