import Image from "next/image";
import type { RamenShop } from "@/lib/types";
import RatingBadge from "../RatingBadge";

interface RamenCardProps {
  shop: RamenShop;
  rank: number;
  active: boolean;
  onSelect: () => void;
}

export default function RamenCard({ shop, rank, active, onSelect }: RamenCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={`group flex w-full gap-4 rounded-2xl border p-3 text-left transition-all ${
        active
          ? "border-beni bg-white shadow-lg ring-2 ring-beni/30"
          : "border-line bg-white/60 hover:border-ink-soft/40 hover:bg-white"
      }`}
    >
      <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-xl sm:w-28">
        <Image
          src={shop.imagePlaceholderUrl}
          alt={`Bowl at ${shop.shopName}`}
          fill
          sizes="112px"
          className="object-cover transition-transform group-hover:scale-105"
        />
        <span className="absolute top-1.5 left-1.5 rounded-full bg-paper/95 px-2 py-0.5 text-xs font-bold">
          #{rank}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate font-display text-lg font-semibold">{shop.shopName}</h3>
            <p className="text-sm text-ink-soft">{shop.locationName}</p>
          </div>
          <RatingBadge rating={shop.rating} />
        </div>
        <span className="mt-2 inline-block rounded-full bg-broth/20 px-2.5 py-0.5 text-xs font-medium text-ink">
          {shop.brothType}
        </span>
        <p className={`mt-2 text-sm text-ink-soft ${active ? "" : "line-clamp-2"}`}>{shop.reviewText}</p>
      </div>
    </button>
  );
}
