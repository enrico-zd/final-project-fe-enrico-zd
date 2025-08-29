"use client";
import LeaveTypeCard from "@/components/staff-page/leaveTypeCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, X } from "lucide-react";
import Link from "next/link";
import LeaveActivity from "@/components/staff-page/leaveActivity";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LeaveRequestForm from "@/components/staff-page/leaveRequestForm";

export default function StaffLeave() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [visibility, setVisibility] = useState<"hidden" | "">("hidden");

  const toggleVisibility = () => {
    setVisibility((prev) => (prev === "hidden" ? "" : "hidden"));
  };

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "ADMIN") {
      router.replace("/admin/dashboard");
      return;
    }
  }, [session, status, router]);

  return (
    <div className="shadow-amber-200 h-screen bg-amber-100 w-[375px]">
      <div className="m-2 flex flex-row justify-between relative">
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
                    <AvatarImage src={session?.user.avatar} />
                    <AvatarFallback className="rounded-lg">KJ</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {session?.user.name}
                    </span>
                    <span className="text-muted-foreground truncate text-xs">
                      {session?.user.email}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <p className="pl-2.5 text-2xl font-semibold">Leave</p>
      <LeaveTypeCard
        accessToken={session?.user.accessToken}
        statusSession={status}
      />
      <div className="flex justify-center mt-4">
        <button
          onClick={toggleVisibility}
          className="w-full mx-2 py-2 rounded-lg bg-amber-400 active:bg-amber-300 ring-1 ring-amber-300"
        >
          Issue Leave
        </button>
      </div>
      <p className="text-center mt-4 mb-1 text-2xl font-semibold">
        Recent Leave Activity
      </p>
      <div className="flex justify-center">
        <LeaveActivity
          accessToken={session?.user.accessToken}
          statusSession={status}
        />
      </div>
      <div
        className={`absolute h-full flex flex-col justify-end bottom-0 pb-4 bg-black/30 w-[375px] ${visibility}`}
      >
        <div className="flex justify-between items-end mx-2 p-2 rounded-sm bg-amber-200">
          <div>
            <h2 className="text-xl font-semibold text-amber-600">
              Apply Leave
            </h2>
          </div>
          <div>
            <button onClick={toggleVisibility} className="flex items-center">
              <X className="text-red-800 active:text-red-500" />
            </button>
          </div>
        </div>
        <LeaveRequestForm />
      </div>
    </div>
  );
}
