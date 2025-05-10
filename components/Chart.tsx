"use client";

import {
  BarChart,
  Bar,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
  Label,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  sugar__level: {
    label: "Sugar Level",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export type ChartProps<T> = {
  chartData: T[];
};

const Chart = <T extends object>({ chartData }: ChartProps<T>) => {
  //   if (isError) {
  //     return (
  //       <div className=" p-5  flex items-center justify-center my-3">
  //         <div className="flex flex-col items-center ">
  //           <TriangleAlert className="text-orange-400 " size={35} />
  //           <h1>Unable to get measurements data for this chart</h1>
  //           <p className="text-sm text-slate-700 mt-1">{error.message}</p>
  //         </div>
  //       </div>
  //     );
  //   }

  return (
    <ChartContainer
      config={chartConfig}
      className="w-full md:w-8/12 md:mx-auto"
    >
      <BarChart
        accessibilityLayer
        barSize={50}
        data={chartData}
        margin={{ top: 20, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="5 5" />
        <ChartLegend />
        {/* <ChartLegend content={<ChartLegendContent />} verticalAlign="top" /> */}
        <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
        <XAxis
          dataKey="measurementType"
          tickLine={true}
          tickMargin={0}
          minTickGap={32}
          axisLine={false}
        >
          <Label value="Measurement Time" offset={0} position="insideBottom" />
        </XAxis>
        <YAxis tickMargin={5}>
          <Label value="Measurement Value" position="insideLeft" angle={90} />
        </YAxis>
        <Bar
          dataKey={"beforeMealLevel"}
          fill="var(--color-sugar__level)"
          radius={8}
        >
          <LabelList position="top" offset={4} fontSize={12} />
        </Bar>
        <Bar
          dataKey={"afterMealLevel"}
          fill="var(--color-sugar__level)"
          radius={8}
        >
          <LabelList position="top" offset={4} fontSize={12} />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
};

export default Chart;
