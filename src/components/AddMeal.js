import { useState } from "react";
import Input from "./Input";
import TextArea from "./TextaArea";
import CreatableSelect from "react-select/creatable";
import Button from "./Button";
import { useAuth } from "../contexts/AuthContext";

const AddMeal = ({
  addMeal,
  setMeals,
  ingredients,
  addIngredient,
  setIngredients,
  setShowAddMeal,
  meals
}) => {
  const [mealName, setMealName] = useState("")
  const [mealIngredients, setMealIngredients] = useState([])
  const [error, setError] = useState("")
  const [mealMethod, setMealMethod] = useState("")
  const { currentUser } = useAuth()


  const handleChange = async (values, action) => {
    if (action.action === "select-option") {
      setMealIngredients([...mealIngredients, { id: action.option.id, value: action.option.value, label: action.option.value }])
    } else if (action.action === "create-option") {
      try {
        const newIngredientRef = await addIngredient(currentUser, action.option.value)
        setIngredients([...ingredients, { id: newIngredientRef, value: action.option.value, label: action.option.value }])
        setMealIngredients([...mealIngredients, { id: newIngredientRef, value: action.option.value, label: action.option.value }])
      } catch (error) {
        setError("something went wrong")
        throw error
      }
    } else if (action.action === "remove-value") {
      const mealIngredientsClone = JSON.parse(JSON.stringify(mealIngredients))
      const filteredClone = mealIngredientsClone.filter(obj => {
        const ingredientIdsInSelect = values.map(obj => obj.id)
        return ingredientIdsInSelect.indexOf(obj.id) !== -1
      })
      setMealIngredients(filteredClone)
    } else if (action.action === "clear") {
      setMealIngredients([])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const mealIngredientsForDb = mealIngredients.map(obj => obj.id)
      const newMealRef = await addMeal(currentUser, mealName, mealMethod, mealIngredientsForDb)
      setMeals([...meals, { id: newMealRef, name: mealName, method: mealMethod, ingredients: mealIngredients.map(obj => obj.id) }])
      setShowAddMeal(false)
    } catch (error) {
      setError("could not create new meal")
      throw error
    }
  }

  return <div className="h-screen w-screen bg-white fixed top-0 left-0">
    <div onClick={() => setShowAddMeal(false)} className="text-5xl fixed top-4 right-4">&times;</div>
    <form className="flex flex-col mt-16 px-8 gap-8" onSubmit={handleSubmit}>
      <Input label="Meal Name" value={mealName} onChange={e => setMealName(e.target.value)} />
      <TextArea label="Method" value={mealMethod} onChange={e => setMealMethod(e.target.value)} />
      <div className="flex flex-col gap-1">
        <label htmlFor="ingredientSelect">Ingredients</label>
        <CreatableSelect
          id="ingredientSelect"
          options={ingredients}
          onChange={handleChange}
          isMulti={true}

        />
      </div>
      <Button text="Add Meal" />
    </form>
  </div>;
};

export default AddMeal;
