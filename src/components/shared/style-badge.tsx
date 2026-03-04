import type { TattooStyle } from "@/types/tattoo";
import { cn } from "@/lib/utils";

interface StyleBadgeProps {
  style: TattooStyle;
  size?: "sm" | "md";
  locale?: "en" | "sr";
  className?: string;
}

export function StyleBadge({
  style,
  size = "md",
  locale = "en",
  className,
}: StyleBadgeProps) {
  const name = locale === "sr" ? style.nameSr : style.nameEn;
  const bgColor = `${style.color}33`; // 20% opacity
  const borderColor = `${style.color}66`; // 40% opacity

  return (
    <span
      className={cn(
        "inline-block rounded-sm font-[family-name:var(--font-sans)] font-semibold tracking-[0.2em] uppercase",
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs",
        className
      )}
      style={{
        backgroundColor: bgColor,
        border: `1px solid ${borderColor}`,
        color: style.color,
      }}
    >
      {name}
    </span>
  );
}
