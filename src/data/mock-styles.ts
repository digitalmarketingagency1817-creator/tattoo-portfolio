import type { TattooStyle } from "@/types/tattoo";

export const mockStyles: TattooStyle[] = [
  {
    id: "style-1",
    slug: "blackwork",
    nameEn: "Blackwork",
    nameSr: "Blackwork",
    color: "#6b7280", // Cool grey — solid, precise
    order: 1,
  },
  {
    id: "style-2",
    slug: "fineline",
    nameEn: "Fine Line",
    nameSr: "Fina Linija",
    color: "#a08060", // Warm tan — delicate, artistic
    order: 2,
  },
  {
    id: "style-3",
    slug: "traditional",
    nameEn: "Traditional",
    nameSr: "Tradicionalno",
    color: "#b45252", // Muted red — bold, classic
    order: 3,
  },
  {
    id: "style-4",
    slug: "realism",
    nameEn: "Realism",
    nameSr: "Realizam",
    color: "#3d7a7a", // Teal — depth, photographic
    order: 4,
  },
  {
    id: "style-5",
    slug: "watercolor",
    nameEn: "Watercolor",
    nameSr: "Akvarel",
    color: "#7c5a9e", // Purple — fluid, painterly
    order: 5,
  },
];
