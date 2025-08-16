"use client";

import NavBread from "@/components/nav-bread";
import ShiftForm from "@/components/admin-page/shiftForm";

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
        <ShiftForm />
      </div>
    </div>
    )
}