"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Heart, Star } from "lucide-react";
import { useState } from "react";

import { Perfume } from "@/lib/types";
import { Locale } from "@/lib/i18n";

const FALLBACK_PRODUCT_IMAGE =
  "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=80";

export function ProductCard({ perfume, locale }: { perfume: Perfume; locale: Locale }) {
  const [imageSrc, setImageSrc] = useState(perfume.image);

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="product-frame group overflow-hidden"
    >
      <Link href={`/${locale}/product/${perfume.slug}`} className="block">
        <div className="product-image-premium relative overflow-hidden bg-gradient-to-br from-white/5 to-transparent">
          <Image
            src={imageSrc}
            alt={perfume.name}
            width={1200}
            height={1600}
            className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-105"
            onError={() => {
              if (imageSrc !== FALLBACK_PRODUCT_IMAGE) {
                setImageSrc(FALLBACK_PRODUCT_IMAGE);
              }
            }}
          />
          {/* Overlay glow on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent opacity-70 transition duration-500 group-hover:opacity-85"></div>
        </div>
      </Link>

      <div className="space-y-4 sm:space-y-5 bg-gradient-to-b from-white/5 to-transparent p-4 sm:p-6">
        <div className="flex items-start justify-between gap-2 sm:gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.23em] text-[color:var(--gold)] truncate">{perfume.brand}</p>
            <Link href={`/${locale}/product/${perfume.slug}`}>
              <h3 className="mt-1 sm:mt-2 font-display text-base sm:text-lg md:text-[1.35rem] lg:text-[1.8rem] leading-[1.2] sm:leading-[1.18] text-[color:var(--text)] transition hover:text-[color:var(--gold)]">
                {perfume.name}
              </h3>
            </Link>
          </div>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0 rounded-full border border-white/20 p-2 sm:p-2.5 text-[color:var(--text-soft)] transition hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"
          >
            <Heart size={16} />
          </motion.button>
        </div>

        {/* Fragrance Notes Preview */}
        <div className="space-y-2 sm:space-y-3 border-y border-white/10 py-2 sm:py-3">
          <div className="grid gap-2 text-[10px] sm:text-xs grid-cols-2">
            <div>
              <p className="mb-0.5 sm:mb-1 uppercase tracking-[0.16em] text-[color:var(--text-soft)] text-[9px] sm:text-[10px]">Top Notes</p>
              <p className="line-clamp-1 text-[color:var(--text)] text-xs">{perfume.notes.top.slice(0, 2).join(", ")}</p>
            </div>
            <div>
              <p className="mb-0.5 sm:mb-1 uppercase tracking-[0.16em] text-[color:var(--text-soft)] text-[9px] sm:text-[10px]">Heart Notes</p>
              <p className="line-clamp-1 text-[color:var(--text)] text-xs">{perfume.notes.heart.slice(0, 2).join(", ")}</p>
            </div>
          </div>
        </div>

        {/* Rating and Price */}
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-1">
              <Star size={12} className="fill-[color:var(--gold)] text-[color:var(--gold)] sm:w-[14px] sm:h-[14px]" />
              <span className="text-[color:var(--text)] font-semibold">{perfume.rating}</span>
            </div>
            <p className="text-[10px] sm:text-xs text-[color:var(--text-soft)]">{perfume.reviewsCount} reviews</p>
          </div>

          <div className="flex items-center justify-between pt-1 sm:pt-2">
            <div className="space-x-2 sm:space-x-3">
              <span className="text-lg sm:text-xl md:text-[1.4rem] lg:text-[1.75rem] font-semibold text-[color:var(--text)]">${perfume.price}</span>
              {perfume.oldPrice ? (
                <span className="text-xs sm:text-sm text-[color:var(--text-soft)] line-through">${perfume.oldPrice}</span>
              ) : null}
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
            <span className="chip-luxe text-[8px] sm:text-[9px]">
              {perfume.concentration}
            </span>
            <span className="chip-luxe text-[8px] sm:text-[9px]">
              {perfume.audience}
            </span>
          </div>

          <Link
            href={`/${locale}/product/${perfume.slug}`}
            className="mt-2 sm:mt-3 block w-full rounded-full border border-[color:var(--gold)]/65 bg-[color:var(--gold)]/0 px-3 sm:px-4 py-2.5 sm:py-3 text-center text-xs sm:text-sm font-semibold text-[color:var(--gold)] transition duration-300 hover:-translate-y-[1px] hover:border-[color:var(--gold)] hover:bg-[color:var(--gold)] hover:text-black"
          >
            Explore Fragrance
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
