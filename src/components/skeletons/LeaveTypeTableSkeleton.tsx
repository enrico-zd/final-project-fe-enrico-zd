// components/skeletons/LeaveTypeTableSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

type Props = { rows?: number };

export default function LeaveTypeTableSkeleton({ rows = 3 }: Props) {
  const cols = ["#", "Type", "Is Paid", "Allocated Days", "Action"];

  return (
    <div className="overflow-x-auto rounded-2xl ring-1 ring-amber-200">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-amber-400 text-white">
            {cols.map((c) => (
              <th
                key={c}
                className="px-4 py-2 text-left text-sm font-semibold"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <tr
              key={i}
              className={i % 2 === 1 ? "bg-amber-50/70" : "bg-amber-50"}
            >
              {/* # */}
              <td className="px-4 py-3">
                <Skeleton className="h-4 w-5" />
              </td>

              {/* Type */}
              <td className="px-4 py-3">
                <Skeleton className="h-4 w-32" />
              </td>

              {/* Is Paid */}
              <td className="px-4 py-3">
                <Skeleton className="h-4 w-12" />
              </td>

              {/* Allocated Days */}
              <td className="px-4 py-3">
                <Skeleton className="h-4 w-8" />
              </td>

              {/* Action */}
              <td className="px-4 py-3 flex gap-2">
                <Skeleton className="h-6 w-6 rounded-md" />
                <Skeleton className="h-6 w-6 rounded-md" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
