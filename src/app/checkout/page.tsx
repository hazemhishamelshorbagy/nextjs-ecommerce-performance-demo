"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";

import { useCart } from "../store/cart";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

function centsToUSD(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

// 1) schema
const CheckoutSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),
  address: z.string().min(8, "Address is too short"),
  city: z.string().min(2, "City is too short"),
  country: z.string().min(2, "Country is required"),
  card: z
    .string()
    .min(12, "Card number too short")
    .max(19, "Card number too long"),
});

type CheckoutValues = z.infer<typeof CheckoutSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCart((s) => s.items);
  const totalCents = useCart((s) => s.totalCents);
  const clear = useCart((s) => s.clear);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutValues>({
    resolver: zodResolver(CheckoutSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      city: "",
      country: "",
      card: "",
    },
  });

  if (items.length === 0) {
    return (
      <div className="py-16 text-center">
        <h1 className="text-2xl font-semibold">Your cart is empty</h1>
        <p className="mt-2 text-gray-600">
          Add products first, then return to checkout.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded bg-black px-4 py-2 text-white"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const onSubmit = async (data: CheckoutValues) => {
    // simulate processing / API call
    await new Promise((r) => setTimeout(r, 700));
    // normally you would send data + items to your backend here.
    router.push("/checkout/success");
    clear(); // clear cart on successful “order”
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h1 className="text-2xl font-semibold">Checkout</h1>

        <div>
          <label className="block text-sm font-medium">Full name</label>
          <input
            {...register("name")}
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            placeholder="Hazem Mohamed"
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            {...register("email")}
            type="email"
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Address</label>
          <input
            {...register("address")}
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            placeholder="123 Main St"
            aria-invalid={!!errors.address}
          />
          {errors.address && (
            <p className="mt-1 text-xs text-red-600">
              {errors.address.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium">City</label>
            <input
              {...register("city")}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              placeholder="Cairo"
              aria-invalid={!!errors.city}
            />
            {errors.city && (
              <p className="mt-1 text-xs text-red-600">{errors.city.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Country</label>
            <input
              {...register("country")}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              placeholder="Egypt"
              aria-invalid={!!errors.country}
            />
            {errors.country && (
              <p className="mt-1 text-xs text-red-600">
                {errors.country.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Card number</label>
          <input
            {...register("card")}
            inputMode="numeric"
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm tracking-widest"
            placeholder="4242 4242 4242 4242"
            aria-invalid={!!errors.card}
          />
          {errors.card && (
            <p className="mt-1 text-xs text-red-600">{errors.card.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 rounded-lg bg-black px-4 py-2 text-white text-sm font-medium hover:bg-black/90 disabled:opacity-60"
        >
          {isSubmitting ? "Processing…" : "Place Order"}
        </button>
      </form>

      {/* order summary */}
      <aside className="space-y-4">
        <h2 className="text-xl font-semibold">Order Summary</h2>

        <ul className="divide-y rounded-lg border bg-white">
          {items.map((i) => (
            <li key={i.id} className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium">{i.name}</p>
                <p className="text-sm text-gray-600">Qty: {i.qty}</p>
              </div>
              <p className="text-sm text-gray-700">
                {centsToUSD(i.price * i.qty)}
              </p>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between text-lg font-medium">
          <span>Total</span>
          <span>{centsToUSD(totalCents())}</span>
        </div>
      </aside>
    </div>
  );
}
