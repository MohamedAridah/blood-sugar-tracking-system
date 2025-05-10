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
import {
  Clock,
  ClockArrowDown,
  ClockArrowUp,
  Edit2Icon,
  PackageXIcon,
  Syringe,
  Trash,
} from "lucide-react";
import { getMeasurement } from "@/actions/measurements";
import NotificationMessage from "@/components/NotificationMessage";

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
    <p>details</p>
    // <Card className=" mt-6 shadow-sm">
    //   <CardHeader>
    //     <CardTitle>Measurement Overview</CardTitle>
    //     <CardDescription>Details of measurement</CardDescription>
    //     <CardDescription className="flex flex-col gap-1">
    //       <div className="flex items-center gap-1">
    //         <Clock className="size-[1.1em]" /> Created:{" "}
    //         {new Date(measurement.createdAt).toDateString()} -{" "}
    //         {measurement.beforeMealTime || measurement.afterMealTime}
    //       </div>
    //     </CardDescription>
    //   </CardHeader>

    //   <CardContent>
    //     <p>
    //       Meal: <span>{measurement.measurementType}</span>
    //     </p>

    //     {/* Before */}
    //     <SidebarGroup>
    //       <SidebarGroupLabel className="flex items-center gap-1 p-0">
    //         <ClockArrowUp /> Before Measurement Data
    //       </SidebarGroupLabel>
    //       <SidebarMenu>
    //         <SidebarMenuItem>
    //           <p>
    //             Blood Sugar Level: <span>{measurement.beforeMealLevel}</span>
    //           </p>
    //         </SidebarMenuItem>
    //         <SidebarMenuItem>
    //           <p>
    //             MeasuredAt: <span>{measurement.beforeMealTime}</span>
    //           </p>
    //         </SidebarMenuItem>
    //         <SidebarMenuItem>
    //           <p>
    //             Notes: <span>{measurement.beforeMealNotes}</span>
    //           </p>
    //         </SidebarMenuItem>
    //       </SidebarMenu>
    //     </SidebarGroup>

    //     {/* After */}
    //     <SidebarGroup>
    //       <SidebarGroupLabel className="flex items-center gap-1 p-0">
    //         <ClockArrowDown /> After Measurement Data
    //       </SidebarGroupLabel>
    //       {measurement.afterMealLevel ? (
    //         <SidebarMenu>
    //           <SidebarMenuItem>
    //             <p>
    //               Blood Sugar Level: <span>{measurement.afterMealLevel}</span>
    //             </p>
    //           </SidebarMenuItem>
    //           <SidebarMenuItem>
    //             <p>
    //               MeasuredAt: <span>{measurement.afterMealTime}</span>
    //             </p>
    //           </SidebarMenuItem>
    //           <SidebarMenuItem>
    //             <p>
    //               Notes: <span>{measurement.afterMealNotes}</span>
    //             </p>
    //           </SidebarMenuItem>
    //         </SidebarMenu>
    //       ) : (
    //         <p>No data yet</p>
    //       )}
    //     </SidebarGroup>

    //     {/* Insulin */}
    //     <SidebarGroup>
    //       <SidebarGroupLabel className="flex items-center gap-1 p-0">
    //         <Syringe /> Insulin Data
    //       </SidebarGroupLabel>
    //       {measurement.insulinDose?.doseAmount ? (
    //         <SidebarMenu>
    //           <SidebarMenuItem>
    //             <p>
    //               Insulin Dose:{" "}
    //               <span>{measurement.insulinDose?.doseAmount}</span>
    //             </p>
    //           </SidebarMenuItem>
    //         </SidebarMenu>
    //       ) : (
    //         <p>No data yet</p>
    //       )}
    //     </SidebarGroup>
    //   </CardContent>

    //   <CardFooter className="gap-3 justify-end">
    //     <Link href={`/measurements/${measurement.id}/edit`}>
    //       <Button variant="outline" className="gap-2" size="sm">
    //         <Edit2Icon /> Edit
    //       </Button>
    //     </Link>
    //     <MeasurementDeleteBtn
    //       measurementId={measurement.id}
    //       trigger={
    //         <Button variant="destructive" className="gap-2" size="sm">
    //           <Trash /> Delete
    //         </Button>
    //       }
    //     />
    //   </CardFooter>
    // </Card>
  );
};

export default MeasurementDetails;
