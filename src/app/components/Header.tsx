"use client";
import Link from "next/link";
import { ShoppingCart, Search } from "lucide-react";
import { useCart } from "../store/cart";
import { useMemo } from "react";

export default function Header() {
  const items = useCart((s) => s.items);
  const count = useMemo(() => items.reduce((n, i) => n + i.qty, 0), [items]);

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-4">
        <Link href="/" className="font-semibold tracking-tight">
          <span className="inline-block rounded-md bg-black px-2 py-1 text-white">next</span>
          <span className="ml-2 hidden sm:inline text-gray-900">commerce</span>
        </Link>

        <div className="ml-auto flex items-center gap-2">
          <button aria-label="Search" className="btn btn-soft !px-3">
            <Search className="h-4 w-4" />
          </button>
          <Link href="/cart" aria-label="Cart" className="btn btn-soft !px-3 relative">
            <ShoppingCart className="h-4 w-4" />
            {count > 0 && (
              <span
                className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-black px-1.5 text-[10px] font-medium text-white"
                aria-live="polite"
              >
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
