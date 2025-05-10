"use server";

import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { InsulinDose } from "@prisma/client";
import { findMeasurement } from "@/actions/measurements";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { MEASUREMENTS_TAG } from "@/utils/redirect";


export const addInsulinReading = async (measurementData: InsulinDose) => {
  try {
    const isFound = await findMeasurement(
      {
        userId: measurementData.userId,
        mealId: measurementData.mealId,
        date: measurementData.date,
      },
      { afterMeal: true },
      true
    );

    console.log("isFound: ", isFound);

    if (!isFound?.id) {
      console.log(`Measurement is not found to add insulin dose to.`);
      console.log("Tips: Redirects to add before measurement first");

      throw {
        message:
          "Measurement is not found to add insulin. Tip add before and after measurements first.",
        code: "MEASUREMENT_NOT_FOUND",
      };
    }

    if (isFound.id && !isFound.afterMeal?.value) {
      console.log(
        `After meal measurement is missing. Tip complete before and after meal measurements then add insulin dose`
      );
      console.log("Tips: Redirects to add before and after measurements first");

      throw {
        message:
          "Incomplete meal measurements. Tip add before and after measurements for this meal then add insulin dose",
        code: "MEASUREMENT_INCOMPLETE",
      };
    }

    if (isFound.afterMeal?.value && isFound.insulinDose != null) {
      console.log(
        `Insulin Dose for ${isFound.mealType} on ${isFound.date} Already Exists`
      );
      console.log("Tips: Redirects to edit insulin dose page");
      throw {
        message: "Insulin dose already exists.",
        code: "INSULIN_MEASUREMENT_EXISTS",
      };
    }

    console.log("Creating New Insulin Measurement", measurementData);
    await prisma.measurement.update({
      where: {
        id: isFound.id,
      },
      data: {
        insulinDose: {
          create: {
            userId: measurementData.userId,
            mealId: measurementData.mealId,
            units: measurementData.units,
            type: measurementData.type,
            date: isFound.date,
            notes: measurementData.notes,
          },
        },
      },
    });
  } catch (error) {
    console.log("Error With addInsulinReading: ", error);

    return {
      error: getErrorMessage(error),
    };
  }

  revalidateTag(MEASUREMENTS_TAG);
};

export const updateInsulinReading = async (
  measurementId: string,
  measurementData: Partial<InsulinDose>
) => {
  console.log("Incomming: ", measurementData);

  console.log("Updating Insulin dose Measurement");
  try {
    const isFound = await prisma.insulinDose.findUnique({
      where: { measurementId },
    });

    if (!isFound) {
      throw {
        message:
          "Insulin measurement not found. Tips create insulin measurement for this meal first",
        code: "INSULIN_MEASUREMENT_NOT_FOUND",
      };
    }

    await prisma.insulinDose.update({
      where: {
        measurementId,
      },
      data: {
        units: measurementData.units,
        notes: measurementData.notes,
      },
    });
  } catch (error) {
    console.log("Error with updateInsulinReading: ", error);
    return {
      error: getErrorMessage(error),
    };
  }

  revalidateTag(MEASUREMENTS_TAG);
};
