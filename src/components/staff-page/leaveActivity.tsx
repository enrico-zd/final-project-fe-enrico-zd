"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import LeaveActivityCard from "./leaveActivityCard";
import { fetchLeaveType } from "@/services/LeaveTypeApi";
import { IError, ILeaveType } from "@/types/interface";

const LeaveActivity = ({
  accessToken,
  statusSession,
}: {
  accessToken: string | undefined;
  statusSession: string;
}) => {
  const [typeSelect, setTypeSelect] = useState<number | null>(null);
  const [leaveType, setLeaveType] = useState<ILeaveType[]>([]);
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
        if (!cancelled) {
          setLeaveType(dataLeaveType);
          setTypeSelect(dataLeaveType[0].leave_type_id);
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

  return (
    <div className="w-full h-[370px] mx-2 rounded-lg bg-amber-500">
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
      <div className="flex flex-row justify-between items-center m-4">
        <p className="text-2xl text-white">Filter</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Select Type <ChevronRight />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-24">
            {leaveType.map((type) => (
              <DropdownMenuGroup key={type.leave_type_id}>
                <DropdownMenuItem
                  className={
                    typeSelect === type.leave_type_id ? "bg-amber-200" : ""
                  }
                  onClick={() => setTypeSelect(type.leave_type_id)}
                >
                  {type.leave_type_name}
                </DropdownMenuItem>
              </DropdownMenuGroup>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>
        <LeaveActivityCard
          accessToken={accessToken}
          statusSession={statusSession}
          typeSelect={typeSelect}
        />
      </div>
    </div>
  );
};

export default LeaveActivity;
