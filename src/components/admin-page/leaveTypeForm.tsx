"use client";

import { usePathname } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  ICreateUpdateLeaveType,
  IError,
  ILeaveType,
  PaidLeave,
} from "@/types/interface";
import { useEffect, useState } from "react";
import {
  fetchCreateLeaveType,
  fetchLeaveTypeById,
  fetchUpdateLeaveType,
} from "@/services/LeaveTypeApi";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import LeaveTypeFormSkeleton from "../skeletons/LeaveTypeFormSkeleton";
import { useRouter } from "next/navigation";

const LeaveTypeForm = ({ id }: { id?: number | undefined }) => {
  const { data: session, status } = useSession();
  const [leaveType, setLeaveType] = useState<ILeaveType>();
  const [success, setSuccess] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);
  const [error, setError] = useState<IError | null>(null);
  const [isPaid, setIsPaid] = useState<PaidLeave | undefined | "">("");

  const router = useRouter();

  const pathName = usePathname();
  const action =
    pathName === "/admin/leave/leave_type/create"
      ? "Create"
      : pathName === `/admin/leave/leave_type/edit/${id}`
      ? "Edit"
      : "";

  useEffect(() => {
    if (status !== "authenticated" || action !== "Edit" || !id) return;

    let cancelled = false;

    (async () => {
      try {
        setIsLoadingPage(true);
        setError(null);

        const leaveType = await fetchLeaveTypeById(
          id,
          session.user.accessToken
        );

        if (!cancelled) {
          setLeaveType(leaveType);
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
        if (!cancelled) {
          setIsLoadingPage(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id, session?.user.accessToken, status, action]);

  useEffect(() => {
    if (action === "Edit") setIsPaid(leaveType?.paid_leave);
    else setIsPaid("");
  }, [action, leaveType]);

  const { register, handleSubmit } = useForm<ILeaveType>();
  const onSubmit: SubmitHandler<ICreateUpdateLeaveType> = async (data) => {
    const payload = {
      ...data,
      leave_allocated_day:
        data.paid_leave === PaidLeave.No ? null : data.leave_allocated_day,
    };

    setError(null);
    setIsLoading(false);
    try {
      setSuccess("");
      setIsLoading(true);
      if (action === "Create") {
        await fetchCreateLeaveType(session?.user.accessToken, payload);
        setSuccess("Berhasil Create");
      } else if (action === "Edit") {
        await fetchUpdateLeaveType(id, session?.user.accessToken, payload);
        setSuccess("Berhasil Update");
      }
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : "Unknown error occured",
        name: err instanceof Error ? err.name : undefined,
        code: err instanceof Error ? 500 : undefined,
      });
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        router.push("/admin/leave/leave_type");
      }, 1000);
    }
  };

  // set alert success and error
  useEffect(() => {
    if (error) {
      toast.error(error.message);
    } else if (success) {
      toast.success(success);
    }
  });

  console.log(action)
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="bg-amber-200 w-[96%] px-6 py-4 h-full rounded-sm">
        <h1 className="text-2xl text-amber-800">Office Time</h1>
        {isLoadingPage && action == "Edit" ? (
          <LeaveTypeFormSkeleton />
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-3 mt-4"
          >
            <div className="flex flex-col gap-2">
              <label
                htmlFor="leave_type_name"
                className="text-amber-800 text-lg"
              >
                Leave Type Name
              </label>
              <input
                {...register("leave_type_name", { required: true })}
                defaultValue={
                  action === "Edit" ? leaveType?.leave_type_name : ""
                }
                type="text"
                id="leave_type_name"
                className="bg-amber-50 p-1 rounded-sm"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="paid_leave" className="text-amber-800 text-lg">
                Is Paid Leave
              </label>
              <select
                {...register("paid_leave", { required: true })}
                name="paid_leave"
                id="paid_leave"
                className="bg-amber-50 p-1 rounded-sm"
                value={isPaid}
                onChange={(e) => setIsPaid(e.target.value as PaidLeave)}
              >
                <option value="" disabled>
                  Select Is Paid
                </option>
                <option value={PaidLeave.Yes}>Yes</option>
                <option value={PaidLeave.No}>No</option>
              </select>
            </div>
            {isPaid === PaidLeave.Yes && (
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="leave_allocated_day"
                  className="text-amber-800 text-lg"
                >
                  Leave Allocated Day
                </label>
                <input
                  type="number"
                  id="leave_allocated_day"
                  className="bg-amber-50 p-1 rounded-sm"
                  defaultValue={
                    action === "Edit" ? leaveType?.leave_allocated_day : ""
                  }
                  {...register("leave_allocated_day", { required: true })}
                />
              </div>
            )}

            <div className="mt-2 py-2 col-span-2 justify-self-center flex justify-center w-[200px] rounded-sm text-white bg-amber-400 hover:bg-amber-500">
              <input
                type="submit"
                value={isLoading ? "Processing..." : `${action} Leave Type`}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LeaveTypeForm;
