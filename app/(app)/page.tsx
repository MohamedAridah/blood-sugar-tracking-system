import { revalidateTag } from "next/cache";
import type { SearchParams } from "nuqs/server";
import { getMeasurements } from "@/actions/measurements";
import FilterMeasurements from "@/components/FilterMeasurements";
import { loadSearchParams } from "@/app/searchParams";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

const Home = async ({ searchParams }: PageProps) => {
  // const { sort } = await loadSearchParams(searchParams);

  // async function refetchMeasurements() {
  //   "use server";
  //   revalidateTag("/measurements__key");
  // }

  // const measurements = await getMeasurements({ sort });

  return (
    <section>
      <h1 className="font-semibold">Home</h1>
      {/* <h2>{sort}</h2>
      <FilterMeasurements refetchMeasurements={refetchMeasurements} />

      {JSON.stringify(measurements, null, 2)} */}
    </section>
  );
};

export default Home;
