import Image from "next/image";
import type { Recommendation } from "@/lib/types";
import RatingBadge from "../RatingBadge";
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
      <div className="relative aspect-square w-24 shrink-0 self-start overflow-hidden rounded-xl sm:w-28">
        <Image
          src={place.imagePlaceholderUrl}
          alt={place.name}
          fill
          sizes="112px"
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="line-clamp-2 font-display text-lg leading-snug font-semibold">{place.name}</h3>
            <p className="text-sm text-ink-soft">{place.locationName}</p>
          </div>
          <RatingBadge rating={place.rating} />
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${style.chip}`}>
            <span aria-hidden>{style.icon}</span>
            {place.category}
          </span>
          {!place.coordinates && <span className="text-xs text-ink-soft">No pin · too many locations</span>}
        </div>
        {place.reviewText && (
          <p className={`mt-2 text-sm text-ink-soft ${active ? "" : "line-clamp-2"}`}>{place.reviewText}</p>
        )}
        {place.imageCredit && (
          <p className="mt-2 truncate text-[11px] text-ink-soft/70">
            Photo: {place.imageCredit.author} · {place.imageCredit.license}
          </p>
        )}
      </div>
    </button>
  );
}
