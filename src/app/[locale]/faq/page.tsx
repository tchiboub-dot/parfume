import { faqItems } from "@/lib/data";

export default function FaqPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 lg:px-8">
      <h1 className="font-display text-5xl">FAQ</h1>
      <div className="mt-8 space-y-4">
        {faqItems.map((item) => (
          <article key={item.q} className="rounded-2xl border border-white/15 bg-[color:var(--surface)]/70 p-6 backdrop-blur-xl">
            <h2 className="font-semibold">{item.q}</h2>
            <p className="mt-2 text-[color:var(--text-soft)]">{item.a}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
