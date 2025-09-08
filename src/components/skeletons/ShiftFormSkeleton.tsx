import { Skeleton } from "@/components/ui/skeleton";

export default function ShiftFormSkeleton() {
  return (
    <div className="rounded-lg bg-amber-100/70 p-4 ring-1 ring-amber-200">
      {/* Section title */}
      <Skeleton className="mb-6 h-6 w-32" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Title */}
        <div className="flex flex-col">
          <Skeleton className="mb-2 h-4 w-16" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        {/* Status */}
        <div className="flex flex-col">
          <Skeleton className="mb-2 h-4 w-16" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        {/* Opening Time (Left) */}
        <div className="flex flex-col">
          <Skeleton className="mb-2 h-4 w-28" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        {/* Opening Time (Right) */}
        <div className="flex flex-col">
          <Skeleton className="mb-2 h-4 w-28" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>
    </div>
  );
}
