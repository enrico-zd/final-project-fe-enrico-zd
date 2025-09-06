import { Skeleton } from "@/components/ui/skeleton";

const ProfileDetailSkeleton = () => {
  return (
    <div className="p-4">
      <div className="flex flex-col items-center gap-3">
        {/* Avatar */}
        <Skeleton className="h-20 w-20 rounded-xl" />

        {/* Name / username / email */}
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-56" />
      </div>

      {/* Section title */}
      <div className="mt-6">
        <Skeleton className="h-6 w-40" />
      </div>

      {/* Other Detail card */}
      <div className="mt-3 rounded-2xl bg-amber-200/70 p-4 shadow-lg">
        <div className="grid grid-cols-2 gap-y-3">
          {/* Phone */}
          <div className="space-y-1">
            <Skeleton className="h-4 w-28" />
          </div>
          <div className="flex justify-end">
            <Skeleton className="h-4 w-40" />
          </div>

          {/* DOB */}
          <div className="space-y-1">
            <Skeleton className="h-4 w-28" />
          </div>
          <div className="flex justify-end">
            <Skeleton className="h-4 w-32" />
          </div>

          {/* Gender */}
          <div className="space-y-1">
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="flex justify-end">
            <Skeleton className="h-4 w-24" />
          </div>

          {/* Address */}
          <div className="space-y-1">
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="flex justify-end">
            <Skeleton className="h-4 w-56" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailSkeleton;
