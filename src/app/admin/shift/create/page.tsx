"use client";

import ShiftFormCreate from "@/components/admin-page/shiftFormCreate";
import NavBread from "@/components/nav-bread";

export default function CreateShift() {

    const prevPath = {
        path: "./",
        name: "Shift Section"
    }
    return (
        <div>
      <div>
        <NavBread 
        currentPage="Create Shift" 
        prevPath={prevPath}
        />
      </div>
      <div>
        <ShiftFormCreate modes="create"/>
      </div>
    </div>
    )
}