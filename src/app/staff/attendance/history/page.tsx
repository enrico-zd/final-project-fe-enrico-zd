"use client"

import AttendHistoryList from "@/components/staff-page/attendanceHistoryList";
import { ArrowLeft } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AttendanceHistory() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "ADMIN") {
      router.replace("/admin/dashboard");
      return;
    }
  }, [session, status, router]);
  return (
    <div className="w-[375px] h-screen shadow shadow-amber-200 bg-amber-100">
      <div className="m-2 flex flex-row justify-between">
        <div className="flex flex-row gap-2 items-center">
          <div>
            <Link href={"/staff/dashboard"}>
              <ArrowLeft />
            </Link>
          </div>
          <div>
            <h1 className="text-xl font-semibold">Attendance History</h1>
          </div>
        </div>
      </div>
      <div>
        <AttendHistoryList />
      </div>
    </div>
  );
}
