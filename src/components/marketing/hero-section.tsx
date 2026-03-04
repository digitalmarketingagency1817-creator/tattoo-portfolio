import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface HeroSectionProps {
  studioName: string;
  tagline: string;
  ctaLabel: string;
  bookLabel: string;
  ctaHref: string;
  bookHref: string;
}

export function HeroSection({
  studioName,
  tagline,
  ctaLabel,
  bookLabel,
  ctaHref,
  bookHref,
}: HeroSectionProps) {
  const words = studioName.split(" ");

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://picsum.photos/seed/tattoo-studio/1920/1080"
          alt="Shadow Ink Studio background"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0a0a0a]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full pl-[8%] pr-8">
        <div className="max-w-3xl">
          {/* Tagline above name */}
          <p
            className="mb-4 font-[family-name:var(--font-sans)] text-sm tracking-[0.3em] uppercase text-[#d4a853]"
            style={{
              animation: "heroFadeUp 0.8s ease-out 0.2s both",
            }}
          >
            {tagline}
          </p>

          {/* Studio name */}
          <h1
            className="font-[family-name:var(--font-display)] font-light italic leading-[0.9] text-[#f5f0e8]"
            style={{
              fontSize: "clamp(4rem,10vw,9rem)",
              animation: "heroFadeUp 0.8s ease-out 0s both",
            }}
          >
            {words.map((word, i) => (
              <span key={i} className="block">
                {word}
              </span>
            ))}
          </h1>

          {/* CTAs */}
          <div
            className="mt-10 flex flex-wrap gap-4"
            style={{
              animation: "heroFadeUp 0.8s ease-out 0.4s both",
            }}
          >
            <Button
              asChild
              className="h-auto rounded-sm bg-[#d4a853] px-8 py-3 font-[family-name:var(--font-sans)] text-sm font-bold tracking-[0.2em] uppercase text-[#0a0a0a] transition-all hover:bg-[#f59e0b] hover:scale-[1.02]"
            >
              <Link href={ctaHref}>{ctaLabel}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-auto rounded-sm border-[#f5f0e8]/40 bg-transparent px-8 py-3 font-[family-name:var(--font-sans)] text-sm font-bold tracking-[0.2em] uppercase text-[#f5f0e8] transition-all hover:border-[#d4a853] hover:bg-transparent hover:text-[#d4a853]"
            >
              <Link href={bookHref}>{bookLabel}</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-[#888888]">
        <ChevronDown className="h-6 w-6" />
      </div>

      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes heroFadeUp {
              from { opacity: 0; transform: translateY(2rem); }
              to   { opacity: 1; transform: translateY(0); }
            }
          `,
        }}
      />
    </section>
  );
}
