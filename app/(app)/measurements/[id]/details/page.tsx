import { Suspense } from "react";
import { getMeasurements } from "@/actions/measurements";
import MeasurementDetails from "@/components/MeasurementDetails";
import Spinner from "@/components/Spinner";
import BackButton from "@/components/BackButton";

type Props = {
  params: Promise<{ id: string }>;
};

const MeasurementDetailsPage = async ({ params }: Props) => {
  return (
    <>
      <BackButton />
      <Suspense
        fallback={
          <Spinner text="Loading measurement details..." fullScreen size="lg" />
        }
      >
        {/* <MeasurementDetails measurementId={(await params).id} /> */}
        <p>Measurement details component</p>
      </Suspense>
    </>
  );
};

export const generateStaticParams = async () => {
  const { measurements } = await getMeasurements({});
  return measurements.map((measurement) => ({
    id: measurement.id,
  }));
};

export default MeasurementDetailsPage;
