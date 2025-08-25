import NavBread from "@/components/nav-bread";
import LeaveTypeList from "@/components/admin-page/leaveTypeList";
import Link from "next/link";

export default function LeaveType() {
  return (
    <div>
      <div>
        <NavBread currentPage="Leave Type List" />
      </div>
      <div>
        <div className="flex flex-row gap-2 justify-end py-4 px-2">
          <div className="py-2 px-4 bg-gradient-to-br from-amber-200 to-amber-400 active:from-amber-600 active:to-amber-800 rounded-lg font-semibold ring-1 ring-amber-400">
            <Link href="./leave_type/create">Create</Link>
          </div>
        </div>
        <div className="px-2">
          <LeaveTypeList />
        </div>
      </div>
    </div>
  );
}
