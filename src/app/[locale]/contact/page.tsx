export default function ContactPage() {
  return (
    <main className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-2 lg:px-8">
      <section>
        <h1 className="font-display text-5xl">Visit Our Boutique</h1>
        <div className="mt-6 space-y-3 text-[color:var(--text-soft)]">
          <p>Phone: +212 6 00 00 00 00</p>
          <p>Email: contact@parfumeluxe.ma</p>
          <p>Instagram: @parfume_luxe</p>
          <p>Address: 31 Avenue de la Lumiere, Casablanca</p>
        </div>
      </section>
      <section className="rounded-3xl border border-white/15 bg-[color:var(--surface)]/70 p-6 backdrop-blur-xl">
        <h2 className="font-display text-3xl">Contact Form</h2>
        <form className="mt-5 space-y-4">
          <input className="input-luxe" placeholder="Your name" />
          <input className="input-luxe" placeholder="Email" />
          <textarea className="input-luxe min-h-32" placeholder="Message" />
          <button className="btn-gold" type="submit">Send Message</button>
        </form>
      </section>
    </main>
  );
}
