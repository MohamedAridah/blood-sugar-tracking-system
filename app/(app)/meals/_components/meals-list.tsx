import Link from "next/link";
import { getUserMeals } from "@/actions/meals";
import { getUserSession } from "@/actions/auth";
import { Button, buttonVariants } from "@/components/ui/button";
import NotificationMessage from "@/components/NotificationMessage";
import MealCard from "./meal-card";
import { ArrowRight, FilesIcon } from "lucide-react";
import clsx from "clsx";

const MealsList = async () => {
  const { user } = await getUserSession();
  const meals = await getUserMeals(user?.id as string);

  return meals.length ? (
    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-2 mt-5">
      {meals.map((meal) => (
        <MealCard key={meal.id} meal={meal} />
      ))}
    </div>
  ) : (
    <NotificationMessage
      title="No Meals Found"
      description="your added meals will appear here."
      icon={FilesIcon}
      variant="gray"
      theme="no-border"
      >
      <Link
        href="/meals/new"
        className={clsx(
          buttonVariants({ size: "sm", variant: "default" }),
          "mt-3"
        )}
      >
        Add Meal
        <ArrowRight />
      </Link>
    </NotificationMessage>
  );
};

export default MealsList;
