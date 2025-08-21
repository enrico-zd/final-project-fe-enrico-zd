
import ChartEmployeeSumarry from "@/components/chart-employee-sumarry";
import SectionCard from "@/components/section-card";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function DashboardAdmin() {
  const session = await getServerSession(authOptions)

  console.log(session?.user.accessToken)
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="self-start ml-6">
        <h1 className="text-4xl">Dashboard</h1>
      </div>
      <div>
        <SectionCard />
      </div>
      <div>
        <ChartEmployeeSumarry />
      </div>
    </div>
  );
}
