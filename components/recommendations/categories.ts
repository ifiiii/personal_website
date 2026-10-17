import type { RecommendationCategory } from "@/lib/types";

export const categoryStyles: Record<RecommendationCategory, { color: string; icon: string; chip: string }> = {
  Food: { color: "#c8341f", icon: "🍣", chip: "bg-beni/15 text-beni-dark" },
  Experiences: { color: "#3b3f8f", icon: "🎟️", chip: "bg-night/15 text-night" },
  "Sights & Views": { color: "#5f7f3f", icon: "⛩️", chip: "bg-matcha/15 text-matcha" },
  "Day Trips": { color: "#b7791f", icon: "🚃", chip: "bg-broth/25 text-[#8a5a12]" },
};
