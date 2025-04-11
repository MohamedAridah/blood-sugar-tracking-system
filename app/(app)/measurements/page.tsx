import { Suspense } from "react";
import { revalidateTag } from "next/cache";
import type { SearchParams } from "nuqs/server";
import { MeasurementFields } from "@/schemas/measurement_zod";
import BackButton from "@/components/BackButton";
import MeasurementsChart from "@/components/MeasurementsChart";
import MeasurementsTable, {
  MeasurementTableProps,
} from "@/components/MeasurementTable";
import Spinner from "@/components/Spinner";
import FilterMeasurements from "@/components/FilterMeasurements";
import { loadSearchParams } from "@/app/searchParams";

type Props = {
  searchParams: Promise<SearchParams>;
};

const MeasurementsPage = async ({ searchParams }: Props) => {
  const { limit, sort, search } = await loadSearchParams(searchParams);

  async function refetchMeasurements() {
    "use server";
    revalidateTag("measurements");
  }

  const tableData: MeasurementTableProps<MeasurementFields> = {
    table: {
      keys: ["Description", "Value", "Date", "View"],
    },
    title: "Latest Measurements",
    filters: {
      limit,
      sort,
      search,
    },
  };
  return (
    <>
      <BackButton text="Back" link="/" variant="ghost" />
      <FilterMeasurements refetchMeasurements={refetchMeasurements} />

      <Suspense fallback={<Spinner text="Loading table data" height="30" />}>
        <MeasurementsTable {...tableData} />
      </Suspense>

      <Suspense fallback={<Spinner text="Processing chart..." height="30" />}>
        <MeasurementsChart filters={{ limit, sort, search }} />
      </Suspense>
    </>
  );
};

export default MeasurementsPage;
