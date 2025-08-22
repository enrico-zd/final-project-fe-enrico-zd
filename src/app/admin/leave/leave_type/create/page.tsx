"use client";

import NavBread from "@/components/nav-bread";
import LeaveTypeForm from "@/components/admin-page/leaveTypeForm";

export default function CreateLeaveType() {

    const prevPath = {
        path: "./",
        name: "Leave Type Section"
    }
    return (
        <div>
      <div>
        <NavBread 
        currentPage="Create Leave Type" 
        prevPath={prevPath}
        />
      </div>
      <div>
        <LeaveTypeForm />
      </div>
    </div>
    )
}