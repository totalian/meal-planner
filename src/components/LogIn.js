import Input from "./Input"
import Button from "./Button"
import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"

const LogIn = () => {
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  
  const formAction = async e => {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(email, password)
      setLoading(false)
      navigate("/")
    } catch {
      setError("Something went wrong")
      setLoading(false)
    }
  }


  return (
    <div>
      <form onSubmit={formAction} className="border-2 w-5/6 mx-auto mt-8 flex flex-col gap-6 p-8 md:w-2/6">
        <Input label={"Email Address"} type={"email"} onChange={e => setEmail(e.target.value)} />
        <Input label={"Password"} type={"password"} onChange={e => setPassword(e.target.value)} />
        <Button disabled={loading} text={"Log In"} />
        <Link to="/forgot-password"><p className="text-center">Forgot Password</p></Link>
        <p className="text-center text-red-500">{error}</p>
        <p className="text-center">New User? <Link to="/signup">Sign Up</Link> </p>
      </form>
    </div>
  )
}

export default LogIn
