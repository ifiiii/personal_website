export default function RatingBadge({ rating, size = "md" }: { rating: number; size?: "md" | "lg" }) {
  const big = size === "lg";
  return (
    <div
      className={`flex shrink-0 flex-col items-center justify-center rounded-xl bg-ink text-paper ${
        big ? "size-16" : "size-12"
      }`}
      aria-label={`Rated ${rating} out of 10`}
    >
      <span className={`font-display font-semibold leading-none ${big ? "text-2xl" : "text-lg"}`}>
        {rating.toFixed(1)}
      </span>
      <span className="text-[10px] uppercase tracking-wider opacity-70">/ 10</span>
    </div>
  );
}
