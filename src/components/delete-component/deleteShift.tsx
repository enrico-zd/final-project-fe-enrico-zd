"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { fetchDeleteShift } from "@/services/ShiftAPI";
import { IError } from "@/types/interface";
import { Delete } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "sonner";

export function DeleteShift({
  token,
  shiftId,
}: {
  token: string | undefined;
  shiftId: number;
}) {
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<IError | null>(null);

  const handleDelete = async (shiftId: number) => {
    setError(null);
    setSuccess("");
    try {
      await fetchDeleteShift(shiftId, token);
      setSuccess("Berhasil Hapus Shift");
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : "Unknown error occured",
        name: err instanceof Error ? err.name : undefined,
        code: err instanceof Error ? 500 : undefined,
      });
    } finally {
      window.location.reload()
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    } else if (success) {
      toast.success(success);
    }
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Delete />
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-amber-50">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-amber-600">
            Anda yakin ingin hapus?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-amber-700">
            Jika anda melakukan ini maka Shift akan dihapus secara
            permanen.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600"
            onClick={() => handleDelete(shiftId)}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
