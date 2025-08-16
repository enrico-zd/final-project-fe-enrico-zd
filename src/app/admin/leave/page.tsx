import NavBread from "@/components/nav-bread";
import LeaveList from "@/components/admin-page/leaveList";
import Link from "next/link";

export default function Leave() {
  return (
    <div>
      <div>
        <NavBread currentPage="Leave Request List" />
      </div>
      <div>
        <Link href={"./leave/leave_type"}>Leave type</Link>
      </div>
      <div>
        <LeaveList />
      </div>
    </div>
  );
}
