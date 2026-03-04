export type TattooStyleSlug =
  | "blackwork"
  | "fineline"
  | "traditional"
  | "realism"
  | "watercolor";

export interface TattooStyle {
  id: string;
  slug: TattooStyleSlug;
  nameEn: string;
  nameSr: string;
  color: string; // hex, used for StyleBadge
  order: number;
}

export interface TattooWork {
  id: string;
  slug: string;
  imageUrl: string; // placeholder image URL
  imageAlt: string; // accessibility
  titleEn: string;
  titleSr: string;
  descriptionEn: string;
  descriptionSr: string;
  style: TattooStyle;
  featured: boolean; // Show on home page preview
  order: number;
  published: boolean;
}

// Helper for locale-aware text
export function getLocalizedWork(work: TattooWork, locale: "en" | "sr") {
  return {
    ...work,
    title: locale === "sr" ? work.titleSr : work.titleEn,
    description: locale === "sr" ? work.descriptionSr : work.descriptionEn,
  };
}

export function getLocalizedStyle(style: TattooStyle, locale: "en" | "sr") {
  return {
    ...style,
    name: locale === "sr" ? style.nameSr : style.nameEn,
  };
}
