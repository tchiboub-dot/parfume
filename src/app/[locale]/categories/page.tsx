const categories = [
  "Luxury Perfumes",
  "Daily Wear",
  "Evening Fragrances",
  "Gift Sets",
  "Signature Scents",
  "Fresh Perfumes",
  "Oriental Perfumes",
  "Woody Perfumes",
  "Floral Perfumes",
];

export default function CategoriesPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <h1 className="font-display text-5xl">Categories</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((item) => (
          <article key={item} className="rounded-2xl border border-white/15 bg-[color:var(--surface)]/70 p-6 backdrop-blur-xl">
            <h2 className="font-display text-2xl">{item}</h2>
          </article>
        ))}
      </div>
    </main>
  );
}
