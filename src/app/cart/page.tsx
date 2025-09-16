"use client";
import { useCart } from "../store/cart";
import Link from "next/link";

function centsToUSD(cents: number) { return `$${(cents / 100).toFixed(2)}`; }

export default function CartPage() {
  const items = useCart((s) => s.items);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);
  const totalCents = useCart((s) => s.totalCents);

  if (items.length === 0) {
    return (
      <div className="py-16 text-center">
        <h1 className="text-2xl font-semibold">Your cart is empty 🛒</h1>
        <p className="mt-2 text-gray-600">Add some products from the homepage.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <section className="lg:col-span-2 card">
        <h1 className="p-4 text-xl font-semibold border-b">Your Cart</h1>
        <ul className="divide-y">
          {items.map((i) => (
            <li key={i.id} className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium">{i.name}</p>
                <p className="text-sm text-gray-600">Qty: {i.qty}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-700">{centsToUSD(i.price * i.qty)}</span>
                <button onClick={() => remove(i.id)} className="btn btn-soft !px-3">
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <aside className="card p-4 space-y-4 h-max">
        <h2 className="text-lg font-semibold">Order Summary</h2>
        <div className="flex items-center justify-between text-lg font-medium">
          <span>Total</span>
          <span>{centsToUSD(totalCents())}</span>
        </div>
        <div className="flex gap-3">
          <button onClick={clear} className="btn btn-soft w-full">Clear</button>
         <Link href="/checkout" className="btn btn-primary w-full text-center">Checkout</Link>

        </div>
      </aside>
    </div>
  );
}
