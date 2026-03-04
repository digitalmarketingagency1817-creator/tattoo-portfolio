"use client";

import { useQueryState } from "nuqs";
import { AnimatePresence, motion } from "framer-motion";
import { GalleryFilter } from "./gallery-filter";
import { WorkCard } from "./work-card";
import type { TattooWork, TattooStyle } from "@/types/tattoo";

interface GalleryGridProps {
  initialWorks: TattooWork[];
  styles: TattooStyle[];
  locale?: "en" | "sr";
  allLabel: string;
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

export function GalleryGrid({
  initialWorks,
  styles,
  locale = "en",
  allLabel,
}: GalleryGridProps) {
  const [activeStyle, setActiveStyle] = useQueryState("style", {
    defaultValue: null,
    parse: (v) => v || null,
    serialize: (v) => v ?? "",
  });

  const filteredWorks = activeStyle
    ? initialWorks.filter((w) => w.style.slug === activeStyle)
    : initialWorks;

  return (
    <div>
      {/* Filter pills */}
      <div className="mb-10">
        <GalleryFilter
          styles={styles}
          allLabel={allLabel}
          activeSlug={activeStyle}
          onChange={setActiveStyle}
          locale={locale}
        />
      </div>

      {/* Masonry grid with animation */}
      <AnimatePresence mode="popLayout">
        <motion.div
          className="columns-1 gap-3 sm:columns-2 lg:columns-3"
          layout
        >
          {filteredWorks.map((work) => (
            <motion.div
              key={work.id}
              layout
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="mb-3 break-inside-avoid"
            >
              <WorkCard work={work} locale={locale} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {filteredWorks.length === 0 && (
        <div className="py-24 text-center">
          <p className="font-[family-name:var(--font-sans)] text-sm tracking-[0.2em] uppercase text-[#444444]">
            {locale === "sr" ? "Nema radova u ovom stilu" : "No works in this style"}
          </p>
        </div>
      )}
    </div>
  );
}
