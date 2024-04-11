import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({
  children,
  isAuthenticated,
  redirectPath = "/login",
}) => {
  const location = useLocation();

  // Check if token exists (assuming token is stored in local storage)
  const isLoggedIn = localStorage.getItem("token") !== null;

  if (!isLoggedIn) {
    // Redirect to login page if not authenticated
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // Render the protected component if authenticated
  return children;
};

export default ProtectedRoute;
