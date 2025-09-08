import { Skeleton } from "@/components/ui/skeleton";

export default function ShiftTableSkeleton() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse rounded-2xl overflow-hidden">
        <thead>
          <tr className="bg-amber-400 text-white">
            <th className="px-4 py-2 text-left">No</th>
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Opening Time</th>
            <th className="px-4 py-2 text-left">Closing Time</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody className="bg-amber-50">
          {[...Array(3)].map((_, i) => (
            <tr key={i} className="border-b">
              {/* No */}
              <td className="px-4 py-3">
                <Skeleton className="h-4 w-6" />
              </td>
              {/* Title */}
              <td className="px-4 py-3">
                <Skeleton className="h-4 w-24" />
              </td>
              {/* Opening Time */}
              <td className="px-4 py-3">
                <Skeleton className="h-4 w-20" />
              </td>
              {/* Closing Time */}
              <td className="px-4 py-3">
                <Skeleton className="h-4 w-20" />
              </td>
              {/* Status */}
              <td className="px-4 py-3">
                <Skeleton className="h-4 w-16" />
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
