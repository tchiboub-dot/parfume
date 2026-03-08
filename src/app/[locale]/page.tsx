import { HomeSections } from "@/components/sections/home-sections";
import { Locale } from "@/lib/i18n";

export default async function LocalizedHome({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return <HomeSections locale={locale} />;
}
