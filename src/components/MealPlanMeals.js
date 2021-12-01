import { useEffect, useState } from "react"
import MealCard from "./MealCard"

const MealPlanMeals = ({meals,mealPlanMeals,addMealToMealPlan,removeMealFromMealPlan}) => {
  const [mealsInMealPlan,setMealsInMealPlan] = useState([])

  useEffect(() => {
    const filteredMeals = meals.filter(obj => mealPlanMeals.indexOf(obj.id) !== -1)
    setMealsInMealPlan(filteredMeals)
  },[meals,mealPlanMeals])

  return (
    <div className="pt-8 px-8 flex flex-col gap-4">
        {mealsInMealPlan.map((meal, index) => <MealCard
        key={index}
        meal={meal}
        addMealToMealPlan={addMealToMealPlan}
        removeMealFromMealPlan={removeMealFromMealPlan}
        mealPlanMeals={mealPlanMeals}
        />)}
    </div>
  )
}

export default MealPlanMeals
