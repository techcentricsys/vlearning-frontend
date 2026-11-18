import { Navigate, Outlet } from "react-router-dom"
import { isLoggedIn } from "./auth"

function ProtectedRoute() {
  return isLoggedIn() ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoute