import Link from "next/link";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Activity,
  ArrowRight,
  ChartNoAxesCombined,
  Edit2,
  EllipsisVertical,
  Rows3,
  SquareArrowOutUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MeasurementFields } from "@/schemas/measurement_zod";
import { getMeasurements } from "@/actions/measurements";
import NotificationMessage from "@/components/NotificationMessage";
import MeasurementDeleteBtn from "@/components/util-components/MeasurementDeleteBtn";

export type Table<T> = {
  keys: string[];
  data?: MeasurementFields[];
};

export type MeasurementTableProps<T> = {
  table: Table<T>;
  title?: string;
  limit?: number;
};

const MeasurementsTable = async <T extends object>({
  table,
  title,
  limit,
}: MeasurementTableProps<T>) => {
  const { measurements, count } = await getMeasurements(limit);

  if (measurements.length === 0)
    return (
      <NotificationMessage
        title="No data to preview in table"
        variant="gray"
        icon={Activity}
      />
    );

  return (
    <div className="mt-10">
      <h3 className="text-2xl mb-4 font-semibold">
        {title ? (
          title
        ) : (
          <>
            Measurements <span className="font-[.99em]">({count})</span>
          </>
        )}
      </h3>
      <Table>
        <TableHeader>
          <TableRow>
            {table?.keys.map((item) => (
              <TableHead key={item}>{item}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {measurements?.map((item) => {
            return (
              <TableRow key={item.id}>
                <TableCell className="ms-auto">
                  {item.measurementType}
                </TableCell>
                <TableCell>{item.bloodSugarLevel}</TableCell>
                <TableCell className="hidden md:table-cell ">
                  {new Date(item.createdAt)
                    ?.toLocaleDateString("en-UK")
                    .replaceAll("/", "-")}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="bg-transparent shadow-none border-none"
                      >
                        <EllipsisVertical />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/measurements/${item.id}/edit`}
                          className="flex items-center gap-0.5 text-sm"
                        >
                          <Edit2 className="text-[1.1em]" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/measurements/${item.id}/details`}
                          className="flex items-center gap-0.5 text-sm"
                        >
                          <SquareArrowOutUpRight className="text-[1.1em]" />
                          Details
                        </Link>
                      </DropdownMenuItem>
                      <MeasurementDeleteBtn measurementId={item.id} />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {limit && (
        <Button variant="outline" className="mx-auto flex mt-4">
          <Link
            href="/measurements/overview"
            className="flex items-center gap-1"
          >
            Show All <ArrowRight />
          </Link>
        </Button>
      )}
    </div>
  );
};

export default MeasurementsTable;
