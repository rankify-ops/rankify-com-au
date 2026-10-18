"use client";

import type { ReactNode } from "react";
import { openQualify } from "@/components/landing/Qualify";

/**
 * The funnel's CTA. A button rather than a link: every one of them opens the
 * qualifying form, and only the form decides who reaches the calendar.
 *
 * It exists as its own client component so the page shell can stay a server
 * component while still rendering the button in three different places.
 */
export function CtaButton({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <button type="button" onClick={openQualify} className={className}>
      {children}
    </button>
  );
}
