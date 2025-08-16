import ChartEmployeeSumarry from "@/components/chart-employee-sumarry";
import SectionCard from "@/components/section-card";

export default function DashboardAdmin() {

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
    )
}