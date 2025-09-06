import { BriefcaseBusiness, CalendarOff } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { fetchAllUserAttendanceHistory } from "@/services/AttendanceApi";
import { IAttendance, IError, ILeaveRequest } from "@/types/interface";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchAllLeaveRequestByUserId } from "@/services/LeaveRequest";
import { toast } from "sonner";

const Overview = () => {
  const { data: session, status } = useSession();

  const [attendance, setAttendance] = useState<IAttendance[]>([]);
  const [leave, setLeave] = useState<ILeaveRequest[]>([]);
  const [error, setError] = useState<IError | null>(null);

  // fetch attendance
  useEffect(() => {
    if (status !== "authenticated" || !session?.user.accessToken) return;

    let cancelled = false;
    (async () => {
      try {
        setError(null);
        const attendace = await fetchAllUserAttendanceHistory(
          session?.user.accessToken
        );
        if (!cancelled) setAttendance(attendace);
      } catch (err) {
        if (!cancelled) {
          setError({
            message:
              err instanceof Error ? err.message : "Unknown error occured",
            name: err instanceof Error ? err.name : undefined,
            code: err instanceof Error ? 500 : undefined,
          });
        }
      } 
    })();

    return () => {
      cancelled = true; // mencegah setState setelah unmount
    };
  }, [status, session?.user.accessToken]);

  // fetch leave request
  useEffect(() => {
    if (status !== "authenticated" || !session?.user.accessToken) return;

    let cancelled = false;
    (async () => {
      try {
        setError(null);
        const leaveReq = await fetchAllLeaveRequestByUserId(
          session?.user.accessToken
        );
        if (!cancelled) setLeave(leaveReq);
      } catch (err) {
        if (!cancelled) {
          setError({
            message:
              err instanceof Error ? err.message : "Unknown error occured",
            name: err instanceof Error ? err.name : undefined,
            code: err instanceof Error ? 500 : undefined,
          });
        }
      } 
    })();

    return () => {
      cancelled = true; // mencegah setState setelah unmount
    };
  }, [status, session?.user.accessToken]);

  // set error alert
  useEffect(() => {
    if (error) {
      toast.error(error.message, {
        description: `${error.name ?? ""} ${error.code ?? ""}`,
      });
    }
  }, [error]);

  return (
    <div className="grid grid-cols-[repeat(2,180px)] justify-items-center mt-4">
      <Card className="data-[slot=card]:w-[168px] shadow-lg bg-amber-50">
        <CardHeader className="flex flex-col h-[90px] justify-between w-full">
          <div className="">
            <CardTitle>
              <BriefcaseBusiness size={40} />
            </CardTitle>
            <CardDescription>Present</CardDescription>
          </div>
          <div className="w-full flex flex-row items-center justify-between">
            <CardDescription className="text-2xl">
              {attendance.length}
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
      <Card className="data-[slot=card]:w-[168px] shadow-lg bg-amber-50">
        <CardHeader className="flex flex-col h-[90px] justify-between w-full">
          <div className="">
            <CardTitle>
              <CalendarOff size={40} />
            </CardTitle>
            <CardDescription>Leave</CardDescription>
          </div>
          <div className="w-full flex flex-row items-center justify-between">
            <CardDescription className="text-2xl">
              {leave.length}
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

export default Overview;
