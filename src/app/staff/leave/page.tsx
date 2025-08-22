"use client"
import LeaveTypeCard from "@/components/staff-page/leaveTypeCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import LeaveActivity from "@/components/staff-page/leaveActivity";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function StaffLeave() {
  const { data: session, status } = useSession();
    const router = useRouter();
  
    useEffect(() => {
      if (status === "authenticated" && session?.user?.role === "ADMIN") {
        router.replace("/admin/dashboard");
        return;
      }
    }, [session, status, router]);
  return (
    <div>
      <div className="m-2 flex flex-row justify-between">
        <div className="flex flex-row gap-2 items-center">
          <div>
            <Link href={"/staff/dashboard"}>
              <ArrowLeft />
            </Link>
          </div>
          <div>
            <Link href={"./profile"}>
              <div className="flex w-full justify-between gap-2 text-left text-sm">
                <div className="flex gap-2 pl-1">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src="https://upload.wikimedia.org/wikipedia/commons/1/12/230601_Karina_%28aespa%29.jpg"
                      alt="jimin"
                    />
                    <AvatarFallback className="rounded-lg">KJ</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">Kim Jimin</span>
                    <span className="text-muted-foreground truncate text-xs">
                      jimin@gmail.com
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <p>Leave</p>
      <LeaveTypeCard />
      <div className="flex justify-center mt-4">
        <button className="w-full mx-2 py-2 rounded-lg bg-amber-400">
          Issue Leave
        </button>
      </div>
      <p className="text-center mt-4">Recent Leave Activity</p>
      <div className="flex justify-center">
        <LeaveActivity />
      </div>
    </div>
  );
}
