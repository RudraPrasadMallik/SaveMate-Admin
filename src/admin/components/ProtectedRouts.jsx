import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const token = localStorage.getItem("admin_token");

  const isTokenExpired = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1])); 
      const expirationTime = payload.exp * 1000; 
      return expirationTime < Date.now(); 
    } catch (error) {
      return true; 
    }
  };

  const isTokenValid = token && !isTokenExpired(token);

  if (!isAuthenticated || !isTokenValid) {
    localStorage.removeItem("admin_token");
    localStorage.setItem("isAuthenticated", "false");
    return <Navigate to="/admin/login" />;
  }

  return children;
};

export default ProtectedRoute;
