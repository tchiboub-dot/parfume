export default function JournalPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <h1 className="font-display text-5xl">Fragrance Journal</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {["How to choose your signature scent", "Top notes vs base notes", "Office-safe fragrance guide"].map((item) => (
          <article key={item} className="rounded-2xl border border-white/15 bg-[color:var(--surface)]/70 p-6 backdrop-blur-xl">
            <h2 className="font-display text-2xl">{item}</h2>
          </article>
        ))}
      </div>
    </main>
  );
}
