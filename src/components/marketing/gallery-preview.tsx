import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { WorkCard } from "@/components/marketing/work-card";
import type { TattooWork } from "@/types/tattoo";

interface GalleryPreviewProps {
  works: TattooWork[];
  ctaLabel: string;
  ctaHref: string;
  sectionTitle: string;
  sectionSubtitle?: string;
  locale?: "en" | "sr";
}

export function GalleryPreview({
  works,
  ctaLabel,
  ctaHref,
  sectionTitle,
  sectionSubtitle,
  locale = "en",
}: GalleryPreviewProps) {
  return (
    <section className="bg-[#0a0a0a] px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeader title={sectionTitle} subtitle={sectionSubtitle} />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {works.slice(0, 6).map((work, i) => (
            <WorkCard
              key={work.id}
              work={work}
              locale={locale}
              priority={i < 3}
            />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button
            asChild
            variant="outline"
            className="h-auto rounded-sm border-[#2e2e2e] bg-transparent px-8 py-3 font-[family-name:var(--font-sans)] text-sm font-semibold tracking-[0.2em] uppercase text-[#888888] transition-all hover:border-[#d4a853] hover:text-[#d4a853]"
          >
            <Link href={ctaHref} className="flex items-center gap-2">
              {ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
