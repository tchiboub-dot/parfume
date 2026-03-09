import { ShopGrid } from "@/components/shop/shop-grid";
import { perfumes } from "@/lib/data";
import { Locale } from "@/lib/i18n";

export default async function ShopPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pb-1 sm:pb-2 pt-8 sm:pt-10 md:pt-12 lg:px-8">
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl leading-tight">Luxury Collection</h1>
        <p className="mt-2 sm:mt-3 max-w-2xl text-xs sm:text-sm md:text-base text-[color:var(--text-soft)] leading-relaxed">Explore curated signature scents by mood, occasion, and fragrance family.</p>
      </section>
      <ShopGrid locale={locale} products={perfumes} />
    </>
  );
}
