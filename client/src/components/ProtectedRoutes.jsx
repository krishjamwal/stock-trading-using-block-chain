import { Navigate } from "react-router-dom"

function ProtectedRoute({ children }) {

  const token = localStorage.getItem("token")

  // ❌ If not logged in → go to login
  if (!token) {
    return <Navigate to="/login" />
  }

  // ✅ If logged in → allow access
  return children
}

export default ProtectedRoute
