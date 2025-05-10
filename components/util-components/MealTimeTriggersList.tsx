import { TabsList, TabsTrigger } from "@/components/ui/tabs";

const triggerClasses =
  "h-full data-[state=active]:bg-blue-800/70 data-[state=active]:text-white data-[state=active]:shadow-md";

const times = ["Before", "After", "Insulin"];

const MealTimeTriggersList = () => {
  return (
    <TabsList className="grid grid-cols-3 gap-2 h-[120px] bg-transparent">
      {times.map((time) => (
        <TabsTrigger
          key={time}
          value={time.toLowerCase()}
          className={triggerClasses}
        >
          {time}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};

export default MealTimeTriggersList;
