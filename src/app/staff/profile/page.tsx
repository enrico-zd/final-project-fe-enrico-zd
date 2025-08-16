import ProfileDetail from "@/components/staff-page/profileDetail";
import { ArrowLeft, SquarePen } from "lucide-react";
import Link from "next/link";

export default function ProfileStaff() {
  return (
    <div>
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
        <div>
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
