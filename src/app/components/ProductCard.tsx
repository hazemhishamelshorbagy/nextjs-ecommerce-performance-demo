"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "../store/cart";
import type { Product } from "../types";
import Link from "next/link";
function centsToUSD(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function ProductCard({ product }: { product: Product }) {
  const add = useCart((s) => s.add);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="group rounded-2xl border bg-white overflow-hidden"
    >
      <Link
        href={`/product/${product.id}`}
        className="relative block aspect-[4/3]"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={false}
        />
        {product.badge && (
          <span className="absolute left-2 top-2 rounded bg-black/80 px-2 py-1 text-[10px] font-medium text-white">
            {product.badge}
          </span>
        )}
      </Link>
      <div className="p-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-medium">{product.name}</h3>
          <span className="text-sm text-gray-600">
            {centsToUSD(product.price)}
          </span>
        </div>
        <p className="mt-1 line-clamp-2 text-sm text-gray-600">
          {product.description}
        </p>

        <button
          onClick={() => add(product)}
          className="mt-3 w-full rounded-lg bg-black px-4 py-2 text-white text-sm font-medium hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-black/30"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
