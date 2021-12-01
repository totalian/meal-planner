import { db } from "./config";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

export const useStore = () => {
  const addUser = async (user) => {
    const docRef = await addDoc(collection(db, "users"), {
      userID: user,
    });
    return docRef;
  };

  const {currentUser} = useAuth()

  const getCurrentUserDbId = async (user) => {
    const usersId = [];
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("userID", "==", user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => usersId.push(doc.id));
    return usersId[0];
  };

  const createMealPlan = async (user, title) => {
    const userDbId = await getCurrentUserDbId(user);
    const userMealPlansRef = await addDoc(
      collection(db, "users", userDbId, "mealPlans"),
      {
        title,
      }
    );
    return userMealPlansRef.id;
  };

  const addMeal = async (user,name,method,ingredients) => {
    const userDbId = await getCurrentUserDbId(user);
    const userMealRef = await addDoc(collection(db,"users",userDbId,"meals"),{
      name,method,ingredients
    })
    return userMealRef.id
  }

  const addIngredient = async (user,name) => {
    const userDbId = await getCurrentUserDbId(user);
    const userIngredientRef = await addDoc(collection(db,"users",userDbId,"ingredients"),{
      name
    })
    return userIngredientRef.id
  }

  const [mealPlans,setMealPlans] = useState([])
  const [meals,setMeals] = useState([])
  const [ingredients,setIngredients] = useState([])

  useEffect(() => {
    const getUserMealPlans = async user => {
      const mealPlansFromDb = []
      const userDBId = await getCurrentUserDbId(user)
      const querySnapshot = await getDocs(collection(db,"users",userDBId,"mealPlans"))
      querySnapshot.forEach(doc => mealPlansFromDb.push({title: doc.data().title, id:doc.id}))
      setMealPlans(mealPlansFromDb)
    }
    const getUserMeals = async user => {
      const mealsFromDb = []
      const userDBId = await getCurrentUserDbId(user)
      const querySnapshot = await getDocs(collection(db,"users",userDBId,"meals"))
      querySnapshot.forEach(doc => mealsFromDb.push({id:doc.id,name: doc.data().name, method: doc.data().method, ingredients:doc.data().ingredients}))
      setMeals(mealsFromDb)
    }
    const getUserIngredients = async user => {
      const ingredientsFromDb = []
      const userDBId = await getCurrentUserDbId(user)
      const querySnapshot = await getDocs(collection(db,"users",userDBId,"ingredients"))
      querySnapshot.forEach(doc => ingredientsFromDb.push({value: doc.data().name, id:doc.id, label:doc.data().name}))
      setIngredients(ingredientsFromDb)
    }

    getUserMealPlans(currentUser)
    getUserMeals(currentUser)
    getUserIngredients(currentUser)
  },[currentUser])

  return { addUser, createMealPlan, mealPlans, setMealPlans, meals, setMeals, ingredients, setIngredients, addMeal, addIngredient };
};
