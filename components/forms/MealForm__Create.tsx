"use client";

import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import { createMeal } from "@/actions/meals";
import { MealSchemaType } from "@/schemas/meal_zod";
import { REDIRECT_AFTER_NEW_MEAL } from "@/utils/redirect";
import MealForm from "./MealForm";
import { toast } from "sonner";

const MealForm__Create = () => {
  const { push } = useRouter();

  const onSubmit: SubmitHandler<MealSchemaType> = async (data) => {
    const result = await createMeal({
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

  return <MealForm formHandler={onSubmit} />;
};

export default MealForm__Create;
