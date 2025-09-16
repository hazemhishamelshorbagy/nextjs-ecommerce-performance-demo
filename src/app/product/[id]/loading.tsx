// app/product/[id]/loading.tsx
export default function Loading() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="aspect-square rounded-2xl bg-gray-200 animate-pulse" />
      <div className="space-y-4">
        <div className="h-6 w-2/3 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
        <div className="h-10 w-40 bg-gray-300 rounded animate-pulse" />
        <div className="h-32 w-full bg-gray-100 rounded animate-pulse" />
      </div>
    </div>
  );
}
