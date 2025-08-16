"use client";

import NavBread from "@/components/nav-bread";
import LeaveTypeForm from "@/components/admin-page/leaveTypeForm";

export default function EditLeaveType() {

    const prevPath = {
        path: "./",
        name: "Leave Type Section"
    }
    return (
        <div>
      <div>
        <NavBread 
        currentPage="Edit Leave Type" 
        prevPath={prevPath}
        />
      </div>
      <div>
        <LeaveTypeForm />
      </div>
    </div>
    )
}