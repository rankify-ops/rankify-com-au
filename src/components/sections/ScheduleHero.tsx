import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/basePath";
import { Reveal } from "@/components/ui/Reveal";
import { BookingCalendar } from "@/components/sections/BookingCalendar";

export function ScheduleHero() {
  return (
    <section className="mx-2 rounded-3xl bg-paper text-ink">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-10 sm:py-24 lg:py-32">
        <Reveal>
          <h1 className="text-[clamp(40px,3.55vw,68px)] font-medium leading-[0.92] tracking-[-0.06em]">
            Schedule Strategy Call.
          </h1>
        </Reveal>

        <div className="mt-10 grid gap-12 sm:mt-16 lg:grid-cols-[1fr_minmax(0,420px)] lg:gap-20">
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

        </div>

        {/* Full width, not the right-hand column: Cal's month view needs room,
            and in a 543px column it collapsed into a 3,500px stack. */}
        <Reveal delay={0.2} className="mt-12 sm:mt-16">
          <BookingCalendar />
          <p className="mt-4 text-center text-[13.5px] text-grey">
            Can&rsquo;t find a time that suits?{" "}
            <Link href="/contact" className="font-medium text-ink underline underline-offset-2">
              Send us a message
            </Link>{" "}
            and we&rsquo;ll work around you.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
