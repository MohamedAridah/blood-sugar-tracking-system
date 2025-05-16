import { getUserMeals } from "@/actions/meals";
import MealCard from "./_components/meal-card";
import NotificationMessage from "@/components/NotificationMessage";
import { ArrowRight, FilesIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { PATH_NEW_MEAL } from "@/utils/redirect";
import BackButton from "@/components/BackButton";

const Meals = async () => {
  const meals = await getUserMeals("680fd0ec954a447f2cef1b0c");

  return (
    <section>
      <BackButton />
      <h1 className="font-semibold text-lg mb-2">My Meals</h1>

      {meals.length ? (
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-2 mt-5">
          {meals.map((meal) => (
            <MealCard key={meal.id} meal={meal} />
          ))}
          <Card className="grid place-items-center">
            <Button
              variant="ghost"
              className="border p-4 size-15 rounded-full"
              asChild
            >
              <Link
                href={PATH_NEW_MEAL}
                className="text-xl inline-block"
                aria-label="Go to add new meal page"
              >
                <Plus />
              </Link>
            </Button>
          </Card>
        </div>
      ) : (
        <NotificationMessage
          title="No Meals Found"
          description="your added meals will appear here."
          icon={FilesIcon}
          variant="gray"
          theme="no-border"
        >
          <Button size="sm" className="my-4" asChild>
            <Link href="/meals/new">
              Add Meal
              <ArrowRight />
            </Link>
          </Button>
        </NotificationMessage>
      )}
    </section>
  );
};

export default Meals;
