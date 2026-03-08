export type Perfume = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  family: "Floral" | "Woody" | "Oriental" | "Fresh" | "Amber" | "Musk";
  concentration: "EDP" | "EDT" | "Parfum" | "Extrait";
  audience: "Men" | "Women" | "Unisex";
  stock: number;
  sizeOptions: string[];
  image: string;
  gallery: string[];
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  description: string;
  tags: string[];
};

export type Testimonial = {
  id: string;
  name: string;
  city: string;
  quote: string;
  rating: number;
};
