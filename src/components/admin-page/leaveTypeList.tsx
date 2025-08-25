import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Delete, SquarePen } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { fetchLeaveType } from "@/services/LeaveTypeApi";

const LeaveTypeList = async () => {
  const session = await getServerSession(authOptions)
  const leaveTypeList = await fetchLeaveType(session?.user.accessToken)

  return (
    <Table className="[&_th]:text-center [&_th]:text-white text-center rounded-xl overflow-hidden">
      <TableHeader className="bg-amber-400">
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Is Paid</TableHead>
          <TableHead>Allocated Days</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="bg-amber-100">
        {leaveTypeList.map((leaveType, index: number) => (
          <TableRow key={leaveType.leave_type_id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{leaveType.leave_type_name}</TableCell>
            <TableCell>{leaveType.paid_leave}</TableCell>
            <TableCell>{leaveType.leave_allocated_day}</TableCell>
            <TableCell className="flex flex-row justify-center gap-2">
              <div>
                <Link href="./leave_type/edit"><SquarePen /></Link>
              </div>
              <div className="text-red-400">
                <Delete />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LeaveTypeList;
