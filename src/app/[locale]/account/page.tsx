export default function AccountPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 lg:px-8">
      <h1 className="font-display text-5xl">My Account</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {["Profile", "Order History", "Addresses"].map((item) => (
          <article key={item} className="rounded-2xl border border-white/15 bg-[color:var(--surface)]/70 p-6 backdrop-blur-xl">{item}</article>
        ))}
      </div>
    </main>
  );
}
