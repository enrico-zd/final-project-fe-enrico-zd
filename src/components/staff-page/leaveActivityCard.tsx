import { fetchFilterLeaveRequestByType } from "@/services/LeaveRequest";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { IError, ILeaveRequest } from "@/types/interface";
import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { TimeFormat } from "@/lib/timeFormating";
import { formatInTimeZone } from "date-fns-tz";

const LeaveActivityCard = ({
  accessToken,
  statusSession,
  typeSelect,
}: {
  accessToken: string | undefined;
  statusSession: string;
  typeSelect: number | null;
}) => {
  const [leaveRequest, setLeaveRequest] = useState<ILeaveRequest[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<IError | null>(null);

  useEffect(() => {
    if (statusSession !== "authenticated" || !accessToken) return;

    let cancelled = false;
    (async () => {
      try {
        setIsLoading(true);
        setError(null);
        const dataLeaveRequest = await fetchFilterLeaveRequestByType(
          typeSelect,
          accessToken
        );
        if (!cancelled) {
          setLeaveRequest(dataLeaveRequest);
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
  }, [statusSession, accessToken, typeSelect]);

  return (
    <div className="grid grid-cols-1 gap-3 justify-items-center my-4 mx-4 h-[286px] rounded-xl overflow-x-auto">
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
      {leaveRequest.map((request) => (
        <Card
          key={request.leave_request_id}
          className="data-[slot=card]:w-full h-[286px]"
        >
          <CardHeader className="flex flex-col w-full">
            <div className="w-full">
              <div className="flex flex-row justify-between items-center">
                <CardTitle className="text-lg">Leave Request</CardTitle>
                <div className="text-amber-600 bg-amber-100 py-1 px-2 rounded-md">
                  {request.status}
                </div>
              </div>
              <CardDescription>{request.type.leave_type_name}</CardDescription>
              <CardDescription>
                {format(parseISO(request.from), "MMM d")}{" "}
                {TimeFormat(request.from)} -{" "}
                {formatInTimeZone(request.to, "UTC", "MMM d")}{" "}
                {TimeFormat(request.to)}
              </CardDescription>
              <CardDescription>
                Requested: {format(parseISO(request.request_date), "MMM d")}{" "}
                {TimeFormat(request.request_date)}
              </CardDescription>
              <CardDescription>
                Authorized by: {!request.approver ? "-" : request.approver.role}
              </CardDescription>
            </div>
            <Separator />
            <div className="flex flex-col gap-2">
              <div>
                <CardDescription className="font-bold">Reason:</CardDescription>
                <CardDescription>{request.reason}</CardDescription>
              </div>
              <div>
                <CardDescription className="font-bold">
                  Admin Remark:
                </CardDescription>
                <CardDescription>
                  {!request.admin_remark ? "-" : request.admin_remark}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default LeaveActivityCard;
