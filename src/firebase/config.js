// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2Ay2TnstUrt_QRPa-9L9gAJXEU4BJ-eA",
  authDomain: "meal-planner-56f57.firebaseapp.com",
  projectId: "meal-planner-56f57",
  storageBucket: "meal-planner-56f57.appspot.com",
  messagingSenderId: "735956290487",
  appId: "1:735956290487:web:7f099bfa40837a9e743632",
  measurementId: "G-78BZENP72Y"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
const analytics = getAnalytics(app);