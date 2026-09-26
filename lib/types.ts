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

export const RECOMMENDATION_CATEGORIES = ["Nightlife", "Sights", "Cafes"] as const;
export type RecommendationCategory = (typeof RECOMMENDATION_CATEGORIES)[number];

export interface Recommendation {
  id: string;
  name: string;
  locationName: string;
  coordinates: LatLng;
  category: RecommendationCategory;
  reviewText: string;
  imagePlaceholderUrl: string;
}
