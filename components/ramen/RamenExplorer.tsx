"use client";

import { useMemo, useState } from "react";
import MapListExplorer from "../map/MapListExplorer";
import RamenCard from "./RamenCard";
import type { RamenShop } from "@/lib/types";

type SortOrder = "desc" | "asc";

const ALL_CITIES = "all";

/** "Shinjuku, Tokyo" → "Tokyo". Falls back to the whole string if there's no comma. */
function cityOf(shop: RamenShop) {
  return shop.locationName.split(",").pop()!.trim();
}

function Select({ label, ...props }: { label: string } & React.ComponentProps<"select">) {
  return (
    <label className="block min-w-0">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-ink-soft">{label}</span>
      <span className="relative block">
        <select
          {...props}
          className="w-full cursor-pointer appearance-none truncate rounded-xl border border-line bg-white py-2 pr-9 pl-3 text-sm font-medium text-ink focus:border-beni focus:ring-2 focus:ring-beni/20 focus:outline-none"
        />
        <svg
          viewBox="0 0 24 24"
          className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-ink-soft"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </span>
    </label>
  );
}

export default function RamenExplorer({ shops }: { shops: RamenShop[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOrder>("desc");
  const [city, setCity] = useState<string>(ALL_CITIES);

  // Overall rank never changes with sorting/filtering, so #1 is always the best bowl.
  const rankById = useMemo(() => {
    const byRating = [...shops].sort((a, b) => b.rating - a.rating);
    return new Map(byRating.map((shop, i) => [shop.id, i + 1]));
  }, [shops]);

  const cities = useMemo(() => [...new Set(shops.map(cityOf))].sort(), [shops]);

  const visible = useMemo(() => {
    const filtered = city === ALL_CITIES ? shops : shops.filter((s) => cityOf(s) === city);
    return [...filtered].sort((a, b) => (sort === "desc" ? b.rating - a.rating : a.rating - b.rating));
  }, [shops, city, sort]);

  const changeCity = (next: string) => {
    setCity(next);
    const stillVisible = shops.some((s) => s.id === selectedId && (next === ALL_CITIES || cityOf(s) === next));
    if (!stillVisible) setSelectedId(null);
  };

  return (
    <MapListExplorer
      items={visible}
      selectedId={selectedId}
      onSelect={setSelectedId}
      toPoint={(shop) => ({
        id: shop.id,
        coordinates: shop.coordinates,
        title: shop.shopName,
        subtitle: `${shop.rating.toFixed(1)}/10 · ${shop.brothType}`,
        badge: shop.rating.toFixed(1),
      })}
      header={
        <>
          <p className="text-sm font-semibold uppercase tracking-widest text-beni">The Rankings</p>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Every bowl, scored.
          </h1>
          <p className="mt-2 text-sm text-ink-soft">
            {shops.length} shops ranked out of 10. Tap a card or a pin to explore.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-3 min-[420px]:grid-cols-[3fr_2fr]">
            <Select label="Sort" value={sort} onChange={(e) => setSort(e.target.value as SortOrder)}>
              <option value="desc">Highest to Lowest Rating</option>
              <option value="asc">Lowest to Highest Rating</option>
            </Select>
            <Select label="Filter by City" value={city} onChange={(e) => changeCity(e.target.value)}>
              <option value={ALL_CITIES}>All cities ({shops.length})</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c} ({shops.filter((s) => cityOf(s) === c).length})
                </option>
              ))}
            </Select>
          </div>
          {city !== ALL_CITIES && (
            <p className="mt-3 text-sm text-ink-soft">
              Showing {visible.length} of {shops.length} ·{" "}
              <button type="button" onClick={() => changeCity(ALL_CITIES)} className="font-medium text-beni hover:underline">
                Clear filter
              </button>
            </p>
          )}
        </>
      }
      renderCard={(shop, { active, select }) => (
        <RamenCard shop={shop} rank={rankById.get(shop.id)!} active={active} onSelect={select} />
      )}
    />
  );
}
