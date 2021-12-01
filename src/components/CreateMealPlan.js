import { useState } from "react"
import Button from "./Button"
import Input from "./Input"

const CreateMealPlan = ({ currentUser, createMealPlan, setMealPlans, mealPlans }) => {
  const [mealPlanName, setMealPlanName] = useState("")
  const [error, setError] = useState("")


  const handleFormSubmit = async e => {
    e.preventDefault()
    if (mealPlanName) {
      try {
        const mealPlan = await createMealPlan(currentUser, mealPlanName)
        await setMealPlans([...mealPlans, { id: mealPlan, title: mealPlanName }])
        setMealPlanName("")
      } catch (error) {
        setError("Something went wrong")
        throw (error)
      }
    } else return
  }

  return (
    <div className="">
      <form onSubmit={handleFormSubmit} className="border-2 flex flex-col gap-6 p-8">
        <h2 className="text-center">Add a new meal plan</h2>
        <Input label="Meal Plan Name" onChange={e => setMealPlanName(e.target.value)} value={mealPlanName} />
        <Button text="Add Plan" />
      </form>
    </div>
  )
}

export default CreateMealPlan
