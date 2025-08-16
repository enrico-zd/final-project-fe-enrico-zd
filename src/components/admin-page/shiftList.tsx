import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const ShiftList = () => {
  const shiftList = [
  {
    "shift_id": 1,
    "company": "Coba Company",
    "title": "Morning Shift",
    "opening_time": "08:00:00",
    "closing_time": "16:00:00",
    "total_employee": 15,
    "status": "Active"
  },
  {
    "shift_id": 2,
    "company": "Coba Company",
    "title": "Evening Shift",
    "opening_time": "16:00:00",
    "closing_time": "00:00:00",
    "total_employee": 10,
    "status": "Active"
  }
]
;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Opening Time</TableHead>
          <TableHead>Closing Time</TableHead>
          <TableHead>Total Employee</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {shiftList.map((shift, index: number) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{shift.company}</TableCell>
            <TableCell>{shift.title}</TableCell>
            <TableCell>{shift.opening_time}</TableCell>
            <TableCell>{shift.closing_time}</TableCell>
            <TableCell>{shift.total_employee}</TableCell>
            <TableCell>{shift.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ShiftList;
