"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import {
  ICreateUpdateShift,
  IError,
  IShift,
  StatusActive,
} from "@/types/interface";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { fetchShiftById, fetchUpdateShift } from "@/services/ShiftAPI";
import { TimeFormat } from "@/lib/timeFormating";

const ShiftFormUpdate = ({ id, modes }: { id?: number; modes: string }) => {
  const { data: session, status } = useSession();

  const [shiftData, setShiftData] = useState<IShift | null>(null);
  const [success, setSuccess] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<IError | null>(null);

  useEffect(() => {
    const userId = session?.user.user_id;
    const accessToken = session?.user.accessToken;

    if (status !== "authenticated" || !userId || !accessToken) return;

    let cancelled = false;

    (async () => {
      try {
        setIsLoading(true);
        setError(null);
        const shift = await fetchShiftById(id, accessToken);
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
  }, [status, session?.user.user_id, session?.user.accessToken, id]);

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
      await fetchUpdateShift(id, session?.user.accessToken, payload);
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : "Unknown error occured",
        name: err instanceof Error ? err.name : undefined,
        code: err instanceof Error ? 500 : undefined,
      });
    } finally {
      setSuccess("Berhasil Update Shift");
      setIsLoading(false);
    }
  };

  if (!shiftData) return;

  return (
    <div className="flex flex-col items-center gap-4">
      {error && <h1>{error.message}</h1>}
      {isLoading && <h1>Loading...</h1>}
      {success && <h1>{success}</h1>}
      <div className="bg-amber-200 w-[96%] px-6 py-4 h-full rounded-sm">
        <h1 className="text-2xl text-amber-800">Office Time</h1>
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
              defaultValue={modes === "update" ? shiftData.title : ""}
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
              defaultValue={shiftData.status}
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
              {...register("opening_time", {
                required: true,
              })}
              type="time"
              step={1}
              id="opening_time"
              defaultValue={
                modes === "update" && shiftData.opening_time !== null
                  ? TimeFormat(shiftData.opening_time)
                  : ""
              }
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
              defaultValue={
                modes === "update" && shiftData.closing_time !== null
                  ? TimeFormat(shiftData.closing_time)
                  : ""
              }
              className="bg-amber-50 p-1 rounded-sm"
            />
          </div>

          <div className="mt-2 py-2 col-span-2 justify-self-center flex justify-center w-[200px] rounded-sm text-white bg-amber-400 hover:bg-amber-500">
            <input type="submit" value={`${action} Shift`} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShiftFormUpdate;
