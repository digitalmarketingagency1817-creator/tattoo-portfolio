"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

interface LanguageToggleProps {
  className?: string;
}

export function LanguageToggle({ className }: LanguageToggleProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div
      className={`flex items-center gap-1 font-[family-name:var(--font-sans)] text-xs font-semibold tracking-[0.15em] ${className ?? ""}`}
    >
      <button
        onClick={() => switchLocale("en")}
        className={`transition-colors ${
          locale === "en"
            ? "text-[#d4a853]"
            : "text-[#444444] hover:text-[#888888]"
        }`}
      >
        EN
      </button>
      <span className="text-[#2e2e2e]">|</span>
      <button
        onClick={() => switchLocale("sr")}
        className={`transition-colors ${
          locale === "sr"
            ? "text-[#d4a853]"
            : "text-[#444444] hover:text-[#888888]"
        }`}
      >
        SR
      </button>
    </div>
  );
}
