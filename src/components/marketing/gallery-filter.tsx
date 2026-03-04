"use client";

import { cn } from "@/lib/utils";
import type { TattooStyle } from "@/types/tattoo";

interface GalleryFilterProps {
  styles: TattooStyle[];
  allLabel: string;
  activeSlug: string | null;
  onChange: (slug: string | null) => void;
  locale?: "en" | "sr";
}

export function GalleryFilter({
  styles,
  allLabel,
  activeSlug,
  onChange,
  locale = "en",
}: GalleryFilterProps) {
  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2 md:flex-wrap md:justify-center">
      {/* All styles pill */}
      <button
        onClick={() => onChange(null)}
        className={cn(
          "flex-shrink-0 rounded-sm border px-5 py-2 font-[family-name:var(--font-sans)] text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-200",
          activeSlug === null
            ? "border-[#d4a853] bg-[#d4a853] text-[#0a0a0a]"
            : "border-[#2e2e2e] text-[#666666] hover:border-[#d4a853]/50 hover:text-[#d4a853]"
        )}
      >
        {allLabel}
      </button>

      {styles.map((style) => {
        const name = locale === "sr" ? style.nameSr : style.nameEn;
        const isActive = activeSlug === style.slug;

        return (
          <button
            key={style.id}
            onClick={() => onChange(style.slug)}
            className={cn(
              "flex-shrink-0 rounded-sm border px-5 py-2 font-[family-name:var(--font-sans)] text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-200",
              isActive
                ? "border-[#d4a853] bg-[#d4a853] text-[#0a0a0a]"
                : "border-[#2e2e2e] text-[#666666] hover:border-[#d4a853]/50 hover:text-[#d4a853]"
            )}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
}
