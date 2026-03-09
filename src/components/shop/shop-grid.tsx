import { ProductCard } from "@/components/shop/product-card";
import { Locale } from "@/lib/i18n";
import { Perfume } from "@/lib/types";

export function ShopGrid({ locale, products }: { locale: Locale; products: Perfume[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:py-10 lg:py-12 lg:px-8">
      <div className="section-shell mb-6 sm:mb-8 grid gap-2 sm:gap-3 rounded-2xl p-3 sm:p-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
        <select className="input-luxe text-xs sm:text-sm py-2 sm:py-2.5"><option>Fragrance family</option></select>
        <select className="input-luxe text-xs sm:text-sm py-2 sm:py-2.5"><option>Audience</option></select>
        <select className="input-luxe text-xs sm:text-sm py-2 sm:py-2.5"><option>Price range</option></select>
        <select className="input-luxe text-xs sm:text-sm py-2 sm:py-2.5"><option>Sort by newest</option></select>
      </div>
      <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((perfume) => (
          <ProductCard key={perfume.id} perfume={perfume} locale={locale} />
        ))}
      </div>
    </section>
  );
}
