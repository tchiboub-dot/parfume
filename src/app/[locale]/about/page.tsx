export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-14 lg:px-8">
      <h1 className="font-display text-5xl">Our Maison Story</h1>
      <p className="mt-6 text-lg text-[color:var(--text-soft)]">
        Parfume Luxe was created to bring boutique fragrance culture into a seamless modern digital experience.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          "Mission: elevate daily rituals through scent.",
          "Vision: become the most trusted luxury fragrance destination.",
          "Values: authenticity, refinement, care, and timeless beauty.",
        ].map((item) => (
          <div key={item} className="rounded-2xl border border-white/15 bg-[color:var(--surface)]/70 p-5 backdrop-blur-xl">{item}</div>
        ))}
      </div>
    </main>
  );
}
