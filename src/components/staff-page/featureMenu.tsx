import { BookUser, Frown } from "lucide-react";
import Link from "next/link";

const FeatureMenu = () => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-[repeat(2,174px)] justify-items-center mt-4">
        <Link href={"./attendance/history"}>
          <div className="w-[174px] h-[150px] bg-amber-400 border border-white flex flex-col items-center justify-center">
            <BookUser size={36} />
            <p>Attendance History</p>
          </div>
        </Link>
        <Link href={"./leave"}>
          <div className="w-[174px] h-[150px] bg-amber-400 border border-white flex flex-col items-center justify-center">
            <Frown size={36} />
            <p>Leave</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default FeatureMenu;
