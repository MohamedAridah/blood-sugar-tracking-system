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
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import NotificationMessage from "@/components/NotificationMessage";
import { Measurement } from "@prisma/client";
import formatDate from "@/utils/formatDate";
import {
  Clock,
  ClockArrowDown,
  ClockArrowUp,
  Edit2Icon,
  PackageXIcon,
  Syringe,
  Trash,
} from "lucide-react";

type Props = {
  measurement: Measurement &
    Partial<{
      insulinDose: {
        units: number;
        notes: string;
        createdAt: Date;
      };
    }>;
};

const MeasurementDetails = async ({ measurement }: Props) => {
  if (!measurement)
    return (
      <NotificationMessage
        title={`No data. no details for this measurement`}
        icon={PackageXIcon}
        variant="gray"
      />
    );

  return (
    <Card className=" mt-6 shadow-sm">
      <CardHeader>
        <CardTitle>Measurement Overview</CardTitle>
        <CardDescription>Details of measurement</CardDescription>
        <CardDescription className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <Clock className="size-[1.1em]" /> Created at:
            {formatDate(measurement.createdAt)}
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p>
          Meal: <span>{measurement.mealType}</span>
        </p>

        {/* Before */}
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-1 p-0">
            <ClockArrowUp /> Before Measurement Data
          </SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <p>
                Blood Sugar Level: <span>{measurement.beforeMeal?.value}</span>
              </p>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <p>
                MeasuredAt:{" "}
                <span>
                  {formatDate(measurement.beforeMeal?.createdAt as Date)}
                </span>
              </p>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <p>
                Notes: <span>{measurement.beforeMeal?.note}</span>
              </p>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* After */}
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-1 p-0">
            <ClockArrowDown /> After Measurement Data
          </SidebarGroupLabel>
          {measurement.afterMeal ? (
            <SidebarMenu>
              <SidebarMenuItem>
                <p>
                  Blood Sugar Level: <span>{measurement.afterMeal.value}</span>
                </p>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <p>
                  MeasuredAt:{" "}
                  <span>{formatDate(measurement.afterMeal.createdAt)}</span>
                </p>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <p>
                  Notes: <span>{measurement.afterMeal.note}</span>
                </p>
              </SidebarMenuItem>
            </SidebarMenu>
          ) : (
            <p>No data yet</p>
          )}
        </SidebarGroup>

        {/* Insulin */}
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-1 p-0">
            <Syringe /> Insulin Data
          </SidebarGroupLabel>
          {measurement.insulinDose?.units ? (
            <SidebarMenu>
              <SidebarMenuItem>
                <p>
                  Insulin Dose: <span>{measurement.insulinDose?.units}</span>
                </p>
              </SidebarMenuItem>
            </SidebarMenu>
          ) : (
            <p>No data yet</p>
          )}
        </SidebarGroup>
      </CardContent>

      <CardFooter className="gap-3 justify-end">
        <Link href={`/measurements/${measurement.id}/edit`}>
          <Button variant="outline" className="gap-2" size="sm">
            <Edit2Icon /> Edit
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default MeasurementDetails;
