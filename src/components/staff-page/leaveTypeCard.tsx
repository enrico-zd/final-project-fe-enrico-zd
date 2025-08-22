import { Card, CardDescription, CardHeader } from "../ui/card";

const LeaveTypeCard = () => {
  return (
    <div className="grid grid-cols-2 justify-items-center mt-4">
      <Card className="data-[slot=card]:w-[160px]">
        <CardHeader className="flex flex-col h-[90px] justify-center items-center w-full">
          <div>
            <CardDescription>Sakit</CardDescription>
          </div>
          <div>
            <CardDescription className="text-2xl">3</CardDescription>
          </div>
        </CardHeader>
      </Card>
      <Card className="data-[slot=card]:w-[160px]">
        <CardHeader className="flex flex-col h-[90px] justify-center items-center w-full">
          <div>
            <CardDescription>Keluarga</CardDescription>
          </div>
          <div>
            <CardDescription className="text-2xl">1</CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

export default LeaveTypeCard;
