const Meal = ({ meal, setShowMeal, ingredients }) => {
  const methodArray = meal.method.split("\n")
  console.log(meal.ingredients)
  console.log(ingredients)
  const ingredientsArray = ingredients.filter(obj => meal.ingredients.includes(obj.id))
  console.log(ingredientsArray)
  return (
    <div className="h-screen w-screen bg-white fixed top-0 left-0 px-8">
      <div className="h-24">
        <div onClick={() => setShowMeal(false)} className="text-5xl fixed top-4 right-4">&times;</div>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <h1 className="text-2xl">{meal.name}</h1>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl">Method</h2>
          <div>
            {methodArray.map((p, index) => <p key={index}>{p}</p>)}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl">Ingredients</h2>
          <div className="ml-2">
            {ingredientsArray.map((ing, index) => <div key={index}>{ing.label}</div>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Meal
