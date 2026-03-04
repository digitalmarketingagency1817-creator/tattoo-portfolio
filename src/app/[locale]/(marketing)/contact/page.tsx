import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SectionHeader } from "@/components/shared/section-header";
import { ContactForm } from "@/components/marketing/contact-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("ContactPage");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function ContactPage() {
  const t = await getTranslations("ContactPage");

  return (
    <section className="min-h-screen bg-[#0a0a0a] px-6 pt-28 pb-24">
      <div className="mx-auto max-w-lg">
        <SectionHeader
          title={t("title")}
          subtitle={t("subtitle")}
          align="center"
        />

        <ContactForm
          nameLabel={t("nameLabel")}
          namePlaceholder={t("namePlaceholder")}
          emailLabel={t("emailLabel")}
          emailPlaceholder={t("emailPlaceholder")}
          phoneLabel={t("phoneLabel")}
          phonePlaceholder={t("phonePlaceholder")}
          messageLabel={t("messageLabel")}
          messagePlaceholder={t("messagePlaceholder")}
          submitLabel={t("submitLabel")}
          submittingLabel={t("submittingLabel")}
          successTitle={t("successTitle")}
          successMessage={t("successMessage")}
        />
      </div>
    </section>
  );
}
