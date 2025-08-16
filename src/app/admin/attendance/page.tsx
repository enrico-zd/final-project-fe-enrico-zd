"use client";

import NavBread from "@/components/nav-bread";
import AttendanceList from "@/components/admin-page/attendanceList";
// import Link from "next/link";

export default function Attendance() {
  return (
    <div>
      <div>
        <NavBread currentPage="Employee Attendance List" />
      </div>
      <div>
        <AttendanceList />
      </div>
    </div>
  );
}
