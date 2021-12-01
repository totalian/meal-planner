import { useAuth } from "../contexts/AuthContext"
import Button from "./Button"
import { useNavigate } from "react-router-dom"

const Navbar = () => {

  const navigate = useNavigate()
  const {currentUser,logout} = useAuth()

  const clickHandler = () => {
    if(currentUser){
      logout()
      navigate("/login")
    } else {
      navigate("/login")
    }
  }


  return (
    <div className="h-16 bg-blue-500">
      <div className="flex justify-between items-center h-full px-10">
        <h1 onClick={() => navigate("/")} className="text-white">Meal Planner</h1>
        <div className="w-16"><Button
        text={currentUser ? "Logout" : "Login"}
        onClick={clickHandler}
        /></div>
      </div>
    </div>
  )
}

export default Navbar
