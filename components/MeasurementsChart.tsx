import { getMeasurements } from "@/actions/measurements";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Chart from "@/components/Chart";
import NotificationMessage from "@/components/NotificationMessage";
import { MeasurementsSearchParamsType } from "@/app/searchParams";
import { ChartColumnBig } from "lucide-react";
import { User } from "better-auth";

type MeasurementsChartProps = {
  title?: string;
  description?: string;
  filters?: MeasurementsSearchParamsType;
  user: User;
};

export default async function MeasurementsChart({
  title,
  description,
  filters,
  user,
}: MeasurementsChartProps) {
  const { measurements } = await getMeasurements(user.id, { ...filters });

  if (measurements.length == 0) {
    return (
      <NotificationMessage
        title="No data found for chart"
        icon={ChartColumnBig}
        theme="no-border"
        variant="gray"
        className="mt-10"
      />
    );
  }

  return (
    <Card className="mt-10 shadow-sm">
      <CardHeader>
        <CardTitle>{title ? title : "Analytics For This Day"}</CardTitle>
        <CardDescription>
          {description
            ? description
            : "Measurements per Meal (before & after) Meal"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Chart chartData={measurements} />
      </CardContent>
    </Card>
  );
}
