import fs from "node:fs";
import path from "node:path";
import ramenJson from "@/data/ramenData.json";
import recommendationsJson from "@/data/recommendationsData.json";
import siteJson from "@/data/site.json";
import type { RamenShop, Recommendation } from "./types";

// All site content lives in /data. Edit the JSON files to swap placeholders for real entries.
// This module reads the filesystem, so only import it from server components.

export const site = siteJson;

/**
 * Local images (e.g. "/images/ramen/iruca-tokyo.jpg") that haven't been added to /public yet
 * fall back to the folder's placeholder, so entries can reference photos before they exist.
 */
function withImageFallback<T extends { imagePlaceholderUrl: string }>(item: T, fallback: string): T {
  const url = item.imagePlaceholderUrl;
  if (/^https?:\/\//.test(url)) return item;
  const exists = url && fs.existsSync(path.join(process.cwd(), "public", url));
  return exists ? item : { ...item, imagePlaceholderUrl: fallback };
}

/** Ramen shops, highest rated first. */
export const ramenShops: RamenShop[] = (ramenJson as RamenShop[])
  .map((shop) => withImageFallback(shop, "/images/ramen/placeholder.jpg"))
  .sort((a, b) => b.rating - a.rating);

export const topRamen = ramenShops.slice(0, 3);

/** Recommendations, highest rated first. */
export const recommendations: Recommendation[] = (recommendationsJson as Recommendation[])
  .map((place) => withImageFallback(place, "/images/guide/placeholder.jpg"))
  .sort((a, b) => b.rating - a.rating);
