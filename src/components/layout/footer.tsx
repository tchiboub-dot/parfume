import Link from "next/link";

import { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/translations";

export function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <footer className="border-t border-white/15 bg-[color:var(--surface)]/70 px-4 py-12 backdrop-blur-xl lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-4">
        <div className="space-y-3">
          <h3 className="font-display text-2xl text-[color:var(--gold)]">{t.brand}</h3>
          <p className="text-sm text-[color:var(--text-soft)]">{t.footer.about}</p>
        </div>
        <div>
          <h4 className="mb-3 text-sm uppercase tracking-[0.2em] text-[color:var(--text-soft)]">Explore</h4>
          <ul className="space-y-2 text-sm text-[color:var(--text)]">
            <li><Link href={`/${locale}/shop`}>Shop</Link></li>
            <li><Link href={`/${locale}/offers`}>Offers</Link></li>
            <li><Link href={`/${locale}/journal`}>Fragrance Journal</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm uppercase tracking-[0.2em] text-[color:var(--text-soft)]">Support</h4>
          <ul className="space-y-2 text-sm text-[color:var(--text)]">
            <li><Link href={`/${locale}/faq`}>FAQ</Link></li>
            <li><Link href={`/${locale}/contact`}>Contact</Link></li>
            <li><Link href={`/${locale}/legal`}>Legal</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm uppercase tracking-[0.2em] text-[color:var(--text-soft)]">Boutique</h4>
          <p className="text-sm text-[color:var(--text-soft)]">31 Avenue de la Lumiere, Casablanca</p>
          <p className="mt-2 text-sm text-[color:var(--text-soft)]">Daily: 10:00 - 21:00</p>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-4 text-xs text-[color:var(--text-soft)]">
        {new Date().getFullYear()} {t.brand}. {t.footer.rights}
      </div>
    </footer>
  );
}
