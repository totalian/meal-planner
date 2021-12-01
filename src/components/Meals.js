import Button from "./Button";
import Search from "./Search";
import AddMeal from "./AddMeal";
import { useEffect, useState } from "react";
import MealCard from "./MealCard";

const Meals = ({
  meals,
  setMeals,
  addMeal,
  ingredients,
  setIngredients,
  addIngredient,
  addMealToMealPlan,
  removeMealFromMealPlan,
  mealPlanMeals,
}) => {
  const [showAddMeal, setShowAddMeal] = useState(false);
  const [fitleredMeals,setFilteredMeals] = useState([])

  useEffect(() => {
    setFilteredMeals([...meals])
  },[meals])



  return (
    <div className="pt-8 px-8 flex flex-col gap-4">
      <div className="">
        <Button text="Add New Meal" onClick={() => setShowAddMeal(true)} />
      </div>
      <Search setFilteredMeals={setFilteredMeals} meals={meals} />
      {showAddMeal && (
        <AddMeal
          addMeal={addMeal}
          setMeals={setMeals}
          addIngredient={addIngredient}
          setIngredients={setIngredients}
          ingredients={ingredients}
          setShowAddMeal={setShowAddMeal}
          meals={meals}
        />
      )}
      {fitleredMeals &&
        fitleredMeals.map((meal, index) => <MealCard
        key={index}
        meal={meal}
        addMealToMealPlan={addMealToMealPlan}
        removeMealFromMealPlan={removeMealFromMealPlan}
        mealPlanMeals={mealPlanMeals}
        ingredients={ingredients}
        />)}
    </div>
  );
};

export default Meals;
