import { Header } from "@/components/layout/Header";
import { HomeDoors } from "@/components/sections/HomeDoors";
import { Marquee } from "@/components/sections/Marquee";
import { ComparisonSection } from "@/components/service-page/ComparisonSection";
import { HOME_COMPARISON } from "@/content/home-comparison";
import { Projects } from "@/components/sections/Projects";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { StatsManifesto } from "@/components/sections/StatsManifesto";
import { ServicesShowcase } from "@/components/sections/ServicesShowcase";
import { ServiceFaq } from "@/components/service-page/ServiceFaq";
import { HOME_FAQ } from "@/content/home-faq";
import { ContactFooter } from "@/components/sections/ContactFooter";

export default function Home() {
  return (
    <>
      <Header />
      {/* The doors replace the old hero: Rankify is no longer one thing, so
          the first screen routes rather than pitches. */}
      <HomeDoors />
      <Marquee />
      <ComparisonSection block={HOME_COMPARISON} />
      <Projects />
      <ServicesShowcase />
      <WhyChooseUs />
      <Services />
      <Process />
      <Testimonials
        bare
        kicker="Reviews"
        heading="Every review is five stars."
        headingDim="That's not an accident."
      />
      <StatsManifesto />
      <ServiceFaq faq={HOME_FAQ} />
      <ContactFooter />
    </>
  );
}
