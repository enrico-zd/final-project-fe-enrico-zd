import { Skeleton } from "@/components/ui/skeleton";

export function AttendanceHistorySkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="rounded-lg bg-amber-100 p-4 shadow-md space-y-3"
        >
          {/* Header: Date & Day */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-20" />   {/* Date e.g. "Sep 02" */}
            <Skeleton className="h-4 w-10" />   {/* Day e.g. "Tue" */}
          </div>

          {/* Start row */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-12" />   {/* label "Start" */}
            <Skeleton className="h-4 w-20" />   {/* time "13:20:29" */}
          </div>

          {/* End row */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-10" />   {/* label "End" */}
            <Skeleton className="h-4 w-20" />   {/* time "13:21:48" */}
          </div>
        </div>
      ))}
    </div>
  );
}
