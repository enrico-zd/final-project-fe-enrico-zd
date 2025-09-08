"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { IError, IShift } from "@/types/interface";
import { fetchDeleteShift, fetchShift } from "@/services/ShiftAPI";
import Link from "next/link";
import { Delete, SquarePen } from "lucide-react";
import { TimeFormat } from "@/lib/timeFormating";
import { toast } from "sonner";
import ShiftTableSkeleton from "../skeletons/ShiftTableSkeleton";
const ShiftList = ({
  token,
  statusAuth,
}: {
  token: string | undefined;
  statusAuth: string;
}) => {
  const [shiftData, setShiftData] = useState<IShift[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<IError | null>(null);

  useEffect(() => {
    if (statusAuth !== "authenticated" || !token) return;

    let cancelled = false;

    (async () => {
      try {
        setIsLoading(true);
        setError(null);

        const shift = await fetchShift(token);

        if (!cancelled) {
          setShiftData(shift);
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
  }, [statusAuth, token]);

  const handleDelete = async (shiftId: number) => {
    setIsLoading(false);
    setError(null);
    setSuccess("");
    try {
      await fetchDeleteShift(shiftId, token);
      const shift = await fetchShift(token);
      setShiftData(shift);
      setSuccess("Berhasil Hapus Shift");
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

  // set alert for success and error
  useEffect(() => {
    if (error) {
      toast.error(error.message);
    } else if (success) {
      toast.success(success);
    }
  });

  return (
    <div className="px-2">
      {isLoading ? (
        <ShiftTableSkeleton />
      ) : (
        <Table className="[&_th]:text-center [&_th]:text-white text-center rounded-xl overflow-hidden">
          <TableHeader className="bg-amber-400">
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Opening Time</TableHead>
              <TableHead>Closing Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-amber-100">
            {shiftData.map((shift, index: number) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{shift.title}</TableCell>
                <TableCell>{TimeFormat(shift.opening_time)}</TableCell>
                <TableCell>{TimeFormat(shift.closing_time)}</TableCell>
                <TableCell>{shift.status}</TableCell>
                <TableCell className="flex justify-center gap-2 items-center">
                  <div>
                    <Link href={`./shift/update/${shift.shift_id}`}>
                      <SquarePen />
                    </Link>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        if (confirm("Yakin untuk hapus shift ini?")) {
                          handleDelete(shift.shift_id);
                        }
                      }}
                    >
                      <Delete className="text-red-500" />
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

export default ShiftList;
