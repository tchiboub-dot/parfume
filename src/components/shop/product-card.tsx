"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Heart, Star } from "lucide-react";

import { Perfume } from "@/lib/types";
import { Locale } from "@/lib/i18n";

export function ProductCard({ perfume, locale }: { perfume: Perfume; locale: Locale }) {
  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="product-frame group overflow-hidden"
    >
      <Link href={`/${locale}/product/${perfume.slug}`} className="block">
        <div className="product-image-premium relative bg-gradient-to-br from-white/5 to-transparent overflow-hidden">
          <Image
            src={perfume.image}
            alt={perfume.name}
            width={1200}
            height={1600}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          />
          {/* Overlay glow on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        </div>
      </Link>

      <div className="space-y-4 p-6 bg-gradient-to-b from-white/5 to-transparent">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--gold)] font-semibold">{perfume.brand}</p>
            <Link href={`/${locale}/product/${perfume.slug}`}>
              <h3 className="mt-2 font-display text-2xl text-[color:var(--text)] leading-tight hover:text-[color:var(--gold)] transition">
                {perfume.name}
              </h3>
            </Link>
          </div>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0 rounded-full border border-white/20 p-2.5 text-[color:var(--text-soft)] transition hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"
          >
            <Heart size={16} />
          </motion.button>
        </div>

        {/* Fragrance Notes Preview */}
        <div className="space-y-2 py-3 border-y border-white/10">
          <div className="flex gap-4 text-xs">
            <div>
              <p className="text-[color:var(--text-soft)] uppercase tracking-widest mb-1">Top</p>
              <p className="text-[color:var(--text)] font-light">{perfume.notes.top.join(", ")}</p>
            </div>
            <div>
              <p className="text-[color:var(--text-soft)] uppercase tracking-widest mb-1">Heart</p>
              <p className="text-[color:var(--text)] font-light">{perfume.notes.heart.join(", ")}</p>
            </div>
          </div>
        </div>

        {/* Rating and Price */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1">
              <Star size={14} className="fill-[color:var(--gold)] text-[color:var(--gold)]" />
              <span className="text-[color:var(--text)] font-semibold">{perfume.rating}</span>
            </div>
            <p className="text-[color:var(--text-soft)]">({perfume.reviewsCount} reviews)</p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="space-x-3">
              <span className="text-2xl font-semibold text-[color:var(--text)]">${perfume.price}</span>
              {perfume.oldPrice ? (
                <span className="text-sm text-[color:var(--text-soft)] line-through">${perfume.oldPrice}</span>
              ) : null}
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex gap-2 pt-2 text-xs">
            <span className="px-2 py-1 rounded-full border border-white/10 text-[color:var(--text-soft)]">
              {perfume.concentration}
            </span>
            <span className="px-2 py-1 rounded-full border border-white/10 text-[color:var(--text-soft)]">
              {perfume.audience}
            </span>
          </div>

          <Link
            href={`/${locale}/product/${perfume.slug}`}
            className="w-full mt-4 rounded-full border border-[color:var(--gold)] px-4 py-3 text-sm font-semibold text-[color:var(--gold)] transition bg-[color:var(--gold)]/0 hover:bg-[color:var(--gold)] hover:text-black text-center block"
          >
            Explore Fragrance
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
