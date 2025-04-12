import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminApi from "../../api/AdminApi"; // central API call

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
     
      const response = await AdminApi.login({ username, password });   
      const { token } = response.data;  

     
      localStorage.setItem("authToken", token); 

      
      localStorage.setItem("isAuthenticated", "true");

      // Redirect to admin dashboard after successful login
      navigate("/admin/home");
    } catch (err) {
      // Handle invalid credentials
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <button type="submit">Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
