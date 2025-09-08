// components/skeletons/EditLeaveTypeFormSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function LeaveTypeFormSkeleton() {
  return (
    <div className="rounded-xl bg-amber-200/60 p-6">

      {/* Form fields */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-32" /> {/* Label */}
          <Skeleton className="h-10 w-full rounded-md" /> {/* Input */}
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>

      {/* Submit button */}
      <div className="mt-8 flex justify-center">
        <Skeleton className="h-10 w-40 rounded-lg" />
      </div>
    </div>
  );
}
