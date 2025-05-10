"use client";

import { InsulinDose, Measurement } from "@prisma/client";
import { addInsulinReading } from "@/actions/insulin";
import { SubmitHandler } from "react-hook-form";
import { InsulinFields } from "@/schemas/insulin_zod";
import InsulinForm from "@/components/forms/InsulinForm";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { REDIRECT_AFTER_MEASUREMENT } from "@/utils/redirect";

type Props = {
  formData: Pick<InsulinDose, "userId" | "mealId">;
};

const InsulinForm__Create = ({ formData }: Props) => {
  const { push } = useRouter();
  const onSubmit: SubmitHandler<InsulinFields> = async (data) => {
    const result = await addInsulinReading({
      mealId: formData.mealId,
      userId: formData.userId,
      date: new Date(data.createdAt!!).toISOString().split("T")[0],
      units: data.insulinDose,
      //@ts-ignore
      notes: data.notes,
      type: "INTERMEDIATE",
      createdAt: data.createdAt as Date,
    });

    if (result?.error) {
      const existsCode = result.error.code === "INSULIN_MEASUREMENT_EXISTS";
      toast.error(result.error.message || "Failed to add insulin dose", {
        action: !existsCode
          ? null
          : {
              label: "Edit",
              onClick: () =>
                push(`/measurements/${result.error.id}/edit?type=insulin`),
            },
      });
    } else {
      push(REDIRECT_AFTER_MEASUREMENT);
      toast.success("Insulin dose added");
    }
  };

  return <InsulinForm formHandler={onSubmit} data={{ ...formData }} />;
};

export default InsulinForm__Create;
