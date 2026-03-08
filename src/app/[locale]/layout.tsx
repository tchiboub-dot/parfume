import { notFound } from "next/navigation";
import { PropsWithChildren } from "react";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { SiteProviders } from "@/components/providers/site-providers";
import { Starfield } from "@/components/ui/starfield";
import { getDirection, isLocale, Locale } from "@/lib/i18n";

export default async function LocaleLayout({
  children,
  params,
}: PropsWithChildren<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <SiteProviders>
      <div lang={locale} dir={getDirection(locale as Locale)} className="min-h-screen bg-[color:var(--bg)] text-[color:var(--text)]">
        <Starfield />
        <Navbar locale={locale as Locale} />
        {children}
        <Footer locale={locale as Locale} />
      </div>
    </SiteProviders>
  );
}
