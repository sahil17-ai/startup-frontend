import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/auth/login/", {
        email,
        password,
      });
      const { access, refresh, user } = response.data;

      // Store tokens and user info in local storage
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      localStorage.setItem("user", JSON.stringify(user)); 

      navigate("/"); // Redirect to home page
    } catch (err) {
      setError(err.response ? err.response.data.detail || "Invalid login credentials" : "An error occurred");
    }
  };

  // Function to handle registration navigation
  const handleRegister = () => {
    navigate("/register"); // Adjust this path to your actual registration route
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mt-5">Login</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>

          {/* Link to Register page */}
          <div className="mt-3 text-center">
            <p>
              Need to register?{" "}
              <button 
                className="btn btn-link" 
                onClick={handleRegister}
                style={{ textDecoration: 'none' }} // Optional: Remove underline from the button
              >
                Register here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
