import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function DashboardSkeleton() {
  return (
    <div className="grid xl:grid-cols-[repeat(3,400px)] lg:grid-cols-[repeat(2,400px)] md:grid-cols-[repeat(1,200px)] grid-rows-2 justify-items-center gap-4">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="data-[slot=card]:w-[380px] bg-amber-200">
          <CardHeader className="flex flex-col h-[90px] justify-between w-full">
            {/* Title */}
            <CardTitle>
              <Skeleton className="h-6 w-32 bg-amber-300/50" />
            </CardTitle>

            {/* Bottom row: number + icon */}
            <div className="w-full flex flex-row items-center justify-between">
              <CardDescription>
                <Skeleton className="h-6 w-12 bg-amber-300/50" />
              </CardDescription>
              <div>
                <Skeleton className="h-12 w-12 rounded-md bg-amber-300/50" />
              </div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
