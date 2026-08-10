import Image from "next/image";
import { asset } from "@/lib/basePath";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PlusIcon } from "@/components/ui/PlusIcon";
import { Stars } from "@/components/ui/Stars";
import { ScreenshotWall } from "@/components/service-page/ScreenshotWall";
import type { HeroData } from "@/content/service-pages/types";

const TRUST_AVATARS = [
  "/assets/images/BneGKeqNYOGeaTyo7186uoQik.jpg",
  "/assets/images/cFRo7pt3uj7P7xJL42FonlfI4Ck.jpg",
  "/assets/images/IcO65dJKxeCET0MMqA7dbjqZ7U.jpg",
  "/assets/images/siCFBzqpvx6sgWLXVPxMR5CbFc.jpg",
];

function TrustRow() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex">
        {TRUST_AVATARS.map((a, i) => (
          <Image
            key={a}
            src={asset(a)}
            alt=""
            width={40}
            height={40}
            className="-ml-2.5 h-10 w-10 flex-none rounded-full border-2 border-paper object-cover first:ml-0"
            style={{ zIndex: TRUST_AVATARS.length - i }}
          />
        ))}
      </div>
      <div>
        <Stars className="h-3.5 w-3.5" />
        <p className="mt-0.5 text-[13.5px] text-grey">
          <strong className="text-ink">40+</strong> Trusted by clients Australia wide
        </p>
      </div>
    </div>
  );
}

function CheckItem({ label }: { label: string }) {
  return (
    <li className="flex items-center gap-2 text-[14px] font-medium text-ink">
      <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#e9f5f0]">
        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="var(--green-deep)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 13l4 4L19 7" />
        </svg>
      </span>
      {label}
    </li>
  );
}

export function ServiceHero({ hero }: { hero: HeroData }) {
  if (hero.variant === "showcase") {
    return (
      <section className="mx-2 rounded-3xl bg-paper text-ink">
        <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-10 sm:py-24 lg:py-20">
          {/* Stretch, not centre: at 4/5 the image was 785px tall, taller than
              the copy beside it, so it drove the section to 1009px — past the
              viewport — and centring pushed it down from the top. It now
              matches the height of the copy column. */}
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <Reveal className="mb-6">
                {/* Accreditation sits with the other credibility signals rather
                    than off on its own — same row as the client count. */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                  <TrustRow />
                  {hero.partnerLogo && (
                    <>
                      <span className="hidden h-9 w-px bg-line sm:block" />
                      <Image
                        src={asset(hero.partnerLogo.src)}
                        alt={hero.partnerLogo.alt}
                        width={1031}
                        height={550}
                        className="h-9 w-auto object-contain"
                      />
                    </>
                  )}
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="text-[clamp(34px,4vw,52px)] font-medium leading-[1.02] tracking-[-0.04em]">
                  {hero.heading}
                </h1>
              </Reveal>
              {hero.subheading && (
                <Reveal delay={0.1}>
                  <p className="mt-3 text-[17px] font-medium text-grey">{hero.subheading}</p>
                </Reveal>
              )}
              <Reveal delay={0.15}>
                <p className="mt-5 max-w-[480px] text-[15.5px] text-grey">{hero.intro}</p>
              </Reveal>
              {hero.badges && (
                <Reveal delay={0.2}>
                  <ul className="mt-6 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                    {hero.badges.map((b) => (
                      <CheckItem key={b} label={b} />
                    ))}
                  </ul>
                </Reveal>
              )}
              <Reveal delay={0.25} className="mt-8 flex flex-wrap gap-3.5">
                <Button href={hero.ctaPrimary.href} className="bg-[var(--green-deep)]">
                  {hero.ctaPrimary.label}
                </Button>
                <Button href={hero.ctaSecondary.href} variant="light" className="border border-line">
                  {hero.ctaSecondary.label}
                </Button>
              </Reveal>
              {hero.asSeenOn && (
                <Reveal delay={0.3} className="mt-10">
                  <p className="mb-3 text-[13px] text-grey">As Seen on:</p>
                  <div className="flex flex-wrap items-center gap-x-8 gap-y-3 opacity-70 grayscale">
                    {hero.asSeenOn.map((l) => (
                      <Image key={l.src} src={asset(l.src)} alt={l.alt} width={110} height={40} className="h-6 w-auto object-contain" />
                    ))}
                  </div>
                </Reveal>
              )}
            </div>
            <div>
              {hero.heroScreenshotWall ? (
                <div className="h-[420px] sm:h-[520px] lg:h-[min(66vh,660px)]">
                  <ScreenshotWall />
                </div>
              ) : hero.heroImages ? (
                <Reveal scale className="grid grid-cols-2 gap-3">
                  {hero.heroImages.map((img) => (
                    <div key={img} className="aspect-square overflow-hidden rounded-2xl bg-[#e9e9e9]">
                      <Image src={asset(img)} alt="" width={400} height={400} className="h-full w-full object-cover" />
                    </div>
                  ))}
                </Reveal>
              ) : hero.heroImage ? (
                <Reveal scale className="aspect-[4/5] overflow-hidden rounded-3xl bg-[#e9e9e9] lg:aspect-auto lg:h-[min(66vh,660px)]">
                  <Image src={asset(hero.heroImage)} alt="" width={800} height={1000} className="h-full w-full object-cover" />
                </Reveal>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-2 rounded-3xl bg-paper text-ink">
      <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-10 sm:py-16 lg:py-24">
        <Reveal>
          <h1 className="text-[clamp(32px,3.4vw,52px)] font-medium leading-[1.02] tracking-[-0.04em]">
            {hero.heading}
          </h1>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(180px,1fr)_2.2fr_minmax(160px,220px)] lg:gap-16">
          {hero.kicker ? (
            <Reveal delay={0.05}>
              <span className="inline-flex items-center gap-2 text-[15px] font-medium">
                <PlusIcon dark className="h-[18px] w-[18px]" />
                {hero.kicker}
              </span>
            </Reveal>
          ) : (
            <span />
          )}
          <div>
            <Reveal delay={0.1}>
              <p className="max-w-[560px] text-[clamp(19px,1.6vw,26px)] font-medium leading-snug tracking-[-0.01em] text-grey">
                <span className="text-ink">{hero.intro.split(".")[0]}.</span>{" "}
                {hero.intro.split(".").slice(1).join(".").trim()}
              </p>
            </Reveal>
            <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-3.5">
              <Button href={hero.ctaPrimary.href}>{hero.ctaPrimary.label}</Button>
              <Button href={hero.ctaSecondary.href}>{hero.ctaSecondary.label}</Button>
            </Reveal>
            <Reveal delay={0.25} className="mt-8">
              <TrustRow />
            </Reveal>
          </div>
          {hero.note && (
            <Reveal delay={0.15}>
              <p className="text-[13px] text-grey">{hero.note}</p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
