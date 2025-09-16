export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Hazem — Next.js E-Commerce Performance Demo</p>
      </div>
    </footer>
  );
}
