import { useNavigate } from "react-router-dom";
import { IoLogOut, IoNotificationsOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import Cookies from "js-cookie";
import { useState } from "react";
import "./index.css";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    Cookies.remove("adminuser");
    navigate("/admin-login");
  };

  return (
    <nav className="admin-navbar-container">
      <div className="admin-navbar-left">
        <h4 className="admin-navbar-title">Admin Panel</h4>
      </div>

      <div className="admin-navbar-right">
        {/* Notifications Icon */}
        <div className="navbar-icon-container">
          <IoNotificationsOutline
            className="navbar-icon"
            onClick={() => setShowNotifications(!showNotifications)}
          />
          {showNotifications && (
            <div className="notification-dropdown">
              <p>🔔 Notification 1 (Dummy Data)</p>
              <p>🔔 Notification 2 (Dummy Data)</p>
              <p>🔔 Notification 3 (Dummy Data)</p>
            </div>
          )}
        </div>

        {/* Profile Icon */}
        <div className="navbar-icon-container">
          <FaUserCircle className="navbar-icon" />
        </div>

        {/* Logout Button */}
        <button className="admin-logout-button1" onClick={handleLogout}>
          <IoLogOut /> Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
