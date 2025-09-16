import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="py-16 text-center">
      <h1 className="text-2xl font-semibold">Order placed successfully 🎉</h1>
      <p className="mt-2 text-gray-600">
        You’ll receive a confirmation email shortly.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded bg-black px-4 py-2 text-white"
      >
        Back to Home
      </Link>
    </div>
  );
}
