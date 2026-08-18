"use client";

import { useEffect, useRef } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { pixelTrack } from "@/lib/pixel";

/** The 15-minute discovery call. */
export const CAL_LINK = "rankify/15min";

/**
 * Cal.com's inline booking calendar.
 *
 * Client-only and code-split to this page — Cal's embed is third-party
 * JavaScript and has no business loading on the other twenty pages.
 */
export function BookingCalendar() {
  const bookedRef = useRef(false);

  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "15min" });
      cal("ui", {
        // Cal only takes brand as a hex; these are --green-deep and the teal
        // accent from globals.css.
        cssVarsPerTheme: {
          light: { "cal-brand": "#002117" },
          dark: { "cal-brand": "#07a889" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });

      /**
       * Cal fires this from inside the embed when a booking completes, so the
       * conversion is trackable without their paid redirect-after-booking —
       * there's no thank-you URL of ours to land on.
       *
       * Guarded: the embed can emit more than once if someone books again in
       * the same visit, and a second Lead for the same person is noise.
       */
      cal("on", {
        action: "bookingSuccessful",
        callback: () => {
          if (bookedRef.current) return;
          bookedRef.current = true;
          const booking = {
            content_name: "Strategy call",
            content_category: "Booking",
            currency: "AUD",
          };
          /**
           * Two events for one booking, deliberately.
           *
           * `Schedule` is the conversion the free-homepage campaign optimises
           * for — it says what actually happened. `Lead` stays because the
           * audiences already built on it would go empty the day it stopped
           * firing. Optimise for one of them, not both.
           */
          pixelTrack("Lead", booking);
          pixelTrack("Schedule", booking);
        },
      });
    })();
  }, []);

  return (
    // Capped and scrolled on a phone: Cal stacks the month grid above the full
    // slot list there and reports ~3,400px, which buries the rest of the page.
    // From lg the month view fits in ~570px and the cap is lifted.
    <div className="max-h-[78vh] w-full overflow-y-auto overscroll-contain rounded-2xl border border-line bg-white lg:max-h-none lg:overflow-visible">
      <Cal
        namespace="15min"
        calLink={CAL_LINK}
        className="min-h-[560px] w-full"
        config={{ layout: "month_view" }}
      />
    </div>
  );
}
