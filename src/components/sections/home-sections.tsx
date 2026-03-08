"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Mail, Sparkles, Shield, Truck, Award } from "lucide-react";

import { ProductCard } from "@/components/shop/product-card";
import { perfumes, testimonials } from "@/lib/data";
import { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/translations";

export function HomeSections({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  const whyChooseItems = [
    {
      icon: <Sparkles size={24} />,
      title: "Maison Curation",
      description: "Rare signatures and iconic compositions selected by our in-house fragrance editors.",
    },
    {
      icon: <Shield size={24} />,
      title: "Proven Authenticity",
      description: "Every bottle is sourced through official partners and verified before dispatch.",
    },
    {
      icon: <Truck size={24} />,
      title: "Signature Presentation",
      description: "Couture wrapping and protected packaging designed for a first-class unboxing ritual.",
    },
    {
      icon: <Award size={24} />,
      title: "Scent Concierge",
      description: "Personal recommendations based on season, mood, and scent personality.",
    },
  ];

  return (
    <main className="relative">
      {/* Hero Section */}
      <section className="hero-glow relative min-h-screen overflow-hidden px-4 pb-20 pt-24 lg:px-8 lg:pt-28">
        {/* Animated background glow */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute right-0 top-16 h-[28rem] w-[28rem] rounded-full bg-gradient-to-b from-[#d6ab49]/14 to-transparent blur-3xl"></div>
          <div className="absolute bottom-24 left-0 h-[22rem] w-[22rem] rounded-full bg-gradient-to-t from-[#d6ab49]/8 to-transparent blur-3xl"></div>
          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl"></div>
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div 
            initial={{ opacity: 0, y: 24 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-10"
          >
            <div className="space-y-7">
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="text-xs uppercase tracking-[0.35em] text-[color:var(--gold)]"
              >
                {t.home.eyebrow}
              </motion.p>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="font-display text-6xl leading-[1.04] text-[color:var(--text)] md:text-7xl xl:text-[5.3rem]"
              >
                {t.home.title}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="max-w-xl text-lg leading-relaxed text-[color:var(--text-soft)] lg:text-[1.16rem]"
              >
                {t.home.subtitle}
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <Link href={`/${locale}/shop`} className="btn-premium-gold">
                {t.cta.shopNow}
              </Link>
              <Link href={`/${locale}/about`} className="btn-ghost hover:border-[color:var(--gold)]">
                {t.cta.discover}
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.55 }}
              className="flex flex-wrap gap-2 pt-1"
            >
              <span className="chip-luxe">Top Notes Discovery</span>
              <span className="chip-luxe">Sillage & Longevity</span>
              <span className="chip-luxe">Signature Collection</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative lg:pl-4"
          >
            <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-[#d6ab49]/24 via-[#d6ab49]/8 to-transparent blur-2xl"></div>
            <div className="absolute -inset-6 -z-20 rounded-[2rem] border border-[#d6ab49]/10"></div>
            <div className="product-frame overflow-hidden rounded-3xl border border-white/15 bg-[color:var(--surface)]/68 p-8 shadow-luxury-lg backdrop-blur-2xl">
              <Image
                src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1400&q=80"
                alt="Luxury perfume showcase"
                width={1400}
                height={1000}
                className="h-[480px] w-full rounded-2xl object-cover object-center transition duration-700 hover:scale-[1.03]"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-shell grid gap-4 rounded-2xl p-6 md:grid-cols-4"
        >
          {t.home.trust.map((item, idx) => (
            <motion.p 
              key={item} 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="text-center text-sm text-[color:var(--text-soft)]"
            >
              {item}
            </motion.p>
          ))}
        </motion.div>
      </section>

      {/* Best Sellers Section */}
      <section className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="space-y-5">
            <h2 className="section-title">Best Sellers</h2>
            <p className="section-intro">
              Discover our most beloved fragrances, chosen by discerning collectors and fragrance enthusiasts worldwide.
            </p>
          </div>
          
          <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-3">
            {perfumes.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard perfume={item} locale={locale} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Why Choose Us Section - Enhanced */}
      <section className="mx-auto max-w-7xl px-4 py-24 lg:px-8 section-divider">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="space-y-5">
            <h2 className="section-title">{t.home.whyTitle}</h2>
            <p className="section-intro">
              Experience the pinnacle of fragrance retail with our commitment to authenticity, expertise, and luxury.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {whyChooseItems.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="icon-grid-luxury"
              >
                <div className="flex gap-6">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-[color:var(--gold)]/35 bg-[color:var(--gold)]/10 text-[color:var(--gold)] shadow-[0_0_28px_-16px_rgba(214,171,73,0.8)]">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 font-display text-[1.35rem] text-[color:var(--text)]">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[color:var(--text-soft)]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Testimonials Section - Enhanced */}
      <section className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="space-y-5">
            <h2 className="section-title">Client Stories</h2>
            <p className="section-intro">
              Hear from our customers about their fragrance journey with Parfume Luxe.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((item, idx) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="testimonial-card flex flex-col"
              >
                <div className="quote-mark">"</div>
                <div className="flex-1">
                  <p className="mb-6 text-[1.03rem] italic leading-relaxed text-[color:var(--text)]">
                    {item.quote}
                  </p>
                </div>
                <div className="border-t border-white/10 pt-6">
                  <p className="font-display text-base font-semibold text-[color:var(--gold)]">{item.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[color:var(--text-soft)]">{item.city}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Newsletter CTA Section */}
      <section className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-shell space-y-6 rounded-3xl p-12 text-center"
        >
          <h3 className="font-display text-3xl text-[color:var(--text)]">Fragrance News & Exclusives</h3>
          <p className="max-w-xl mx-auto text-[color:var(--text-soft)]">
            Receive early access to new collections, expert guides, and exclusive offers delivered to your inbox.
          </p>
          <div className="flex gap-3 max-w-sm mx-auto pt-4">
            <input
              type="email"
              placeholder="your@email.com"
              className="input-luxe flex-1 bg-white/10"
            />
            <button className="btn-premium-gold whitespace-nowrap">
              <Mail size={16} className="inline mr-2" />
              Subscribe
            </button>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
