"use client";
import { SubmitHandler } from "react-hook-form";
import { MeasurementFields } from "@/schemas/measurement_zod";
import MeasurementForm from "@/components/forms/MeasurementForm";
import { Measurement } from "@prisma/client";
import { toast } from "sonner";
import { updateAfterMealReading } from "@/actions/measurements";
import { useRouter } from "next/navigation";
import { REDIRECT_AFTER_MEASUREMENT } from "@/utils/redirect";

type Props = {
  formData: Pick<Partial<Measurement>, "beforeMeal" | "afterMeal">;
  measurementId: string;
};

const MeasurementForm__UpdateAfter = ({ measurementId, formData }: Props) => {
  const { push } = useRouter();
  const passedData: MeasurementFields = {
    bloodSugarLevel: formData.afterMeal?.value!!,
    notes: formData.afterMeal?.note!!,
    createdAt: formData.afterMeal?.createdAt,
  };
  const onSubmit: SubmitHandler<MeasurementFields> = async (data) => {
    const result = await updateAfterMealReading(measurementId, {
      afterMeal: {
        value: data.bloodSugarLevel,
        note: data.notes as string,
        createdAt: formData.afterMeal?.createdAt as Date,
      },
    });

    if (result?.error) {
      toast.error(result.error.message);
    } else {
      push(REDIRECT_AFTER_MEASUREMENT);
      toast.success("Updated Successfully");
    }
  };

  return <MeasurementForm data={passedData} formHandler={onSubmit} />;
};

export default MeasurementForm__UpdateAfter;
