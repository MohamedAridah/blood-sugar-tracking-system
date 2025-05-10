import BackButton from "@/components/BackButton";
import MeasurementTable from "../_components/data.table";
import { columns } from "../_components/columns";
import { getMeasurements } from "@/actions/measurements";

const MeasurementsOverview = async () => {
  const { measurements } = await getMeasurements({});
  return (
    <>
      <BackButton />
      <MeasurementTable data={measurements} columns={columns} />
    </>
  );
};

export default MeasurementsOverview;
