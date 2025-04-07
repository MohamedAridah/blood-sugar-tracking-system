import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Chart from "@/components/Chart";
import { getMeasurements } from "@/actions/measurements";
import NotificationMessage from "./NotificationMessage";
import { ChartArea } from "lucide-react";
import delay from "@/utils/delay";

type MeasurementsChartProps = {
  title?: string;
  description?: string;
  limit?: number;
};

export default async function MeasurementsChart({
  title,
  description,
  limit,
}: MeasurementsChartProps) {
  const { measurements } = await getMeasurements(limit);

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
