"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

/** The 15-minute discovery call. */
export const CAL_LINK = "rankify/15min";

/**
 * Cal.com's inline booking calendar.
 *
 * Client-only and code-split to this page — Cal's embed is third-party
 * JavaScript and has no business loading on the other twenty pages.
 */
export function BookingCalendar() {
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
