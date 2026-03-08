"use client";

import Link from "next/link";
import { Moon, Search, ShoppingBag, Sun, UserRound, Heart } from "lucide-react";
import { useTheme } from "next-themes";
import { signOut, useSession } from "next-auth/react";

import { Locale, locales } from "@/lib/i18n";
import { getDictionary } from "@/lib/translations";

type NavbarProps = {
  locale: Locale;
};

export function Navbar({ locale }: NavbarProps) {
  const t = getDictionary(locale);
  const { setTheme, resolvedTheme } = useTheme();
  const { data: session } = useSession();

  const links = [
    { label: t.nav.home, href: `/${locale}` },
    { label: t.nav.shop, href: `/${locale}/shop` },
    { label: t.nav.categories, href: `/${locale}/categories` },
    { label: t.nav.offers, href: `/${locale}/offers` },
    { label: t.nav.about, href: `/${locale}/about` },
    { label: t.nav.contact, href: `/${locale}/contact` },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/15 bg-[color:var(--surface)]/70 backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-8">
        <Link href={`/${locale}`} className="font-display text-2xl font-semibold tracking-wide text-[color:var(--gold)]">
          {t.brand}
        </Link>
        <div className="hidden items-center gap-6 lg:flex">
          {links.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-[color:var(--text-soft)] transition hover:text-[color:var(--text)]">
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            className="rounded-full border border-white/20 p-2 text-[color:var(--text-soft)] transition hover:text-[color:var(--text)]"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {resolvedTheme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <div className="rounded-full border border-white/20 px-2 py-1 text-xs text-[color:var(--text-soft)]">
            {locales.map((item) => (
              <Link key={item} href={`/${item}`} className={`px-1 ${item === locale ? "text-[color:var(--gold)]" : ""}`}>
                {item.toUpperCase()}
              </Link>
            ))}
          </div>
          <Link className="rounded-full border border-white/20 p-2 text-[color:var(--text-soft)]" href={`/${locale}/search`}>
            <Search size={16} />
          </Link>
          <Link className="rounded-full border border-white/20 p-2 text-[color:var(--text-soft)]" href={`/${locale}/wishlist`}>
            <Heart size={16} />
          </Link>
          <Link className="rounded-full border border-white/20 p-2 text-[color:var(--text-soft)]" href={`/${locale}/cart`}>
            <ShoppingBag size={16} />
          </Link>
          <Link className="rounded-full border border-white/20 p-2 text-[color:var(--text-soft)]" href={`/${locale}/account`}>
            <UserRound size={16} />
          </Link>
          {session?.user ? (
            <button
              onClick={() => signOut({ callbackUrl: `/${locale}/auth/sign-in` })}
              className="rounded-full border border-white/20 px-3 py-1 text-xs text-[color:var(--text-soft)]"
            >
              Sign Out
            </button>
          ) : (
            <Link className="rounded-full border border-white/20 px-3 py-1 text-xs text-[color:var(--text-soft)]" href={`/${locale}/auth/sign-in`}>
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
