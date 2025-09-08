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
import { LogIn, LogOut } from "lucide-react";
import { toast } from "sonner";
import { AttendanceDashboardSkeleton } from "../skeletons/AttendanceDashboardSkeleton";

const ShiftTracker = () => {
  const { data: session, status } = useSession();

  const [attendance, setAttendance] = useState<IAttendance>();
  const [error, setError] = useState<IError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");

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
        setLoadingData(true);
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
      } finally {
        setLoadingData(false);
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

  const handleCheckin = async () => {
    try {
      setError(null);
      setIsLoading(true);
      setSuccess("");
      const checkIn = await fetchCheckIn(
        session?.user.user_id,
        buildCheckInPayload(),
        session?.user.accessToken
      );
      setAttendance(checkIn);
      setSuccess("Berhasil Check In")
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : "Unknown error occured",
        name: err instanceof Error ? err.name : undefined,
        code: err instanceof Error ? 500 : undefined,
      });
    } finally {
      setTimeout(() => {
        setSuccess("")
        setIsLoading(false);
      }, 2000);
    }
  };

  const handleCheckOut = async () => {
    try {
      setError(null);
      setIsLoading(true);
      setSuccess("");
      const checkOut = await fetchCheckOut(
        session?.user.user_id,
        buildCheckOutPayload(),
        session?.user.accessToken
      );
      setAttendance(checkOut);
      setSuccess("Berhasil Check Out")
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : "Unknown error occured",
        name: err instanceof Error ? err.name : undefined,
        code: err instanceof Error ? 500 : undefined,
      });
    } finally {
      setTimeout(() => {
        setSuccess("")
        setIsLoading(false);
      }, 2000);
    }
  };

  // set error alert
  useEffect(() => {
    if (error) {
      toast.error(error.message, {
        description: `${error.name ?? ""} ${error.code ?? ""}`,
      });
    } else if (success) {
      toast.success(success)
    }
  });

  return (
      <div className="w-[92%]">
      {loadingData || !attendance ? (<AttendanceDashboardSkeleton />) : (
        
        <div className="flex flex-col w-full items-center gap-4">
        <div>
          <RealtimeClock
            locale="en-US"
            timeZone="Asia/Jakarta"
            hour12={false}
          />
        </div>
        <div className="bg-amber-50 w-full flex flex-col items-center rounded-2xl ring-2 ring-amber-100 shadow-lg">
          <div className="flex flex-row w-full justify-around p-2">
            <div className="flex flex-col items-center">
              <p className="font-semibold pb-1 text-lg">Check In</p>
              {isLoading ? (
                <p>00:00:00</p>
              ) : (
                <p className="font-semibold">
                  {attendance.check_in_at === null
                    ? "--:--:--"
                    : TimeFormat(attendance.check_in_at)}
                </p>
              )}
              <div>
                <button
                  onClick={handleCheckin}
                  disabled={!attendance.check_in_at ? false : true}
                  className={`
                  ${
                    !attendance.check_in_at
                      ? "bg-amber-400 ring-1 hover:ring-2 ring-amber-400 hover:bg-amber-300 text-black/80 active:bg-amber-500"
                      : "bg-amber-100 ring-2 ring-amber-200 text-black/30"
                  } rounded-2xl py-1 px-6 my-2 flex items-center gap-1`}
                >
                  <LogIn size={22} /> Check In
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold pb-1 text-lg">Check Out</p>

              {isLoading ? (
                <p>00:00:00</p>
              ) : (
                <p className="font-semibold">
                  {attendance.check_out_at === null
                    ? "--:--:--"
                    : TimeFormat(attendance.check_out_at)}
                </p>
              )}
              <div>
                <button
                  onClick={handleCheckOut}
                  disabled={!attendance.check_out_at ? false : true}
                  className={`
                  ${
                    !attendance.check_out_at
                      ? "bg-amber-400 ring-1 hover:ring-2 ring-amber-400 hover:bg-amber-300 text-black/80 active:bg-amber-500"
                      : "bg-amber-100 ring-1 ring-amber-200 text-black/30"
                  } rounded-2xl py-1 px-6 my-2 flex items-center gap-1`}
                >
                  <LogOut size={22} /> Check Out
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <p className="text-center text-xl font-semibold pb-1">
            Working Hours
          </p>
          <div className="bg-amber-400 text-center rounded-lg py-0.5  shadow-md">
            {attendance.check_out_at === null
              ? "0h 0m"
              : minutesToHm(attendance.hours_work_min)}
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default ShiftTracker;
