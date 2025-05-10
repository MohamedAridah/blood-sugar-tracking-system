"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Edit,
  MoreHorizontal,
  SquareArrowOutUpRight,
  Trash,
  Trash2,
} from "lucide-react";
import { Row } from "@tanstack/react-table";
import IconMenu from "./menu-item";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { useState } from "react";
import { deleteMeasurement } from "@/actions/measurements";
import { toast } from "sonner";

type WithId<T> = {
  id: string;
};

type DataTableRowActionsProps<TData> = {
  row: Row<TData>;
};

export function DataTableRowActions<TData extends WithId<string>>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const measurementId = row.original.id;

  return (
    <>
      <ResponsiveDialog
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        title="Delete Measurement"
        description="This action cannot be undone. This will permanently delete your measurement and remove your data from our servers."
        actionButton={
          <Button
            className="text-red-500 bg-red-200"
            onClick={async () => {
              const result = await deleteMeasurement(measurementId);
              if (result?.error) {
                toast.error(
                  result.error.message || "Failed to delete measurement"
                );
              } else {
                toast.success("Measurement deleted.");
              }
            }}
          >
            <IconMenu icon={<Trash2 className="h-4 w-4" />} text="Delete" />
          </Button>
        }
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>
            <Link
              href={`/measurements/${measurementId}/edit`}
              className="w-full"
            >
              <IconMenu icon={<Edit className="h-4 w-4" />} text="Edit" />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={`/measurements/${measurementId}/details`}
              className="w-full"
            >
              <IconMenu
                icon={<SquareArrowOutUpRight className="h-4 w-4" />}
                text="Details"
              />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <button
              onClick={() => {
                setIsDeleteOpen(true);
              }}
              className="w-full flex text-red-500"
            >
              <IconMenu text="Delete" icon={<Trash2 className="h-4 w-4" />} />
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default DataTableRowActions;
