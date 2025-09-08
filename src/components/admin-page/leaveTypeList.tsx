"use client";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { SquarePen } from "lucide-react";
import { fetchLeaveType } from "@/services/LeaveTypeApi";
import { useSession } from "next-auth/react";
import { IError, ILeaveType } from "@/types/interface";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import LeaveTypeTableSkeleton from "../skeletons/LeaveTypeTableSkeleton";
import { DeleteLeaveType } from "../delete-component/deleteLeaveType";

const LeaveTypeList = () => {
  const { data: session, status } = useSession();
  const [dataType, setDataType] = useState<ILeaveType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<IError | null>(null);

  useEffect(() => {
    if (status !== "authenticated" || !session.user.accessToken) return;

    let cancelled = false;

    (async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await fetchLeaveType(session?.user.accessToken);

        if (!cancelled) {
          setDataType(data);
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
      cancelled = true;
    };
  }, [status, session?.user.accessToken]);

  // set alert error
  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  })

  return (
    <div>
      {isLoading ? (
        <LeaveTypeTableSkeleton />
      ) : (

        <Table className="[&_th]:text-center [&_th]:text-white text-center rounded-xl overflow-hidden">
          <TableHeader className="bg-amber-400">
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Is Paid</TableHead>
              <TableHead>Allocated Days</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-amber-100">
            {dataType.map((leaveType, index: number) => (
              <TableRow key={leaveType.leave_type_id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{leaveType.leave_type_name}</TableCell>
                <TableCell>{leaveType.paid_leave}</TableCell>
                <TableCell>
                  {!leaveType.leave_allocated_day
                    ? "-"
                    : leaveType.leave_allocated_day}
                </TableCell>
                <TableCell className="flex flex-row justify-center gap-2">
                  <div>
                    <Link href={`./leave_type/edit/${leaveType.leave_type_id}`}>
                      <SquarePen />
                    </Link>
                  </div>
                  <div className="text-red-400">
                    <DeleteLeaveType token={session?.user.accessToken} leaveId={leaveType.leave_type_id}/>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default LeaveTypeList;
