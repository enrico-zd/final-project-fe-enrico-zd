import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

const LeaveActivityCard = () => {
  return (
    <div className="grid grid-cols-1 gap-3 justify-items-center my-4 mx-4">
      <Card className="data-[slot=card]:w-full relative">
        <CardHeader className="flex flex-col w-full">
          <div className="w-full">
            <div className="flex flex-row justify-between items-center mb-2">
              <CardTitle className="text-lg">Leave Request</CardTitle>
              <div className="text-amber-600 bg-amber-100 py-1 px-2 rounded-md">APPROVED</div>
            </div>
            <CardDescription>Sakit</CardDescription>
            <CardDescription>Aug 12 00:00 - Aug 14 23:59</CardDescription>
            <CardDescription>Requested: Aug 11 15:43</CardDescription>
            <CardDescription>Authorized by: Admin</CardDescription>
          </div>
          <Separator />
          <div className="flex flex-col gap-2">
            <div>
              <CardDescription className="font-bold">Reason:</CardDescription>
              <CardDescription>Diare Berat</CardDescription>
            </div>
            <div>
              <CardDescription className="font-bold">
                Admin Remark:
              </CardDescription>
              <CardDescription>Semoga cepat sembuh</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

export default LeaveActivityCard;
