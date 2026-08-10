import Link from "next/link";
import type { ReactNode } from "react";

export function Button({
  href,
  children,
  variant = "dark",
  external,
  className = "",
  type,
}: {
  href?: string;
  children: ReactNode;
  variant?: "dark" | "light";
  external?: boolean;
  className?: string;
  type?: "submit" | "button";
}) {
  // .neu-btn owns the transition so the shadow animates alongside the scale
  const cls = `group neu-btn relative inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-[15px] font-medium ease-out hover:scale-[1.04] ${
    variant === "dark" ? "neu-btn-dark bg-ink text-white" : "neu-btn-light bg-white text-ink"
  } ${className}`;

  const inner = (
    <>
      {children}
      <span className="h-2 w-2 flex-none rounded-full bg-current transition-transform duration-300 group-hover:scale-150" />
    </>
  );

  if (type) {
    return (
      <button type={type} className={cls}>
        {inner}
      </button>
    );
  }

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href ?? "#"} className={cls}>
      {inner}
    </Link>
  );
}
