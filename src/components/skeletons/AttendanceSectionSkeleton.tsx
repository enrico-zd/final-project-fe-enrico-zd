import { Skeleton } from "@/components/ui/skeleton";

type Props = { rows?: number };

export default function AttendanceSectionSkeleton({ rows = 6 }: Props) {
  const cols = [
    "No",
    "Employee Name",
    "Check In At",
    "Check Out At",
    "Attendance Status",
    "Attendance By",
    "Late",
    "Action",
  ];

  return (
    <div className="overflow-x-auto rounded-2xl ring-1 ring-amber-200">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-amber-400 text-white">
            {cols.map((c) => (
              <th key={c} className="px-4 py-2 text-left text-sm font-semibold">
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
              {/* Date */}
              <td className="px-4 py-3">
                <Skeleton className="h-4 w-40" />
              </td>

              {/* Check In / Out */}
              <td className="px-4 py-3">
                <Skeleton className="h-4 w-16" />
              </td>
              <td className="px-4 py-3">
                <Skeleton className="h-4 w-16" />
              </td>

              {/* Work Hour / Late Minutes / Overtime */}
              <td className="px-4 py-3">
                <Skeleton className="h-4 w-12" />
              </td>
              <td className="px-4 py-3">
                <Skeleton className="h-4 w-16" />
              </td>
              <td className="px-4 py-3">
                <Skeleton className="h-4 w-20" />
              </td>

              {/* Status */}
              <td className="px-4 py-3">
                <Skeleton className="h-5 w-20 rounded-full" />
              </td>

              {/* Attendance By */}
              <td className="px-4 py-3">
                <Skeleton className="h-4 w-10" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
