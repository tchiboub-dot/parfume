export default function OffersPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <h1 className="font-display text-5xl">Seasonal Luxury Offers</h1>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {["Ramadan Gift Edit -20%", "Anniversary Bundle", "Signature Duo"].map((offer) => (
          <article key={offer} className="rounded-2xl border border-white/15 bg-[color:var(--surface)]/70 p-6 backdrop-blur-xl">
            <h2 className="font-display text-2xl">{offer}</h2>
            <p className="mt-3 text-[color:var(--text-soft)]">Limited quantities with premium gift boxing.</p>
          </article>
        ))}
      </div>
    </main>
  );
}
