"use client";
import { Meal } from "@prisma/client";
import { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { REDIRECT_AFTER_NEW_MEAL } from "@/utils/redirect";
import { MealSchemaType } from "@/schemas/meal_zod";
import { updateMeal } from "@/actions/meals";
import MealForm from "./MealForm";
import { toast } from "sonner";

type Props = {
  formData: Meal;
  mealId: string;
};

const MealForm__Update = ({ mealId, formData }: Props) => {
  const { push } = useRouter();
  const passedData: MealSchemaType = {
    name: formData?.name as string,
    description: formData?.description as string,
  };
  const onSubmit: SubmitHandler<MealSchemaType> = async (data) => {
    const result = await updateMeal(mealId, {
      name: data.name,
      description: data.description,
    });

    if (result?.error) {
      toast.error(result.error.message);
    } else {
      push(REDIRECT_AFTER_NEW_MEAL);
      toast.success("Updated Successfully");
    }
  };

  return <MealForm formData={passedData} formHandler={onSubmit} />;
};

export default MealForm__Update;
