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
import { fetchAttendanceCompany } from "@/services/AttendanceApi";
// import { useState } from "react";
// import { IAttendance, IError, IUserCompanyDetail } from "@/types/interface";

const AttendanceList = async ({
  companyId,
  token,
}: {
  companyId: number | undefined;
  token: string | undefined;
}) => {

  const attendanceList = await fetchAttendanceCompany(companyId, token);
  console.log(attendanceList)
  return (
    <Table className="[&_th]:text-center [&_th]:text-white text-center rounded-xl overflow-hidden">
      <TableHeader className="bg-amber-400">
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
      <TableBody className="bg-amber-100">
        {attendanceList.map((attendance, index: number) => (
          <TableRow key={index}>
            <TableCell>
              <Link href={`./attendance/${attendance.user.user_id}`}>
                <Eye />
              </Link>
            </TableCell>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{attendance.user.name}</TableCell>
            <TableCell>{attendance.check_in_at === null ? "-" : attendance.check_in_at}</TableCell>
            <TableCell>{attendance.check_out_at === null ? "-" : attendance.check_out_at}</TableCell>
            <TableCell>{attendance.attendance_status}</TableCell>
            <TableCell>{attendance.attendance_by === null ? "-" : attendance.attendance_by}</TableCell>
            <TableCell>{attendance.check_out_at === null ? "-" : attendance.late_minute}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AttendanceList;
