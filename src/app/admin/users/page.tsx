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
        <div className="flex flex-row gap-2 justify-end py-4 px-2">
          <div className="py-2 px-4 bg-gradient-to-br from-amber-200 to-amber-400 active:from-amber-600 active:to-amber-800 rounded-lg font-semibold ring-1 ring-amber-400">
            <Link href="./users/create">Create</Link>
          </div>
          <div className="py-2 px-4 bg-gradient-to-br from-amber-200 to-amber-400 active:from-amber-600 active:to-amber-800 rounded-lg font-semibold ring-1 ring-amber-400">
            <Link href={`./users/update/${session?.user.user_id}`}>Update</Link>
          </div>
        </div>
        <UserList token={session?.user.accessToken} statusAuth={status} />
      </div>
    </div>
  );
}
