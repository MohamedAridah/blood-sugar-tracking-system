"use client";

import { useRouter } from "next/navigation";
import { Measurement } from "@prisma/client";
import { SubmitHandler } from "react-hook-form";
import { MeasurementFields } from "@/schemas/measurement_zod";
import MeasurementForm from "@/components/forms/MeasurementForm";
import { addBeforeMealReading } from "@/actions/measurements";
import { toast } from "sonner";
import { REDIRECT_AFTER_MEASUREMENT } from "@/utils/redirect";
import Link from "next/link";

type Props = {
  formData: Pick<Measurement, "userId" | "mealId" | "mealType">;
};

const MeasurementForm__Create__Before = ({ formData }: Props) => {
  const { push } = useRouter();

  const onSubmit: SubmitHandler<MeasurementFields> = async (data) => {
    const result = await addBeforeMealReading({
      userId: formData.userId,
      mealId: formData.mealId,
      mealType: formData.mealType,
      date: new Date(data.createdAt!!).toISOString().split("T")[0],
      beforeMeal: {
        note: data?.notes as string,
        value: data.bloodSugarLevel,
        createdAt: data?.createdAt as Date,
      },
    });

    console.log(result);

    if (result?.error) {
      const existsCode = result.error.code === "MEASUREMENT_EXISTS";
      toast.error(result.error.message || "Failed to add before measurement", {
        action: !existsCode
          ? null
          : {
              label: "Edit",
              onClick: () =>
                push(`/measurements/${result.error.id}/edit?type=before`),
            },
      });
    } else {
      push(REDIRECT_AFTER_MEASUREMENT);
      toast.success("Before measurement added");
    }
  };

  return <MeasurementForm formHandler={onSubmit} data={{ ...formData }} />;
};

export default MeasurementForm__Create__Before;
