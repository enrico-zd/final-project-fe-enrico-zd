"use client";
import { Delete, Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Link from "next/link";
import {
  fetchAttendanceCompany,
  fetchCheckIn,
  fetchCheckOut,
  fetchResetAttendance,
} from "@/services/AttendanceApi";
import { TimeFormat } from "@/lib/timeFormating";
import { IAttendance, ICheckIn, ICheckOut, IError } from "@/types/interface";
import { toISOStringNoMs } from "@/utils/toIsoStringNoMs";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import AttendanceSectionSkeleton from "../skeletons/AttendanceSectionSkeleton";

const AttendanceList = ({
  companyId,
  token,
}: {
  companyId: number | undefined;
  token: string | undefined;
}) => {
  const [attendanceList, setAttendanceList] = useState<IAttendance[]>([]);
  const [error, setError] = useState<IError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(false);

  // formating absent time
  const now = new Date();
  const absentTime = new Date(now.getTime() + 7 * 60 * 60 * 1000);
  const formatted = toISOStringNoMs(absentTime);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setError(null);
        setIsLoadingPage(true);
        const data = await fetchAttendanceCompany(companyId, token);
        if (!cancelled) {
          setAttendanceList(data);
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
        if (!cancelled) setIsLoadingPage(false);
      }
    })();

    return () => {
      cancelled = true; // mencegah setState setelah unmount
    };
  }, [token, companyId]);

  const buildCheckInPayload = (): ICheckIn => ({
    check_in_at: formatted,
  });

  const buildCheckOutPayload = (): ICheckOut => ({
    check_out_at: formatted,
  });

  const handleCheckin = async (userId: number) => {
    try {
      setIsLoading(true);
      await fetchCheckIn(userId, buildCheckInPayload(), token);
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : "Unknown error occured",
        name: err instanceof Error ? err.name : undefined,
        code: err instanceof Error ? 500 : undefined,
      });
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      window.location.reload();
    }
  };

  const handleCheckOut = async (userId: number) => {
    try {
      setIsLoading(true);
      await fetchCheckOut(userId, buildCheckOutPayload(), token);
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : "Unknown error occured",
        name: err instanceof Error ? err.name : undefined,
        code: err instanceof Error ? 500 : undefined,
      });
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      window.location.reload();
    }
  };

  const handleResetAttendance = async (attendanceId: number) => {
    try {
      setIsLoading(true);
      await fetchResetAttendance(attendanceId, token);
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : "Unknown error occured",
        name: err instanceof Error ? err.name : undefined,
        code: err instanceof Error ? 500 : undefined,
      });
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      window.location.reload();
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  });

  return (
    <div>
      {isLoadingPage ? (
        <AttendanceSectionSkeleton />
      ) : (
        <Table className="[&_th]:text-center [&_th]:text-white text-center rounded-xl overflow-hidden">
          <TableHeader className="bg-amber-400">
            <TableRow>
              <TableHead></TableHead>
              <TableHead>No</TableHead>
              <TableHead>Employee Name</TableHead>
              <TableHead>Check In At</TableHead>
              <TableHead>check Out At</TableHead>
              <TableHead>Attendance Status</TableHead>
              <TableHead>Attendance By</TableHead>
              <TableHead>Late</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-amber-100">
            {attendanceList.map((attendance, index: number) => (
              <TableRow key={index}>
                <TableCell>
                  <Link href={`./attendance/${attendance.user.user_id}`}>
                    <Eye />
                  </Link>
                </TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{attendance.user.name}</TableCell>
                <TableCell>
                  {attendance.check_in_at === null
                    ? "-"
                    : TimeFormat(attendance.check_in_at)}
                </TableCell>
                <TableCell>
                  {attendance.check_out_at === null
                    ? "-"
                    : TimeFormat(attendance.check_out_at)}
                </TableCell>
                <TableCell>{attendance.attendance_status}</TableCell>
                <TableCell>
                  {attendance.attendance_by === null
                    ? "-"
                    : attendance.attendance_by}
                </TableCell>
                <TableCell>
                  {attendance.check_out_at === null
                    ? "-"
                    : attendance.late_minute}
                </TableCell>
                <TableCell>
                  {isLoading ? (
                    <div className="h-6 w-6 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                  ) : !attendance.check_in_at ? (
                    <button
                      onClick={() => handleCheckin(attendance.user.user_id)}
                      className="py-1 px-2 bg-amber-500 text-white font-semibold rounded-md"
                    >
                      Check In
                    </button>
                  ) : !attendance.check_out_at ? (
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleCheckOut(attendance.user.user_id)}
                        className="py-1 px-2 bg-amber-500 text-white font-semibold rounded-md"
                      >
                        Check Out
                      </button>
                      <Delete
                        onClick={() =>
                          handleResetAttendance(attendance.attendance_id)
                        }
                        className="text-red-500"
                      />
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <Delete
                        onClick={() =>
                          handleResetAttendance(attendance.attendance_id)
                        }
                        className="text-red-500"
                      />
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AttendanceList;
