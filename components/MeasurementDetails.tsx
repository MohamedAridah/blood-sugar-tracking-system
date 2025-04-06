import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { Clock, Edit2Icon, Info, PackageXIcon, Trash } from "lucide-react";
import { getMeasurement } from "@/actions/measurements";
import NotificationMessage from "@/components/NotificationMessage";
import MeasurementDeleteBtn from "@/components/util-components/MeasurementDeleteBtn";

type Props = {
  measurementId: string;
};

const MeasurementDetails = async ({ measurementId }: Props) => {
  const measurement = await getMeasurement(measurementId);

  if (!measurement)
    return (
      <NotificationMessage
        title={`No data. no details for measurement with ID of #${measurementId}`}
        icon={PackageXIcon}
        variant="gray"
      />
    );

  return (
    <Card className=" mt-10 shadow-sm">
      <CardHeader>
        <CardTitle>Measurement Overview</CardTitle>
        <CardDescription>Details of measurement</CardDescription>
        <CardDescription className="flex items-center gap-1">
          <Clock className="size-[1.1em]" /> Created:{" "}
          {new Date(measurement.createdAt).toDateString()} -{" "}
          {new Date(measurement.createdAt!).toLocaleTimeString("en-UK")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <p>
              Meal: <span>{measurement.measurementType}</span>
            </p>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <p>
              Blood Sugar Level: <span>{measurement.bloodSugarLevel}</span>
            </p>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <p>
              Insuline Dose:
              {measurement.insulinDose ? (
                <span>{measurement.insulinDose}</span>
              ) : (
                <span className="text-sm inline-flex items-center gap-1">
                  <Info size={16} /> No insuline dose was provided by user
                </span>
              )}
            </p>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <p>
              Notes:
              {measurement.notes ? (
                <span>{measurement.notes}</span>
              ) : (
                <span className="text-sm inline-flex items-center gap-1">
                  <Info size={16} /> No notes was provided by user
                </span>
              )}
            </p>
          </SidebarMenuItem>
        </SidebarMenu>
      </CardContent>
      <CardFooter className="gap-3 justify-end">
        <Link href={`/measurements/${measurement.id}/edit`}>
          <Button variant="outline" className="gap-2">
            <Edit2Icon /> Edit
          </Button>
        </Link>
        <MeasurementDeleteBtn
          measurementId={measurement.id}
          trigger={
            <Button variant="destructive" className="gap-2">
              <Trash /> Delete
            </Button>
          }
        />
      </CardFooter>
    </Card>
  );
};

export default MeasurementDetails;
