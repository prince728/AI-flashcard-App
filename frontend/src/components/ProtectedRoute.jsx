import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const location = useLocation();

  if (isLoggedIn === null) {
    return <p className="text-center text-gray-300 mt-20">Loading...</p>;
  }

  if (isLoggedIn === false) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;