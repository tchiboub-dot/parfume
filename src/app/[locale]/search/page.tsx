export default function SearchPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 lg:px-8">
      <h1 className="font-display text-5xl">Search Fragrances</h1>
      <div className="mt-8 rounded-2xl border border-white/15 bg-[color:var(--surface)]/70 p-6 backdrop-blur-xl">
        <input className="input-luxe" placeholder="Search by perfume, brand, note, or occasion" />
      </div>
    </main>
  );
}
