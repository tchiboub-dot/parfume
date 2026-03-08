import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, Noto_Naskh_Arabic } from "next/font/google";
import "./globals.css";
import { Starfield } from "@/components/ui/starfield";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const arabic = Noto_Naskh_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://parfume-luxe.example"),
  title: {
    default: "Parfume Luxe | Maison de Fragrance",
    template: "%s | Parfume Luxe",
  },
  description:
    "Parfume Luxe is a premium perfume e-commerce destination with curated haute perfumery, immersive storytelling, and refined digital shopping.",
  openGraph: {
    title: "Parfume Luxe",
    description: "Luxury fragrance platform for men, women, and unisex collections.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${display.variable} ${body.variable} ${arabic.variable} antialiased`}>
        <div className="relative min-h-screen w-full">
          <div aria-hidden className="pointer-events-none fixed inset-0 z-0 bg-[color:var(--bg)]" />
          <Starfield />
          <div className="relative z-20 w-full">{children}</div>
        </div>
      </body>
    </html>
  );
}
