"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

import { ProductCard } from "@/components/shop/product-card";
import { perfumes, testimonials } from "@/lib/data";
import { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/translations";

export function HomeSections({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <main>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-16 pt-14 lg:grid-cols-2 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="text-xs uppercase tracking-[0.35em] text-[color:var(--gold)]">{t.home.eyebrow}</p>
          <h1 className="mt-4 font-display text-5xl leading-[1.05] text-[color:var(--text)] md:text-7xl">{t.home.title}</h1>
          <p className="mt-6 max-w-xl text-[color:var(--text-soft)]">{t.home.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={`/${locale}/shop`} className="btn-gold">{t.cta.shopNow}</Link>
            <Link href={`/${locale}/about`} className="btn-ghost">{t.cta.discover}</Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="rounded-[2rem] border border-white/20 bg-[color:var(--surface)]/70 p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)] backdrop-blur-2xl"
        >
          <Image
            src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1400&q=80"
            alt="Luxury perfume showcase"
            width={1400}
            height={1000}
            className="h-[430px] w-full rounded-[1.4rem] object-cover"
          />
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
        <div className="grid gap-4 rounded-2xl border border-white/15 bg-[color:var(--surface)]/70 p-5 backdrop-blur-xl md:grid-cols-4">
          {t.home.trust.map((item) => (
            <p key={item} className="text-center text-sm text-[color:var(--text-soft)]">{item}</p>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <h2 className="mb-8 font-display text-4xl text-[color:var(--text)]">Best Sellers</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {perfumes.map((item) => (
            <ProductCard key={item.id} perfume={item} locale={locale} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <h2 className="font-display text-4xl text-[color:var(--text)]">{t.home.whyTitle}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {t.home.whyItems.map((item) => (
            <div key={item} className="rounded-2xl border border-white/15 bg-[color:var(--surface)]/70 p-6 text-[color:var(--text-soft)] backdrop-blur-xl">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <h2 className="mb-8 font-display text-4xl text-[color:var(--text)]">Client Love</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((item) => (
            <article key={item.id} className="rounded-2xl border border-white/15 bg-[color:var(--surface)]/70 p-6 backdrop-blur-xl">
              <p className="text-[color:var(--text)]">&ldquo;{item.quote}&rdquo;</p>
              <p className="mt-4 text-sm text-[color:var(--text-soft)]">{item.name} - {item.city}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
