import BackButton from "@/components/BackButton";
import MeasurementsTable from "@/components/MeasurementTable";

const MeasurementsOverview = async () => {
  const tableData = {
    table: {
      keys: ["Description", "Value", "Date", "View"],
    },
  };
  return (
    <>
      <BackButton text="Go Back" link="/measurements" variant="ghost" />
      <MeasurementsTable {...tableData} />
    </>
  );
};

export default MeasurementsOverview;
