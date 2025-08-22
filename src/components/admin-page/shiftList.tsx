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
import { fetchShift } from "@/services/ShiftAPI";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import { SquarePen } from "lucide-react";

const ShiftList = ({
  token,
  statusAuth,
}: {
  token: string | undefined;
  statusAuth: string;
}) => {
  const [shiftData, setShiftData] = useState<IShift[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<IError | null>(null);

  const loadShift = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      const shift = await fetchShift(token);
      setShiftData(shift);
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

  useEffect(() => {
    if (statusAuth === "authenticated") {
      loadShift();
    }
  }, [statusAuth]);

  console.log(error);
  return (
    <Table className="[&_th]:text-center text-center">
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Opening Time</TableHead>
          <TableHead>Closing Time</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {shiftData.map((shift, index: number) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{shift.title}</TableCell>
            <TableCell>
              {format(parseISO(shift.opening_time), "HH:mm:ss")}
            </TableCell>
            <TableCell>
              {format(parseISO(shift.closing_time), "HH:mm:ss")}
            </TableCell>
            <TableCell>{shift.status}</TableCell>
            <TableCell className="flex justify-center">
              <div>
                <Link href={`./shift/update/${shift.shift_id}`}>
                  <SquarePen />
                </Link>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ShiftList;
