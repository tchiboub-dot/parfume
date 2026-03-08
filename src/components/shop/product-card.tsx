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
      transition={{ duration: 0.25 }}
      className="group overflow-hidden rounded-3xl border border-white/15 bg-[color:var(--surface-strong)]/75 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.55)] backdrop-blur-xl"
    >
      <Link href={`/${locale}/product/${perfume.slug}`} className="block">
        <div className="h-72 overflow-hidden">
          <Image
            src={perfume.image}
            alt={perfume.name}
            width={1200}
            height={900}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-soft)]">{perfume.brand}</p>
            <h3 className="mt-1 font-display text-2xl text-[color:var(--text)]">{perfume.name}</h3>
          </div>
          <button className="rounded-full border border-white/20 p-2 text-[color:var(--text-soft)]">
            <Heart size={16} />
          </button>
        </div>
        <div className="flex items-center gap-2 text-sm text-[color:var(--text-soft)]">
          <Star size={14} className="fill-[color:var(--gold)] text-[color:var(--gold)]" />
          <span>{perfume.rating}</span>
          <span>({perfume.reviewsCount})</span>
        </div>
        <div className="flex items-end justify-between">
          <div className="space-x-2">
            <span className="text-xl font-semibold text-[color:var(--text)]">${perfume.price}</span>
            {perfume.oldPrice ? <span className="text-sm text-[color:var(--text-soft)] line-through">${perfume.oldPrice}</span> : null}
          </div>
          <Link
            href={`/${locale}/product/${perfume.slug}`}
            className="rounded-full border border-[color:var(--gold)] px-4 py-2 text-sm text-[color:var(--gold)] transition hover:bg-[color:var(--gold)] hover:text-black"
          >
            View
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
