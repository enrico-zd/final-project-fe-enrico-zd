"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  IApprovedLeaveRequest,
  ILeaveRequest,
  StatusApproval,
} from "@/types/interface";
import { DialogClose } from "@radix-ui/react-dialog";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { fetchApprovedLeaveRequest } from "@/services/LeaveRequest";

export function LeaveRequestApproval({
  accessToken,
  leaveId,
  status,
  adminRemark,
}: {
  accessToken: string | undefined;
  leaveId: number;
  status: StatusApproval;
  adminRemark: string;
}) {
  const { register, handleSubmit } = useForm<ILeaveRequest>();
  const onSubmit: SubmitHandler<IApprovedLeaveRequest> = async (data) => {
    try {
      await fetchApprovedLeaveRequest(leaveId, accessToken, data);
    } finally {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-amber-500 cursor-pointer font-semibold text-white py-1 px-2 rounded-lg">
          {status}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-amber-100">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle className="text-center text-amber-600">
              Leave Status Update
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="status" className="text-amber-600 font-semibold">
                Leave Reason
              </Label>
              <select
                {...register("status", { required: true })}
                defaultValue={
                  status === StatusApproval.Rejected
                    ? StatusApproval.Rejected
                    : StatusApproval.Approved
                }
                name="status"
                id="status"
                className="p-2 rounded-sm text-black bg-amber-50 ring-1 ring-amber-400"
              >
                <option value={StatusApproval.Approved}>Approved</option>
                <option value={StatusApproval.Rejected}>Rejected</option>
              </select>
            </div>
            <div className="grid gap-3">
              <Label
                htmlFor="admin_remark"
                className="text-amber-600 font-semibold"
              >
                Admin Remark
              </Label>
              <Textarea
                {...register("admin_remark", { required: true })}
                name="admin_remark"
                id="admin_remark"
                defaultValue={!adminRemark ? "" : adminRemark}
                className="text-black bg-amber-50 ring-1 ring-amber-400 focus-visible:ring-2 focus-visible:ring-amber-400 focus:border-amber-500"
              />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="bg-amber-500 font-semibold">
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
