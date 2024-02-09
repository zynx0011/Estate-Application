import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.auth);

  return currentUser ? <Outlet /> : <Navigate to="/api/v1/users/Signup" />;
};

export default PrivateRoute;
