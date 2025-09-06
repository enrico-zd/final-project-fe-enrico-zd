import { Skeleton } from "@/components/ui/skeleton";

export function LeaveRequestCardSkeleton() {
  return (
    <div className="rounded-xl border mx-4 bg-white px-4 py-8 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <Skeleton className="h-5 w-32" /> {/* "Leave Request" */}
        <Skeleton className="h-6 w-20 rounded-md" /> {/* status badge */}
      </div>

      {/* Leave type */}
      <Skeleton className="mb-1 h-4 w-28" />

      {/* Date range */}
      <Skeleton className="mb-1 h-4 w-56" />

      {/* Requested at */}
      <Skeleton className="mb-1 h-4 w-48" />

      {/* Authorized by */}
      <Skeleton className="mb-3 h-4 w-40" />

      <div className="border-t my-2" />

      {/* Reason */}
      <Skeleton className="mb-1 h-4 w-20" /> {/* label */}
      <Skeleton className="mb-3 h-4 w-48" /> {/* text */}

      {/* Admin Remark */}
      <Skeleton className="mb-1 h-4 w-28" /> {/* label */}
      <Skeleton className="h-4 w-56" /> {/* text */}
    </div>
  );
}
