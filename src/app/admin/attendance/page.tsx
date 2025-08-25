
import NavBread from "@/components/nav-bread";
import AttendanceList from "@/components/admin-page/attendanceList";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { fetchUserCompanyById } from "@/services/UserAPI";

export default async function Attendance() {
  const session = await getServerSession(authOptions)

  const users = await fetchUserCompanyById(session?.user.user_id, session?.user.accessToken)
  
  return (
    <div>
      <div>
        <NavBread currentPage="Employee Attendance List" />
      </div>
      <div className="px-2 pt-4">
        <AttendanceList companyId={users.company_id} token={session?.user.accessToken}/>
      </div>
    </div>
  );
}
