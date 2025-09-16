import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center py-16">
      <h2 className="text-2xl font-semibold">Product not found</h2>
      <p className="mt-2 text-gray-600">It might have been removed or never existed.</p>
      <Link href="/" className="mt-6 inline-block rounded-lg bg-black px-4 py-2 text-white">
        Go back home
      </Link>
    </div>
  );
}
