"use client";

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
        <div className="flex flex-row gap-2 justify-end py-4 px-2">
          <div className="py-2 px-4 bg-gradient-to-br from-amber-200 to-amber-400 active:from-amber-600 active:to-amber-800 rounded-lg font-semibold ring-1 ring-amber-400">
            <Link href="./shift/create">Create</Link>
          </div>
        </div>
        <ShiftList token={session?.user.accessToken} statusAuth={status} />
      </div>
    </div>
  );
}
