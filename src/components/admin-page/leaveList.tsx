import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const LeaveList = () => {
  const leaveList = [
  {
    "leave_request_id": 1,
    "leave_type": "cuti",
    "user_id": 5,
    "status": "PENDING",
    "reason": "Cuti tahunan untuk liburan keluarga",
    "admin_remark": "Disetujui, pastikan serah terima pekerjaan",
    "proof_image": "proofs/leave_1.jpg",
    "from": "2025-08-20 00:00:00",
    "to": "2025-08-22 00:00:00",
    "request_date": "2025-08-10 09:15:00",
    "request_by": "Self",
    "requested_days": 3,
    "approve_by": "Admin HR",
    "approve_date": "2025-08-12 14:30:00"
  },
  {
    "leave_request_id": 2,
    "leave_type": "Sakit",
    "user_id": 8,
    "status": "APPROVED",
    "reason": "Sakit demam tinggi",
    "admin_remark": "Disetujui, istirahat yang cukup",
    "proof_image": "proofs/medical_certificate_2.png",
    "from": "2025-08-13 00:00:00",
    "to": "2025-08-14 00:00:00",
    "request_date": "2025-08-12 08:00:00",
    "request_by": "Self",
    "requested_days": 2,
    "approve_by": "Manager",
    "approve_date": "2025-08-12 10:45:00"
  },
  {
    "leave_request_id": 3,
    "leave_type": "Izin",
    "user_id": 3,
    "status": "REJECTED",
    "reason": "Menghadiri pernikahan saudara",
    "admin_remark": "Disetujui dengan syarat pekerjaan selesai lebih awal",
    "proof_image": "proofs/wedding_invitation_3.jpg",
    "from": "2025-09-05 00:00:00",
    "to": "2025-09-06 00:00:00",
    "request_date": "2025-08-25 16:20:00",
    "request_by": "Self",
    "requested_days": 2,
    "approve_by": "Supervisor",
    "approve_date": "2025-08-26 09:00:00"
  }
];

  return (
    <Table>
      <TableHeader>
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
      <TableBody>
        {leaveList.map((leave, index: number) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{leave.leave_type}</TableCell>
            <TableCell>{leave.from}</TableCell>
            <TableCell>{leave.to}</TableCell>
            <TableCell>{leave.request_date}</TableCell>
            <TableCell>{leave.request_by}</TableCell>
            <TableCell>{leave.requested_days}</TableCell>
            <TableCell>{leave.reason}</TableCell>
            <TableCell>{leave.approve_by}</TableCell>
            <TableCell>{leave.approve_date}</TableCell>
            <TableCell>{leave.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LeaveList;
