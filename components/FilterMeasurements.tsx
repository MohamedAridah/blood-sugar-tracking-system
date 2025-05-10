"use client";

import { useQueryState } from "nuqs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type FilterMeasurementsProps = {
  refetchMeasurements: () => Promise<void>;
};

const FilterMeasurements = ({
  refetchMeasurements,
}: FilterMeasurementsProps) => {
  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
  });
  const [sort, setSort] = useQueryState("sort", { defaultValue: "desc" });

  const handleSortChange = (value: string) => {
    setSort(value);
    setTimeout(() => {
      refetchMeasurements();
    }, 300);
  };

  const handleSearch = (value: string, debounceingTime: number = 300) => {
    setSearch(value);
    setTimeout(() => {
      refetchMeasurements();
    }, debounceingTime);
  };

  return (
    <div className="flex justify-between gap-3 my-4">
      <div className="relative flex-1 basis-6/12">
        <Input
          placeholder="Search"
          className="w-full"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <Button
          disabled={!!!search}
          variant="ghost"
          className="absolute right-0 top-0"
          onClick={() => handleSearch("", 100)}
        >
          clear
        </Button>
      </div>
      <div>
        <Select value={sort} onValueChange={(value) => handleSortChange(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">Newest</SelectItem>
            <SelectItem value="asc">Oldest</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterMeasurements;
