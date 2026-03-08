import { ShopGrid } from "@/components/shop/shop-grid";
import { perfumes } from "@/lib/data";
import { Locale } from "@/lib/i18n";

export default async function ShopPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pb-2 pt-12 lg:px-8">
        <h1 className="font-display text-5xl">Luxury Collection</h1>
        <p className="mt-3 max-w-2xl text-[color:var(--text-soft)]">Explore curated signature scents by mood, occasion, and fragrance family.</p>
      </section>
      <ShopGrid locale={locale} products={perfumes} />
    </>
  );
}
