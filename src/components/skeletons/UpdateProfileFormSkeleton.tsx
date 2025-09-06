import { Skeleton } from "@/components/ui/skeleton";

const UpdateProfileFormSkeleton = () => {
  return (
    <div className="rounded-2xl bg-amber-100 p-4 space-y-4">
      {/* Username */}
      <div>
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Address */}
      <div>
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Phone */}
      <div>
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Date of Birth */}
      <div>
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Gender */}
      <div className="space-y-2">
        <Skeleton className="h-5 w-24" /> {/* label "Gender" */}
        <div className="flex gap-2">
          <Skeleton className="h-10 w-20 rounded-md" />
          <Skeleton className="h-10 w-20 rounded-md" />
        </div>
      </div>

      {/* Submit button */}
      <div>
        <Skeleton className="h-12 w-full rounded-lg" />
      </div>
    </div>
  );
};

export default UpdateProfileFormSkeleton;
