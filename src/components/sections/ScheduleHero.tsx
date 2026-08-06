import Image from "next/image";
import { asset } from "@/lib/basePath";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function ScheduleHero() {
  return (
    <section className="mx-2 rounded-3xl bg-paper text-ink">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-10 sm:py-24 lg:py-32">
        <Reveal>
          <h1 className="text-[clamp(40px,3.55vw,68px)] font-medium leading-[0.92] tracking-[-0.06em]">
            Schedule Strategy Call.
          </h1>
        </Reveal>

        <div className="mt-10 grid gap-12 sm:mt-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal delay={0.1}>
              <p className="max-w-[420px] text-[clamp(18px,1.6vw,24px)] font-medium leading-snug tracking-[-0.02em]">
                <span className="text-ink">Have a project in mind?</span>{" "}
                <span className="text-grey">
                  Book a free discovery call below and we&rsquo;ll discuss the best way to move forward.
                </span>
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-8 flex items-center gap-3.5">
                <Image
                  src={asset("/assets/images/2JJv2pYeYOO0MXQyBhjn8jpYJY.webp")}
                  alt="Thomas Flood"
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-full object-cover grayscale"
                />
                <div>
                  <strong className="block text-[15px]">Thomas Flood</strong>
                  <span className="text-[13px] text-grey">Director of Digital Strategy</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.26}>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-8 text-[15px]">
                <a href="tel:1300880860" className="font-medium opacity-80 transition-opacity hover:opacity-100">
                  1300 880 860
                </a>
                <a
                  href="mailto:hello@rankify.com.au"
                  className="font-medium opacity-80 transition-opacity hover:opacity-100"
                >
                  hello@rankify.com.au
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="flex min-h-[320px] flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-line bg-white p-8 text-center">
              <span className="text-[13px] font-medium text-grey">Booking calendar coming soon</span>
              <p className="max-w-[320px] text-[14px] leading-relaxed text-grey">
                The real rankify.com.au booking calendar is currently broken too (its Cal.com link
                returns a 404), so rather than invent one, we&rsquo;ve left this here until it&rsquo;s
                fixed. In the meantime, reach out directly and we&rsquo;ll set up a time that works.
              </p>
              <Button href="/contact" className="mt-2">
                Contact us instead
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
