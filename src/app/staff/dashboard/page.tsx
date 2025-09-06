"use client";
import FeatureMenu from "@/components/staff-page/featureMenu";
import Overview from "@/components/staff-page/overview";
import ShiftTracker from "@/components/staff-page/shiftTracker";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardStaff() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "ADMIN") {
      router.replace("/admin/dashboard");
      return;
    }
  }, [session, status, router]);
  

  return (
    <div className="pb-2 w-[375px] h-fix shadow shadow-amber-200 bg-amber-100">
      <div className="m-2">
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
      <div className="flex flex-col items-center">
        <ShiftTracker />
        <Overview />
        <FeatureMenu />
      </div>
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex flex-col items-center"
        >
          <LogOut />
          <p className="text-sm">Log Out</p>
        </button>
      </div>
    </div>
  );
}
