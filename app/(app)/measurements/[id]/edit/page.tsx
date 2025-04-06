import { getMeasurement } from "@/actions/measurements";
import BackButton from "@/components/BackButton";
import MeasurementForm__Update from "@/components/MeasurementForm__Update";
import NotificationMessage from "@/components/NotificationMessage";
import { PackageXIcon } from "lucide-react";

type Props = { params: Promise<{ id: string }> };

const EditMeasurement = async ({ params }: Props) => {
  const measurementId = (await params).id;
  console.log("Edit measurement with id of #" + measurementId);
  const measurementData = await getMeasurement(measurementId);

  if (!measurementData)
    return (
      <>
        <BackButton text="Go Back" link="/measurements" variant="ghost" />
        <NotificationMessage
          title={`No Data. id #${measurementId} is not found to update.`}
          icon={PackageXIcon}
          variant="gray"
        />
      </>
    );

  return (
    <>
      <BackButton text="Go Back" link="/measurements" variant="ghost" />
      <MeasurementForm__Update id={measurementData.id} data={measurementData} />
    </>
  );
};

export default EditMeasurement;
