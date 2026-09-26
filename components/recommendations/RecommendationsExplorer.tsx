"use client";

import { useMemo, useState } from "react";
import MapListExplorer from "../map/MapListExplorer";
import RecommendationCard from "./RecommendationCard";
import { categoryStyles } from "./categories";
import { RECOMMENDATION_CATEGORIES, type Recommendation, type RecommendationCategory } from "@/lib/types";

type Filter = "All" | RecommendationCategory;

export default function RecommendationsExplorer({ places }: { places: Recommendation[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const visible = useMemo(
    () => (filter === "All" ? places : places.filter((p) => p.category === filter)),
    [places, filter],
  );

  const changeFilter = (next: Filter) => {
    setFilter(next);
    setSelectedId(null);
  };

  return (
    <MapListExplorer
      items={visible}
      selectedId={selectedId}
      onSelect={setSelectedId}
      toPoint={(place) => ({
        id: place.id,
        coordinates: place.coordinates,
        title: place.name,
        subtitle: `${place.category} · ${place.locationName}`,
        badge: categoryStyles[place.category].icon,
        color: categoryStyles[place.category].color,
      })}
      header={
        <>
          <p className="text-sm font-semibold uppercase tracking-widest text-beni">Japan Guide</p>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Where to go between bowls.
          </h1>
          <p className="mt-2 text-sm text-ink-soft">Bars, sights and cafes I keep going back to.</p>

          <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
            {(["All", ...RECOMMENDATION_CATEGORIES] as Filter[]).map((cat) => {
              const selected = filter === cat;
              const count = cat === "All" ? places.length : places.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => changeFilter(cat)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    selected ? "bg-ink text-paper" : "bg-paper-deep text-ink-soft hover:text-ink"
                  }`}
                >
                  {cat !== "All" && <span aria-hidden>{categoryStyles[cat].icon} </span>}
                  {cat} <span className="opacity-60">{count}</span>
                </button>
              );
            })}
          </div>
        </>
      }
      renderCard={(place, { active, select }) => (
        <RecommendationCard place={place} active={active} onSelect={select} />
      )}
    />
  );
}
