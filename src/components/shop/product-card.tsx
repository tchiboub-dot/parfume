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
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="product-frame group overflow-hidden"
    >
      <Link href={`/${locale}/product/${perfume.slug}`} className="block">
        <div className="product-image-premium relative overflow-hidden bg-gradient-to-br from-white/5 to-transparent">
          <Image
            src={perfume.image}
            alt={perfume.name}
            width={1200}
            height={1600}
            className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-105"
          />
          {/* Overlay glow on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent opacity-70 transition duration-500 group-hover:opacity-85"></div>
        </div>
      </Link>

      <div className="space-y-5 bg-gradient-to-b from-white/5 to-transparent p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.23em] text-[color:var(--gold)]">{perfume.brand}</p>
            <Link href={`/${locale}/product/${perfume.slug}`}>
              <h3 className="mt-2 font-display text-[1.8rem] leading-[1.18] text-[color:var(--text)] transition hover:text-[color:var(--gold)]">
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
        <div className="space-y-3 border-y border-white/10 py-3">
          <div className="grid gap-2 text-xs sm:grid-cols-2">
            <div>
              <p className="mb-1 uppercase tracking-[0.16em] text-[color:var(--text-soft)]">Top Notes</p>
              <p className="line-clamp-1 text-[color:var(--text)]">{perfume.notes.top.slice(0, 2).join(", ")}</p>
            </div>
            <div>
              <p className="mb-1 uppercase tracking-[0.16em] text-[color:var(--text-soft)]">Heart Notes</p>
              <p className="line-clamp-1 text-[color:var(--text)]">{perfume.notes.heart.slice(0, 2).join(", ")}</p>
            </div>
          </div>
        </div>

        {/* Rating and Price */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1">
              <Star size={14} className="fill-[color:var(--gold)] text-[color:var(--gold)]" />
              <span className="text-[color:var(--text)] font-semibold">{perfume.rating}</span>
            </div>
            <p className="text-xs text-[color:var(--text-soft)]">{perfume.reviewsCount} reviews</p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="space-x-3">
              <span className="text-[1.75rem] font-semibold text-[color:var(--text)]">${perfume.price}</span>
              {perfume.oldPrice ? (
                <span className="text-sm text-[color:var(--text-soft)] line-through">${perfume.oldPrice}</span>
              ) : null}
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="chip-luxe">
              {perfume.concentration}
            </span>
            <span className="chip-luxe">
              {perfume.audience}
            </span>
          </div>

          <Link
            href={`/${locale}/product/${perfume.slug}`}
            className="mt-2 block w-full rounded-full border border-[color:var(--gold)]/65 bg-[color:var(--gold)]/0 px-4 py-3 text-center text-sm font-semibold text-[color:var(--gold)] transition duration-300 hover:-translate-y-[1px] hover:border-[color:var(--gold)] hover:bg-[color:var(--gold)] hover:text-black"
          >
            Explore Fragrance
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
