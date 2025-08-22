"use client";

import { usePathname } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { ILeaveType, PaidLeave } from "@/types/interface";
import { useState } from "react";

const LeaveTypeForm = () => {
  const [isPaid, setIsPaid] = useState<PaidLeave | "">("");

  const pathName = usePathname();
  const action =
    pathName === "/admin/leave/leave_type/create"
      ? "Create"
      : pathName === "/admin/leave/leave_type/edit"
      ? "Edit"
      : "";

  const { register, handleSubmit } = useForm<ILeaveType>();
  const onSubmit: SubmitHandler<ILeaveType> = (data) => console.log(data);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="bg-amber-200 w-[96%] px-6 py-4 h-full rounded-sm">
        <h1 className="text-2xl text-amber-800">Office Time</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-3 mt-4"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="leave_type_name" className="text-amber-800 text-lg">
              Leave Type Name
            </label>
            <input
              {...register("leave_type_name", { required: true })}
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
              {Object.values(PaidLeave).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
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
            />
          </div>

          <div className="mt-2 py-2 col-span-2 justify-self-center flex justify-center w-[200px] rounded-sm text-white bg-amber-400 hover:bg-amber-500">
            <input type="submit" value={`${action} Leave Type`} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveTypeForm;
