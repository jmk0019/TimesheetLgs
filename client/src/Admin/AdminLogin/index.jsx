import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie
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

    const formDataToSend = new FormData();
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);

    fetch("https://timesheet.labyrinthglobalsolution.site/api/login", {
      method: "POST",
      body: formDataToSend, // Sending form-data
    })
      .then((response) => response.json().then((data) => ({ status: response.status, data })))
      .then(({ status, data }) => {
        if (status === 200) {
          Toast.fire({ icon: "success", title: data.message });

          // Save token in cookies with expiry of 1 day
          Cookies.set("token", data.token, { expires: 1, secure: true, sameSite: "Strict" });
          Cookies.set("role", data.role, { expires: 1, secure: true, sameSite: "Strict" });

          navigate(data.role === "admin" ? "/adminpanel/dashboard" : "/employeepanel");
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
