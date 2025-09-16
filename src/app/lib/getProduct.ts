import { products } from "../lib/products";

export function getProductById(id: string) {
  return products.find((p) => p.id === id) ?? null;
}