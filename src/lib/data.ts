import { Perfume, Testimonial } from "@/lib/types";

export const perfumes: Perfume[] = [
  {
    id: "p1",
    slug: "noir-amber-reserve",
    name: "Noir Amber Reserve",
    brand: "Parfume Luxe Signature",
    price: 189,
    oldPrice: 220,
    rating: 4.9,
    reviewsCount: 286,
    family: "Amber",
    concentration: "Extrait",
    audience: "Unisex",
    stock: 26,
    sizeOptions: ["50ml", "100ml"],
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80",
    ],
    notes: {
      top: ["Saffron", "Bergamot"],
      heart: ["Damask Rose", "Cedarwood"],
      base: ["Amber", "Vanilla", "Musk"],
    },
    description:
      "A sensual amber composition with velvety rose and smoky woods, crafted for unforgettable evenings.",
    tags: ["Evening", "Wedding", "Signature"],
  },
  {
    id: "p2",
    slug: "velvet-iris-elixir",
    name: "Velvet Iris Elixir",
    brand: "Maison D'Or",
    price: 145,
    rating: 4.7,
    reviewsCount: 198,
    family: "Floral",
    concentration: "EDP",
    audience: "Women",
    stock: 44,
    sizeOptions: ["30ml", "50ml", "100ml"],
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1615634262417-5f3f2ecf7f2d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1611930021592-a8cfd5319ceb?auto=format&fit=crop&w=1200&q=80",
    ],
    notes: {
      top: ["Pear", "Neroli"],
      heart: ["Iris", "Peony"],
      base: ["Sandalwood", "White Musk"],
    },
    description:
      "Powdery iris draped in luminous florals and silky musk for a chic daytime signature.",
    tags: ["Office", "Daily Wear", "Gift"],
  },
  {
    id: "p3",
    slug: "atlas-wood-intense",
    name: "Atlas Wood Intense",
    brand: "Noble Oud Atelier",
    price: 210,
    rating: 4.8,
    reviewsCount: 172,
    family: "Woody",
    concentration: "Parfum",
    audience: "Men",
    stock: 18,
    sizeOptions: ["75ml", "125ml"],
    image:
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600612253971-422e7f7faeb6?auto=format&fit=crop&w=1200&q=80",
    ],
    notes: {
      top: ["Grapefruit", "Cardamom"],
      heart: ["Patchouli", "Vetiver"],
      base: ["Oud", "Tonka Bean", "Labdanum"],
    },
    description:
      "A commanding woody profile with atlas cedar and oud, designed for statement-making presence.",
    tags: ["Evening", "Business", "Formal"],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Sofia A.",
    city: "Casablanca",
    quote:
      "The packaging, scent quality, and boutique-level service are truly exceptional. It feels like a private perfumery experience.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Yassine M.",
    city: "Rabat",
    quote:
      "Fast delivery and authentic niche fragrances. The recommendation system helped me find my signature scent.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Leila B.",
    city: "Marrakech",
    quote:
      "Elegant design, smooth checkout, and the perfumes are top-tier. It finally feels like a real luxury fragrance house online.",
    rating: 5,
  },
];

export const galleryItems = [
  "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1615634262417-5f3f2ecf7f2d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1611930021592-a8cfd5319ceb?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600612253971-422e7f7faeb6?auto=format&fit=crop&w=1200&q=80",
];

export const faqItems = [
  {
    q: "Are all perfumes authentic?",
    a: "Yes. Every fragrance is sourced from authorized suppliers and verified before shipping.",
  },
  {
    q: "Do you offer gift packaging?",
    a: "Yes, premium signature packaging is available for all gift orders.",
  },
  {
    q: "Can I return a perfume?",
    a: "Unopened fragrances can be returned within 7 days according to our return policy.",
  },
];

export const adminStats = {
  revenue: "$128,450",
  orders: 942,
  customers: 412,
  lowStock: 7,
};
