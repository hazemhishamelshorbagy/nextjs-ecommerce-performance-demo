// app/product/[id]/page.tsx
import { getProductById } from "@/app/lib/getProduct";
import { notFound } from "next/navigation";
import PDPClient from "./pdp-client";


// ✅ Server Component
export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);
debugger
  if (!product) {
    return notFound();
  }

  return <PDPClient product={product} />;
}
