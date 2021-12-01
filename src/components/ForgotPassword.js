import Input from "./Input"
import Button from "./Button"
import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"

const LogIn = () => {
  
  const [email, setEmail] = useState("")
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [loading,setLoading] = useState(false)
  const [message,setMessage] = useState("")
  
  const formAction = async e => {
    e.preventDefault()

    try {
      setError("")
      setMessage("")
      setLoading(true)
      await resetPassword(email)
      setLoading(false)
      setMessage("Check your inbox to reset your email")
    } catch {
      setError("Something went wrong")
      setLoading(false)
    }
  }


  return (
    <div>
      <form onSubmit={formAction} className="border-2 w-5/6 mx-auto mt-8 flex flex-col gap-6 p-8 md:w-2/6">
      <p className="text-green-500">{message}</p>
        <Input label={"Email Address"} type={"email"} onChange={e => setEmail(e.target.value)} />
        <Button disabled={loading} text={"Reset Password"} />
        <p className="text-center text-red-500">{error}</p>
        <p className="text-center"><Link to="/login">Log In</Link> </p>
      </form>
    </div>
  )
}

export default LogIn
