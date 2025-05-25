"use client";

import {
  BarChart,
  Bar,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
  Label,
  ReferenceLine,
  Cell,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Measurement } from "@prisma/client";

// Chart configuration
const chartConfig = {
  before__level: {
    label: "Before",
    color: "hsl(var(--chart-1))",
  },
  after__level: {
    label: "After",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export type ChartProps<T> = {
  chartData: T[];
};

const getBarColor = (value: number) => {
  if (value > MAX_SUGAR_VALUE) return MAX_SUGAR_COLOR; // blue
  if (value <= MIN_SUGAR_VALUE) return MIN_SUGAR_COLOR; // red
  return NORMAL_SUGAR_COLOR; // green
};

const MIN_SUGAR_VALUE = 70;
const MAX_SUGAR_VALUE = 120;
const MIN_SUGAR_COLOR = "#ef4444";
const MAX_SUGAR_COLOR = "#3b82f6";
const NORMAL_SUGAR_COLOR = "#10b981";

const Chart = <T extends Measurement>({ chartData }: ChartProps<T>) => {
  return (
    <>
      <ValueRangeLegend />
      <ChartContainer
        config={chartConfig}
        className="w-full md:w-8/12 md:mx-auto"
      >
        <BarChart
          accessibilityLayer
          barSize={40}
          data={chartData}
          margin={{ top: 20, bottom: 10 }}
        >
          <CartesianGrid vertical={false} />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />

          <XAxis
            dataKey="mealType"
            tickLine={false}
            tickMargin={5}
            axisLine={false}
          />
          <YAxis tickMargin={5}>
            <Label
              value="Measurement Value (mol/dl)"
              position="insideLeft"
              angle={-90}
              style={{ textAnchor: "middle" }}
            />
          </YAxis>

          <Bar
            dataKey="beforeMeal.value"
            name="Before"
            fill="var(--color-before__level)"
            radius={8}
          >
            <LabelList
              className="fill-[--color-before__level]"
              position="top"
            />
            <LabelList
              content={({ x = 0, y = 0, width = 0, height = 0 }) => {
                const cx = +x + +width / 2;
                const cy = +y + +height;

                return (
                  <text
                    x={cx}
                    y={cy - 4}
                    textAnchor="middle"
                    fill="#FFF"
                    fontSize={12}
                    transform={`rotate(-90, ${cx - 12}, ${cy - 20})`}
                  >
                    Before
                  </text>
                );
              }}
            />
            {chartData.map((entry, index) => {
              return (
                <Cell
                  key={`cell-${index}`}
                  fill={getBarColor(entry.beforeMeal?.value ?? 0)}
                />
              );
            })}
          </Bar>

          <Bar
            dataKey="afterMeal.value"
            name="After"
            fill="var(--color-after__level)"
            radius={8}
          >
            <LabelList className="fill-[--color-after__level]" position="top" />
            <LabelList
              content={({ x = 0, y = 0, width = 0, height = 0 }) => {
                const cx = +x + +width / 2;
                const cy = +y + +height;

                return (
                  <text
                    x={cx}
                    y={cy - 4}
                    textAnchor="middle"
                    fill="#FFF"
                    fontSize={12}
                    transform={`rotate(-90, ${cx - 9}, ${cy - 17})`}
                  >
                    After
                  </text>
                );
              }}
            />
            {chartData.map((entry, index) => {
              return (
                <Cell
                  key={`cell-${index}`}
                  fill={getBarColor(entry.afterMeal?.value ?? 0)}
                />
              );
            })}
          </Bar>

          <ReferenceLine
            y={MAX_SUGAR_VALUE}
            strokeDasharray={4}
            strokeWidth={1}
            isFront={true}
            label={{
              position: "insideBottomRight",
              value: "Max",
              className: "fill-current text-[#333] dark:text-white font-semibold",
            }}
          />
          <ReferenceLine
            y={MIN_SUGAR_VALUE}
            strokeDasharray={4}
            strokeWidth={1}
            isFront={true}
            label={{
              position: "insideBottomRight",
              value: "Min",
              className: "fill-current text-[#333] dark:text-white font-semibold",
            }}
          />
        </BarChart>
      </ChartContainer>
    </>
  );
};

export default Chart;

const ValueRangeLegend = () => {
  const ranges = [
    { label: `Low (< ${MIN_SUGAR_VALUE})`, color: "#ef4444" },
    {
      label: `Normal (${MIN_SUGAR_VALUE} - ${MAX_SUGAR_VALUE})`,
      color: "#10b981",
    },
    { label: `High (> ${MAX_SUGAR_VALUE})`, color: "#3b82f6" },
  ];

  return (
    <div className="flex justify-center gap-4 mb-4 text-sm">
      {ranges.map((range, index) => (
        <div key={index} className="flex items-center gap-1">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ backgroundColor: range.color }}
          ></span>
          <span>{range.label}</span>
        </div>
      ))}
    </div>
  );
};
