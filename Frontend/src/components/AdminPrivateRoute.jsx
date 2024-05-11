import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.auth);

  return currentUser.isAdmin ? <Outlet /> : <Navigate to="/home" />;
};

export default PrivateRoute;
