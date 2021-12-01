import { useParams } from "react-router-dom";
import TabNavigation from "./TabNavigation";
import Meals from "./Meals";
import ShoppingList from "./ShoppingList";
import MealPlanMeals from "./MealPlanMeals";
import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useStore } from "../firebase/useStore";

const MealPlan = () => {
  const { id: mealPlanId } = useParams();
  const [mealPlanMeals, setMealPlanMeals] = useState([]);
  const [error, setError] = useState("");
  const { currentUser } = useAuth();
  const [selectedTab, setSelectedTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const {
    meals,
    setMeals,
    ingredients,
    setIngredients,
    addIngredient,
    addMeal,
  } = useStore();

  const getCurrentUserDbId = async (user) => {
    const usersId = [];
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("userID", "==", user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => usersId.push(doc.id));
    return usersId[0];
  };

  const addMealToMealPlan = async (user, mealId) => {
    const userDbId = await getCurrentUserDbId(user);
    try {
      setError("");
      const newMealRef = await addDoc(
        collection(db, "users", userDbId, "mealPlans", mealPlanId, "meals"),
        {
          id: mealId,
        }
      );
      setMealPlanMeals([mealId, ...mealPlanMeals]);
    } catch (error) {
      setError("Soemthing went wrong");
      throw error;
    }
  };

  const removeMealFromMealPlan = async (user, mealId) => {
    const docsToDelete = [];
    const userDbId = await getCurrentUserDbId(user);
    const collectionRef = collection(
      db,
      "users",
      userDbId,
      "mealPlans",
      mealPlanId,
      "meals"
    );
    const q = query(collectionRef, where("id", "==", mealId));
    const queryResponse = await getDocs(q);
    queryResponse.forEach((doc) => docsToDelete.push(doc.id));
    const docToDelete = docsToDelete[0];
    try {
      setError("");
      await deleteDoc(
        doc(
          db,
          "users",
          userDbId,
          "mealPlans",
          mealPlanId,
          "meals",
          docToDelete
        )
      );
      const mealPlanMealsClone = [...mealPlanMeals];
      mealPlanMealsClone.splice(mealPlanMealsClone.indexOf(mealId), 1);
      setMealPlanMeals(mealPlanMealsClone);
    } catch (error) {
      setError("Something went wrong");
      throw error;
    }
  };

  useEffect(() => {
    const getUserMealPlanMeals = async (user, mealPlanId) => {
      const mealPlanMealsFromDb = [];
      const userDbId = await getCurrentUserDbId(user);
      const mealPlanMealsRef = await getDocs(
        collection(db, "users", userDbId, "mealPlans", mealPlanId, "meals")
      );
      mealPlanMealsRef.forEach((doc) =>
        mealPlanMealsFromDb.push(doc.data().id)
      );
      setMealPlanMeals(mealPlanMealsFromDb);
    };
    setLoading(true);
    getUserMealPlanMeals(currentUser, mealPlanId);
    setLoading(false);
  }, [currentUser, mealPlanId]);

  return (
    <div>
      <TabNavigation
        tabs={["Meals", "Meal Plan", "Shopping"]}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      {selectedTab === 0 && !loading && (
        <Meals
          meals={meals}
          setMeals={setMeals}
          addMeal={addMeal}
          addMealToMealPlan={addMealToMealPlan}
          removeMealFromMealPlan={removeMealFromMealPlan}
          ingredients={ingredients}
          addIngredient={addIngredient}
          setIngredients={setIngredients}
          mealPlanMeals={mealPlanMeals}
        />
      )}
      {selectedTab === 1 && (
        <MealPlanMeals
          mealPlanMeals={mealPlanMeals}
          removeMealFromMealPlan={removeMealFromMealPlan}
          meals={meals}
          addMealToMealPlan={addMealToMealPlan}
        />
      )}
      {selectedTab === 2 && (
        <ShoppingList mealPlanMeals={mealPlanMeals} meals={meals} ingredients={ingredients} />
      )}
    </div>
  );
};

export default MealPlan;
