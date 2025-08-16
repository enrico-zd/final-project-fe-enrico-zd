import { BriefcaseBusiness, CalendarOff } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

const Overview = () => {
    return(
        <div className="grid grid-cols-2 justify-items-center mt-4">
            <Card className="data-[slot=card]:w-[160px]">
                <CardHeader className="flex flex-col h-[90px] justify-between w-full">
                    <div className="">
                        <CardTitle><BriefcaseBusiness size={40}/></CardTitle>
                        <CardDescription>Present</CardDescription>
                    </div>
                    <div className="w-full flex flex-row items-center justify-between">
                        <CardDescription className="text-2xl">3</CardDescription>
                    </div>
                </CardHeader>
            </Card>
            <Card className="data-[slot=card]:w-[160px]">
                <CardHeader className="flex flex-col h-[90px] justify-between w-full">
                    <div className="">
                        <CardTitle><CalendarOff size={40}/></CardTitle>
                        <CardDescription>Leave</CardDescription>
                    </div>
                    <div className="w-full flex flex-row items-center justify-between">
                        <CardDescription className="text-2xl">1</CardDescription>
                    </div>
                </CardHeader>
            </Card>
        </div>
    )
}

export default Overview;