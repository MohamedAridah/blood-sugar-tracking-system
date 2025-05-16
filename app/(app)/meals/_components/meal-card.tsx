import Link from "next/link";
import { Meal } from "@prisma/client";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, Edit2Icon } from "lucide-react";
import IconMenu from "@/app/(app)/measurements/_components/menu-item";
import MealDeleteAction from "./meal-delete-action";

type MealCardProps = {
  meal: Meal;
};

const MealCard = ({ meal }: MealCardProps) => {
  return (
    <Card className="hover:shadow-md">
      <CardHeader>
        <CardTitle>{meal.name}</CardTitle>
        <CardDescription className="flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          <> Created at: {format(meal.createdAt, "PPPP")}</>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {meal?.description && (
          <CardDescription>{meal.description}</CardDescription>
        )}
        <div className="flex gap-1 items-center justify-end w-full opacity-75 hover:opacity-100">
          <MealDeleteAction meal={meal} />
          <Button
            variant="ghost"
            size="icon"
            className="group hover:cursor-pointer rounded-full hover:bg-blue-100"
            asChild
          >
            <Link href={`/meals/${meal.id}/edit`} aria-label="Know more details about this meal">
              <IconMenu
                icon={
                  <Edit2Icon className="h-4 w-4 group-hover:text-blue-500" />
                }
              />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MealCard;
