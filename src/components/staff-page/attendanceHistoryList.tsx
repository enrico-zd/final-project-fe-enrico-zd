import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { format } from "date-fns";
import { IAttendance, IError } from "@/types/interface";
import { fetchAllUserAttendanceHistory } from "@/services/AttendanceApi";
import { useSession } from "next-auth/react";
import { TimeFormat } from "@/lib/timeFormating";

const AttendHistoryList = () => {
  const { data: session, status } = useSession();

  const [attendance, setAttendance] = useState<IAttendance[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<IError | null>(null);

  // fetch attendance
  useEffect(() => {
    if (status !== "authenticated" || !session?.user.accessToken) return;

    let cancelled = false;
    (async () => {
      try {
        setIsLoading(true);
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
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true; // mencegah setState setelah unmount
    };
  }, [status, session?.user.accessToken]);

  console.log(attendance);

  return (
    <div>
      {error && (
        <div>
          <p>{error.message}</p>
          <p>{error.name}</p>
          <p>{error.code}</p>
        </div>
      )}
      {isLoading && (
        <div>
          <p>Loading...</p>
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Date</TableHead>
            <TableHead className="text-center">Day</TableHead>
            <TableHead className="text-center">Start Time</TableHead>
            <TableHead className="text-center">End Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendance.map((history) => (
            <TableRow key={history.attendance_id}>
              <TableCell className="text-center">
                {format(new Date(history.attendance_date), "MMM dd")}
              </TableCell>
              <TableCell className="text-center">
                {format(new Date(history.attendance_date), "EEE")}
              </TableCell>
              <TableCell className="text-center">
                {TimeFormat(history.check_in_at)}
              </TableCell>
              <TableCell className="text-center">
                {TimeFormat(history.check_out_at)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AttendHistoryList;
