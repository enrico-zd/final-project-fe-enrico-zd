import AttendHistoryList from "@/components/staff-page/attendanceHistoryList";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AttendanceHistory() {
  return (
    <div>
      <div className="m-2 flex flex-row justify-between">
        <div className="flex flex-row gap-2 items-center">
          <div>
            <Link href={"/staff/dashboard"}>
              <ArrowLeft />
            </Link>
          </div>
          <div>
            <h1 className="text-xl font-semibold">Attendance History</h1>
          </div>
        </div>
      </div>
      <div>
        <AttendHistoryList />
      </div>
    </div>
  );
}
