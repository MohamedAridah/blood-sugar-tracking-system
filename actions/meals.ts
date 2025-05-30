"use server";

import prisma from "@/lib/prisma";
import { Meal } from "@prisma/client";
import { revalidateTag, unstable_cache } from "next/cache";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { MEALS_TAG, MEASUREMENTS_TAG } from "@/utils/redirect";
import { getUserSession } from "./auth";

export const getUserMeals = unstable_cache(
  async (userId: string) => {
    return await prisma.meal.findMany({
      where: {
        userId,
      },
    });
  },
  [MEALS_TAG],
  {
    tags: [MEALS_TAG],
  }
);

export const getUserMeal = unstable_cache(
  async (mealId: string) => {
    console.log(`Fetching meal details for ID: ${mealId}`);
    try {
      const meal = await prisma.meal.findUnique({
        where: { id: mealId },
      });

      if (!meal) {
        const message = `Meal with ID ${mealId} not found`;
        console.warn(message);
        throw new Error(message);
      }

      console.log("Meal retrieved successfully:", meal);
      return meal;
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      console.error("Error in getMeal:", errorMessage);
      return { error: errorMessage };
    }
  },
  [MEALS_TAG],
  {
    tags: [MEALS_TAG],
  }
);

type CreateMealParams = {
  name: string;
  description?: string;
};

export const createMeal = async (mealData: CreateMealParams) => {
  console.log("Creating New meal");
  try {
    const { user } = await getUserSession();
    const userId = user?.id;

    if (!userId) throw new Error("Not authenticated");

    await prisma.meal.create({
      data: { userId, ...mealData },
    });
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }
  revalidateTag(MEALS_TAG);
};

export const updateMeal = async (mealId: string, mealData: Partial<Meal>) => {
  console.log("Incomming: ", mealData);

  console.log("Updating Meal");
  try {
    await prisma.meal.update({
      where: {
        id: mealId,
      },
      data: { ...mealData },
    });
  } catch (error: unknown) {
    console.log("Error With updateMeal: ", error);
    return {
      error: getErrorMessage(error),
    };
  }

  revalidateTag(MEALS_TAG);
  revalidateTag(`${MEALS_TAG}-${mealId}`);
};

export const deleteMeal = async (mealId: string) => {
  console.log("Deleting Meal with id of #", mealId);
  try {
    console.log("Deleting Meal");
    await prisma.meal.delete({ where: { id: mealId } });
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
  revalidateTag(MEALS_TAG);
  revalidateTag(MEASUREMENTS_TAG);
};
