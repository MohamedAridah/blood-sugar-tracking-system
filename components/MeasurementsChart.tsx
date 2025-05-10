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
import { ChartArea } from "lucide-react";
import { MeasurementsSearchParamsType } from "@/app/searchParams";

type MeasurementsChartProps = {
  title?: string;
  description?: string;
  filters?: MeasurementsSearchParamsType;
};

export default async function MeasurementsChart({
  title,
  description,
  filters,
}: MeasurementsChartProps) {
  const { measurements } = await getMeasurements({ ...filters });

  if (measurements.length == 0) {
    return (
      <NotificationMessage
        title="No Data for chart"
        icon={ChartArea}
        variant="gray"
      />
    );
  }

  return (
    <Card className=" mt-10 shadow-sm">
      <CardHeader>
        <CardTitle>{title ? title : "Analytics For This Day"}</CardTitle>
        <CardDescription>
          {description ? description : "Measurements Per Meal"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Chart chartData={measurements} />
      </CardContent>
    </Card>
  );
}
