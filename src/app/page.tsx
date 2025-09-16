import { Suspense } from "react";
import { products } from "./lib/products";
import ProductCard from "./components/ProductCard";
import ProductSkeleton from "./components/ProductSkeleton";

export default function HomePage() {
  return (
    <div>
      <section className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          Products
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Fast, accessible, conversion-ready storefront components.
        </p>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Suspense
          fallback={Array.from({ length: 6 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        >
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </Suspense>
      </section>
    </div>
  );
}
