import { PencilLine } from "lucide-react";

import { useEffect, useState } from "react";
import { ICreateLeaveRequest, IError, ILeaveType } from "@/types/interface";
import { useSession } from "next-auth/react";
import { fetchLeaveType } from "@/services/LeaveTypeApi";
import { SubmitHandler, useForm } from "react-hook-form";
import { UploadButton } from "@/utils/uploadthing";
import { fetchCreateLeaveRequest } from "@/services/LeaveRequest";

export default function LeaveRequestForm() {
  const { data: session, status } = useSession();
  const [leaveType, setLeaveType] = useState<ILeaveType[]>([]);
  const [error, setError] = useState<IError | null>(null);
  const [isLoading, SetIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");

  useEffect(() => {
    if (status !== "authenticated" || !session?.user.accessToken) return;

    let cancelled = false;
    (async () => {
      try {
        setError(null);
        const dataLeaveType = await fetchLeaveType(session?.user.accessToken);
        if (!cancelled) {
          setLeaveType(dataLeaveType);
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
      }
    })();

    return () => {
      cancelled = true; // mencegah setState setelah unmount
    };
  }, [session, status]);

  const { register, handleSubmit, setValue } = useForm<ICreateLeaveRequest>({
    defaultValues: { proof_image: "" },
  });
  const onSubmit: SubmitHandler<ICreateLeaveRequest> = async (data) => {
    try {
      setError(null);
      setSuccess("");
      SetIsLoading(true);
      await fetchCreateLeaveRequest(session?.user.accessToken, data);
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : "Unknown error occured",
        name: err instanceof Error ? err.name : undefined,
        code: err instanceof Error ? 500 : undefined,
      });
    } finally {
      SetIsLoading(false);
      setSuccess("Update Berhasil");
    }
  };
  return (
    <div className="flex flex-col items-center gap-4 w-[376px] pt-2">
      <div className="bg-amber-200 w-[96%] px-6 py-4 h-full rounded-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          {error ? (
            <div>
              <p>{error.message}</p>
              <p>{error.name}</p>
              <p>{error.code}</p>
            </div>
          ) : (
            success && (
              <div>
                <p>{success}</p>
              </div>
            )
          )}
          <div className="relative py-2">
            <select
              className="w-full pl-2 pr-3 py-2 rounded-md rounded-bl-none rounded-tr-none bg-amber-50
                outline-none ring-0 focus:ring-2 focus:ring-amber-400
                border border-amber-600"
              defaultValue=""
              {...register("leave_type_id", {
                required: true,
                valueAsNumber: true,
              })}
            >
              <option value="" disabled>
                — Select Type —
              </option>
              {leaveType.map((type: ILeaveType) => (
                <option key={type.leave_type_id} value={type.leave_type_id}>
                  {type.leave_type_name}
                </option>
              ))}
            </select>
          </div>
          <div className="relative py-1">
            <label htmlFor="from" className="text-amber-800 text-lg">
              Select Start Date
            </label>
            <input
              {...register("from", { required: true })}
              type="date"
              id="from"
              className="
                w-full pl-2 pr-3 py-2 rounded-md rounded-bl-none rounded-tr-none bg-amber-50
                outline-none ring-0 focus:ring-2 focus:ring-amber-400
                border border-amber-600
                "
            />
          </div>
          <div className="relative py-1">
            <label htmlFor="to" className="text-amber-800 text-lg">
              Select End Date
            </label>
            <input
              {...register("to", { required: true })}
              type="date"
              id="to"
              className="
                w-full pl-2 pr-3 py-2 rounded-md rounded-bl-none rounded-tr-none bg-amber-50
                outline-none ring-0 focus:ring-2 focus:ring-amber-400
                border border-amber-600
                "
            />
          </div>
          <div className="relative py-1">
            <label htmlFor="reason" className="text-amber-800 text-lg">
              Reason
            </label>
            <span className="absolute left-3 top-1/2 -translate-y-1/2 opacity-80">
              <PencilLine />
            </span>
            <textarea
              {...register("reason", { required: true })}
              id="reason"
              className="
                w-full pl-12 pr-3 py-2 rounded-md rounded-bl-none rounded-tr-none bg-amber-50
                outline-none ring-0 focus:ring-2 focus:ring-amber-400
                border border-amber-600
                "
            />
          </div>
          <div className="relative py-1">
            <label htmlFor="proof_image" className="text-amber-800 text-lg">
              Proof Image
            </label>
            <UploadButton
              appearance={{
                button:
                  "ut-ready:bg-amber-500 ut-uploading:cursor-not-allowed rounded-r-none bg-red-500 bg-none after:bg-orange-400 w-24",
                container:
                  "w-max flex-row rounded-md border-cyan-300 bg-slate-800",
                allowedContent:
                  "flex h-8 flex-col items-center justify-center px-2 text-white",
              }}
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                setValue("proof_image", res[0].ufsUrl);
                alert("Upload Completed");
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
            />
          </div>

          <div className="mt-6 py-2 col-span-2 flex justify-center w-full rounded-sm text-white bg-amber-400 hover:bg-amber-500">
            <input
              type="submit"
              value={isLoading ? "Creating..." : `Create Shift`}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
