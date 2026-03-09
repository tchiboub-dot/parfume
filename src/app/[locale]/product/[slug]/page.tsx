import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import { ReviewSection } from "@/components/reviews/review-section";
import { perfumes } from "@/lib/data";
import { Locale } from "@/lib/i18n";

export default async function ProductPage({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  const product = perfumes.find((item) => item.slug === slug);
  if (!product) notFound();

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:py-10 md:py-12 lg:px-8">
      <section className="grid gap-6 sm:gap-7 md:gap-8 lg:grid-cols-2">
        <div className="space-y-3 sm:space-y-4">
          <Image src={product.image} alt={product.name} width={1200} height={1500} className="h-[320px] sm:h-[420px] md:h-[500px] lg:h-[560px] w-full rounded-2xl sm:rounded-3xl object-cover" />
          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
            {product.gallery.map((img) => (
              <Image key={img} src={img} alt={product.name} width={800} height={600} className="h-24 sm:h-32 md:h-40 lg:h-48 w-full rounded-xl sm:rounded-2xl object-cover" />
            ))}
          </div>
        </div>
        <div className="space-y-4 sm:space-y-5 md:space-y-6">
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--gold)]">{product.brand}</p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-5xl leading-tight">{product.name}</h1>
          <p className="text-xs sm:text-sm md:text-base text-[color:var(--text-soft)] leading-relaxed">{product.description}</p>
          <div className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl font-semibold">${product.price}</div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {product.sizeOptions.map((size) => (
              <button key={size} className="btn-ghost text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5">{size}</button>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button className="btn-gold text-sm px-4 sm:px-6 py-2.5 sm:py-3 flex-1 sm:flex-none">Add to Cart</button>
            <button className="btn-ghost text-sm px-4 sm:px-6 py-2.5 sm:py-3 flex-1 sm:flex-none">Buy Now</button>
          </div>
          <div className="grid gap-2 sm:gap-3 rounded-2xl border border-white/15 bg-[color:var(--surface)]/70 p-4 sm:p-5 text-xs sm:text-sm text-[color:var(--text-soft)] backdrop-blur-xl">
            <p className="leading-tight"><span className="text-[color:var(--gold)] font-semibold">Top notes:</span> {product.notes.top.join(", ")}</p>
            <p className="leading-tight"><span className="text-[color:var(--gold)] font-semibold">Heart notes:</span> {product.notes.heart.join(", ")}</p>
            <p className="leading-tight"><span className="text-[color:var(--gold)] font-semibold">Base notes:</span> {product.notes.base.join(", ")}</p>
            <p className="leading-tight"><span className="text-[color:var(--gold)] font-semibold">Family:</span> {product.family} | <span className="text-[color:var(--gold)] font-semibold">Concentration:</span> {product.concentration}</p>
          </div>
          <Link href={`/${locale}/shop`} className="text-xs sm:text-sm text-[color:var(--gold)] hover:text-white transition">← Back to collection</Link>
        </div>
      </section>

      <ReviewSection
        locale={locale}
        productSlug={product.slug}
        productName={product.name}
        className="mt-12 sm:mt-16 md:mt-20"
      />
    </main>
  );
}
