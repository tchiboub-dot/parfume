"use client";

import Link from "next/link";
import { Moon, Search, ShoppingBag, Sun, UserRound, Heart, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { Locale, locales } from "@/lib/i18n";
import { getDictionary } from "@/lib/translations";

type NavbarProps = {
  locale: Locale;
};

export function Navbar({ locale }: NavbarProps) {
  const t = getDictionary(locale);
  const pathname = usePathname();
  const { setTheme, resolvedTheme } = useTheme();
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: t.nav.home, href: `/${locale}` },
    { label: t.nav.shop, href: `/${locale}/shop` },
    { label: t.nav.categories, href: `/${locale}/categories` },
    { label: t.nav.offers, href: `/${locale}/offers` },
    { label: t.nav.about, href: `/${locale}/about` },
    { label: t.nav.contact, href: `/${locale}/contact` },
  ];

  return (
    <header className={`sticky top-0 z-50 border-b transition-all duration-300 ${
      isScrolled
        ? "navbar-scrolled border-white/20"
        : "border-white/15 bg-[color:var(--surface)]/62 backdrop-blur-2xl"
    }`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 lg:px-8 lg:py-6">
        {/* Logo */}
        <Link 
          href={`/${locale}`} 
          className="flex flex-col leading-none text-[color:var(--gold)] transition hover:opacity-85 flex-shrink-0"
        >
          <span className="font-display text-2xl font-semibold tracking-[0.06em] lg:text-[2rem]">{t.brand}</span>
          <span className="mt-1 text-[9px] uppercase tracking-[0.34em] text-[color:var(--text-soft)]">Maison de Parfum</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {links.map((item) => (
            <Link 
              key={item.href} 
              href={item.href} 
              className={`link-premium text-sm font-medium transition ${
                pathname === item.href
                  ? "text-[color:var(--gold)]"
                  : "text-[color:var(--text-soft)] hover:text-[color:var(--text)]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="ml-auto flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            className="rounded-full border border-white/20 p-2.5 text-[color:var(--text-soft)] transition duration-300 hover:-translate-y-[1px] hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Language Selector */}
          <div className="hidden gap-1 rounded-full border border-white/20 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--text-soft)] sm:flex">
            {locales.map((item) => (
              <Link 
                key={item} 
                href={`/${item}`} 
                className={`rounded-full px-2 py-1 transition ${
                  item === locale
                    ? "bg-white/5 text-[color:var(--gold)]"
                    : "hover:text-[color:var(--text)]"
                }`}
              >
                {item.toUpperCase()}
              </Link>
            ))}
          </div>

          {/* Search */}
          <Link 
            className="rounded-full border border-white/20 p-2.5 text-[color:var(--text-soft)] transition hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]" 
            href={`/${locale}/search`}
            title="Search"
          >
            <Search size={18} />
          </Link>

          {/* Wishlist */}
          <Link 
            className="rounded-full border border-white/20 p-2.5 text-[color:var(--text-soft)] transition hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]" 
            href={`/${locale}/wishlist`}
            title="Wishlist"
          >
            <Heart size={18} />
          </Link>

          {/* Cart */}
          <Link 
            className="rounded-full border border-white/20 p-2.5 text-[color:var(--text-soft)] transition hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]" 
            href={`/${locale}/cart`}
            title="Cart"
          >
            <ShoppingBag size={18} />
          </Link>

          {/* Account */}
          <Link 
            className="rounded-full border border-white/20 p-2.5 text-[color:var(--text-soft)] transition hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]" 
            href={`/${locale}/account`}
            title="Account"
          >
            <UserRound size={18} />
          </Link>

          {/* Auth Button */}
          {session?.user ? (
            <button
              onClick={() => signOut({ callbackUrl: `/${locale}/auth/sign-in` })}
              className="hidden sm:block rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-[color:var(--text-soft)] transition hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"
            >
              Sign Out
            </button>
          ) : (
            <Link 
              className="hidden sm:block rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-[color:var(--text-soft)] transition hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]" 
              href={`/${locale}/auth/sign-in`}
            >
              Sign In
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            className="rounded-full border border-white/20 p-2.5 text-[color:var(--text-soft)] transition hover:border-[color:var(--gold)] hover:text-[color:var(--gold)] lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-white/15 bg-[color:var(--surface)]/92 backdrop-blur-xl lg:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4 space-y-3">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block py-2 text-sm font-medium transition ${
                  pathname === item.href ? "text-[color:var(--gold)]" : "text-[color:var(--text-soft)] hover:text-[color:var(--gold)]"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t border-white/10 pt-3 mt-3">
              <Link
                className="block text-sm font-medium text-[color:var(--text-soft)] hover:text-[color:var(--gold)] transition py-2"
                href={`/${locale}`}
              >
                {session?.user ? "Account" : "Sign In"}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
