"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { LanguageToggle } from "@/components/shared/language-toggle";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavLink {
  href: string;
  label: string;
}

interface MarketingNavProps {
  links: NavLink[];
  studioName: string;
}

export function MarketingNav({ links, studioName }: MarketingNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-[#2e2e2e] bg-[#0a0a0a]/95 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-xl font-light italic text-[#d4a853] transition-opacity hover:opacity-80"
        >
          {studioName}
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "font-[family-name:var(--font-sans)] text-sm font-medium tracking-[0.15em] uppercase transition-colors",
                pathname === link.href
                  ? "text-[#d4a853]"
                  : "text-[#888888] hover:text-[#d4a853]"
              )}
            >
              {link.label}
            </Link>
          ))}
          <LanguageToggle />
        </div>

        {/* Mobile hamburger */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-[#f5f0e8] hover:bg-[#1a1a1a]"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-full border-[#2e2e2e] bg-[#0a0a0a] sm:w-80"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between py-4">
                <span className="font-[family-name:var(--font-display)] text-lg font-light italic text-[#d4a853]">
                  {studioName}
                </span>
                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-[#888888] hover:bg-[#1a1a1a] hover:text-[#f5f0e8]"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </SheetClose>
              </div>

              <nav className="mt-8 flex flex-col gap-6">
                {links.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "font-[family-name:var(--font-sans)] text-lg font-medium tracking-[0.15em] uppercase transition-colors",
                        pathname === link.href
                          ? "text-[#d4a853]"
                          : "text-[#888888] hover:text-[#d4a853]"
                      )}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>

              <div className="mt-auto pb-8">
                <LanguageToggle />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
