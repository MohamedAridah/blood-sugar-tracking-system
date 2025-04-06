"use client";

import { deleteMeasurement } from "@/actions/measurements";
import Dialog from "@/components/Dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Trash } from "lucide-react";

type Props = {
  measurementId: string;
  trigger?: React.ReactNode;
};

const MeasurementDeleteBtn = ({ measurementId, trigger }: Props) => {
  return (
    <Dialog
      trigger={
        trigger ? (
          trigger
        ) : (
          <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
            <div className="text-sm flex items-center gap-0.5 w-full">
              <Trash className="text-[1.1em]" /> Delete
            </div>
          </DropdownMenuItem>
        )
      }
      title="Are you absolutely sure?"
      description="This action cannot be undone. This will permanently delete your measurement and remove your data from our servers."
      action={{
        text: "Continue",
        action: async () => await deleteMeasurement(measurementId),
      }}
    />
  );
};

export default MeasurementDeleteBtn;
