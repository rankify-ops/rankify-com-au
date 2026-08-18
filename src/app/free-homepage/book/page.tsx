import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/basePath";
import { Reveal } from "@/components/ui/Reveal";
import { BookingCalendar } from "@/components/sections/BookingCalendar";

/**
 * Where the landing page's one CTA goes.
 *
 * Deliberately not /schedule-strategy-call: that page carries the full site
 * header, and handing cold paid traffic a nav bar one click before the
 * booking undoes the point of a landing page. Same calendar, same
 * `Schedule` event, no way out except finishing the booking.
 */
export const metadata: Metadata = {
  title: "Book your free homepage call | Rankify",
  description: "Pick a time for a 15-minute call. Tell me about your business and I'll build your homepage concept.",
  robots: { index: false, follow: false },
};

const LOGO = "/assets/images/ha7iyKKaK8R1V7r8jKPhCa6P74.svg";

const REASSURANCE = [
  "15 minutes, and I'll be on the call myself",
  "No pitch deck and no obligation",
  "If it isn't a fit I'll say so on the call",
];

export default function FreeHomepageBookingPage() {
  return (
    <>
      <div className="mx-auto flex max-w-[1100px] items-center px-5 pt-7 sm:px-10">
        <Image src={asset(LOGO)} alt="Rankify®" width={186} height={40} priority className="h-[24px] w-auto" />
      </div>

      <main className="mx-auto max-w-[1100px] px-5 pb-16 pt-10 sm:px-10 sm:pt-14">
        <Reveal className="mx-auto max-w-[720px] text-center">
          <h1 className="text-[clamp(28px,3.6vw,44px)] font-medium leading-[1.05] tracking-[-0.04em]">
            Pick a time and I&rsquo;ll build your homepage.
          </h1>
          <p className="mx-auto mt-4 max-w-[560px] text-[16px] leading-relaxed text-grey">
            Fifteen minutes to hear about your business and what you need the site to do. If
            it&rsquo;s a fit, one of this month&rsquo;s ten slots is yours.
          </p>
          {/* Trailing separator, same reason as the landing page's trust row. */}
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[13.5px] font-medium text-ink">
            {REASSURANCE.map((t) => (
              <li
                key={t}
                className="after:ml-2.5 after:text-line after:content-['|'] last:after:content-none"
              >
                {t}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal scale delay={0.05} className="mt-10">
          <BookingCalendar />
        </Reveal>
      </main>

      <footer className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-4 px-5 py-10 text-[13px] text-grey sm:px-10">
        <span>© 2026 Rankify® All rights reserved.</span>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link href="/legal/privacy-policy" className="hover:text-ink">
            Privacy Policy
          </Link>
          <Link href="/legal/terms-of-service" className="hover:text-ink">
            Terms of Service
          </Link>
        </div>
      </footer>
    </>
  );
}
