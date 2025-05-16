"use client";

import { Meal } from "@prisma/client";
import { useRouter } from "next/navigation";
import { createMeal } from "@/actions/meals";
import { SubmitHandler } from "react-hook-form";
import { REDIRECT_AFTER_NEW_MEAL } from "@/utils/redirect";
import { MealSchemaType } from "@/schemas/meal_zod";
import MealForm from "./MealForm";
import { toast } from "sonner";

type Props = {
  formData: Pick<Meal, "userId">;
};

const MealForm__Create = ({ formData }: Props) => {
  const { push } = useRouter();

  const onSubmit: SubmitHandler<MealSchemaType> = async (data) => {
    const result = await createMeal({
      userId: formData.userId,
      name: data.name,
      description: data.description,
    });

    console.log(result);

    if (result?.error) {
      toast.error(result.error.message || "Failed to add meal");
    } else {
      push(REDIRECT_AFTER_NEW_MEAL);
      toast.success("Meal added");
    }
  };

  return <MealForm formHandler={onSubmit} formData={{ ...formData }} />;
};

export default MealForm__Create;
