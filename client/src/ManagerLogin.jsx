import { useState } from "react";
import "./ManagerLogin.css";

export default function ManagerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in as Manager:", { email, password });
  };

  return (
    <div className="manager-login-container">
      <div className="manager-login-box">
        <h2 className="manager-title">Manager Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              className="manager-input"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              className="manager-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="manager-button">Login</button>
        </form>
        <p className="forgot-password">Forgot Password?</p>
      </div>
    </div>
  );
}
