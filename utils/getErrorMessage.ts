import { Prisma } from "@prisma/client";
import { prismaError } from "prisma-better-errors";

export const getErrorMessage = (error: unknown) => {
  let message: string;
  let code =
    error && typeof error === "object" && "code" in error && error.code;
  let id = error && typeof error === "object" && "id" in error && error.id;

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    message = String(new prismaError(error));
  } else if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error == "string") {
    message = error;
  } else {
    message = "An unexpected error occurred.";
  }
  return { message, code, id };
};
