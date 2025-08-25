import { getServerSession } from "next-auth";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { authOptions } from "@/lib/auth";
import { fetchLeaveRequest } from "@/services/LeaveRequest";
import { format, parseISO } from "date-fns";
import { TimeFormat } from "@/lib/timeFormating";

const LeaveList = async () => {
  const session = await getServerSession(authOptions);

  const leaveList = await fetchLeaveRequest(session?.user.accessToken);

  return (
    <Table className="[&_th]:text-center [&_th]:text-white text-center rounded-xl overflow-hidden">
      <TableHeader className="bg-amber-400">
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>From</TableHead>
          <TableHead>To</TableHead>
          <TableHead>Requested Date</TableHead>
          <TableHead>Requested By</TableHead>
          <TableHead>Request Days</TableHead>
          <TableHead>Reason</TableHead>
          <TableHead>Approve By</TableHead>
          <TableHead>Approve Date</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="bg-amber-100">
        {leaveList.map((leave, index: number) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{leave.type.leave_type_name}</TableCell>
            <TableCell>{formatDate(leave.from)}</TableCell>
            <TableCell>{formatDate(leave.to)}</TableCell>
            <TableCell>{formatRequestDate(leave.request_date)}</TableCell>
            <TableCell>{leave.user.name}</TableCell>
            <TableCell>{leave.requested_days}</TableCell>
            <TableCell>{leave.reason}</TableCell>
            <TableCell className="whitespace-pre-line">
              {leave.approver === null
                ? "-"
                : `${leave.user.name}\n(${leave.user.role})`}
            </TableCell>
            <TableCell>
              {leave.approved_at === null
                ? "-"
                : format(parseISO(leave.approved_at), "yyyy-MM-dd")}
              {<br />}
              {leave.approved_at === null ? "-" : TimeFormat(leave.approved_at)}
            </TableCell>
            <TableCell>{leave.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });
}

function formatRequestDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default LeaveList;
