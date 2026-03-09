export default function ContactPage() {
  return (
    <main className="mx-auto grid max-w-7xl gap-6 sm:gap-7 md:gap-8 px-4 py-8 sm:py-10 md:py-12 lg:grid-cols-2 lg:px-8">
      <section>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl leading-tight">Visit Our Boutique</h1>
        <div className="mt-4 sm:mt-5 md:mt-6 space-y-2 sm:space-y-3 text-xs sm:text-sm text-[color:var(--text-soft)]">
          <p><span className="text-[color:var(--gold)] font-semibold">Phone:</span> +212 6 00 00 00 00</p>
          <p><span className="text-[color:var(--gold)] font-semibold">Email:</span> contact@parfumeluxe.ma</p>
          <p><span className="text-[color:var(--gold)] font-semibold">Instagram:</span> @parfume_luxe</p>
          <p><span className="text-[color:var(--gold)] font-semibold">Address:</span> 31 Avenue de la Lumiere, Casablanca</p>
        </div>
      </section>
      <section className="rounded-2xl sm:rounded-3xl border border-white/15 bg-[color:var(--surface)]/70 p-4 sm:p-5 md:p-6 backdrop-blur-xl">
        <h2 className="font-display text-xl sm:text-2xl md:text-3xl leading-tight">Contact Form</h2>
        <form className="mt-4 sm:mt-5 space-y-3 sm:space-y-4">
          <input className="input-luxe text-xs sm:text-sm py-2 sm:py-2.5" placeholder="Your name" />
          <input className="input-luxe text-xs sm:text-sm py-2 sm:py-2.5" placeholder="Email" />
          <textarea className="input-luxe text-xs sm:text-sm py-2 sm:py-2.5 min-h-24 sm:min-h-32" placeholder="Message" />
          <button className="btn-gold w-full text-xs sm:text-sm py-2 sm:py-3" type="submit">Send Message</button>
        </form>
      </section>
    </main>
  );
}
