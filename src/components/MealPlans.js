import CreateMealPlan from "./CreateMealPlan";
import { useAuth } from "../contexts/AuthContext";
import { useStore } from "../firebase/useStore";
import MealPlanCard from "./MealPlanCard";

const MealPlans = () => {
  const { currentUser } = useAuth();
  const { createMealPlan, mealPlans, setMealPlans } = useStore();

  return (
    <div className="pt-8 px-8 flex flex-col gap-4">
      <CreateMealPlan
        currentUser={currentUser}
        createMealPlan={createMealPlan}
        setMealPlans={setMealPlans}
        mealPlans={mealPlans}
      />
      <div className="flex flex-col gap-4">
        {mealPlans &&
          mealPlans.map((mealPlan, index) => (
            <MealPlanCard key={index} mealPlan={mealPlan} />
          ))}
      </div>
    </div>
  );
};

export default MealPlans;
