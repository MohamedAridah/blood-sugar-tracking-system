import BackButton from "@/components/BackButton";
import MeasurementsTable, {
  MeasurementTableProps,
} from "@/components/MeasurementTable";
import { MeasurementFields } from "@/schemas/measurement_zod";

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
      <p>chart here</p>
    </>
  );
};

export default MeasurementsPage;
