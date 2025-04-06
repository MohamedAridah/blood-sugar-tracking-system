import { Suspense } from "react";
import MeasurementDetails from "@/components/MeasurementDetails";
import Spinner from "@/components/Spinner";
import BackButton from "@/components/BackButton";
import { getMeasurements } from "@/actions/measurements";

type Props = {
  params: Promise<{ id: string }>;
};

const MeasurementDetailsPage = async ({ params }: Props) => {
  return (
    <>
      <BackButton text="Go Back" link="/measurements" variant="ghost" />
      <Suspense
        fallback={
          <Spinner text="Loading measurement details..." fullScreen size="lg" />
        }
      >
        <MeasurementDetails measurementId={(await params).id} />
      </Suspense>
    </>
  );
};

export const generateStaticParams = async () => {
  const {measurements} = await getMeasurements();
  return measurements.map((measurement) => ({
    id: measurement.id,
  }));
};

export default MeasurementDetailsPage;
