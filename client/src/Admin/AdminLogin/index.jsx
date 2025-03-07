import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../../components/utlis/toast";
import "./index.css";

export default function AdminLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    fetch(`adminlogin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json().then((data) => ({ status: response.status, data })))
      .then(({ status, data }) => {
        if (status === 200) {
          Toast.fire({ icon: "success", title: data.message });
          sessionStorage.setItem("token", data.token);
          sessionStorage.setItem("role", data.role);
          navigate(data.role === "Admin" ? "/adminpannel" : "/employeepanel");
        } else if (status === 405) {
          Toast.fire({ icon: "error", title: data.message });
          navigate("/packageExpired");
        } else {
          setError(data.message || "Login failed");
        }
      })
      .catch(() => setError("Error occurred during login"));
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <h1 className="admin-login-title">Admin Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="admin-login-input-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              className="admin-login-input"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="admin-login-input-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              className="admin-login-input"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="admin-login-button">SIGN IN</button>
          {error && <p className="admin-login-error">{error}</p>}
        </form>
      </div>
    </div>
  );
}
