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
import { PricingGlance } from "@/components/sections/PricingGlance";

export default function Home() {
  return (
    <>
      <Header />
      {/* Hero and the logo strip are one screen on a phone.
          
          They used to end at 654px on a 812px screen, so 158px of the next
          section's white showed under the carousel before you scrolled --
          the hero read as a card that had run out rather than as a screen.
          The wrapper is one viewport tall minus the header (60px nav plus
          its 1px border, the same number the header itself is built from),
          the carousel keeps its natural height, and the hero takes whatever
          is left. No height is assumed for the carousel, so changing its
          padding cannot reopen the gap.
          
          svh, not vh: on a phone vh is the height with the browser chrome
          hidden, so a vh-tall block sits taller than the screen.
          
          From sm up this is inert -- the hero keeps its own min-height and
          the wrapper goes back to being an ordinary block. */}
      <div className="flex min-h-[calc(100svh-61px)] flex-col sm:block sm:min-h-0">
        <HomeHero />
        <Marquee />
      </div>
      {/* The two offers sit under the logo carousel: proof first, then the
          two things we want pressed. */}
      <HomeCtaCards />
      <ComparisonSection block={HOME_COMPARISON} />
      <Projects />
      {/* The home page carried no price at all. One table, every service,
          read from the price record. */}
      <PricingGlance />
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
