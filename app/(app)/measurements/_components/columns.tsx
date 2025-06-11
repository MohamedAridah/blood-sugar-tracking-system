"use client";

import { InsulinDose, Measurement } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import DataTableRowActions from "./data-table-row-actions";
import { DataTableColumnHeader } from "./data-table-column-header";
import formatDate from "@/utils/formatDate";
import ResponsiveHeading from "./responsive-heading";

export type MeasurementColumns = Pick<Measurement, "date" | "mealType"> & {
  before: number;
  after: number;
  insulinDose: number;
};

type MeasurementBeforeAndAfterKeys = Measurement["beforeMeal"];

export const columns: ColumnDef<Measurement>[] = [
  {
    accessorKey: "mealType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Meal" />
    ),
  },
  {
    accessorKey: "beforeMeal",
    header: "Before",
    cell: ({ row }) => {
      const value: MeasurementBeforeAndAfterKeys = row.getValue("beforeMeal");
      return value?.value;
    },
  },
  {
    accessorKey: "afterMeal",
    header: "After",
    cell: ({ row }) => {
      const value: MeasurementBeforeAndAfterKeys = row.getValue("afterMeal");
      return value == null ? "-" : value.value;
    },
  },
  {
    accessorKey: "insulinDose",
    header: () => <ResponsiveHeading full="Insulin Dose" short="Insulin" />,
    cell: ({ row }) => {
      const value: InsulinDose = row.getValue("insulinDose");
      return value == null ? "-" : value.units;
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      const date: Date = row.getValue("date");
      return (
        <ResponsiveHeading
          full={formatDate(date, "yyyy-MM-dd")}
          short={formatDate(date, "dd-MM")}
        />
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <DataTableRowActions row={row} />;
    },
  },
];
