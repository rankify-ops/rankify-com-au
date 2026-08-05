import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Projects } from "@/components/sections/Projects";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { StatsManifesto } from "@/components/sections/StatsManifesto";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { ContactFooter } from "@/components/sections/ContactFooter";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Marquee />
      <Projects />
      <WhyChooseUs />
      <Services />
      <Process />
      <Testimonials />
      <StatsManifesto />
      <Pricing />
      <FAQ />
      <ContactFooter />
    </>
  );
}
