// components/skeletons/EmployeeFormSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function EmployeeFormSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Personal Details */}
      <div className="rounded-2xl bg-amber-100/70 p-4 ring-1 ring-amber-200">
        <Skeleton className="mb-4 h-6 w-44" /> {/* Title */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Row 1 */}
          <div>
            <Skeleton className="mb-2 h-4 w-24" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div>
            <Skeleton className="mb-2 h-4 w-40" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          {/* Row 2 */}
          <div>
            <Skeleton className="mb-2 h-4 w-40" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div>
            <Skeleton className="mb-2 h-4 w-40" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          {/* Row 3 */}
          <div>
            <Skeleton className="mb-2 h-4 w-12" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div>
            <Skeleton className="mb-2 h-4 w-16" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          {/* Row 4 */}
          <div>
            <Skeleton className="mb-2 h-4 w-24" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div>
            <Skeleton className="mb-2 h-4 w-24" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          {/* Row 5: Date + Username */}
          <div>
            <Skeleton className="mb-2 h-4 w-28" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-10 w-10 rounded-md" /> {/* calendar icon box */}
            </div>
          </div>
          <div>
            <Skeleton className="mb-2 h-4 w-20" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          {/* Row 6: Role (select) + Password */}
          <div>
            <Skeleton className="mb-2 h-4 w-10" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div>
            <Skeleton className="mb-2 h-4 w-16" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          {/* Row 7: Avatar upload */}
          <div className="md:col-span-2">
            <Skeleton className="mb-2 h-4 w-40" />
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-40 rounded-lg" /> {/* button */}
              <Skeleton className="h-8 w-28 rounded-full" /> {/* badge info */}
            </div>
          </div>
        </div>
      </div>

      {/* Company Details */}
      <div className="rounded-2xl bg-amber-100/70 p-4 ring-1 ring-amber-200">
        <Skeleton className="mb-4 h-6 w-44" /> {/* Title */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Company + Employee Type */}
          <div>
            <Skeleton className="mb-2 h-4 w-20" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div>
            <Skeleton className="mb-2 h-4 w-28" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          {/* User Type + Workspace */}
          <div>
            <Skeleton className="mb-2 h-4 w-20" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div>
            <Skeleton className="mb-2 h-4 w-20" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          {/* Joining Date + Leaving Date */}
          <div>
            <Skeleton className="mb-2 h-4 w-24" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-10 w-10 rounded-md" />
            </div>
          </div>
          <div>
            <Skeleton className="mb-2 h-4 w-40" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-10 w-10 rounded-md" />
            </div>
          </div>
          {/* Shift */}
          <div className="md:col-span-2">
            <Skeleton className="mb-2 h-4 w-10" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          {/* Status */}
          <div className="md:col-span-2">
            <Skeleton className="mb-2 h-4 w-14" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
