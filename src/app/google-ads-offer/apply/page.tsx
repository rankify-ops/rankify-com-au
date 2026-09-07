import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/basePath";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Where the Google Ads offer's one CTA goes.
 *
 * Shell only. The qualifying questions are Tom's to write — inventing them
 * would decide who gets filtered out of a paid funnel, which isn't a guess
 * worth making. The page shape, chrome and tracking are ready for the form to
 * drop straight in.
 */
export const metadata: Metadata = {
  title: "Apply | Rankify × Adalytical",
  description: "Tell us about your business and we'll see whether the Google Ads offer is a fit.",
  robots: { index: false, follow: false },
};

const LOGO = "/assets/images/ha7iyKKaK8R1V7r8jKPhCa6P74.svg";

export default function GoogleAdsOfferApplyPage() {
  return (
    <>
      <div className="mx-auto flex max-w-[1100px] items-center gap-4 px-5 pt-7 sm:px-10">
        <Image src={asset(LOGO)} alt="Rankify®" width={186} height={40} priority className="h-[24px] w-auto" />
        <span aria-hidden className="h-5 w-px bg-line" />
        <Image
          src={asset("/assets/logos-web/adalytical.webp")}
          alt="Adalytical"
          width={240}
          height={106}
          priority
          className="h-[27px] w-auto object-contain"
        />
      </div>

      <main className="mx-auto max-w-[1100px] px-5 pb-16 pt-10 sm:px-10 sm:pt-14">
        <Reveal className="mx-auto max-w-[720px] text-center">
          <h1 className="text-[clamp(28px,3.6vw,44px)] font-medium leading-[1.05] tracking-[-0.04em]">
            Tell us about your business.
          </h1>
          <p className="mx-auto mt-4 max-w-[560px] text-[16px] leading-relaxed text-grey">
            A couple of minutes. If it&rsquo;s a fit, we&rsquo;ll build your landing page and Google
            Ads setup and show you the lot before you pay anything.
          </p>
        </Reveal>

        <Reveal scale delay={0.05} className="mx-auto mt-10 max-w-[720px]">
          <div className="neu rounded-3xl border border-line bg-white p-8 text-center sm:p-12">
            <p className="text-[15px] leading-relaxed text-grey">
              The qualifying form goes here.
            </p>
          </div>
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
