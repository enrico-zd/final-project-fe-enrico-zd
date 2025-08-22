"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import LeaveActivityCard from "./leaveActivityCard";

const LeaveActivity = () => {
  const [position, setPosition] = useState("bottom");
  return (
    <div className="w-full mx-2 rounded-lg bg-amber-500">
      <div className="flex flex-row justify-between items-center m-4">
        <p className="text-2xl text-white">Filter</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Select Type <ChevronRight />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-24">
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => setPosition("top")}>
                Top
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPosition("bottom")}>
                Bottom
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPosition("right")}>
                Right
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <h1>Filter Type: {position}</h1>
      <div>
        <LeaveActivityCard />
      </div>
    </div>
  );
};

export default LeaveActivity;
