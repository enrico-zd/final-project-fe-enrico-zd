"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import {
  ICreateUpdateShift,
  IError,
  IShift,
  StatusActive,
} from "@/types/interface";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchCreateShift } from "@/services/ShiftAPI";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ShiftFormSkeleton from "../skeletons/ShiftFormSkeleton";

const ShiftFormCreate = ({ modes }: { modes: string }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [success, setSuccess] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<IError | null>(null);

  const action =
    modes === "create" ? "Create" : modes === "update" ? "Update" : "";

  const { register, handleSubmit } = useForm<IShift>();
  const onSubmit: SubmitHandler<ICreateUpdateShift> = async (data) => {
    const openingTime = `1970-01-01T${data.opening_time}.000Z`;
    const closingTime = `1970-01-01T${data.closing_time}.000Z`;

    const payload = {
      ...data,
      opening_time: openingTime,
      closing_time: closingTime,
    };
    setError(null);
    try {
      setSuccess("");
      setIsLoading(true);
      await fetchCreateShift(session?.user.accessToken, payload);
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : "Unknown error occured",
        name: err instanceof Error ? err.name : undefined,
        code: err instanceof Error ? 500 : undefined,
      });
    } finally {
      setIsLoading(false);
      setSuccess("Berhasil Create Shift");
      setTimeout(() => {
        router.push("/admin/shift");
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
    <div className="flex flex-col items-center gap-4">
      <div className="bg-amber-200 w-[96%] px-6 py-4 h-full rounded-sm">
        <h1 className="text-2xl text-amber-800">Office Time</h1>
        {isLoading ? (
          <ShiftFormSkeleton />
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-3 mt-4"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="text-amber-800 text-lg">
                Title
              </label>
              <input
                {...register("title", { required: true })}
                type="text"
                id="title"
                className="bg-amber-50 p-1 rounded-sm"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="status" className="text-amber-800 text-lg">
                Status
              </label>
              <select
                {...register("status", { required: true })}
                name="status"
                id="status"
                className="bg-amber-50 p-1 rounded-sm"
              >
                <option value="" disabled>
                  Select Status
                </option>
                <option value={StatusActive.Active}>Active</option>
                <option value={StatusActive.Inactive}>Inactive</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="opening_time" className="text-amber-800 text-lg">
                Opening Time
              </label>
              <input
                {...register("opening_time", { required: true })}
                type="time"
                step={1}
                id="opening_time"
                className="bg-amber-50 p-1 rounded-sm"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="closing_time" className="text-amber-800 text-lg">
                Opening Time
              </label>
              <input
                {...register("closing_time", { required: true })}
                type="time"
                step={1}
                id="closing_time"
                className="bg-amber-50 p-1 rounded-sm"
              />
            </div>

            <div className="mt-2 py-2 col-span-2 justify-self-center flex justify-center w-[200px] rounded-sm text-white bg-amber-400 hover:bg-amber-500">
              <input type="submit" value={`${action} Shift`} />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ShiftFormCreate;
