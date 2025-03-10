import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
// import { Component } from "react";

// only for admin role
export const PrivateRoute = ({Component}) => {
    console.log(Component)
  const isAdmin = JSON.parse(Cookies.get("details")).isAdmin;

  return isAdmin ? <Component /> : <Navigate to="/userNotAuthenticated" />;
};

// only for logged in users
export const LoginRoute = ({Component}) => {
  const token = Cookies.get("token");

  return token ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
