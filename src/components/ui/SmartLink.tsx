"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * A link to `/some-page#some-section` that behaves when you're already on
 * `/some-page`.
 *
 * next/link treats that as a route navigation. Same route, so the App Router
 * updates the hash and stops — no scroll. Measured: clicking the floating
 * bar's Get Started from the top of the web dev page set the hash and left
 * the page exactly where it was, 3532px above the configurator.
 *
 * When the href points at the page we're already on, hand the hash to a plain
 * anchor and let the browser do what browsers do — which also picks up
 * `scroll-behavior: smooth` and each section's `scroll-margin-top`.
 */
export function SmartLink({
  href,
  className,
  children,
  onClick,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const [path, hash] = href.split("#");

  if (hash && (path === pathname || path === "")) {
    /**
     * Scroll it ourselves rather than leaving it to the browser.
     *
     * A plain anchor only scrolls when the hash *changes*. Click Get Started,
     * scroll back to the top, click it again — the hash is still
     * `#website-configurator`, so the browser decides there's nothing to do
     * and the button appears dead. Doing the scroll explicitly makes every
     * click behave like the first one.
     *
     * `scrollIntoView` honours the section's `scroll-margin-top`, so this
     * still clears the fixed header, and `replaceState` keeps the hash in the
     * URL without adding a history entry per click.
     */
    const jump = (e: React.MouseEvent<HTMLAnchorElement>) => {
      const el = document.getElementById(hash);
      if (!el) return; // let the browser try; the section may not be on this page
      e.preventDefault();
      onClick?.();
      el.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
      history.replaceState(null, "", `#${hash}`);
    };

    return (
      <a href={`#${hash}`} className={className} onClick={jump}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
