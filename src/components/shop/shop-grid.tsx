import { ProductCard } from "@/components/shop/product-card";
import { Locale } from "@/lib/i18n";
import { Perfume } from "@/lib/types";

export function ShopGrid({ locale, products }: { locale: Locale; products: Perfume[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="section-shell mb-8 grid gap-4 rounded-2xl p-4 md:grid-cols-4">
        <select className="input-luxe"><option>Fragrance family</option></select>
        <select className="input-luxe"><option>Audience</option></select>
        <select className="input-luxe"><option>Price range</option></select>
        <select className="input-luxe"><option>Sort by newest</option></select>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((perfume) => (
          <ProductCard key={perfume.id} perfume={perfume} locale={locale} />
        ))}
      </div>
    </section>
  );
}
