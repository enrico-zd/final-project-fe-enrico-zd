"use client";

import { usePathname } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { IShift } from "@/types/interface";
import { useState } from "react";

const ShiftForm = () => {
  const pathName = usePathname();
  const action =
    pathName === "/admin/shift/create"
      ? "Create"
      : pathName === "/admin/shift/update"
      ? "Update"
      : "";

  const [timeOpening, setTimeOpening] = useState("09:00");
  const [timeClosing, setTimeClosing] = useState("17:00");

  const { register, handleSubmit } = useForm<IShift>();
  const onSubmit: SubmitHandler<IShift> = (data) => console.log(data);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="bg-amber-200 w-[96%] px-6 py-4 h-full rounded-sm">
        <h1 className="text-2xl text-amber-800">Office Time</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-3 mt-4"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="company" className="text-amber-800 text-lg">
              Company Name
            </label>
            <input
              {...register("company", { required: true })}
              type="text"
              id="company"
              className="bg-amber-50 p-1 rounded-sm"
            />
          </div>
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
            <label htmlFor="opening_time" className="text-amber-800 text-lg">
              Opening Time
            </label>
            <input
              {...register("opening_time", { required: true })}
              type="time"
              value={timeOpening}
              id="opening_time"
              className="bg-amber-50 p-1 rounded-sm"
              onChange={(e) => setTimeOpening(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="closing_time" className="text-amber-800 text-lg">
              Opening Time
            </label>
            <input
              {...register("closing_time", { required: true })}
              type="time"
              value={timeClosing}
              id="closing_time"
              className="bg-amber-50 p-1 rounded-sm"
              onChange={(e) => setTimeClosing(e.target.value)}
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="mt-2 py-2 col-span-2 justify-self-center flex justify-center w-[200px] rounded-sm text-white bg-amber-400 hover:bg-amber-500">
            <input type="submit" value={`${action} Shift`} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShiftForm;
