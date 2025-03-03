import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import React Router

import Toast from "../../components/utlis/toast";
import "./index.css";
const ManagerLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(""); // State variable for error message
  const navigate = useNavigate(); // Get access to the navigation history

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const jsonData = {
      email: formData.email,
      password: formData.password,
    };
    fetch(`adminlogin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            Toast.fire({
              icon: "success",
              title: data.message,
            });
            if (data.role === "employee") {
              sessionStorage.setItem("employeeToken", data.token);
              sessionStorage.setItem("role", data.role);
              navigate("/employeedashboard");
            } else {
              sessionStorage.setItem("managerToken", data.token);
              sessionStorage.setItem("role", data.role);
              navigate("/employeepanel");
            }
          });
        } else if (response.status === 405) {
          response.json().then((data) => {
            Toast.fire({
              icon: "error",
              title: data.message,
            });
          });
          navigate("/packageExpired");
        } else if (response.status === 400) {
          response.json().then((data) => {
            Toast.fire({
              icon: "error",
              title: data.message,
            });
          });
        } else {
          setError("Login failed");
        }
      })
      .catch(() => {
        setError("Error occurred during login");
      });
  };

  return (
    <>
      <div className="admin-login-div-container">
        <div className="admin-login-form-main-container">
          <div className="admin-login-form-bg-container">
            <form
              onSubmit={handleSubmit}
              className="admin-login-form-container"
            >
              <h1 className="admin-login-first-heading">Employee Login</h1>
              <div className="admin-login-form-group-container">
                <label className="admin-login-form-label-text">Email:</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  className="admin-login-input-text"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="admin-login-form-group-container">
                <label className="admin-login-form-label-text">Password:</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="admin-login-input-text"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <center>
                <button className="admin-login-form-button" type="submit">
                  SIGN IN
                </button>
                {error && <p className="error-message">{error}</p>}{" "}
              </center>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagerLogin;
