"use client";

import { useEffect, useRef } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { pixelTrack } from "@/lib/pixel";

/** The 15-minute discovery call. */
export const CAL_LINK = "rankify/15min";

type BookingBits = {
  uid?: string;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
};

/**
 * Digs the booking out of Cal's event payload.
 *
 * Deliberately defensive: the embed's payload shape has moved between their
 * versions, and the attendee can sit under a couple of different keys. Nothing
 * here is required — a missing field just means Meta matches on less.
 */
function readBooking(e: unknown): BookingBits {
  const detail = (e as { detail?: { data?: Record<string, unknown> } })?.detail?.data ?? {};
  const booking = (detail.booking ?? detail) as Record<string, unknown>;
  const attendee =
    (Array.isArray(booking.attendees) ? booking.attendees[0] : undefined) ??
    (booking.attendee as Record<string, unknown>) ??
    {};
  const a = attendee as Record<string, unknown>;

  const name = String(a.name ?? booking.name ?? "").trim();
  const [firstName, ...rest] = name.split(/\s+/);

  const responses = (booking.responses ?? {}) as Record<string, unknown>;
  const phone = a.phone ?? responses.phone ?? responses.attendeePhoneNumber;

  return {
    uid: (booking.uid ?? detail.uid) as string | undefined,
    email: (a.email ?? booking.email ?? responses.email) as string | undefined,
    phone: phone ? String(phone) : undefined,
    firstName: firstName || undefined,
    lastName: rest.length ? rest.join(" ") : undefined,
  };
}

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
       * the same visit, and a second Schedule for the same person is noise.
       */
      cal("on", {
        action: "bookingSuccessful",
        callback: (e: unknown) => {
          if (bookedRef.current) return;
          bookedRef.current = true;

          const booking = readBooking(e);
          const details = {
            content_name: "Strategy call",
            content_category: "Booking",
            currency: "AUD",
          };

          /**
           * The booking's own uid is the event id when Cal gives us one.
           *
           * That matters because the same booking is also sent server-side by
           * Cal's webhook, which has no idea what id this browser picked. Both
           * sides deriving it from the booking is the only way the two copies
           * deduplicate instead of counting twice.
           */
          const eventId = booking.uid ? `cal-${booking.uid}` : undefined;
          const person = {
            email: booking.email,
            phone: booking.phone,
            first_name: booking.firstName,
            last_name: booking.lastName,
          };

          /**
           * Two events for one booking, deliberately.
           *
           * `Schedule` is the conversion the campaigns optimise for — it says
           * what actually happened. `Lead` stays because the audiences already
           * built on it would go empty the day it stopped firing. Optimise for
           * one of them, not both.
           */
          pixelTrack("Lead", details, person, eventId ? `${eventId}-lead` : undefined);
          pixelTrack("Schedule", details, person, eventId);
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
