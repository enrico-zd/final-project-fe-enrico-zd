import NavBread from "@/components/nav-bread";
import LeaveList from "@/components/admin-page/leaveList";
import Link from "next/link";

export default function Leave() {
  return (
    <div>
      <div>
        <NavBread currentPage="Leave Request List" />
      </div>
      <div className="flex flex-row gap-2 justify-start py-4 px-2">
        <div className="py-2 px-4 bg-gradient-to-br from-amber-200 to-amber-400 active:from-amber-600 active:to-amber-800 rounded-lg font-semibold ring-1 ring-amber-400">
          <Link href={"/admin/leave/leave_type"}>Leave type</Link>
        </div>
      </div>
      <div className="px-2">
        <LeaveList />
      </div>
    </div>
  );
}
