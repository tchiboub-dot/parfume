export default function CheckoutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 lg:px-8">
      <h1 className="font-display text-5xl">Checkout</h1>
      <form className="mt-8 grid gap-4 rounded-2xl border border-white/15 bg-[color:var(--surface)]/70 p-6 backdrop-blur-xl md:grid-cols-2">
        <input className="input-luxe" placeholder="Full name" />
        <input className="input-luxe" placeholder="Phone" />
        <input className="input-luxe md:col-span-2" placeholder="Address" />
        <select className="input-luxe"><option>Payment: Stripe</option><option>Cash on Delivery</option></select>
        <button type="submit" className="btn-gold">Place Order</button>
      </form>
    </main>
  );
}
