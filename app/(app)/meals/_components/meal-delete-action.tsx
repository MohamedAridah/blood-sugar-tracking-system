"use client";

import { useState } from "react";
import { Meal } from "@prisma/client";
import { deleteMeal } from "@/actions/meals";
import { Button } from "@/components/ui/button";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import IconMenu from "@/app/(app)/measurements/_components/menu-item";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

type Props = {
  meal: Meal;
};

export function MealDeleteAction({ meal }: Props) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <ResponsiveDialog
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        title="Delete Meal"
        description="This action cannot be undone. This will permanently delete your meal and remove your data from our servers."
        actionButton={
          <Button
            className="text-red-500 bg-red-200"
            onClick={async () => {
              const result = await deleteMeal(meal.id);
              if (result?.error) {
                toast.error(result.error.message || "Failed to delete meal");
              } else {
                toast.success("Meal deleted.");
              }
            }}
          >
            <IconMenu icon={<Trash2 className="h-4 w-4" />} text="Delete" />
          </Button>
        }
      />

      <Button
        variant="ghost"
        size="icon"
        aria-label="Delete this meal"
        className="group hover:cursor-pointer hover:bg-red-100 rounded-full"
        onClick={() => {
          setIsDeleteOpen(true);
        }}
      >
        <IconMenu
          icon={<Trash2 className="h-4 w-4 group-hover:text-red-500" />}
        />
      </Button>
    </>
  );
}

export default MealDeleteAction;
