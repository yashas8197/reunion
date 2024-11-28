"use client";

import { TrendingUp } from "lucide-react";
import { Cell, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { name: "Completed", value: 60, fill: "hsl(var(--chart-1))" }, // Completed percentage
  { name: "Pending", value: 40, fill: "hsl(var(--chart-2))" }, // Pending percentage
];

const chartConfig = {
  completed: {
    label: "Completed",
    color: "hsl(var(--chart-1))",
  },
  pending: {
    label: "Pending",
    color: "hsl(var(--chart-2))",
  },
};

export function ChartComponent({
  totalTasks,
  completedPercentage,
  pendingPercentage,
}) {
  const dynamicData = [
    {
      name: "Completed",
      value: completedPercentage,
      fill: "hsl(var(--chart-1))",
    },
    { name: "Pending", value: pendingPercentage, fill: "hsl(var(--chart-2))" },
  ];
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Task Statistics</CardTitle>
        <CardDescription>Total Tasks: {totalTasks}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={dynamicData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              innerRadius={50}
              fill="#8884d8"
              paddingAngle={5}
            >
              {dynamicData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Keep up the great work! Task completion rate is improving steadily{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Statistics are based on the latest task activity.
        </div>
      </CardFooter>
    </Card>
  );
}
