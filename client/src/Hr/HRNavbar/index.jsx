import { useNavigate } from "react-router-dom";
import { IoLogOut, IoNotificationsOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import Cookies from "js-cookie";
import { useState } from "react";
import "./index.css";

const HRNavbar = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    Cookies.remove("hruser");
    navigate("/hr-login");
  };

  return (
    <nav className="hr-navbar-container">
      <div className="hr-navbar-left">
        <h4 className="hr-navbar-title">HR Panel</h4>
      </div>

      <div className="hr-navbar-right">
        {/* Notifications Icon */}
        <div className="hr-navbar-icon-container">
          <IoNotificationsOutline
            className="hr-navbar-icon"
            onClick={() => setShowNotifications(!showNotifications)}
          />
          {showNotifications && (
            <div className="hr-notification-dropdown">
              <p>🔔 Notification 1 (Dummy Data)</p>
              <p>🔔 Notification 2 (Dummy Data)</p>
              <p>🔔 Notification 3 (Dummy Data)</p>
            </div>
          )}
        </div>

        {/* Profile Icon */}
        <div className="hr-navbar-icon-container">
          <FaUserCircle className="hr-navbar-icon" />
        </div>

        {/* Logout Button */}
        <button className="hr-logout-button" onClick={handleLogout}>
          <IoLogOut /> Logout
        </button>
      </div>
    </nav>
  );
};

export default HRNavbar;
