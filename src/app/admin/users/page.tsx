"use client";

import NavBread from "@/components/nav-bread";
import UserList from "@/components/admin-page/userList";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Users() {
  const { data: session, status } = useSession();
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
          <Link href={`./users/update/${session?.user.user_id}`}>Update</Link>
        </div>
        <UserList token={session?.user.accessToken} statusAuth={status}/>
      </div>
    </div>
  );
}
