import type { Metadata } from "next";
import RamenExplorer from "@/components/ramen/RamenExplorer";
import { ramenShops } from "@/lib/data";

export const metadata: Metadata = {
  title: "Ramen Rankings",
  description: "Every ramen shop I've visited in Japan, ranked out of 10 and mapped.",
};

export default function RamenPage() {
  return <RamenExplorer shops={ramenShops} />;
}
