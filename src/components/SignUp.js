import Input from "./Input"
import Button from "./Button"
import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import { db } from "../firebase/config"
import { addDoc, collection } from "@firebase/firestore"

const SignUp = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const addUser = async (user) => {
    const docRef = await addDoc(collection(db, "users"), {
      userID: user,
    });
    return docRef;
  };

  const formAction = async e => {
    e.preventDefault()
    if (password !== confirmPassword) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      const userCredential = await signup(email, password)
      addUser(userCredential.user.uid)
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
        <Input label={"Confirm Password"} type={"password"} onChange={e => setConfirmPassword(e.target.value)} />
        <Button disabled={loading} text={"Sign Up"} />
        <p className="text-center text-red-500">{error}</p>
        <p className="text-center">Already a user? <Link to="/login">Log in</Link></p>
      </form>
    </div>
  )
}

export default SignUp
