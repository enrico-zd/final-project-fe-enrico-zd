"use client"
import ProfileDetail from "@/components/staff-page/profileDetail";
import { ArrowLeft, SquarePen } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfileStaff() {
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
            <Link href={"./dashboard"}>
              <ArrowLeft />
            </Link>
          </div>
          <div>
            <h1 className="text-xl font-semibold">Profile</h1>
          </div>
        </div>
        <div className="flex items-center">
          <Link href={"./profile/edit"}>
            <SquarePen />
          </Link>
        </div>
      </div>
      <div>
        <ProfileDetail />
      </div>
    </div>
  );
}
