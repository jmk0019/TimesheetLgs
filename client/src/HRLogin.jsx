import { useState } from "react";
import "./HRLogin.css";

export default function HRLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in as HR:", { email, password });
  };

  return (
    <div className="hr-login-container">
      <div className="hr-login-box">
        <h2 className="hr-title">HR Login</h2>
        <form onSubmit={handleLogin}>
          <div className="hr-input-group">
            <input
              type="email"
              className="hr-input"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="hr-input-group">
            <input
              type="password"
              className="hr-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="hr-button">Login</button>
        </form>
        <p className="hr-forgot-password">Forgot Password?</p>
      </div>
    </div>
  );
}
