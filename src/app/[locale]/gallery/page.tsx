import Image from "next/image";

import { galleryItems } from "@/lib/data";

export default function GalleryPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <h1 className="font-display text-5xl">Gallery</h1>
      <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {galleryItems.map((item) => (
          <Image key={item} src={item} alt="Boutique gallery" width={1200} height={900} className="mb-4 w-full rounded-2xl" />
        ))}
      </div>
    </main>
  );
}
