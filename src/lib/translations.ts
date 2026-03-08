import { Locale } from "@/lib/i18n";

type TranslationSchema = {
  brand: string;
  nav: {
    home: string;
    shop: string;
    categories: string;
    offers: string;
    about: string;
    gallery: string;
    contact: string;
    faq: string;
    journal: string;
    admin: string;
  };
  cta: {
    shopNow: string;
    discover: string;
    addToCart: string;
    buyNow: string;
    viewDetails: string;
  };
  home: {
    eyebrow: string;
    title: string;
    subtitle: string;
    trust: string[];
    whyTitle: string;
    whyItems: string[];
  };
  footer: {
    about: string;
    rights: string;
  };
};

const translations: Record<Locale, TranslationSchema> = {
  en: {
    brand: "Parfume Luxe",
    nav: {
      home: "Home",
      shop: "Shop",
      categories: "Categories",
      offers: "Offers",
      about: "About",
      gallery: "Gallery",
      contact: "Contact",
      faq: "FAQ",
      journal: "Journal",
      admin: "Admin",
    },
    cta: {
      shopNow: "Shop Collection",
      discover: "Discover Signature Scents",
      addToCart: "Add to Cart",
      buyNow: "Buy Now",
      viewDetails: "View Details",
    },
    home: {
      eyebrow: "Maison de fragrance",
      title: "A cinematic fragrance experience for refined tastes",
      subtitle:
        "Curated niche perfumes, timeless classics, and gift-worthy editions selected for elegance, longevity, and emotional impact.",
      trust: [
        "Authenticity guaranteed",
        "Luxury gift packaging",
        "Fast boutique support",
        "Secure checkout",
      ],
      whyTitle: "Why choose Parfume Luxe",
      whyItems: [
        "Curated high-end fragrance portfolio",
        "Expert scent guidance by mood and occasion",
        "Exclusive seasonal offers and gift sets",
        "Premium after-purchase care",
      ],
    },
    footer: {
      about:
        "An international-style fragrance house delivering immersive luxury shopping with editorial storytelling and trusted authenticity.",
      rights: "All rights reserved.",
    },
  },
  fr: {
    brand: "Parfume Luxe",
    nav: {
      home: "Accueil",
      shop: "Boutique",
      categories: "Categories",
      offers: "Offres",
      about: "A propos",
      gallery: "Galerie",
      contact: "Contact",
      faq: "FAQ",
      journal: "Journal",
      admin: "Admin",
    },
    cta: {
      shopNow: "Explorer la collection",
      discover: "Decouvrir les senteurs signatures",
      addToCart: "Ajouter au panier",
      buyNow: "Acheter maintenant",
      viewDetails: "Voir les details",
    },
    home: {
      eyebrow: "Maison de parfum",
      title: "Une experience olfactive cinematographique et elegante",
      subtitle:
        "Parfums de niche, classiques intemporels et coffrets d'exception, selectionnes pour leur raffinement et leur tenue.",
      trust: [
        "Authenticite garantie",
        "Emballage cadeau de luxe",
        "Support boutique rapide",
        "Paiement securise",
      ],
      whyTitle: "Pourquoi choisir Parfume Luxe",
      whyItems: [
        "Selection haut de gamme soigneusement curatee",
        "Conseil olfactif selon humeur et occasion",
        "Offres saisonnieres et coffrets exclusifs",
        "Service premium apres achat",
      ],
    },
    footer: {
      about:
        "Une maison de parfum au style international proposant une experience digitale luxueuse et inspiree par l'edition.",
      rights: "Tous droits reserves.",
    },
  },
  ar: {
    brand: "Parfume Luxe",
    nav: {
      home: "الرئيسية",
      shop: "المتجر",
      categories: "الفئات",
      offers: "العروض",
      about: "من نحن",
      gallery: "المعرض",
      contact: "اتصل بنا",
      faq: "الاسئلة الشائعة",
      journal: "المجلة",
      admin: "الادارة",
    },
    cta: {
      shopNow: "تسوق المجموعة",
      discover: "اكتشف العطور المميزة",
      addToCart: "اضف الى السلة",
      buyNow: "اشتر الان",
      viewDetails: "عرض التفاصيل",
    },
    home: {
      eyebrow: "دار عطور فاخرة",
      title: "تجربة عطرية سينمائية لذوق راق",
      subtitle:
        "تشكيلة من العطور النيش والكلاسيكية والهدايا الفاخرة المختارة بعناية للاناقة والثبات والتميز.",
      trust: [
        "اصالة مضمونة",
        "تغليف هدايا فاخر",
        "دعم سريع واحترافي",
        "دفع امن",
      ],
      whyTitle: "لماذا تختار Parfume Luxe",
      whyItems: [
        "مجموعة عطور فاخرة مختارة",
        "ارشاد عطري حسب المزاج والمناسبة",
        "عروض موسمية حصرية وصناديق هدايا",
        "رعاية ما بعد الشراء بمستوى فاخر",
      ],
    },
    footer: {
      about:
        "منصة عطور فاخرة بطابع عالمي تجمع بين الثقة والسرد البصري وتجربة تسوق راقية.",
      rights: "جميع الحقوق محفوظة.",
    },
  },
};

export const getDictionary = (locale: Locale) => translations[locale];
