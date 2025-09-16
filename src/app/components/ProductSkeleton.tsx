export default function ProductSkeleton() {
  return (
    <div className="rounded-2xl border bg-white overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-gray-200" />

      <div className="p-4 space-y-3">
        <div className="h-4 w-2/3 bg-gray-200 rounded" />
        <div className="h-3 w-1/2 bg-gray-200 rounded" />
        <div className="h-8 w-full bg-gray-300 rounded" />
      </div>
    </div>
  );
}
