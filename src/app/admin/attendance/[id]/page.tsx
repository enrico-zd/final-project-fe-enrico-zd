import NavBread from "@/components/nav-bread";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { authOptions } from "@/lib/auth";
import { minutesToHm } from "@/lib/minutToHour";
import { TimeFormat } from "@/lib/timeFormating";
import { fetchAllUserAttendanceById } from "@/services/AttendanceApi";
import { getServerSession } from "next-auth";

export default async function AttendanceDetail({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  const prevPath = {
    path: "./",
    name: "Attendance Section",
  };

  const attendanceList = await fetchAllUserAttendanceById(
    id,
    session?.user.accessToken
  );

  return (
    <div>
      <div>
        <NavBread
          currentPage="Employee Attendance Detail"
          prevPath={prevPath}
        />
      </div>
      <div className="px-2 pt-4">
        <Table className="[&_th]:text-center [&_th]:text-white text-center rounded-xl overflow-hidden">
          <TableHeader className="bg-amber-400">
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Check In At</TableHead>
              <TableHead>check Out At</TableHead>
              <TableHead>Work Hour</TableHead>
              <TableHead>Late Minutes</TableHead>
              <TableHead>Overtime (Hours)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Attendance By</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-amber-100">
            {attendanceList.map((attendance) => (
              <TableRow key={attendance.attendance_id}>
                <TableCell>
                  {formatAttendanceDate(attendance.attendance_date)}
                </TableCell>
                <TableCell>
                  {attendance.check_in_at === null
                    ? "-"
                    : TimeFormat(attendance.check_in_at)}
                </TableCell>
                <TableCell>
                  {attendance.check_out_at === null
                    ? "-"
                    : TimeFormat(attendance.check_out_at)}
                </TableCell>
                <TableCell>
                  {attendance.check_out_at === null
                    ? "-"
                    : minutesToHm(attendance.hours_work_min)}
                </TableCell>
                <TableCell>
                  {attendance.check_out_at === null
                    ? "-"
                    : attendance.late_minute}
                </TableCell>
                <TableCell>
                  {attendance.check_out_at === null
                    ? "-"
                    : attendance.overtime_min}
                </TableCell>
                <TableCell>{attendance.attendance_status}</TableCell>
                <TableCell>
                  {attendance.attendance_by === null
                    ? "-"
                    : attendance.attendance_by}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function formatAttendanceDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    weekday: "short",
  });
}
