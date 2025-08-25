"use client";

import {
  CartesianGrid,
  Pie,
  PieChart,
  BarChart,
  XAxis,
  Bar,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// hapus jika nanti tidak perlu
export const description = "A pie chart with a legend";

const employeeTypeChartConfig = {
  contract: {
    label: "Contract",
    color: "var(--chart-1)",
  },
  permanent: {
    label: "Permanent",
    color: "var(--chart-2)",
  },
  temporary: {
    label: "Temporary",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

const genderChartConfig = {
  male: {
    label: "Male",
    color: "var(--chart-4)",
  },
  female: {
    label: "Female",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

const ageChartConfig = {
  count: {
    label: "count",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

type dataTotalProps = {
  totalMale: number | undefined;
  totalFemale: number | undefined;
  totalContract: number | undefined;
  totalPermanent: number | undefined;
  totalTemporary: number | undefined;
  totalAges: { age: number; count: number }[];
};
export default function ChartEmployeeSumarry({
  totalMale,
  totalFemale,
  totalContract,
  totalPermanent,
  totalTemporary,
  totalAges,
}: dataTotalProps) {
  // gender chart data
  const genderChartData = [
    { gender: "Male", count: totalMale, fill: "var(--color-male)" },
    { gender: "Female", count: totalFemale, fill: "var(--color-female)" },
  ];

  // employee chart data
  const employeeTypeChartData = [
    {
      employee_type: "contract",
      visitors: totalContract,
      fill: "var(--color-contract)",
    },
    {
      employee_type: "permanent",
      visitors: totalPermanent,
      fill: "var(--color-permanent)",
    },
    {
      employee_type: "temporary",
      visitors: totalTemporary,
      fill: "var(--color-temporary)",
    },
  ];
  return (
    <div className="grid xl:grid-cols-[repeat(3,400px)] lg:grid-cols-[repeat(2,400px)] md:grid-cols-[repeat(1,200px)] justify-items-center gap-4">
      <Card className="w-[380px] h-[390px] bg-amber-200">
        <CardHeader className="items-center pb-0">
          <CardTitle className="text-2xl text-amber-700">
            Employee Type
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={employeeTypeChartConfig}
            className="mx-auto aspect-square max-h-[300px]"
          >
            <PieChart>
              <Pie data={employeeTypeChartData} dataKey="visitors" />
              <ChartLegend
                content={<ChartLegendContent nameKey="employee_type" />}
                className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center text-amber-700"
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="w-[380px] h-[390px] bg-amber-200">
        <CardHeader>
          <CardTitle className="text-2xl text-amber-700">Gender</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col justify-end h-full p-0 pr-2">
          <ChartContainer config={genderChartConfig} className="h-full">
            <BarChart
              accessibilityLayer
              data={genderChartData}
              margin={{
                top: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="gender"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis
                dataKey="count"
                tickLine={false}
                tickMargin={24}
                axisLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent hideLabel className="min-w-[100px]" />
                }
              />
              <Bar dataKey="count" radius={8}></Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="w-[380px] h-[390px] bg-amber-200">
        <CardHeader>
          <CardTitle className="text-2xl text-amber-700">Age</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col justify-end h-full p-0 pr-2">
          <ChartContainer config={ageChartConfig} className="h-full">
            <BarChart accessibilityLayer data={totalAges}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="age"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis
                dataKey="count"
                tickLine={false}
                tickMargin={28}
                axisLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent hideLabel className="min-w-[100px]" />
                }
              />
              <Bar dataKey="count" fill="var(--chart-6)" radius={8}></Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
