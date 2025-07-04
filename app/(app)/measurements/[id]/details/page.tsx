import { Suspense } from "react";
import { getMeasurement, getMeasurements } from "@/actions/measurements";
import { Measurement } from "@prisma/client";
import MeasurementDetails from "@/components/MeasurementDetails";
import Spinner from "@/components/Spinner";
import BackButton from "@/components/BackButton";
import formatDate from "@/utils/formatDate";
import { authClient } from "@/lib/auth-client";

type Props = {
  params: Promise<{ id: string }>;
};

const MeasurementDetailsPage = async ({ params }: Props) => {
  const measurementId = (await params).id;
  const measurement = (await getMeasurement(measurementId)) as Measurement;

  console.log(measurement);

  return (
    <>
      <BackButton />
      <Suspense
        fallback={
          <Spinner text="Loading measurement details..." fullScreen size="lg" />
        }
      >
        <MeasurementDetails measurement={measurement} />
      </Suspense>
    </>
  );
};

export const generateStaticParams = async () => {
  const session = await authClient.getSession();
  const { measurements } = await getMeasurements(
    session.data?.user.id as string,
    {}
  );
  return measurements.map((measurement) => ({
    id: measurement.id,
  }));
};

export default MeasurementDetailsPage;
