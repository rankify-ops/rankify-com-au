"use client";

import type { ReactNode } from "react";
import { useInViewOnce } from "@/lib/useInViewOnce";

export function IconPop({ children, className = "" }: { children: ReactNode; className?: string }) {
  const [ref, inView] = useInViewOnce<HTMLSpanElement>();

  return (
    <span ref={ref} data-inview={inView} className="inline-flex">
      <span className={`icon-pop inline-flex ${className}`}>{children}</span>
    </span>
  );
}
