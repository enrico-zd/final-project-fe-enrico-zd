import { Fingerprint } from "lucide-react";
import RealtimeClock from "./realtimeClock";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { IAttendance, ICheckIn, ICheckOut, IError } from "@/types/interface";
import {
  fetchCheckIn,
  fetchCheckOut,
  fetchUserAttendanceToday,
} from "@/services/AttendanceApi";
import { minutesToHm } from "@/lib/minutToHour";
import { toISOStringNoMs } from "@/utils/toIsoStringNoMs";
import { TimeFormat } from "@/lib/timeFormating";

const ShiftTracker = () => {
  const { data: session, status } = useSession();

  const [isCheckIn, setIsCheckin] = useState<boolean>(true);
  const [attendance, setAttendance] = useState<IAttendance>();
  const [error, setError] = useState<IError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // formating absent time
  const now = new Date();
  const absentTime = new Date(now.getTime() + 7 * 60 * 60 * 1000);
  const formatted = toISOStringNoMs(absentTime);

  useEffect(() => {
    if (status !== "authenticated" || !session?.user.accessToken) return;

    let cancelled = false;
    (async () => {
      try {
        setError(null);
        const data = await fetchUserAttendanceToday(session?.user.accessToken);
        if (!cancelled) {
          setAttendance(data);
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
      }
    })();

    return () => {
      cancelled = true; // mencegah setState setelah unmount
    };
  }, [session, status]);

  const buildCheckInPayload = (): ICheckIn => ({
    check_in_at: formatted,
  });

  const buildCheckOutPayload = (): ICheckOut => ({
    check_out_at: formatted,
  });

  const handleTap = async () => {
    try {
      setIsLoading(true);
      if (isCheckIn) {
        await fetchCheckIn(
          session?.user.user_id,
          buildCheckInPayload(),
          session?.user.accessToken
        );
        setIsCheckin(false); // setelah sukses check-in, pindah ke mode check-out
      } else {
        await fetchCheckOut(
          session?.user.user_id,
          buildCheckOutPayload(),
          session?.user.accessToken
        );
        setIsCheckin(true); // setelah sukses check-out, balik ke mode check-in
      }
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : "Unknown error occured",
        name: err instanceof Error ? err.name : undefined,
        code: err instanceof Error ? 500 : undefined,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!attendance) return;
  return (
    <div className="flex flex-col w-[94%] items-center gap-4">
      {error && (
        <div>
          <p>{error.message}</p>
          <p>{error.name}</p>
          <p>{error.code}</p>
        </div>
      )}
      <div>
        <RealtimeClock locale="en-US" timeZone="Asia/Jakarta" hour12={false} />
      </div>
      <div className="flex flex-col items-center gap-2">
        <div>
          <button
            onClick={handleTap}
            disabled={isLoading}
            className={`w-28 h-28 rounded-full flex justify-center items-center
    ${
      isLoading
        ? "bg-amber-300 cursor-not-allowed"
        : "bg-amber-400 hover:bg-amber-500"
    }`}
            title={isCheckIn ? "Check In" : "Check Out"}
          >
            <Fingerprint className="w-16 h-16" />
          </button>
        </div>
        <div>
          <p className="text-sm mt-2 text-gray-600">
            Mode: <b>{isCheckIn ? "Check In" : "Check Out"}</b>
          </p>
        </div>
      </div>
      <div className="w-full">
        <div className="flex flex-row justify-between">
          <p>
            {attendance.check_in_at === null
              ? "00:00"
              : TimeFormat(attendance.check_in_at)}
          </p>
          <p>
            {attendance.check_out_at === null
              ? "00:00"
              : TimeFormat(attendance.check_out_at)}
          </p>
        </div>
        <div className="bg-amber-400  text-center rounded-lg py-0.5">
          {attendance.check_out_at === null
            ? "0h 0m"
            : minutesToHm(attendance.hours_work_min)}
        </div>
      </div>
    </div>
  );
};

export default ShiftTracker;
