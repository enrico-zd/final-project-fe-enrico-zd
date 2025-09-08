import NavBread from "@/components/nav-bread";
import LeaveTypeList from "@/components/admin-page/leaveTypeList";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function LeaveType() {
  const prevPath = {
    path: "/admin/leave",
    name: "Leave Request Section",
  };
  return (
    <div>
      <div>
        <NavBread currentPage="Leave Type List" prevPath={prevPath}/>
      </div>
      <div>
        <div className="flex flex-row gap-2 justify-end py-4 px-2">
          <div className="py-2 px-4 bg-gradient-to-br from-amber-200 to-amber-400 active:from-amber-600 active:to-amber-800 rounded-lg font-semibold ring-1 ring-amber-400">
            <Link href="./leave_type/create" className="flex justify-center items-center"><Plus /> Create Type</Link>
          </div>
        </div>
        <div className="px-2">
          <LeaveTypeList />
        </div>
      </div>
    </div>
  );
}
