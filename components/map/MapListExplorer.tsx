"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, type ReactNode } from "react";
import type { MapPoint } from "./LeafletMap";

// Leaflet touches `window`, so the map only renders in the browser.
const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center bg-paper-deep text-sm text-ink-soft">
      Loading map…
    </div>
  ),
});

interface MapListExplorerProps<T extends { id: string }> {
  items: T[];
  /** Return `null` for items that should be listed but have no map pin. */
  toPoint: (item: T) => MapPoint | null;
  renderCard: (item: T, state: { active: boolean; select: () => void }) => ReactNode;
  selectedId: string | null;
  onSelect: (id: string) => void;
  /** Rendered above the list (title, filters, etc). */
  header?: ReactNode;
  /** Rendered below the list (credits, notes). */
  footer?: ReactNode;
}

/**
 * Split-screen layout: scrollable card list on one side, map on the other.
 * Selecting a pin highlights and scrolls to its card; selecting a card flies the map to its pin.
 * On small screens the map sits above the list and stays pinned while the list scrolls.
 */
export default function MapListExplorer<T extends { id: string }>({
  items,
  toPoint,
  renderCard,
  selectedId,
  onSelect,
  header,
  footer,
}: MapListExplorerProps<T>) {
  const cardRefs = useRef(new Map<string, HTMLLIElement>());

  // Recompute only when the items change; `toPoint` is usually an inline function.
  const toPointRef = useRef(toPoint);
  toPointRef.current = toPoint;
  const points = useMemo(
    () => items.map((item) => toPointRef.current(item)).filter((p): p is MapPoint => p !== null),
    [items],
  );

  useEffect(() => {
    if (!selectedId) return;
    cardRefs.current.get(selectedId)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [selectedId]);

  return (
    <div className="flex flex-col lg:grid lg:h-[calc(100dvh-4rem)] lg:grid-cols-[minmax(380px,480px)_1fr]">
      <section className="order-2 lg:order-1 lg:overflow-y-auto lg:border-r lg:border-line">
        {header && <div className="px-4 pt-6 pb-4 sm:px-6">{header}</div>}
        <ul className="space-y-3 px-4 pb-10 sm:px-6">
          {items.map((item) => (
            <li
              key={item.id}
              ref={(el) => {
                if (el) cardRefs.current.set(item.id, el);
                else cardRefs.current.delete(item.id);
              }}
              className="scroll-mt-[calc(45vh+5rem)] lg:scroll-mt-4"
            >
              {renderCard(item, {
                active: item.id === selectedId,
                select: () => onSelect(item.id),
              })}
            </li>
          ))}
          {items.length === 0 && (
            <li className="rounded-xl border border-dashed border-line p-6 text-center text-sm text-ink-soft">
              Nothing here yet.
            </li>
          )}
        </ul>
        {footer && <div className="px-4 pb-10 sm:px-6">{footer}</div>}
      </section>

      <div className="sticky top-16 z-10 isolate order-1 h-[45vh] border-b border-line lg:order-2 lg:h-full lg:border-b-0">
        <LeafletMap points={points} selectedId={selectedId} onSelect={onSelect} />
      </div>
    </div>
  );
}
