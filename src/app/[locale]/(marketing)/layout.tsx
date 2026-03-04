import { getTranslations } from "next-intl/server";
import { getLocale } from "next-intl/server";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MarketingFooter } from "@/components/marketing/marketing-footer";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations();
  const locale = await getLocale();

  const navLinks = [
    { href: "/gallery", label: t("Nav.gallery") },
    { href: "/contact", label: t("Nav.contact") },
  ];

  const footerLinks = [
    { href: "/gallery", label: t("Nav.gallery") },
    { href: "/contact", label: t("Nav.contact") },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0a]">
      <MarketingNav
        links={navLinks}
        studioName={t("Studio.name")}
      />

      <main className="flex-1">{children}</main>

      <MarketingFooter
        studioName={t("Studio.name")}
        tagline={t("Studio.tagline")}
        links={footerLinks}
        copyright={t("Studio.copyright")}
      />
    </div>
  );
}
