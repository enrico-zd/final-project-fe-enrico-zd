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

const LeaveTypeList = () => {
  const leaveTypeList = [
    {
      leave_type_id: 1,
      leave_type_name: "Annual Leave",
      paid_leave: "Yes",
      leave_allocated_day: 12,
    },
    {
      leave_type_id: 2,
      leave_type_name: "Sick Leave",
      paid_leave: "Yes",
      leave_allocated_day: 8,
    },
    {
      leave_type_id: 3,
      leave_type_name: "Unpaid Leave",
      paid_leave: "No",
      leave_allocated_day: 0,
    },
  ];
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Is Paid</TableHead>
          <TableHead>Allocated Days</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leaveTypeList.map((leaveType, index: number) => (
          <TableRow key={leaveType.leave_type_id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{leaveType.leave_type_name}</TableCell>
            <TableCell>{leaveType.paid_leave}</TableCell>
            <TableCell>{leaveType.leave_allocated_day}</TableCell>
            <TableCell className="flex flex-row gap-2">
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
