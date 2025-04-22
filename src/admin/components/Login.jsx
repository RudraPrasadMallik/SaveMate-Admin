import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/Login.css";
import AdminApi from "../../api/AdminApi";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    if (!username.trim()) {
      setError("Username is required.");
      return false;
    }
    if (!password.trim()) {
      setError("Password is required.");
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setError(null);
    setLoading(true);

    try {
      const response = await AdminApi.login({ username, password });
      const { token } = response.data;

      // Store token in localStorage for persistence even after the browser is closed
      localStorage.setItem("admin_token", token);  // Changed sessionStorage to localStorage
      localStorage.setItem("isAuthenticated", "true");

      // Redirect to home page
      navigate("/admin/home");
    } catch (err) {
      console.error("Login Error:", err.response ? err.response.data : err); // Logging actual error
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Admin Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          className="login-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        {loading && <p className="login-message">Authenticating with server...</p>}
        {error && <p className="login-error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
