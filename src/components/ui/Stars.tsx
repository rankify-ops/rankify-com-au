export function Stars({
  count = 5,
  className = "h-4 w-4",
  wrapperClassName = "",
}: {
  count?: number;
  /** Sizes each star — this lands on the svg, not the row. */
  className?: string;
  /**
   * Classes for the row itself. Needed because the row is a full-width flex
   * container: passing `mx-auto` via `className` puts it on every star and
   * leaves the row left-aligned inside a centred block.
   */
  wrapperClassName?: string;
}) {
  return (
    <div className={`flex items-center gap-0.5 ${wrapperClassName}`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className={className} fill="rgb(251,152,38)">
          <path d="M12 2.5l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17.6l-6.1 3.4 1.5-6.8L2.2 9.5l6.9-.7Z" />
        </svg>
      ))}
    </div>
  );
}
