import { IError, ILeaveRequest, ILeaveType } from "@/types/interface";
import { Card, CardDescription, CardHeader } from "../ui/card";
import { useEffect, useState } from "react";
import { fetchLeaveType } from "@/services/LeaveTypeApi";
import { fetchAllLeaveRequestByUserId } from "@/services/LeaveRequest";

const LeaveTypeCard = ({
  accessToken,
  statusSession,
}: {
  accessToken: string | undefined;
  statusSession: string;
}) => {
  const [leaveType, setLeaveType] = useState<ILeaveType[]>([]);
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
        const dataLeaveType = await fetchLeaveType(accessToken);
        const dataLeaveRequest = await fetchAllLeaveRequestByUserId(
          accessToken
        );
        if (!cancelled) {
          setLeaveType(dataLeaveType);
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
  }, [statusSession, accessToken]);

  const countLeave = leaveRequest.reduce<Record<number, number>>(
    (acc, { leave_type_id }) => {
      acc[leave_type_id] = (acc[leave_type_id] ?? 0) + 1;
      return acc;
    },
    {}
  );

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
        <div className="grid grid-cols-2 justify-items-center mt-4">
          <Card className="data-[slot=card]:w-[160px]">
            <CardHeader className="flex flex-col h-[90px] justify-center items-center w-full">
              <div>
                <CardDescription>
                  <div className="h-4 w-24 bg-gray-300 rounded-md animate-pulse mb-2"></div>
                </CardDescription>
              </div>
              <div>
                <CardDescription className="text-2xl">
                  <div className="h-8 w-8 bg-gray-300 rounded-md animate-pulse"></div>
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
          <Card className="data-[slot=card]:w-[160px]">
            <CardHeader className="flex flex-col h-[90px] justify-center items-center w-full">
              <div>
                <CardDescription>
                  <div className="h-4 w-24 bg-gray-300 rounded-md animate-pulse mb-2"></div>
                </CardDescription>
              </div>
              <div>
                <CardDescription className="text-2xl">
                  <div className="h-8 w-8 bg-gray-300 rounded-md animate-pulse"></div>
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        </div>
      )}
      <div className="grid grid-cols-2 justify-items-center mt-4">
        {leaveType.map((type) => (
          <Card key={type.leave_type_id} className="data-[slot=card]:w-[160px]">
            <CardHeader className="flex flex-col h-[90px] justify-center items-center w-full">
              <div>
                <CardDescription>{type.leave_type_name}</CardDescription>
              </div>
              <div>
                <CardDescription className="text-2xl">
                  {countLeave[type.leave_type_id]}
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LeaveTypeCard;
