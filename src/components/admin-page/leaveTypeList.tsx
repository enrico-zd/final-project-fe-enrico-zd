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
import { Delete, SquarePen } from "lucide-react";
import { fetchDeleteLeaveType, fetchLeaveType } from "@/services/LeaveTypeApi";
import { useSession } from "next-auth/react";
import { IError, ILeaveType } from "@/types/interface";
import { useEffect, useState } from "react";

const LeaveTypeList = () => {
  const { data: session, status } = useSession();
  const [dataType, setDataType] = useState<ILeaveType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");
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

  const handleDelete = async (leaveTypeId: number) => {
    setIsLoading(false);
    setError(null);
    setSuccess("");
    try {
      await fetchDeleteLeaveType(leaveTypeId, session?.user.accessToken);
      const data = await fetchLeaveType(session?.user.accessToken);
      setDataType(data);
      setSuccess("Berhasil Hapus User");
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : "Unknown error occured",
        name: err instanceof Error ? err.name : undefined,
        code: err instanceof Error ? 500 : undefined,
      });
    } finally {
      setTimeout(() => {
        setSuccess("");
      }, 1000);
    }
  };

  return (
    <div>
      {success && <h1>{success}</h1>}
      {error && <h1>{error.message}</h1>}
      {isLoading ? (
        <h1>Loading...</h1>
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
                    <button
                      onClick={() => {
                        if (confirm("Yakin untuk hapus leave type ini?")) {
                          handleDelete(leaveType.leave_type_id);
                        }
                      }}
                    >
                      <Delete />
                    </button>
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
