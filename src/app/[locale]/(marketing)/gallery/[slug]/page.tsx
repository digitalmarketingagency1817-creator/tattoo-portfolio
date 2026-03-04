import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getLocale } from "next-intl/server";
import { WorkDetail } from "@/components/marketing/work-detail";
import { mockWorks } from "@/data/mock-works";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = mockWorks.find((w) => w.slug === slug);

  if (!work) {
    return { title: "Work Not Found" };
  }

  return {
    title: work.titleEn,
    description: work.descriptionEn.slice(0, 160),
  };
}

export function generateStaticParams() {
  return mockWorks.map((work) => ({ slug: work.slug }));
}

export default async function WorkDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const work = mockWorks.find((w) => w.slug === slug);

  if (!work) {
    notFound();
  }

  const t = await getTranslations();
  const locale = (await getLocale()) as "en" | "sr";

  return (
    <WorkDetail
      work={work}
      locale={locale}
      backLabel={t("WorkDetailPage.back")}
      bookLabel={t("WorkDetailPage.book")}
    />
  );
}
