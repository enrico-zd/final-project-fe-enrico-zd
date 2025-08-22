import NavBread from "@/components/nav-bread";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { authOptions } from "@/lib/auth";
import { minutesToHm } from "@/lib/minutToHour";
import { fetchAllUserAttendanceById } from "@/services/AttendanceApi";
import { format, parseISO } from "date-fns";
import { getServerSession } from "next-auth";

export default async function AttendanceDetail({
  params,
}: {
  params: { id: number };
}) {
  const { id } = await params;
  const session = await getServerSession(authOptions)

  const prevPath = {
    path: "./",
    name: "Attendance Section",
  };

  const attendanceList = await fetchAllUserAttendanceById(id, session?.user.accessToken)

  return (
    <div>
      <div>
        <NavBread
          currentPage="Employee Attendance Detail"
          prevPath={prevPath}
        />
      </div>
      <Table className="text-center [&_th]:text-center">
        <TableHeader>
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
        <TableBody>
          {attendanceList.map((attendance) => (
            <TableRow key={attendance.attendance_id}>
              <TableCell>{formatAttendanceDate(attendance.attendance_date)}</TableCell>
              <TableCell>{attendance.check_in_at === null ? "-" : format(parseISO(attendance.check_in_at), "HH:mm:ss")}</TableCell>
              <TableCell>{attendance.check_out_at === null ? "-" : format(parseISO(attendance.check_out_at), "HH:mm:ss")}</TableCell>
              <TableCell>{attendance.check_out_at === null ? "-" : minutesToHm(attendance.hours_work_min)}</TableCell>
              <TableCell>{attendance.check_out_at === null ? "-" :attendance.late_minute}</TableCell>
              <TableCell>{attendance.check_out_at === null ? "-" :attendance.overtime_min}</TableCell>
              <TableCell>{attendance.attendance_status}</TableCell>
              <TableCell>{attendance.attendance_by === null ? "-" :attendance.attendance_by}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function formatAttendanceDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    weekday: "short"
  });
}