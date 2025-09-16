"use client";
import { Product } from "../../types";
import { useCart } from "../../store/cart";
import ProductGallery from "../../components/ProductGallery";

export default function PDPClient({ product }: { product: Product }) {
  const add = useCart((s) => s.add);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <ProductGallery src={product.image} alt={product.name} />

      <section className="card p-6 space-y-6">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
          <p className="mt-2 text-gray-600">{product.description}</p>
        </header>

        <div className="text-2xl font-semibold">${(product.price / 100).toFixed(2)}</div>

        <div className="flex gap-3">
          <button onClick={() => add(product)} className="btn btn-primary">
            Add to Cart
          </button>
        </div>

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
