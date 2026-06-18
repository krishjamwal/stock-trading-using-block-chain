import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = () => {

    if (!email || !password) {
      toast.warning("Please fill all fields ⚠️")
      return
    }

    axios.post("http://localhost:5000/api/auth/login", {
      email,
      password
    })
    .then(res => {

      console.log("LOGIN RESPONSE:", res.data)

      // ✅ SAVE TOKEN
      localStorage.setItem("token", res.data.token)

      // ✅ SAFE USER ID EXTRACTION (FIXED)
      const userId =
        res.data.user?._id ||
        res.data.userId ||
        res.data._id

      if (!userId) {
        toast.error("User ID not found ❌")
        return
      }

      localStorage.setItem("userId", userId)

      console.log("Saved userId:", userId)

      toast.success("Login successful ✅")

      navigate("/dashboard")
    })
    .catch(err => {
      console.log(err)
      toast.error("Login failed ❌")
    })
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">

      <div className="bg-slate-800 p-10 rounded-xl w-[400px]">

        <h1 className="text-3xl mb-5 text-center">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded bg-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded bg-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 p-3 rounded-lg hover:bg-blue-700 transition"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="mt-3 text-sm text-center">
          Don't have account?{" "}
          <span
            className="text-blue-400 cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>

      </div>

    </div>
  )
}

export default Login
