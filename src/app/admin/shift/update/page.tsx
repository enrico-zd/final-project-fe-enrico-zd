"use client";

import NavBread from "@/components/nav-bread";
import ShiftForm from "@/components/admin-page/shiftForm";

export default function UpdateShift() {

    const prevPath = {
        path: "./",
        name: "Shift Section"
    }
    return (
        <div>
      <div>
        <NavBread 
        currentPage="Update Shift" 
        prevPath={prevPath}
        />
      </div>
      <div>
        <ShiftForm />
      </div>
    </div>
    )
}