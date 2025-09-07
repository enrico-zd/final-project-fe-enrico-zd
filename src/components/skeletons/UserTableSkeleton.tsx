import { Skeleton } from "@/components/ui/skeleton";

const UserTableSkeleton = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse rounded-2xl overflow-hidden">
        <thead>
          <tr className="bg-amber-400 text-white">
            <th className="px-4 py-2 text-left">No</th>
            <th className="px-4 py-2 text-left">#</th>
            <th className="px-4 py-2 text-left">Full Name</th>
            <th className="px-4 py-2 text-left">Address</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Phone Number</th>
            <th className="px-4 py-2 text-left">Is Active</th>
            <th className="px-4 py-2 text-left">Edit</th>
          </tr>
        </thead>
        <tbody className="bg-amber-50">
          {[...Array(3)].map((_, i) => (
            <tr key={i} className="border-b">
              <td className="px-4 py-3">
                <Skeleton className="h-4 w-6" />
              </td>
              <td className="px-4 py-3">
                <Skeleton className="h-5 w-5 rounded-full" />
              </td>
              <td className="px-4 py-3">
                <Skeleton className="h-4 w-24" />
              </td>
              <td className="px-4 py-3">
                <Skeleton className="h-4 w-32" />
              </td>
              <td className="px-4 py-3">
                <Skeleton className="h-4 w-40" />
              </td>
              <td className="px-4 py-3">
                <Skeleton className="h-4 w-28" />
              </td>
              <td className="px-4 py-3">
                <Skeleton className="h-4 w-16" />
              </td>
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
};

export default UserTableSkeleton;
