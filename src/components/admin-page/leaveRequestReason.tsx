import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye } from "lucide-react";
import Link from "next/link";

export function LeaveRequestReason({
  reason,
  adminRemark,
  proofImage,
}: {
  reason: string;
  adminRemark: string;
  proofImage: string;
}) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Eye className="flex justify-center text-amber-600 cursor-pointer" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-amber-100">
          <DialogHeader>
            <DialogTitle className="text-center text-amber-600">
              Leave Reason
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label className="text-amber-600 font-semibold">
                Leave Reason
              </Label>
              <Input
                defaultValue={!reason ? "-" : reason}
                className="disabled:opacity-100 disabled:text-black disabled:bg-amber-50 disabled:ring-1 disabled:ring-amber-400"
                disabled
              />
            </div>
            <div className="grid gap-3">
              <Label className="text-amber-600 font-semibold">
                Admin Remark
              </Label>
              <Input
                defaultValue={!adminRemark ? "-" : adminRemark}
                className="disabled:opacity-100 disabled:text-black disabled:bg-amber-50 disabled:ring-1 disabled:ring-amber-400"
                disabled
              />
            </div>
            <div className="grid gap-3">
              {!proofImage ? (
                <p>-</p>
              ) : (
                <Link
                  href={proofImage}
                  className="text-sky-600"
                  target="_blank"
                >
                  Proof Image
                </Link>
              )}
            </div>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}
