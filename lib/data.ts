import ramenJson from "@/data/ramenData.json";
import recommendationsJson from "@/data/recommendationsData.json";
import siteJson from "@/data/site.json";
import type { RamenShop, Recommendation } from "./types";

// All site content lives in /data. Edit the JSON files to swap placeholders for real entries.

export const site = siteJson;

/** Ramen shops, highest rated first. */
export const ramenShops: RamenShop[] = (ramenJson as RamenShop[])
  .slice()
  .sort((a, b) => b.rating - a.rating);

export const topRamen = ramenShops.slice(0, 3);

export const recommendations = recommendationsJson as Recommendation[];
