import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import { perfumes } from "@/lib/data";
import { Locale } from "@/lib/i18n";

export default async function ProductPage({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  const product = perfumes.find((item) => item.slug === slug);
  if (!product) notFound();

  return (
    <main className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-2 lg:px-8">
      <div className="space-y-4">
        <Image src={product.image} alt={product.name} width={1200} height={1500} className="h-[560px] w-full rounded-3xl object-cover" />
        <div className="grid grid-cols-2 gap-4">
          {product.gallery.map((img) => (
            <Image key={img} src={img} alt={product.name} width={800} height={600} className="h-48 w-full rounded-2xl object-cover" />
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--gold)]">{product.brand}</p>
        <h1 className="font-display text-5xl">{product.name}</h1>
        <p className="text-[color:var(--text-soft)]">{product.description}</p>
        <div className="text-3xl font-semibold">${product.price}</div>
        <div className="flex flex-wrap gap-3">
          {product.sizeOptions.map((size) => (
            <button key={size} className="btn-ghost">{size}</button>
          ))}
        </div>
        <div className="flex gap-3">
          <button className="btn-gold">Add to Cart</button>
          <button className="btn-ghost">Buy Now</button>
        </div>
        <div className="grid gap-3 rounded-2xl border border-white/15 bg-[color:var(--surface)]/70 p-5 text-sm text-[color:var(--text-soft)] backdrop-blur-xl">
          <p>Top notes: {product.notes.top.join(", ")}</p>
          <p>Heart notes: {product.notes.heart.join(", ")}</p>
          <p>Base notes: {product.notes.base.join(", ")}</p>
          <p>Family: {product.family} | Concentration: {product.concentration}</p>
        </div>
        <Link href={`/${locale}/shop`} className="text-sm text-[color:var(--gold)]">Back to collection</Link>
      </div>
    </main>
  );
}
