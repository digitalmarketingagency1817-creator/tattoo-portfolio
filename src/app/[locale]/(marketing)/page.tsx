import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getLocale } from "next-intl/server";
import { HeroSection } from "@/components/marketing/hero-section";
import { GalleryPreview } from "@/components/marketing/gallery-preview";
import { featuredWorks } from "@/data/mock-works";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("HomePage");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function HomePage() {
  const t = await getTranslations();
  const locale = (await getLocale()) as "en" | "sr";

  return (
    <>
      <HeroSection
        studioName={t("Studio.name")}
        tagline={t("HomePage.heroTagline")}
        ctaLabel={t("HomePage.heroCta")}
        bookLabel={t("HomePage.heroBook")}
        ctaHref="/gallery"
        bookHref="/contact"
      />

      <GalleryPreview
        works={featuredWorks}
        ctaLabel={t("HomePage.galleryCta")}
        ctaHref="/gallery"
        sectionTitle={t("HomePage.galleryTitle")}
        sectionSubtitle={t("HomePage.gallerySubtitle")}
        locale={locale}
      />
    </>
  );
}
