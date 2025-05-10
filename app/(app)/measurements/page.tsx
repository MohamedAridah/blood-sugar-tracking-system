import { Suspense } from "react";
import { getMeasurements } from "@/actions/measurements";
import BackButton from "@/components/BackButton";
import MeasurementsChart from "@/components/MeasurementsChart";
import Spinner from "@/components/Spinner";
import MeasurementTable from "./_components/data.table";
import { columns } from "./_components/columns";

const MeasurementsPage = async () => {
  const { measurements } = await getMeasurements({});

  return (
    <>
      <BackButton link="/" />

      <Suspense fallback={<Spinner text="Loading table data" height="30" />}>
        <MeasurementTable data={measurements} columns={columns} />
      </Suspense>

      {/* <Suspense fallback={<Spinner text="Processing chart..." height="30" />}>
        <MeasurementsChart filters={{ limit, sort, search }} />
      </Suspense> */}
    </>
  );
};

export default MeasurementsPage;
