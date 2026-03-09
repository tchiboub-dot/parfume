import { faqItems } from "@/lib/data";

export default function FaqPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:py-10 md:py-12 lg:px-8">
      <h1 className="font-display text-3xl sm:text-4xl md:text-5xl leading-tight">FAQ</h1>
      <div className="mt-6 sm:mt-7 md:mt-8 space-y-3 sm:space-y-4">
        {faqItems.map((item) => (
          <article key={item.q} className="rounded-2xl border border-white/15 bg-[color:var(--surface)]/70 p-4 sm:p-5 md:p-6 backdrop-blur-xl hover:border-[color:var(--gold)]/20 transition">
            <h2 className="font-semibold text-sm sm:text-base text-[color:var(--text)]">{item.q}</h2>
            <p className="mt-2 text-xs sm:text-sm text-[color:var(--text-soft)] leading-relaxed">{item.a}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
