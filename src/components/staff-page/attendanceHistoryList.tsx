import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import {format} from "date-fns"

const AttendHistoryList = () => {
    const historyData = [
        {
            attendance_id: 1,
            attendance_date: "2025-08-11T15:10:45Z",
            check_in_at: "08:00:00",
            check_out_at: "17:00:00"
        },
        {
            attendance_id: 2,
            attendance_date: "2025-08-13T15:10:45Z",
            check_in_at: "08:15:00",
            check_out_at: "16:59:03"
        }
    ]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Date</TableHead>
          <TableHead className="text-center">Day</TableHead>
          <TableHead className="text-center">Start Time</TableHead>
          <TableHead className="text-center">End Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {historyData.map((history) => (
          <TableRow key={history.attendance_id}>
            <TableCell className="text-center">{format(new Date(history.attendance_date), "MMM dd")}</TableCell>
            <TableCell className="text-center">{format(new Date(history.attendance_date), "EEE")}</TableCell>
            <TableCell className="text-center">{history.check_in_at}</TableCell>
            <TableCell className="text-center">{history.check_out_at}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AttendHistoryList;
