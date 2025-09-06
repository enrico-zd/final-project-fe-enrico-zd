import { Skeleton } from "@/components/ui/skeleton";

export function AttendanceDashboardSkeleton() {
  return (
    <div className="space-y-6 p-4">
      {/* Clock */}
      <div className="flex flex-col items-center space-y-2">
        <Skeleton className="h-10 w-40" /> {/* jam besar */}
        <Skeleton className="h-4 w-56" />   {/* tanggal */}
      </div>

      {/* Check In / Out */}
      <div className="flex justify-between rounded-xl bg-amber-50 p-4 shadow-md">
        <div className="flex flex-col items-center space-y-2 flex-1">
          <Skeleton className="h-4 w-20" /> {/* label Check In */}
          <Skeleton className="h-5 w-16" /> {/* time */}
          <Skeleton className="h-10 w-28 rounded-full" /> {/* tombol */}
        </div>
        <div className="flex flex-col items-center space-y-2 flex-1">
          <Skeleton className="h-4 w-24" /> {/* label Check Out */}
          <Skeleton className="h-5 w-16" /> {/* time */}
          <Skeleton className="h-10 w-28 rounded-full" /> {/* tombol */}
        </div>
      </div>

      {/* Working Hours */}
      <div className="flex flex-col items-center space-y-2">
        <Skeleton className="h-5 w-40" />   {/* label "Working Hours" */}
        <Skeleton className="h-10 w-36 rounded-lg" /> {/* bar jam */}
      </div>
    </div>
  );
}
