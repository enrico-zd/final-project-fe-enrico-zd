"use client";

import NavBread from "@/components/nav-bread";
import UserList from "@/components/admin-page/userList";
import Link from "next/link";

export default function Users() {
  return (
    <div>
      <div>
        <NavBread currentPage="Users List" />
      </div>
      <div>
        <div>
          <Link href="./users/create">Create</Link>
        </div>
        <div>
          <Link href="./users/update">Update</Link>
        </div>
        <UserList />
      </div>
    </div>
  );
}
