import Cookies from "js-cookie";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { GoHomeFill } from "react-icons/go";
import { IoNotificationsOutline, IoLogOut } from "react-icons/io5";
import { MdFeedback, MdEvent } from "react-icons/md";
import { FaUsers, FaProjectDiagram } from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";
import HRNavbar from "../HRNavbar/index";
import "./HRSideBar.css";
import logo from  "../Imges/logo.png"

const HRSideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("hruser");
    Cookies.remove("role");
    navigate("/hr-login");
  };

  return (
    <div className="hr-layoutsidebar">
      <div className={`hr-sidebar ${isCollapsed ? "collapsed" : ""}`}>
        <div className="hr-sidebar-header">
          <GiHamburgerMenu
            className="hr-menu-toggle"
            onClick={() => setIsCollapsed(!isCollapsed)}
          />
          {!isCollapsed && <img src={logo} alt="Logo" className="hr-sidebar-logo" />}
        </div>

        <ul className="hr-sidebar-menu">
          <li
            className={`hr-menu-item ${activeTab === 1 ? "active" : ""}`}
            onClick={() => setActiveTab(1)}
          >
            <Link to="/hrpanel/dashboard">
              <GoHomeFill className="hr-icon" /> <span>Dashboard</span>
            </Link>
          </li>

          
          <li
            className={`hr-menu-item ${activeTab === 4 ? "active" : ""}`}
            onClick={() => setActiveTab(4)}
          >
            <Link to="/hrpanel/feedback/">
              <MdFeedback className="hr-icon" /> <span>Feedback</span>
            </Link>
          </li>

          <li
            className={`hr-menu-item ${activeTab === 5 ? "active" : ""}`}
            onClick={() => setActiveTab(5)}
          >
            <Link to="/hrpanel/notificationslist/">
              <IoNotificationsOutline className="hr-icon" /> <span>Notifications</span>
            </Link>
          </li>

          <li
            className={`hr-menu-item ${activeTab === 6 ? "active" : ""}`}
            onClick={() => setActiveTab(6)}
          >
            <Link to="/hrpanel/events/">
              <MdEvent className="hr-icon" /> <span>Events</span>
            </Link>
          </li>

          <li className="hr-menu-item" onClick={handleLogout}>
            <IoLogOut className="hr-icon" /> <span>Logout</span>
          </li>
        </ul>
      </div>

      <div className="hr-content">
        <HRNavbar />
        <Outlet />
      </div>
    </div>
  );
};

export default HRSideBar;
