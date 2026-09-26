import Image from "next/image";
import type { Recommendation } from "@/lib/types";
import { categoryStyles } from "./categories";

interface RecommendationCardProps {
  place: Recommendation;
  active: boolean;
  onSelect: () => void;
}

export default function RecommendationCard({ place, active, onSelect }: RecommendationCardProps) {
  const style = categoryStyles[place.category];

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={`group flex w-full gap-4 rounded-2xl border p-3 text-left transition-all ${
        active
          ? "bg-white shadow-lg ring-2"
          : "border-line bg-white/60 hover:border-ink-soft/40 hover:bg-white"
      }`}
      style={active ? { borderColor: style.color, ["--tw-ring-color" as string]: `${style.color}4d` } : undefined}
    >
      <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-xl sm:w-28">
        <Image
          src={place.imagePlaceholderUrl}
          alt={place.name}
          fill
          sizes="112px"
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>

      <div className="min-w-0 flex-1">
        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${style.chip}`}>
          <span aria-hidden>{style.icon}</span>
          {place.category}
        </span>
        <h3 className="mt-1.5 truncate font-display text-lg font-semibold">{place.name}</h3>
        <p className="text-sm text-ink-soft">{place.locationName}</p>
        <p className={`mt-2 text-sm text-ink-soft ${active ? "" : "line-clamp-2"}`}>{place.reviewText}</p>
      </div>
    </button>
  );
}
