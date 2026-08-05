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
  const cls = `group relative inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-[15px] font-medium transition-transform duration-300 ease-out hover:scale-[1.04] ${
    variant === "dark" ? "bg-ink text-white" : "bg-white text-ink"
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
