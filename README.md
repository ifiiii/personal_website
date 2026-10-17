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
- `data/recommendationsData.json`: `id`, `name`, `locationName`, `coordinates`, `category` (`"Food"`, `"Experiences"`, `"Sights & Views"` or `"Day Trips"`), `rating` (out of 10), `reviewText`, `imagePlaceholderUrl`, optional `imageCredit`.
  - Set `coordinates` to `null` for chains (e.g. Sushiro): they're listed but get no map pin.
  - `reviewText` can be `""`; the card just hides it.
  - Most entries currently borrow a Wikimedia Commons photo, credited via `imageCredit` (the license requires it). When you add your own photo, point `imagePlaceholderUrl` at `/images/guide/<id>.jpg` and delete `imageCredit`.
- `data/site.json`: your name, tagline, bio paragraphs, stats, and social links. Set `social.instagram` / `social.youtube` to a URL to turn the "soon" placeholders into real buttons.

Types are in `lib/types.ts`. To add a new category, add it to `RECOMMENDATION_CATEGORIES` there and give it a color/icon in `components/recommendations/categories.ts`.

### Images

Photos live in `public/images/ramen/` and `public/images/guide/`. Each entry's `imagePlaceholderUrl` names its photo (e.g. `/images/ramen/iruca-tokyo.jpg`). Until that file exists, the site shows the folder's `placeholder.jpg` instead, so just drop photos in with the matching filename. (Restart `npm run dev` after adding photos; the check runs when the data loads.)

To add photos straight from your phone export, name each file to match the JSON (any extension/case works) and run:

```bash
npm run import-photos -- "C:\path\to\photo\folder" ramen
```

Use `guide` instead of `ramen` for Japan Guide photos. The script converts to `.jpg`, resizes to max 1600px, fixes rotation, and strips metadata (including GPS location) before copying into `public/images/<folder>/`.

Shops that share the exact same coordinates are fanned out slightly on the map so each pin stays clickable.

Personal photos live in `public/images/about/`. In `data/site.json`, `portrait` sets the About page photo and homepage avatar, and `gallery` lists the captioned photos on the About page. The homepage hero automatically uses the photo of the #1 ranked bowl.

## Map

Map tiles are from OpenStreetMap (free, attribution required, fine for a personal site). The map code is in `components/map/`:

- `LeafletMap.tsx`: the map, custom pins, fit-to-bounds, fly-to-selected
- `MapListExplorer.tsx`: the reusable split-screen layout that keeps the map and list selection in sync
