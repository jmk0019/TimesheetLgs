import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";
import { IoLogOut, IoNotificationsOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";


import { useState } from "react";

const EmployeeNavbar = () => {

  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(true);

  const handleLogout = () => {
    Cookies.remove("adminuser");
    navigate("/admin-login");
  };
  return (
     <nav className="employee-navbar-container">
          <div className="employee-navbar-left">
            <h4 className="employee-navbar-title">Yaswanth Manikanta Jalla</h4>
          </div>
    
          <div className="employee-navbar-right">
            {/* Notifications Icon */}
            <div className="employee-navbar-icon-container">
              <IoNotificationsOutline
                className="employee-navbar-icon"
                onClick={() => setShowNotifications(!showNotifications)}
              />
              {showNotifications && (
                <div className="employee-notification-dropdown">
                  <p>🔔 Notification 1 (Dummy Data)</p>
                  <p>🔔 Notification 2 (Dummy Data)</p>
                  <p>🔔 Notification 3 (Dummy Data)</p>
                </div>
              )}
            </div>
    
            {/* Profile Icon */}
            <div className="employee-navbar-icon-container">
              <FaUserCircle className="navbar-icon" />
            </div>
    
            {/* Logout Button */}
            <button className="employee-logout-button1" onClick={handleLogout}>
              <IoLogOut /> Logout
            </button>
          </div>
        </nav>
  );
};

export default EmployeeNavbar;
