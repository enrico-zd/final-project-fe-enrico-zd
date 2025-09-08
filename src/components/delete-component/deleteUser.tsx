"use client"
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
} from "@/components/ui/alert-dialog"
import { fetchDeleteUser } from "@/services/UserAPI";
import { IError } from "@/types/interface";
import { Delete } from "lucide-react"
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "sonner";

export function DeleteUser({token, userId}: {
  token: string | undefined;
  userId: number;
}) {
    const [success, setSuccess] = useState<string>("");
    const [error, setError] = useState<IError | null>(null);

  const handleDelete = async (userId: number) => {
      setError(null);
      setSuccess("");
      try {
        await fetchDeleteUser(userId, token);
        setSuccess("Berhasil Hapus User");
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
  })
  
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Delete />
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-amber-50">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-amber-600">Anda yakin ingin hapus?</AlertDialogTitle>
          <AlertDialogDescription className="text-amber-700">
            Jika anda melakukan ini maka User akan dihapus secara permanen.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-500 hover:bg-red-600" onClick={() => handleDelete(userId)}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
