import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Meal } from "@prisma/client";
import { MoreVertical } from "lucide-react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = { meals: Meal[] };

const MealsDropdown = ({ meals }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger aria-label="Show more meals" role="button">
        <MoreVertical className="flex-1 size-4 hover:cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <TabsList className="group flex flex-col h-auto bg-transparent">
          {meals.slice(3).map((meal) => (
            <DropdownMenuItem key={meal.id} className="p-0 m-0 w-full">
              <TabsTrigger
                value={meal.name.toLowerCase()}
                className="capitalize w-full justify-start"
                role="tab"
              >
                {meal.name.toLowerCase()}
              </TabsTrigger>
            </DropdownMenuItem>
          ))}
        </TabsList>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MealsDropdown;
