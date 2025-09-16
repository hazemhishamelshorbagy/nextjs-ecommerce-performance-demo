import { create } from "zustand";
import type { Product } from "../types";


export type CartItem = Product & { qty: number };
type CartState = {
  items: CartItem[];
  add: (p: Product) => void;
  remove: (id: string) => void;
  clear: () => void;
  totalCents: () => number;
};
export const useCart = create<CartState>((set, get) => ({
  items: [],
  add: (p) =>
    set((state) => {
      const idx = state.items.findIndex((i) => i.id === p.id);
      if (idx >= 0) {
        const items = [...state.items];
        items[idx] = { ...items[idx], qty: items[idx].qty + 1 };
        return { items };
      }
      return { items: [...state.items, { ...p, qty: 1 }] };
    }),
  remove: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  clear: () => set({ items: [] }),
  totalCents: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
}));
