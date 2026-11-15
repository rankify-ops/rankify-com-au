import { Header } from "@/components/layout/Header";
import { HomeHero, HomeCtaCards } from "@/components/sections/HomeDoors";
import { Marquee } from "@/components/sections/Marquee";
import { ComparisonSection } from "@/components/service-page/ComparisonSection";
import { HOME_COMPARISON } from "@/content/home-comparison";
import { Projects } from "@/components/sections/Projects";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { StatsManifesto } from "@/components/sections/StatsManifesto";
import { ServiceFaq } from "@/components/service-page/ServiceFaq";
import { HOME_FAQ } from "@/content/home-faq";
import { ContactFooter } from "@/components/sections/ContactFooter";

export default function Home() {
  return (
    <>
      <Header />
      <HomeHero />
      <Marquee />
      {/* The two offers sit under the logo carousel: proof first, then the
          two things we want pressed. */}
      <HomeCtaCards />
      <ComparisonSection block={HOME_COMPARISON} />
      <Projects />
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
