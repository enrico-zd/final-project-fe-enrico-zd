import { User } from "lucide-react"
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "./ui/card"

export default function SectionCard() {
    return (
        <div className="grid grid-cols-[repeat(3,400px)] grid-rows-2 justify-items-center gap-4">
            <Card className="data-[slot=card]:w-[380px]">
                <CardHeader className="flex flex-col h-[90px] justify-between w-full">
                    <div className="">
                        <CardTitle className="text-2xl">Total Employee</CardTitle>
                    </div>
                    <div className="w-full flex flex-row items-center justify-between">
                        <CardDescription className="text-2xl">10</CardDescription>
                        <CardAction><User size={50}/></CardAction>
                    </div>
                </CardHeader>
            </Card>
            <Card className="data-[slot=card]:w-[380px]">
                <CardHeader className="flex flex-col h-[90px] justify-between w-full">
                    <div className="">
                        <CardTitle className="text-2xl">Total Employee</CardTitle>
                    </div>
                    <div className="w-full flex flex-row items-center justify-between">
                        <CardDescription className="text-2xl">10</CardDescription>
                        <CardAction><User size={50}/></CardAction>
                    </div>
                </CardHeader>
            </Card>
            <Card className="data-[slot=card]:w-[380px]">
                <CardHeader className="flex flex-col h-[90px] justify-between w-full">
                    <div className="">
                        <CardTitle className="text-2xl">Total Employee</CardTitle>
                    </div>
                    <div className="w-full flex flex-row items-center justify-between">
                        <CardDescription className="text-2xl">10</CardDescription>
                        <CardAction><User size={50}/></CardAction>
                    </div>
                </CardHeader>
            </Card>
            <Card className="data-[slot=card]:w-[380px]">
                <CardHeader className="flex flex-col h-[90px] justify-between w-full">
                    <div className="">
                        <CardTitle className="text-2xl">Total Employee</CardTitle>
                    </div>
                    <div className="w-full flex flex-row items-center justify-between">
                        <CardDescription className="text-2xl">10</CardDescription>
                        <CardAction><User size={50}/></CardAction>
                    </div>
                </CardHeader>
            </Card>
            <Card className="data-[slot=card]:w-[380px]">
                <CardHeader className="flex flex-col h-[90px] justify-between w-full">
                    <div className="">
                        <CardTitle className="text-2xl">Total Employee</CardTitle>
                    </div>
                    <div className="w-full flex flex-row items-center justify-between">
                        <CardDescription className="text-2xl">10</CardDescription>
                        <CardAction><User size={50}/></CardAction>
                    </div>
                </CardHeader>
            </Card>
        </div>
    )
}