"use client";

import { Product } from "../../types";
import { useCart } from "../../store/cart";
import ProductGallery from "@/app/components/ProductGallery";

export default function PDPClient({ product }: { product: Product }) {
  const add = useCart((s) => s.add);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Product Gallery */}
      <ProductGallery src={product.image} alt={product.name} />

      {/* Product Info */}
      <section className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
          <p className="mt-2 text-gray-600">{product.description}</p>
        </header>

        <div className="text-2xl font-semibold">
          ${(product.price / 100).toFixed(2)}
        </div>

        <button
          onClick={() => add(product)}
          className="rounded-lg bg-black px-6 py-3 text-white text-sm font-medium hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-black/30"
        >
          Add to Cart
        </button>

        <div className="pt-6 border-t">
          <h2 className="text-lg font-medium">Details</h2>
          <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 space-y-1">
            <li>Optimized images for fast loads</li>
            <li>Accessible controls (keyboard, ARIA)</li>
            <li>Clean, scalable component architecture</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
