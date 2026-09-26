"use client";

import { useEffect, useMemo, useRef } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { LatLng } from "@/lib/types";

export interface MapPoint {
  id: string;
  coordinates: LatLng;
  title: string;
  subtitle?: string;
  /** Short text shown inside the pin, e.g. a rating. */
  badge?: string;
  /** Any CSS color for the pin. */
  color?: string;
}

interface LeafletMapProps {
  points: MapPoint[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

// Roughly the whole of Japan, used before any points are known.
const JAPAN_CENTER: LatLng = [36.5, 137.5];

function makeIcon(point: MapPoint, active: boolean) {
  // Teardrop pin: a rotated square whose tip sits ~0.71 * size below its centre.
  const size = active ? 44 : 34;
  const tip = size / 2 + (size / 2) * Math.SQRT2;
  const style = point.color ? ` style="--pin-color:${point.color}"` : "";
  return L.divIcon({
    className: "pin-wrap",
    html: `<div class="pin${active ? " is-active" : ""}"${style}><span>${point.badge ?? ""}</span></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, tip],
    popupAnchor: [0, -tip + 4],
  });
}

/** Fits the map to all points whenever the visible set changes (re-ordering alone doesn't refit). */
function FitToPoints({ points }: { points: MapPoint[] }) {
  const map = useMap();
  const key = points
    .map((p) => p.id)
    .sort()
    .join(",");

  useEffect(() => {
    if (points.length === 0) return;
    const bounds = L.latLngBounds(points.map((p) => p.coordinates));
    map.fitBounds(bounds, { padding: [48, 48], maxZoom: 12 });
  }, [map, key]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}

/** Flies to the selected point and opens its popup. */
function FlyToSelected({
  points,
  selectedId,
  markers,
}: {
  points: MapPoint[];
  selectedId: string | null;
  markers: React.RefObject<Map<string, L.Marker>>;
}) {
  const map = useMap();

  useEffect(() => {
    if (!selectedId) return;
    const point = points.find((p) => p.id === selectedId);
    if (!point) return;
    map.flyTo(point.coordinates, Math.max(map.getZoom(), 11), { duration: 0.8 });
    markers.current.get(selectedId)?.openPopup();
  }, [map, points, selectedId, markers]);

  return null;
}

/**
 * Points with identical coordinates would stack exactly on top of each other, leaving only one clickable.
 * Fan them out in a small circle (~80 m) so each pin can be reached once you zoom in. Display-only.
 */
function spreadDuplicates(points: MapPoint[]): MapPoint[] {
  const groups = new Map<string, MapPoint[]>();
  for (const p of points) {
    const key = p.coordinates.join(",");
    groups.set(key, [...(groups.get(key) ?? []), p]);
  }
  const RADIUS = 0.0008;
  return points.map((p) => {
    const group = groups.get(p.coordinates.join(","))!;
    if (group.length === 1) return p;
    const angle = (2 * Math.PI * group.indexOf(p)) / group.length;
    const [lat, lng] = p.coordinates;
    const lngScale = Math.cos((lat * Math.PI) / 180);
    return {
      ...p,
      coordinates: [lat + RADIUS * Math.cos(angle), lng + (RADIUS * Math.sin(angle)) / lngScale],
    };
  });
}

export default function LeafletMap({ points: rawPoints, selectedId, onSelect }: LeafletMapProps) {
  const markers = useRef(new Map<string, L.Marker>());
  const points = useMemo(() => spreadDuplicates(rawPoints), [rawPoints]);

  const icons = useMemo(
    () => new Map(points.map((p) => [p.id, makeIcon(p, p.id === selectedId)])),
    [points, selectedId],
  );

  return (
    <MapContainer
      center={JAPAN_CENTER}
      zoom={5}
      scrollWheelZoom
      className="h-full w-full"
      aria-label="Map of Japan"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitToPoints points={points} />
      <FlyToSelected points={points} selectedId={selectedId} markers={markers} />

      {points.map((point) => (
        <Marker
          key={point.id}
          position={point.coordinates}
          icon={icons.get(point.id)}
          zIndexOffset={point.id === selectedId ? 1000 : 0}
          title={point.title}
          ref={(marker) => {
            if (marker) markers.current.set(point.id, marker);
            else markers.current.delete(point.id);
          }}
          eventHandlers={{ click: () => onSelect(point.id) }}
        >
          <Popup autoPan={false}>
            <p className="m-0! font-semibold text-ink">{point.title}</p>
            {point.subtitle && <p className="m-0! text-xs text-ink-soft">{point.subtitle}</p>}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
