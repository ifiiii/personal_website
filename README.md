# iFi's Journal

Personal site and blog for ramen rankings and Japan travel. Built with Next.js (App Router), Tailwind CSS v4, and Leaflet via react-leaflet.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Pages

| Route    | What it is                                                                    |
| -------- | ----------------------------------------------------------------------------- |
| `/`      | Hero, Top 3 ramen bowls, links to the other pages                             |
| `/ramen` | Ramen Rankings: split-screen map + ranked card list, sort + city filter       |
| `/japan` | Japan Guide: rated map + list filtered by Nightlife / Sights / Cafes          |
| `/about` | About iFi: bio, stats, and Instagram / YouTube buttons                        |

## Editing content

All content lives in `data/` — edit the JSON and the site updates.

- `data/ramenData.json`: `id`, `shopName`, `locationName`, `coordinates` (`[lat, lng]`), `rating` (out of 10), `brothType`, `reviewText`, `imagePlaceholderUrl`. The top 3 by rating appear on the homepage. The city filter on `/ramen` uses the part of `locationName` after the last comma (`"Shinjuku, Tokyo"` → Tokyo), so keep that format.
- `data/recommendationsData.json`: `id`, `name`, `locationName`, `coordinates`, `category` (`"Nightlife"`, `"Sights"` or `"Cafes"`), `rating` (out of 10), `reviewText`, `imagePlaceholderUrl`.
- `data/site.json`: your name, tagline, bio paragraphs, stats, and social links. Set `social.instagram` / `social.youtube` to a URL to turn the "soon" placeholders into real buttons.

Types are in `lib/types.ts`. To add a new category, add it to `RECOMMENDATION_CATEGORIES` there and give it a color/icon in `components/recommendations/categories.ts`.

### Images

Photos live in `public/images/ramen/` and `public/images/guide/`. Every entry currently points at that folder's `placeholder.jpg`. Drop your photo in (e.g. `public/images/ramen/menya-kaze.jpg`) and set `imagePlaceholderUrl` to `/images/ramen/menya-kaze.jpg`.

The hero, About portrait and homepage tiles still use picsum.photos. To use a different remote host, add it to `images.remotePatterns` in `next.config.ts`.

## Map

Map tiles are from OpenStreetMap (free, attribution required, fine for a personal site). The map code is in `components/map/`:

- `LeafletMap.tsx`: the map, custom pins, fit-to-bounds, fly-to-selected
- `MapListExplorer.tsx`: the reusable split-screen layout that keeps the map and list selection in sync
