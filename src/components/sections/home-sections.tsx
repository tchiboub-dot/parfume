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
      title: "Curated Selection",
      description: "hand-selected niche and luxury fragrances from prestigious maisons",
    },
    {
      icon: <Shield size={24} />,
      title: "100% Authentic",
      description: "every fragrance verified and sourced from authorized distributors",
    },
    {
      icon: <Truck size={24} />,
      title: "Luxury Packaging",
      description: "beautifully packaged with premium gift wrapping available",
    },
    {
      icon: <Award size={24} />,
      title: "Expert Guidance",
      description: "personalized recommendations from certified fragrance specialists",
    },
  ];

  return (
    <main className="relative">
      {/* Hero Section */}
      <section className="hero-glow relative min-h-screen overflow-hidden px-4 py-20 lg:px-8">
        {/* Animated background glow */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-b from-[#d6ab49]/10 to-transparent rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-32 left-0 w-80 h-80 bg-gradient-to-t from-[#d6ab49]/5 to-transparent rounded-full filter blur-3xl"></div>
        </div>

        <div className="mx-auto grid max-w-7xl gap-8 items-center lg:grid-cols-2">
          <motion.div 
            initial={{ opacity: 0, y: 24 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="space-y-6">
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
                className="font-display text-6xl leading-[1.1] text-[color:var(--text)] md:text-7xl xl:text-8xl"
              >
                {t.home.title}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="max-w-xl text-lg text-[color:var(--text-soft)] leading-relaxed"
              >
                {t.home.subtitle}
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Link href={`/${locale}/shop`} className="btn-premium-gold">
                {t.cta.shopNow}
              </Link>
              <Link href={`/${locale}/about`} className="btn-ghost hover:border-[color:var(--gold)]">
                {t.cta.discover}
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#d6ab49]/20 to-transparent rounded-3xl blur-2xl -z-10"></div>
            <div className="product-frame rounded-3xl border border-white/15 bg-[color:var(--surface)]/70 p-8 shadow-luxury-lg backdrop-blur-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1400&q=80"
                alt="Luxury perfume showcase"
                width={1400}
                height={1000}
                className="h-[430px] w-full rounded-2xl object-cover transition duration-500 hover:scale-105"
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
          className="grid gap-4 rounded-2xl border border-white/15 bg-gradient-to-r from-white/5 to-white/0 p-6 backdrop-blur-xl md:grid-cols-4"
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
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="space-y-4">
            <h2 className="section-title">Best Sellers</h2>
            <p className="text-[color:var(--text-soft)] max-w-2xl">
              Discover our most beloved fragrances, chosen by discerning collectors and fragrance enthusiasts worldwide.
            </p>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8 section-divider">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="space-y-4">
            <h2 className="section-title">{t.home.whyTitle}</h2>
            <p className="text-[color:var(--text-soft)] max-w-2xl">
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
                  <div className="text-[color:var(--gold)] flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl text-[color:var(--text)] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[color:var(--text-soft)] leading-relaxed">
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
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="space-y-4">
            <h2 className="section-title">Client Stories</h2>
            <p className="text-[color:var(--text-soft)] max-w-2xl">
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
                  <p className="text-[color:var(--text)] leading-relaxed mb-6 italic">
                    {item.quote}
                  </p>
                </div>
                <div className="pt-6 border-t border-white/10">
                  <p className="font-display text-sm font-semibold text-[color:var(--gold)]">{item.name}</p>
                  <p className="text-xs text-[color:var(--text-soft)]">{item.city}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Newsletter CTA Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-white/15 bg-gradient-to-br from-white/8 to-white/0 p-12 backdrop-blur-xl text-center space-y-6"
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
