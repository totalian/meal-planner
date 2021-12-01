import SignUp from "./components/SignUp";
import { AuthProvider } from "./contexts/AuthContext";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import MealPlans from "./components/MealPlans";
import LogIn from "./components/LogIn";
import Navbar from "./components/Navbar";
import ForgotPassword from "./components/ForgotPassword";
import PrivateRoute from "./components/PrivateRoute";
import MealPlan from "./components/MealPlan";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<MealPlans />} />
            <Route path="/meal-plan/:id" element={<MealPlan />} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </AuthProvider>
    </Router>
    )
}

export default App;
