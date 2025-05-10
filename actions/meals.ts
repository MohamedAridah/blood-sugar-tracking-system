"use server";

import prisma from "@/lib/prisma";
import { Meal } from "@prisma/client";
import { revalidateTag, unstable_cache } from "next/cache";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { MEALS_TAG } from "@/utils/redirect";

export const getUserMeals = unstable_cache(
  async (userId: Meal["userId"]) => {
    return await prisma.meal.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        name: true,
        userId: true,
      },
    });
  },
  [MEALS_TAG],
  {
    tags: [MEALS_TAG],
  }
);

type CreateMealParams = {
  userId: string;
  name: string;
  description?: string;
};

export const createMeal = async (mealData: CreateMealParams) => {
  console.log("Creating New meal");
  try {
    await prisma.meal.create({
      data: { ...mealData },
    });
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }

  revalidateTag(MEALS_TAG);
};
