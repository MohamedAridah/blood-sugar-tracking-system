import { Prisma } from "@prisma/client";
import { createLoader, parseAsInteger, parseAsString } from "nuqs/server";

export const MeasurementsSearchParams = {
  search: parseAsString.withDefault(""),
  sort: parseAsString.withDefault("desc"),
  limit: parseAsInteger.withDefault(10),
};

export type MeasurementsSearchParamsType = {
  search?: string;
  sort?: Prisma.SortOrder;
  limit?: number;
};

export const loadSearchParams = createLoader(MeasurementsSearchParams);
