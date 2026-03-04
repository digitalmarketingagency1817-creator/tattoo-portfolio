import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  goldAccent?: boolean;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  align = "left",
  goldAccent = true,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12",
        align === "center" && "text-center",
        className
      )}
    >
      {goldAccent && (
        <div
          className={cn(
            "mb-6 h-px w-12 bg-[#d4a853]",
            align === "center" && "mx-auto"
          )}
        />
      )}
      <h2 className="font-[family-name:var(--font-display)] text-4xl font-light italic text-[#f5f0e8] md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 font-[family-name:var(--font-sans)] text-sm tracking-[0.2em] uppercase text-[#888888]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
