export type LatLng = [lat: number, lng: number];

export interface RamenShop {
  id: string;
  shopName: string;
  locationName: string;
  coordinates: LatLng;
  /** Score out of 10 */
  rating: number;
  brothType: string;
  reviewText: string;
  imagePlaceholderUrl: string;
}

export const RECOMMENDATION_CATEGORIES = ["Food", "Experiences", "Sights & Views", "Day Trips"] as const;
export type RecommendationCategory = (typeof RECOMMENDATION_CATEGORIES)[number];

/** Attribution for a photo that isn't iFi's own (e.g. from Wikimedia Commons). */
export interface ImageCredit {
  author: string;
  license: string;
  sourceUrl: string;
}

export interface Recommendation {
  id: string;
  name: string;
  locationName: string;
  /** `null` for chains / places with no single location: listed, but no map pin. */
  coordinates: LatLng | null;
  category: RecommendationCategory;
  /** Score out of 10 */
  rating: number;
  /** May be empty until a review is written. */
  reviewText: string;
  imagePlaceholderUrl: string;
  imageCredit?: ImageCredit;
}
