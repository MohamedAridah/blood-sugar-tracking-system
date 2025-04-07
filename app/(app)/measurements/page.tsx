import { Suspense } from "react";
import { MeasurementFields } from "@/schemas/measurement_zod";
import BackButton from "@/components/BackButton";
import MeasurementsChart from "@/components/MeasurementsChart";
import MeasurementsTable, {
  MeasurementTableProps,
} from "@/components/MeasurementTable";
import Spinner from "@/components/Spinner";

const MeasurementsPage = async () => {
  const tableData: MeasurementTableProps<MeasurementFields> = {
    table: {
      keys: ["Description", "Value", "Date", "View"],
    },
    title: "Latest Measurements",
    limit: 5,
  };
  return (
    <>
      <BackButton text="Back" link="/" variant="ghost" />
      <MeasurementsTable {...tableData} />
      <Suspense fallback={<Spinner text="Processing chart..." />}>
        <MeasurementsChart />
      </Suspense>
    </>
  );
};

export default MeasurementsPage;
