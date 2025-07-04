import Link from "next/link";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/BackButton";
import MealsList from "./_components/meals-list";
import { ArrowRight, Plus } from "lucide-react";
import Spinner from "@/components/Spinner";

const Meals = async () => {
  return (
    <section>
      <div className="flex justify-between items-center">
        <BackButton />
        <Button size="sm" className="group">
          <Link href="/meals/new" className="flex items-center">
            <Plus className="mr-2" />
            Add Meal
            <ArrowRight className="invisible -translate-x-full group-hover:visible group-hover:translate-x-1  transition-all" />
          </Link>
        </Button>
      </div>

      <h1 className="font-semibold text-lg mb-2">My Meals</h1>

      <Suspense fallback={<Spinner height="50" text="Getting your meals..." />}>
        <MealsList />
      </Suspense>
    </section>
  );
};

export default Meals;
