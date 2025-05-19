import { Suspense } from "react";
import Link from "next/link";
import { getMeasurements } from "@/actions/measurements";
import BackButton from "@/components/BackButton";
import MeasurementsChart from "@/components/MeasurementsChart";
import Spinner from "@/components/Spinner";
import MeasurementTable from "./_components/data.table";
import { columns } from "./_components/columns";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const MeasurementsPage = async () => {
  const { measurements } = await getMeasurements({});

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <BackButton link="/" className="mb-0" />
        <Button size="sm" asChild>
          <Link href="/measurements/new" className="flex items-center gap-1">
            Add Measurement <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>

      <Suspense fallback={<Spinner text="Loading table data" height="30" />}>
        <MeasurementTable data={measurements} columns={columns} />
      </Suspense>

      <Suspense fallback={<Spinner text="Processing chart..." height="30" />}>
        <MeasurementsChart title="Analytics For your Measurements" />
      </Suspense>
    </>
  );
};

export default MeasurementsPage;
