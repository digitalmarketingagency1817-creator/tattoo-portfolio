import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { StyleBadge } from "@/components/shared/style-badge";
import { ArrowLeft } from "lucide-react";
import type { TattooWork } from "@/types/tattoo";

interface WorkDetailProps {
  work: TattooWork;
  locale?: "en" | "sr";
  backLabel: string;
  bookLabel: string;
}

export function WorkDetail({
  work,
  locale = "en",
  backLabel,
  bookLabel,
}: WorkDetailProps) {
  const title = locale === "sr" ? work.titleSr : work.titleEn;
  const description = locale === "sr" ? work.descriptionSr : work.descriptionEn;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Mobile layout */}
      <div className="block md:hidden">
        <div className="px-6 pt-24 pb-6">
          <Button
            asChild
            variant="ghost"
            className="mb-6 -ml-2 text-[#888888] hover:bg-transparent hover:text-[#d4a853]"
          >
            <Link href="/gallery" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="font-[family-name:var(--font-sans)] text-xs tracking-[0.15em] uppercase">
                {backLabel}
              </span>
            </Link>
          </Button>
        </div>

        <div className="relative aspect-square overflow-hidden">
          <Image
            src={work.imageUrl}
            alt={work.imageAlt}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>

        <div className="px-6 py-8">
          <StyleBadge style={work.style} locale={locale} />
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-light italic text-[#f5f0e8]">
            {title}
          </h1>
          <p className="mt-4 font-[family-name:var(--font-sans)] text-sm leading-relaxed text-[#888888]">
            {description}
          </p>
          <Separator className="my-8 bg-[#2e2e2e]" />
          <Button
            asChild
            className="h-auto w-full rounded-sm bg-[#d4a853] py-4 font-[family-name:var(--font-sans)] text-sm font-bold tracking-[0.2em] uppercase text-[#0a0a0a] hover:bg-[#f59e0b]"
          >
            <Link href="/contact">{bookLabel}</Link>
          </Button>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden min-h-screen md:grid md:grid-cols-[1fr,420px]">
        {/* Left — sticky image */}
        <div className="relative bg-[#111111]">
          <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
            <Image
              src={work.imageUrl}
              alt={work.imageAlt}
              fill
              className="object-contain"
              priority
              unoptimized
            />
          </div>
        </div>

        {/* Right — info */}
        <div className="flex flex-col px-10 pt-28 pb-16">
          <Button
            asChild
            variant="ghost"
            className="-ml-2 mb-10 w-fit text-[#888888] hover:bg-transparent hover:text-[#d4a853]"
          >
            <Link href="/gallery" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="font-[family-name:var(--font-sans)] text-xs tracking-[0.15em] uppercase">
                {backLabel}
              </span>
            </Link>
          </Button>

          <StyleBadge style={work.style} locale={locale} />

          <h1 className="mt-6 font-[family-name:var(--font-display)] text-5xl font-light italic leading-tight text-[#f5f0e8]">
            {title}
          </h1>

          <p className="mt-6 font-[family-name:var(--font-sans)] text-sm leading-7 text-[#888888]">
            {description}
          </p>

          <Separator className="my-10 bg-[#2e2e2e]" />

          <Button
            asChild
            className="h-auto rounded-sm bg-[#d4a853] py-4 font-[family-name:var(--font-sans)] text-sm font-bold tracking-[0.2em] uppercase text-[#0a0a0a] hover:bg-[#f59e0b]"
          >
            <Link href="/contact">{bookLabel}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
