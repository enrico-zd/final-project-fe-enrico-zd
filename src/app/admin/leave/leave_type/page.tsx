
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
        <div>
          <Link href="./leave_type/create">Create</Link>
        </div>
        <LeaveTypeList />
      </div>
    </div>
  );
}
