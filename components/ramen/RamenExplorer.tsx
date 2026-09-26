"use client";

import { useState } from "react";
import MapListExplorer from "../map/MapListExplorer";
import RamenCard from "./RamenCard";
import type { RamenShop } from "@/lib/types";

export default function RamenExplorer({ shops }: { shops: RamenShop[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <MapListExplorer
      items={shops}
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
        </>
      }
      renderCard={(shop, { active, select }) => (
        <RamenCard shop={shop} rank={shops.indexOf(shop) + 1} active={active} onSelect={select} />
      )}
    />
  );
}
