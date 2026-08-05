export function PlusIcon({ className = "h-[18px] w-[18px]", dark = false }: { className?: string; dark?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={`flex-none ${className}`} fill="none">
      <circle cx="12" cy="12" r="10" fill={dark ? "currentColor" : "white"} />
      <path
        d="M12 7v10M7 12h10"
        stroke={dark ? "white" : "var(--green-deep)"}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
