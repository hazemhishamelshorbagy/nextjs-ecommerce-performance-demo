"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCart } from "../store/cart";

function centsToUSD(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

/** ── schema (RHF + Zod) ─────────────────────────────────────────────── */
const CheckoutSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),
  address: z.string().min(8, "Address is too short"),
  city: z.string().min(2, "City is too short"),
  country: z.string().min(2, "Country is required"),
  card: z
    .string()
    .min(12, "Card number too short")
    .max(24, "Card number too long"),
});
type CheckoutValues = z.infer<typeof CheckoutSchema>;

/** ── component ──────────────────────────────────────────────────────── */
export default function CheckoutPage() {
  const router = useRouter();
  const items = useCart((s) => s.items);
  const totalCents = useCart((s) => s.totalCents);
  const clear = useCart((s) => s.clear);
console.log("checkout items", items);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<CheckoutValues>({
    resolver: zodResolver(CheckoutSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      city: "",
      country: "Egypt",
      card: "",
    },
  });

  // simple visual grouping of the card input (no external lib)
  const card = watch("card");
  const formatCard = (v: string) =>
    v
      .replace(/[^\d ]/g, "")
      .replace(/\s+/g, "")
      .slice(0, 19)
      .replace(/(\d{4})(?=\d)/g, "$1 ")
      .trim();

  if (items.length === 0) {
    return (
      <div className="py-16 text-center">
        <h1 className="text-2xl font-semibold">Your cart is empty</h1>
        <p className="mt-2 text-gray-600">Add products first, then return to checkout.</p>
        <Link href="/" className="btn btn-primary mt-6 inline-block">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const onSubmit = async (_data: CheckoutValues) => {
    // simulate server processing
    await new Promise((r) => setTimeout(r, 600));
    clear();
    router.push("/checkout/success");
  };

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* LEFT: form */}
      <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-2 card p-6 space-y-6">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Checkout</h1>
          <p className="text-sm text-gray-600">
            Secure and fast — your data is not stored. Fields marked * are required.
          </p>
        </header>

        {/* Contact */}
        <section className="space-y-3">
          <h2 className="text-lg font-medium">Contact</h2>
          <div>
            <label className="label">Full name *</label>
            <input
              {...register("name")}
              className="input mt-1"
              placeholder="Hazem Mohamed"
              aria-invalid={!!errors.name}
            />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
          </div>

          <div>
            <label className="label">Email *</label>
            <input
              {...register("email")}
              type="email"
              className="input mt-1"
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
            />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
          </div>
        </section>

        <div className="h-px bg-gray-200" />

        {/* Shipping */}
        <section className="space-y-3">
          <h2 className="text-lg font-medium">Shipping</h2>

          <div>
            <label className="label">Address *</label>
            <input
              {...register("address")}
              className="input mt-1"
              placeholder="123 Main St"
              aria-invalid={!!errors.address}
            />
            {errors.address && <p className="mt-1 text-xs text-red-600">{errors.address.message}</p>}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="label">City *</label>
              <input
                {...register("city")}
                className="input mt-1"
                placeholder="Cairo"
                aria-invalid={!!errors.city}
              />
              {errors.city && <p className="mt-1 text-xs text-red-600">{errors.city.message}</p>}
            </div>
            <div>
              <label className="label">Country *</label>
              <select
                {...register("country")}
                className="input mt-1"
                aria-invalid={!!errors.country}
              >
                <option>Egypt</option>
                <option>Saudi Arabia</option>
                <option>United Arab Emirates</option>
                <option>Qatar</option>
                <option>Kuwait</option>
                <option>United Kingdom</option>
                <option>Germany</option>
                <option>United States</option>
              </select>
              {errors.country && (
                <p className="mt-1 text-xs text-red-600">{errors.country.message}</p>
              )}
            </div>
          </div>
        </section>

        <div className="h-px bg-gray-200" />

        {/* Payment */}
        <section className="space-y-3">
          <h2 className="text-lg font-medium">Payment</h2>
          <div>
            <label className="label">Card number *</label>
            <input
              {...register("card")}
              value={card}
              onChange={(e) => setValue("card", formatCard(e.target.value), { shouldValidate: true })}
              inputMode="numeric"
              className="input mt-1 tracking-widest"
              placeholder="4242 4242 4242 4242"
              aria-invalid={!!errors.card}
            />
            {errors.card && <p className="mt-1 text-xs text-red-600">{errors.card.message}</p>}
          </div>
        </section>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Link href="/cart" className="btn btn-soft">Back to Cart</Link>
          <button type="submit" disabled={isSubmitting} className="btn btn-primary">
            {isSubmitting ? "Processing…" : "Place Order"}
          </button>
        </div>
      </form>

      {/* RIGHT: order summary */}
      <aside className="card p-6 h-max lg:sticky lg:top-20 space-y-4">
        <h2 className="text-lg font-semibold">Order Summary</h2>
        <ul className="divide-y">
          {items.map((i) => (
            <li key={i.id} className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium">{i.name}</p>
                <p className="text-sm text-gray-600">Qty: {i.qty}</p>
              </div>
              <p className="text-sm text-gray-700">{centsToUSD(i.price * i.qty)}</p>
            </li>
          ))}
        </ul>

        <div className="h-px bg-gray-200" />
        <div className="flex items-center justify-between text-lg font-medium">
          <span>Total</span>
          <span>{centsToUSD(totalCents())}</span>
        </div>

        <p className="text-xs text-gray-600">
          Prices include taxes where applicable. Shipping is calculated at the next step.
        </p>
      </aside>
    </div>
  );
}
