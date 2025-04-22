import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const token = localStorage.getItem("admin_token");

  // Function to check if the token is expired
  const isTokenExpired = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // Decoding the JWT token
      const expirationTime = payload.exp * 1000; // JWT exp is in seconds
      return expirationTime < Date.now(); // Token is expired if current time is greater than expiration time
    } catch (error) {
      return true; // If token decoding fails, consider it expired
    }
  };

  // Check if token is present and not expired
  const isTokenValid = token && !isTokenExpired(token);

  if (!isAuthenticated || !isTokenValid) {
    // If the user is not authenticated or the token is invalid, redirect to login
    localStorage.removeItem("admin_token");
    localStorage.setItem("isAuthenticated", "false");
    return <Navigate to="/admin/login" />;
  }

  return children;
};

export default ProtectedRoute;
