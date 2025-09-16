"use client";


import { useRouter } from "next/navigation";
import { useCart } from "../store/cart";

function centsToUSD(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function CartPage() {
  const items = useCart((s) => s.items);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);
  const totalCents = useCart((s) => s.totalCents);
  const router = useRouter();
  if (items.length === 0) {
    return (
      <div className="py-16 text-center">
        <h1 className="text-2xl font-semibold">Your cart is empty 🛒</h1>
        <p className="mt-2 text-gray-600">
          Add some products from the homepage.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Your Cart</h1>

      <ul className="divide-y border rounded-lg bg-white">
        {items.map((item) => (
          <li key={item.id} className="flex items-center justify-between p-4">
            <div>
              <h2 className="font-medium">{item.name}</h2>
              <p className="text-sm text-gray-600">Qty: {item.qty}</p>
              <p className="text-sm text-gray-600">
                {centsToUSD(item.price * item.qty)}
              </p>
            </div>
            <button
              onClick={() => remove(item.id)}
              className="rounded bg-red-500 px-3 py-1 text-white text-sm hover:bg-red-600"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between text-lg font-medium">
        <span>Total:</span>
        <span>{centsToUSD(totalCents())}</span>
      </div>

      <div className="flex gap-4">
        <button
          onClick={clear}
          className="rounded bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300"
        >
          Clear Cart
        </button>
        <button
          onClick={() => router.push("/checkout")}
          className="rounded bg-black px-4 py-2 text-white text-sm hover:bg-black/90"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
