import Image from "next/image";

import { perfumes } from "@/lib/data";

export default function WishlistPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 lg:px-8">
      <h1 className="font-display text-5xl">Wishlist</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {perfumes.map((item) => (
          <article key={item.id} className="rounded-2xl border border-white/15 bg-[color:var(--surface)]/70 p-4 backdrop-blur-xl">
            <Image src={item.image} alt={item.name} width={900} height={700} className="h-44 w-full rounded-xl object-cover" />
            <p className="mt-3">{item.name}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
