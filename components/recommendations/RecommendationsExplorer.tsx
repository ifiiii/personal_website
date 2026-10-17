"use client";

import { useMemo, useState } from "react";
import MapListExplorer from "../map/MapListExplorer";
import RecommendationCard from "./RecommendationCard";
import { categoryStyles } from "./categories";
import { RECOMMENDATION_CATEGORIES, type Recommendation, type RecommendationCategory } from "@/lib/types";

type Filter = "All" | RecommendationCategory;

/** Attribution for borrowed photos (required by their CC licenses). */
function PhotoCredits({ places }: { places: Recommendation[] }) {
  return (
    <details className="rounded-xl border border-line bg-white/50 px-4 py-3 text-xs text-ink-soft">
      <summary className="cursor-pointer font-medium">Photo credits (borrowed from Wikimedia Commons until I upload my own)</summary>
      <ul className="mt-2 space-y-1">
        {places.map((p) => (
          <li key={p.id}>
            {p.name}:{" "}
            <a href={p.imageCredit!.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-ink">
              {p.imageCredit!.author}
            </a>{" "}
            · {p.imageCredit!.license}
          </li>
        ))}
      </ul>
    </details>
  );
}

export default function RecommendationsExplorer({ places }: { places: Recommendation[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const visible = useMemo(
    () => (filter === "All" ? places : places.filter((p) => p.category === filter)),
    [places, filter],
  );

  const credited = visible.filter((p) => p.imageCredit);

  const changeFilter = (next: Filter) => {
    setFilter(next);
    setSelectedId(null);
  };

  return (
    <MapListExplorer
      items={visible}
      selectedId={selectedId}
      onSelect={setSelectedId}
      toPoint={(place) =>
        place.coordinates && {
          id: place.id,
          coordinates: place.coordinates,
          title: place.name,
          subtitle: `${place.rating.toFixed(1)}/10 · ${place.category} · ${place.locationName}`,
          badge: place.rating === 10 ? "10" : place.rating.toFixed(1),
          color: categoryStyles[place.category].color,
        }
      }
      header={
        <>
          <p className="text-sm font-semibold uppercase tracking-widest text-beni">Japan Guide</p>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Where to go between bowls.
          </h1>
          <p className="mt-2 text-sm text-ink-soft">
            Everything I did in Japan that wasn&apos;t ramen, scored out of 10. Reviews coming soon, probably.
          </p>

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
      footer={credited.length > 0 && <PhotoCredits places={credited} />}
    />
  );
}
