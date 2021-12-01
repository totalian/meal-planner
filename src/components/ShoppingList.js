import { useState, useEffect } from "react";

const ShoppingList = ({ meals, mealPlanMeals, ingredients }) => {
  const [shoppingList, setShopppingList] = useState([]);

  useEffect(() => {
    const getShoppingList = () => {
      const ingredientListIds = [];
      const filteredMeals = meals.filter(
        (obj) => mealPlanMeals.indexOf(obj.id) !== -1
      );
      filteredMeals
        .map((obj) => obj.ingredients)
        .forEach((arr) => arr.forEach((ing) => ingredientListIds.push(ing)));
      const ingredientList = ingredients
        .filter((obj) => ingredientListIds.indexOf(obj.id) !== -1)
        .map((obj) => obj.label);
      setShopppingList(ingredientList)
    }
    getShoppingList()
  }, [meals, mealPlanMeals, ingredients]);

  return (
    <div
      className="pt-8 px-8 flex flex-col gap-4"
    >
      {shoppingList.map((value, index) => <div
        className={"border-2 py-2 px-2 items-center flex justify-between"}
        key={index}>
        {value}
        <input type="checkbox" />
      </div>)}
    </div>
  )
};

export default ShoppingList;
