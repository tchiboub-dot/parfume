export default function OffersPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:py-10 md:py-12 lg:px-8">
      <h1 className="font-display text-3xl sm:text-4xl md:text-5xl leading-tight">Seasonal Luxury Offers</h1>
      <div className="mt-6 sm:mt-7 md:mt-8 grid gap-4 sm:gap-5 grid-cols-1 md:grid-cols-3">
        {["Ramadan Gift Edit -20%", "Anniversary Bundle", "Signature Duo"].map((offer) => (
          <article key={offer} className="rounded-2xl border border-white/15 bg-[color:var(--surface)]/70 p-4 sm:p-5 md:p-6 backdrop-blur-xl hover:border-[color:var(--gold)]/20 transition">
            <h2 className="font-display text-lg sm:text-xl md:text-2xl leading-tight">{offer}</h2>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-[color:var(--text-soft)] leading-relaxed">Limited quantities with premium gift boxing.</p>
          </article>
        ))}
      </div>
    </main>
  );
}
