import { perfumes } from "@/lib/data";

export default function CartPage() {
  const item = perfumes[0];
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 lg:px-8">
      <h1 className="font-display text-5xl">Your Cart</h1>
      <div className="mt-8 rounded-2xl border border-white/15 bg-[color:var(--surface)]/70 p-6 backdrop-blur-xl">
        <p>{item.name} x1 - ${item.price}</p>
        <p className="mt-3 text-[color:var(--text-soft)]">Subtotal: ${item.price}</p>
      </div>
    </main>
  );
}
