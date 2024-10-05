import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Set up a base URL for your API
axios.defaults.baseURL = "http://127.0.0.1:8000/api/";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("auth/register/", {
        email,
        password1: password,  // Use 'password1' instead of 'password'
        password2: confirmPassword, // Use 'password2' for confirmation
      });

      navigate("/"); // Redirect to home page after registration
    } catch (err) {
      console.error(err); // Log the error for debugging
      setError(err.response ? err.response.data.detail || "Registration failed" : "An error occurred");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mt-5">Register</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleRegister}>
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
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
