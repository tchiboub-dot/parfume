import Link from "next/link";
import { Instagram, Facebook, Twitter } from "lucide-react";

import { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/translations";

export function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/15 bg-[color:var(--surface)]/38 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid gap-12 md:grid-cols-5 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="font-display text-3xl font-semibold text-[color:var(--gold)]">{t.brand}</h3>
              <p className="mt-3 text-sm text-[color:var(--text-soft)] leading-relaxed">
                {t.footer.about || "Curated niche fragrances and luxury perfumes for the discerning collector. Discover the art of fine fragrance through exclusive olfactive stories."}
              </p>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-soft)] font-semibold">Follow Us</p>
              <div className="flex gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/20 p-3 text-[color:var(--text-soft)] transition hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/20 p-3 text-[color:var(--text-soft)] transition hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/20 p-3 text-[color:var(--text-soft)] transition hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"
                  aria-label="Twitter"
                >
                  <Twitter size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="mb-4 text-sm uppercase tracking-[0.2em] font-semibold text-[color:var(--text)] border-b border-white/10 pb-3">
              Explore
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href={`/${locale}/shop`} className="link-premium text-[color:var(--text-soft)]">
                  Shop All
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/offers`} className="link-premium text-[color:var(--text-soft)]">
                  Offers & Sales
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/categories`} className="link-premium text-[color:var(--text-soft)]">
                  Collections
                </Link>
              </li>
              <li>
                <Link href={`/${locale}#best-sellers`} className="link-premium text-[color:var(--text-soft)]">
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-4 text-sm uppercase tracking-[0.2em] font-semibold text-[color:var(--text)] border-b border-white/10 pb-3">
              Support
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href={`/${locale}/contact`} className="link-premium text-[color:var(--text-soft)]">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/faq`} className="link-premium text-[color:var(--text-soft)]">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/legal`} className="link-premium text-[color:var(--text-soft)]">
                  Returns & Policy
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/legal`} className="link-premium text-[color:var(--text-soft)]">
                  Shipping Info
                </Link>
              </li>
            </ul>
          </div>

          {/* Boutique */}
          <div>
            <h4 className="mb-4 text-sm uppercase tracking-[0.2em] font-semibold text-[color:var(--text)] border-b border-white/10 pb-3">
              Boutique
            </h4>
            <div className="space-y-4 text-sm text-[color:var(--text-soft)]">
              <div>
                <p className="font-semibold text-[color:var(--text)] mb-1">Flagship Store</p>
                <p>31 Avenue de la Lumière</p>
                <p>Casablanca, Morocco</p>
              </div>
              <div>
                <p className="font-semibold text-[color:var(--text)] mb-1">Hours</p>
                <p>Daily: 10:00 - 21:00</p>
                <p>Friday: 14:00 - 22:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Private Client Note */}
        <div className="mb-12 rounded-2xl border border-white/12 bg-gradient-to-r from-white/5 to-transparent p-7 backdrop-blur-xl">
          <div className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
            <div>
              <h4 className="font-display text-2xl text-[color:var(--text)]">Private Client Circle</h4>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--text-soft)]">
                For bespoke recommendations, gifting, and signature scent discovery, connect with our fragrance concierge.
              </p>
            </div>
            <Link
              href={`/${locale}/contact`}
              className="btn-ghost inline-flex items-center justify-center px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em]"
            >
              Contact Concierge
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8 space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[color:var(--text-soft)]">
            <p>
              © {currentYear} {t.brand}. {t.footer.rights || "All rights reserved."}
            </p>
            <div className="flex gap-6">
              <Link href={`/${locale}/legal`} className="link-premium">
                Privacy Policy
              </Link>
              <Link href={`/${locale}/legal`} className="link-premium">
                Terms of Service
              </Link>
              <Link href={`/${locale}/legal`} className="link-premium">
                Cookie Policy
              </Link>
            </div>
          </div>
          <div className="text-center text-xs text-[color:var(--text-soft)]">
            <p>Crafted with dedication to the art of Fine Fragrance</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
