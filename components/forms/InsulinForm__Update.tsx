"use client";

import { updateInsulinReading } from "@/actions/insulin";
import { SubmitHandler } from "react-hook-form";
import { InsulinFields } from "@/schemas/insulin_zod";
import InsulinForm from "@/components/forms/InsulinForm";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { REDIRECT_AFTER_MEASUREMENT } from "@/utils/redirect";

type Props = {
  formData: any;
  measurementId: string;
};

const InsulinForm__Update = ({ measurementId, formData }: Props) => {
  const { push } = useRouter();
  const passedData: InsulinFields = {
    insulinDose: formData.insulinDose?.units as number,
    notes: formData.insulinDose?.notes as string,
    createdAt: formData.date,
  };

  const onSubmit: SubmitHandler<InsulinFields> = async (data) => {
    const result = await updateInsulinReading(measurementId, {
      units: data.insulinDose,
      notes: data.notes,
    });

    console.log(result);

    if (result?.error) {
      const notExistCode =
        result.error.code === "INSULIN_MEASUREMENT_NOT_FOUND";
      toast.error(result.error.message || "Failed to update insulin dose", {
        action: !notExistCode
          ? null
          : {
              label: "Add",
              onClick: () => push(`/measurements/new`),
            },
      });
    } else {
      push(REDIRECT_AFTER_MEASUREMENT);
      toast.success("Insulin dose updated");
    }
  };

  return (
    <InsulinForm formHandler={onSubmit} data={passedData} formType="edit" />
  );
};

export default InsulinForm__Update;
