import NavBread from "@/components/nav-bread";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default async function AttendanceDetail({
  params,
}: {
  params: { id: number };
}) {
  const { id } = await params;
  console.log(id);

  const prevPath = {
    path: "./",
    name: "Attendance Section",
  };

  const attendanceList = [
  {
    "attendence_id": 1,
    "user_name": "Jamal Suemal",
    "check_in_at": "08:15",
    "check_out_at": "17:05",
    "attendance_date": "2025-08-12",
    "attendance_status": "Approved",
    "attendance_by": "Self",
    "hours_work": 8,
    "late_minute": 5,
    "overtime": 1
  },
  {
    "attendence_id": 2,
    "user_name": "Jamal Suemal",
    "check_in_at": "08:45",
    "check_out_at": "16:30",
    "attendance_date": "2025-08-12",
    "attendance_status": "Pending",
    "attendance_by": "Admin",
    "hours_work": 7,
    "late_minute": 45,
    "overtime": 0
  },
  {
    "attendence_id": 3,
    "user_name": "Jamal Suemal",
    "check_in_at": "07:55",
    "check_out_at": "17:30",
    "attendance_date": "2025-08-12",
    "attendance_status": "Approved",
    "attendance_by": "Self",
    "hours_work": 9,
    "late_minute": 0,
    "overtime": 1
  },
  {
    "attendence_id": 4,
    "user_name": "Jamal Suemal",
    "check_in_at": "09:05",
    "check_out_at": "18:10",
    "attendance_date": "2025-08-12",
    "attendance_status": "Approved",
    "attendance_by": "Self",
    "hours_work": 8,
    "late_minute": 65,
    "overtime": 0
  }
];

  return (
    <div>
      <div>
        <NavBread
          currentPage="Employee Attendance Detail"
          prevPath={prevPath}
        />
      </div>
      <Table>
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
            <TableRow key={attendance.attendence_id}>
              <TableCell>{formatAttendanceDate(attendance.attendance_date)}</TableCell>
              <TableCell>{attendance.check_in_at}</TableCell>
              <TableCell>{attendance.check_out_at}</TableCell>
              <TableCell>{attendance.hours_work}</TableCell>
              <TableCell>{attendance.late_minute} Minute</TableCell>
              <TableCell>{attendance.overtime}</TableCell>
              <TableCell>{attendance.attendance_status}</TableCell>
              <TableCell>{attendance.attendance_by}</TableCell>
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