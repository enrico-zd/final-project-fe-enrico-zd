"use client";

import NavBread from "@/components/nav-bread";
import UserForm from "@/components/admin-page/UserForm";

export default function CreateUser() {

    const prevPath = {
        path: "./",
        name: "User Section"
    }
    return (
        <div>
      <div>
        <NavBread 
        currentPage="Update User" 
        prevPath={prevPath}
        />
      </div>
      <div>
        <UserForm />
      </div>
    </div>
    )
}