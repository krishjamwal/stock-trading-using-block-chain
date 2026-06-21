import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Register = () => {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleRegister = () => {
    console.log("Register clicked")
    axios.post("http://localhost:5000/api/auth/register", {
      username,
      email,
      password
    })
    .then(() => {
      alert("Registered successfully ✅")
      navigate("/login") // go to login page
    })
    .catch(err => {
      console.log(err.response)
      alert("Registration failed ❌")
    })
  }

  return (
    <div className="flex items-center justify-center h-screen">

      <div className="bg-slate-800 p-10 rounded-xl w-[400px]">

        <h1 className="text-3xl mb-5">Register</h1>

        <input
          type="text"
          placeholder="Name"
          className="w-full p-3 mb-4 rounded bg-slate-700"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded bg-slate-700"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded bg-slate-700"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-green-600 p-3 rounded"
          onClick={handleRegister}
        >
          Register
        </button>

      </div>

    </div>
  )
}

export default Register
