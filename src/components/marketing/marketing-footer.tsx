import { Link } from "@/i18n/navigation";
import { Separator } from "@/components/ui/separator";
import { Instagram } from "lucide-react";

interface FooterLink {
  href: string;
  label: string;
}

interface MarketingFooterProps {
  studioName: string;
  tagline: string;
  links: FooterLink[];
  copyright: string;
  instagramUrl?: string;
}

export function MarketingFooter({
  studioName,
  tagline,
  links,
  copyright,
  instagramUrl = "#",
}: MarketingFooterProps) {
  return (
    <footer className="border-t border-[#1a1a1a] bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Studio name & tagline */}
          <div>
            <p className="font-[family-name:var(--font-display)] text-2xl font-light italic text-[#d4a853]">
              {studioName}
            </p>
            <p className="mt-2 font-[family-name:var(--font-sans)] text-xs tracking-[0.2em] uppercase text-[#444444]">
              {tagline}
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="w-fit font-[family-name:var(--font-sans)] text-xs tracking-[0.15em] uppercase text-[#666666] transition-colors hover:text-[#d4a853]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social */}
          <div className="flex items-start gap-4">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#444444] transition-colors hover:text-[#d4a853]"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>

        <Separator className="my-8 bg-[#1a1a1a]" />

        <p className="font-[family-name:var(--font-sans)] text-xs text-[#444444]">
          {copyright}
        </p>
      </div>
    </footer>
  );
}
