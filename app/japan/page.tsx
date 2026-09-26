import type { Metadata } from "next";
import RecommendationsExplorer from "@/components/recommendations/RecommendationsExplorer";
import { recommendations } from "@/lib/data";

export const metadata: Metadata = {
  title: "Japan Guide",
  description: "My favourite nightlife, sights and cafes across Japan.",
};

export default function JapanPage() {
  return <RecommendationsExplorer places={recommendations} />;
}
