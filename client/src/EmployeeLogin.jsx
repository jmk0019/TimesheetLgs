import { useState } from "react";
import "./EmployeeLogin.css";

export default function EmployeeLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in as Employee:", { email, password });
  };

  return (
    <div className="employee-login-container">
      <div className="employee-login-box">
        <h2 className="employee-title">Employee Login</h2>
        <form onSubmit={handleLogin}>
          <div className="employee-input-group">
            <input
              type="email"
              className="employee-input"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="employee-input-group">
            <input
              type="password"
              className="employee-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="employee-button">Login</button>
        </form>
        <p className="employee-forgot-password">Forgot Password?</p>
      </div>
    </div>
  );
}
