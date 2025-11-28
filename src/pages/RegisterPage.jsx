import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authAPI } from "../services/api"; // Assuming you have an authAPI in services/api
import "./AuthPages.css";

function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth(); // We might automatically log in the user after registration

  // State for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // State for loading and error messages
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    // Simple email validation (can be more robust)
    if (!email || !password) {
      setError("Email and password are required.");
      setLoading(false);
      return;
    }

    try {
      // 1. Call the backend registration endpoint
      const response = await authAPI.register({ name, email, password });

      // 2. Registration successful
      alert("Registration successful! Please log in.");

      // OPTIONAL: Automatically log the user in after successful registration
      // If your backend returns a token upon registration, you can use the 'login' function here.
      // For now, we'll navigate to the login page to ensure the user logs in fresh.

      navigate("/login");
    } catch (err) {
      // 3. Handle errors from the API
      console.error("Registration error:", err);
      // Display a user-friendly error message
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // Use message from the backend
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create Account</h1>
        <p>Sign up to find great restaurants</p>

        <form onSubmit={handleRegister}>
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input // <-- ADD THIS INPUT FIELD
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="********"
              required
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="auth-footer">
          <span>Already have an account? </span>
          <Link to="/login">Login here</Link>
        </div>

        <div className="auth-separator">OR</div>
        <Link to="/" className="continue-link">
          Continue without registration
        </Link>
      </div>
    </div>
  );
}

export default RegisterPage;
