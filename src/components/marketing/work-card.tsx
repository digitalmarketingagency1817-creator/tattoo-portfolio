"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { StyleBadge } from "@/components/shared/style-badge";
import type { TattooWork } from "@/types/tattoo";

interface WorkCardProps {
  work: TattooWork;
  locale?: "en" | "sr";
  priority?: boolean;
}

export function WorkCard({ work, locale = "en", priority = false }: WorkCardProps) {
  const title = locale === "sr" ? work.titleSr : work.titleEn;

  return (
    <Link href={`/gallery/${work.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm ring-0 ring-[#d4a853]/60 transition-all duration-300 group-hover:ring-1">
        {/* Image */}
        <Image
          src={work.imageUrl}
          alt={work.imageAlt}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          priority={priority}
          unoptimized
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Hover content */}
        <div className="absolute inset-x-0 bottom-0 translate-y-4 p-4 opacity-0 transition-all duration-300 delay-100 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="mb-2 font-[family-name:var(--font-display)] text-xl font-light italic text-white">
            {title}
          </p>
          <StyleBadge style={work.style} size="sm" locale={locale} />
        </div>
      </div>
    </Link>
  );
}
