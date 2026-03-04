import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getLocale } from "next-intl/server";
import { SectionHeader } from "@/components/shared/section-header";
import { GalleryGrid } from "@/components/marketing/gallery-grid";
import { mockWorks } from "@/data/mock-works";
import { mockStyles } from "@/data/mock-styles";
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("GalleryPage");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function GalleryPage() {
  const t = await getTranslations();
  const locale = (await getLocale()) as "en" | "sr";

  const publishedWorks = mockWorks.filter((w) => w.published);

  return (
    <section className="min-h-screen bg-[#0a0a0a] px-6 pt-28 pb-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          title={t("GalleryPage.title")}
          subtitle={t("GalleryPage.subtitle")}
        />

        <GalleryGrid
          initialWorks={publishedWorks}
          styles={mockStyles}
          locale={locale}
          allLabel={t("GalleryPage.allStyles")}
        />
      </div>
    </section>
  );
}
