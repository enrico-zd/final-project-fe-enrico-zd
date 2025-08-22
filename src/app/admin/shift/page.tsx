"use client"

import NavBread from "@/components/nav-bread";
import ShiftList from "@/components/admin-page/shiftList";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Shift() {
  const { data: session, status } = useSession();
  return (
    <div>
      <div>
        <NavBread currentPage="Shifts List" />
      </div>
      <div>
        <div>
          <Link href="./shift/create">Create</Link>
        </div>
        <ShiftList token={session?.user.accessToken} statusAuth={status}/>
      </div>
    </div>
  );
}
