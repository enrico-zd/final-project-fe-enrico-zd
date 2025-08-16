import { Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Link from "next/link";

const AttendanceList = () => {
  const attendanceList = [
  {
    "attendence_id": 1,
    "user_name": "Jamal Suemal",
    "check_in_at": "08:15",
    "check_out_at": "17:05",
    "attendance_date": "2025-08-12",
    "attendance_status": "Present",
    "attendance_by": "Self",
    "hours_work": 8,
    "late_minute": 5,
    "overtime": 1,
    "status_attendance": "Approved"
  },
  {
    "attendence_id": 2,
    "user_name": "Siti Rahmawati",
    "check_in_at": "08:45",
    "check_out_at": "16:30",
    "attendance_date": "2025-08-12",
    "attendance_status": "Late",
    "attendance_by": "Admin",
    "hours_work": 7,
    "late_minute": 45,
    "overtime": 0,
    "status_attendance": "Pending"
  },
  {
    "attendence_id": 3,
    "user_name": "Budi Santoso",
    "check_in_at": "07:55",
    "check_out_at": "17:30",
    "attendance_date": "2025-08-12",
    "attendance_status": "Present",
    "attendance_by": "Self",
    "hours_work": 9,
    "late_minute": 0,
    "overtime": 1,
    "status_attendance": "Approved"
  },
  {
    "attendence_id": 4,
    "user_name": "Andi Wijaya",
    "check_in_at": "09:05",
    "check_out_at": "18:10",
    "attendance_date": "2025-08-12",
    "attendance_status": "Late",
    "attendance_by": "Self",
    "hours_work": 8,
    "late_minute": 65,
    "overtime": 0,
    "status_attendance": "Approved"
  }
];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>No</TableHead>
          <TableHead>Employee Name</TableHead>
          <TableHead>Check In At</TableHead>
          <TableHead>check Out At</TableHead>
          <TableHead>Attendance Status</TableHead>
          <TableHead>Attendance By</TableHead>
          <TableHead>Late</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {attendanceList.map((attendance, index: number) => (
          <TableRow key={index}>
            <TableCell>
                <Link href={`./attendance/${attendance.attendence_id}`}><Eye /></Link>
            </TableCell>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{attendance.user_name}</TableCell>
            <TableCell>{attendance.check_in_at}</TableCell>
            <TableCell>{attendance.check_out_at}</TableCell>
            <TableCell>{attendance.attendance_status}</TableCell>
            <TableCell>{attendance.attendance_by}</TableCell>
            <TableCell>{attendance.late_minute} Minute</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AttendanceList;
