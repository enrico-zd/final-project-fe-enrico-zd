"use client";

import {
  FileClock,
  FileMinus,
  FileText,
  LogIn,
  LogOut,
  User,
} from "lucide-react";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function SectionCard({
  totalUser,
}: {
  totalUser: number | undefined;
}) {
  return (
    <div className="grid xl:grid-cols-[repeat(3,400px)] lg:grid-cols-[repeat(2,400px)] md:grid-cols-[repeat(1,200px)] grid-rows-2 justify-items-center gap-4">
      <Card className="data-[slot=card]:w-[380px] bg-amber-200">
        <CardHeader className="flex flex-col h-[90px] justify-between w-full">
          <div className="">
            <CardTitle className="text-2xl text-amber-700">
              Total Employee
            </CardTitle>
          </div>
          <div className="w-full flex flex-row items-center justify-between">
            <CardDescription className="text-2xl text-amber-700">
              {totalUser}
            </CardDescription>
            <CardAction>
              <User className=" text-amber-700" size={50} />
            </CardAction>
          </div>
        </CardHeader>
      </Card>
      <Card className="data-[slot=card]:w-[380px] bg-amber-200">
        <CardHeader className="flex flex-col h-[90px] justify-between w-full">
          <div className="">
            <CardTitle className="text-2xl text-amber-700">
              Paid Leave
            </CardTitle>
          </div>
          <div className="w-full flex flex-row items-center justify-between">
            <CardDescription className="text-2xl text-amber-700">
              10
            </CardDescription>
            <CardAction>
              <FileText className=" text-amber-700" size={50} />
            </CardAction>
          </div>
        </CardHeader>
      </Card>
      <Card className="data-[slot=card]:w-[380px] bg-amber-200">
        <CardHeader className="flex flex-col h-[90px] justify-between w-full">
          <div className="">
            <CardTitle className="text-2xl text-amber-700">
              On Leaves Today
            </CardTitle>
          </div>
          <div className="w-full flex flex-row items-center justify-between">
            <CardDescription className="text-2xl text-amber-700">
              10
            </CardDescription>
            <CardAction>
              <FileMinus className=" text-amber-700" size={50} />
            </CardAction>
          </div>
        </CardHeader>
      </Card>
      <Card className="data-[slot=card]:w-[380px] bg-amber-200">
        <CardHeader className="flex flex-col h-[90px] justify-between w-full">
          <div className="">
            <CardTitle className="text-2xl text-amber-700">
              Pending Leaves
            </CardTitle>
          </div>
          <div className="w-full flex flex-row items-center justify-between">
            <CardDescription className="text-2xl text-amber-700">
              10
            </CardDescription>
            <CardAction>
              <FileClock className=" text-amber-700" size={50} />
            </CardAction>
          </div>
        </CardHeader>
      </Card>
      <Card className="data-[slot=card]:w-[380px] bg-amber-200">
        <CardHeader className="flex flex-col h-[90px] justify-between w-full">
          <div className="">
            <CardTitle className="text-2xl text-amber-700">
              Check In Today
            </CardTitle>
          </div>
          <div className="w-full flex flex-row items-center justify-between">
            <CardDescription className="text-2xl text-amber-700">
              10
            </CardDescription>
            <CardAction>
              <LogIn className=" text-amber-700" size={50} />
            </CardAction>
          </div>
        </CardHeader>
      </Card>
      <Card className="data-[slot=card]:w-[380px] bg-amber-200">
        <CardHeader className="flex flex-col h-[90px] justify-between w-full">
          <div className="">
            <CardTitle className="text-2xl text-amber-700">
              Check Out Today
            </CardTitle>
          </div>
          <div className="w-full flex flex-row items-center justify-between">
            <CardDescription className="text-2xl text-amber-700">
              10
            </CardDescription>
            <CardAction>
              <LogOut className=" text-amber-700" size={50} />
            </CardAction>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
