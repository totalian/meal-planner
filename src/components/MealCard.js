import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Meal from "./Meal";

const MealCard = ({ meal, addMealToMealPlan, removeMealFromMealPlan, mealPlanMeals, ingredients }) => {
  const [selected, setSelected] = useState(false)
  const { currentUser } = useAuth()
  const [showMeal, setShowMeal] = useState(false)

  useEffect(() => {
    const isSelected = () => mealPlanMeals.includes(meal.id)
    isSelected() ? setSelected(true) : setSelected(false)
  }, [meal, mealPlanMeals])

  const handleAdd = () => {
    try {
      addMealToMealPlan(currentUser, meal.id)
      setSelected(true)
    } catch (error) {
      throw error
    }
  }

  const handleRemove = () => {
    try {
      removeMealFromMealPlan(currentUser, meal.id)
      setSelected(false)
    } catch (error) {
      throw error
    }
  }

  return (
    <div className={selected ? `text-white bg-green-600 border-2 py-2 pl-2 px-4 flex flex-col justify-between` : `border-2 py-2 pl-2 px-4 flex justify-between flex-col`}
    >
      <h2 className="">{meal.name}</h2>
      <div className="flex gap-2 justify-end">
        {selected || <div onClick={handleAdd}>Add</div>}
        {selected && <div onClick={handleRemove}>Remove</div>}
        <div>Edit</div>
        <div onClick={() => setShowMeal(true)}>View</div>
      </div>
      {showMeal && <Meal
        meal={meal}
        setShowMeal={setShowMeal}
        ingredients={ingredients}
      />}

    </div>
  );
};

export default MealCard;
