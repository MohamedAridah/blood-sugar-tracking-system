"use client";
import { SubmitHandler } from "react-hook-form";
import { MeasurementFields } from "@/schemas/measurement_zod";
import MeasurementForm from "@/components/forms/MeasurementForm";
import { Measurement } from "@prisma/client";
import { updateBeforeMealReading } from "@/actions/measurements";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { REDIRECT_AFTER_MEASUREMENT } from "@/utils/redirect";

type Props = {
  formData: Pick<Partial<Measurement>, "beforeMeal" | "afterMeal" | "date">;
  measurementId: string;
};

const MeasurementForm__UpdateBefore = ({ measurementId, formData }: Props) => {
  const { push } = useRouter();

  const passedData: MeasurementFields = {
    bloodSugarLevel: formData.beforeMeal?.value!!,
    notes: formData.beforeMeal?.note!!,
    createdAt: formData.date,
  };

  const onSubmit: SubmitHandler<MeasurementFields> = async (data) => {
    const result = await updateBeforeMealReading(measurementId, {
      beforeMeal: {
        value: data.bloodSugarLevel,
        note: data.notes as string,
      },
    });

    if (result?.error) {
      toast.error(result.error.message);
    } else {
      push(REDIRECT_AFTER_MEASUREMENT);
      toast.success("Updated Successfully");
    }
  };

  return (
    <MeasurementForm data={passedData} formHandler={onSubmit} formType="edit" />
  );
};

export default MeasurementForm__UpdateBefore;
