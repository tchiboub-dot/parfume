export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:py-10 md:py-14 lg:px-8">
      <h1 className="font-display text-3xl sm:text-4xl md:text-5xl leading-tight">Our Maison Story</h1>
      <p className="mt-4 sm:mt-5 md:mt-6 text-sm sm:text-base md:text-lg text-[color:var(--text-soft)] leading-relaxed">
        Parfume Luxe was created to bring boutique fragrance culture into a seamless modern digital experience.
      </p>
      <div className="mt-6 sm:mt-7 md:mt-8 grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-3">
        {[
          "Mission: elevate daily rituals through scent.",
          "Vision: become the most trusted luxury fragrance destination.",
          "Values: authenticity, refinement, care, and timeless beauty.",
        ].map((item) => (
          <div key={item} className="rounded-2xl border border-white/15 bg-[color:var(--surface)]/70 p-4 sm:p-5 backdrop-blur-xl hover:border-[color:var(--gold)]/20 transition">
            <p className="text-xs sm:text-sm text-[color:var(--text-soft)] leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
