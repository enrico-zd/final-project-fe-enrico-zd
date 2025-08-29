"use client";

import {
  FileClock,
  FileMinus,
  FileText,
  LogIn,
  LogOut,
  User,
} from "lucide-react";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { IAttendance, IError, ILeaveRequest } from "@/types/interface";
import { useEffect, useState } from "react";
import { fetchAttendanceCompany } from "@/services/AttendanceApi";
import { fetchUserCompanyByUserId } from "@/services/UserAPI";
import { fetchLeaveRequest } from "@/services/LeaveRequest";

export default function SectionCard({
  totalUser,
  userId,
  token,
  statusAuth,
}: {
  totalUser: number | undefined;
  userId: number | undefined;
  token: string | undefined;
  statusAuth: string;
}) {
  const [attendance, setAttendance] = useState<IAttendance[]>([]);
  const [leaveRequest, setLeaveRequest] = useState<ILeaveRequest[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<IError | null>(null);

  useEffect(() => {
    if (statusAuth !== "authenticated" || !token) return;

    let cancelled = false;
    (async () => {
      try {
        setIsLoading(true);
        setError(null);
        const user = await fetchUserCompanyByUserId(userId, token);
        const dataAttend = await fetchAttendanceCompany(user.company_id, token);
        const dataLeave = await fetchLeaveRequest(token);
        if (!cancelled) {
          setAttendance(dataAttend);
          setLeaveRequest(dataLeave);
        }
      } catch (err) {
        if (!cancelled) {
          setError({
            message:
              err instanceof Error ? err.message : "Unknown error occured",
            name: err instanceof Error ? err.name : undefined,
            code: err instanceof Error ? 500 : undefined,
          });
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true; // mencegah setState setelah unmount
    };
  }, [statusAuth, token, userId]);

  // count check in
  const countCheckedIn = attendance.reduce((acc, a) => {
    return a.check_in_at ? acc + 1 : acc;
  }, 0);

  // count check out
  const countCheckedOut = attendance.reduce((acc, a) => {
    return a.check_out_at ? acc + 1 : acc;
  }, 0);

  // count leave
  const toUTCDate = (d: Date) =>
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());

  const isTodayWithin = (fromISO: string, toISO: string) => {
    const today = toUTCDate(new Date());
    const from = toUTCDate(new Date(fromISO));
    const to = toUTCDate(new Date(toISO));
    return from <= today && today <= to; // inklusif
  };

  const { activeToday, pending, paidLeave } = leaveRequest.reduce(
    (acc, r: ILeaveRequest) => {
      if (r.status === "APPROVED" && isTodayWithin(r.from, r.to)) {
        acc.activeToday += 1;
      }

      // 2) Status PENDING
      if (r.status === "PENDING") acc.pending += 1;

      // 3) Paid leave = "YES"
      if (
        r.type?.paid_leave === "YES" &&
        r.status === "APPROVED" &&
        isTodayWithin(r.from, r.to)
      )
        acc.paidLeave += 1;

      return acc;
    },
    { activeToday: 0, pending: 0, paidLeave: 0 }
  );

  const leaveCount = { activeToday, pending, paidLeave };

  return (
    <div>
      {error && <h1>{error.message}</h1>}
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="grid xl:grid-cols-[repeat(3,400px)] lg:grid-cols-[repeat(2,400px)] md:grid-cols-[repeat(1,200px)] grid-rows-2 justify-items-center gap-4">
          <Card className="data-[slot=card]:w-[380px] bg-amber-200">
            <CardHeader className="flex flex-col h-[90px] justify-between w-full">
              <div className="">
                <CardTitle className="text-2xl text-amber-700">
                  Total Employee
                </CardTitle>
              </div>
              <div className="w-full flex flex-row items-center justify-between">
                <CardDescription className="text-2xl text-amber-700">
                  {totalUser}
                </CardDescription>
                <CardAction>
                  <User className=" text-amber-700" size={50} />
                </CardAction>
              </div>
            </CardHeader>
          </Card>
          <Card className="data-[slot=card]:w-[380px] bg-amber-200">
            <CardHeader className="flex flex-col h-[90px] justify-between w-full">
              <div className="">
                <CardTitle className="text-2xl text-amber-700">
                  Paid Leave
                </CardTitle>
              </div>
              <div className="w-full flex flex-row items-center justify-between">
                <CardDescription className="text-2xl text-amber-700">
                  {leaveCount.paidLeave}
                </CardDescription>
                <CardAction>
                  <FileText className=" text-amber-700" size={50} />
                </CardAction>
              </div>
            </CardHeader>
          </Card>
          <Card className="data-[slot=card]:w-[380px] bg-amber-200">
            <CardHeader className="flex flex-col h-[90px] justify-between w-full">
              <div className="">
                <CardTitle className="text-2xl text-amber-700">
                  On Leaves Today
                </CardTitle>
              </div>
              <div className="w-full flex flex-row items-center justify-between">
                <CardDescription className="text-2xl text-amber-700">
                  {leaveCount.activeToday}
                </CardDescription>
                <CardAction>
                  <FileMinus className=" text-amber-700" size={50} />
                </CardAction>
              </div>
            </CardHeader>
          </Card>
          <Card className="data-[slot=card]:w-[380px] bg-amber-200">
            <CardHeader className="flex flex-col h-[90px] justify-between w-full">
              <div className="">
                <CardTitle className="text-2xl text-amber-700">
                  Pending Leaves
                </CardTitle>
              </div>
              <div className="w-full flex flex-row items-center justify-between">
                <CardDescription className="text-2xl text-amber-700">
                  {leaveCount.pending}
                </CardDescription>
                <CardAction>
                  <FileClock className=" text-amber-700" size={50} />
                </CardAction>
              </div>
            </CardHeader>
          </Card>
          <Card className="data-[slot=card]:w-[380px] bg-amber-200">
            <CardHeader className="flex flex-col h-[90px] justify-between w-full">
              <div className="">
                <CardTitle className="text-2xl text-amber-700">
                  Check In Today
                </CardTitle>
              </div>
              <div className="w-full flex flex-row items-center justify-between">
                <CardDescription className="text-2xl text-amber-700">
                  {countCheckedIn}
                </CardDescription>
                <CardAction>
                  <LogIn className=" text-amber-700" size={50} />
                </CardAction>
              </div>
            </CardHeader>
          </Card>
          <Card className="data-[slot=card]:w-[380px] bg-amber-200">
            <CardHeader className="flex flex-col h-[90px] justify-between w-full">
              <div className="">
                <CardTitle className="text-2xl text-amber-700">
                  Check Out Today
                </CardTitle>
              </div>
              <div className="w-full flex flex-row items-center justify-between">
                <CardDescription className="text-2xl text-amber-700">
                  {countCheckedOut}
                </CardDescription>
                <CardAction>
                  <LogOut className=" text-amber-700" size={50} />
                </CardAction>
              </div>
            </CardHeader>
          </Card>
        </div>
      )}
    </div>
  );
}
