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
    <main className="mx-auto max-w-7xl px-4 py-8 sm:py-10 md:py-12 lg:px-8">
      <h1 className="font-display text-3xl sm:text-4xl md:text-5xl leading-tight">Categories</h1>
      <div className="mt-6 sm:mt-7 md:mt-8 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((item) => (
          <article key={item} className="rounded-2xl border border-white/15 bg-[color:var(--surface)]/70 p-4 sm:p-5 md:p-6 backdrop-blur-xl hover:border-[color:var(--gold)]/20 transition">
            <h2 className="font-display text-lg sm:text-xl md:text-2xl leading-tight">{item}</h2>
          </article>
        ))}
      </div>
    </main>
  );
}
