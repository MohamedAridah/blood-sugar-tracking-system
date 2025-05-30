import BackButton from "@/components/BackButton";
import MeasurementTable from "../_components/data.table";
import { columns } from "../_components/columns";
import { getMeasurements } from "@/actions/measurements";
import { getUserSession } from "@/actions/auth";

const MeasurementsOverview = async () => {
  const { user } = await getUserSession();
  const userId = user?.id;

  if (!userId) throw new Error("Not authenticated");

  const { measurements } = await getMeasurements(userId, {});
  return (
    <>
      <BackButton />
      <MeasurementTable data={measurements} columns={columns} />
    </>
  );
};

export default MeasurementsOverview;
