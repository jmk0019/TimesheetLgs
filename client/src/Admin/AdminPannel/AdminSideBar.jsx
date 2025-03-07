import Cookies from "js-cookie";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { GoHomeFill } from "react-icons/go";
import { IoNotificationsOutline, IoLogOut } from "react-icons/io5";
import { MdFeedback } from "react-icons/md";
import { FaUsers, FaProjectDiagram } from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";
import AdminNavbar from "../AdminNavbar/index";
import "./index.css";
import logo from  "../Imges/logo.png"

import { MdEvent } from "react-icons/md";

const AdminSideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("adminuser");
    Cookies.remove("role");
    navigate("/admin-login");
  };

  return (
    <div className="admin-layoutsidebar">
      <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
  <GiHamburgerMenu
    className="menu-toggle"
    onClick={() => setIsCollapsed(!isCollapsed)}
  />
  {!isCollapsed && <img src={logo} alt="Logo" className="sidebar-logo" />}
</div>



        <ul className="sidebar-menu">
          <li
            className={`menu-item ${activeTab === 1 ? "active" : ""}`}
            onClick={() => setActiveTab(1)}
          >
            <Link to="/adminpanel/dashboard">
              <GoHomeFill className="icon" /> <span>Dashboard</span>
            </Link>
          </li>

          <li
            className={`menu-item ${activeTab === 2 ? "active" : ""}`}
            onClick={() => setActiveTab(2)}
          >
            <Link to="/adminpanel/employees/">
              <FaUsers className="icon" /> <span>Employees</span>
            </Link>
          </li>

          <li
            className={`menu-item ${activeTab === 3 ? "active" : ""}`}
            onClick={() => setActiveTab(3)}
          >
            <Link to="/adminpanel/projects/">
              <FaProjectDiagram className="icon" /> <span>Projects</span>
            </Link>
          </li>

          <li
            className={`menu-item ${activeTab === 4 ? "active" : ""}`}
            onClick={() => setActiveTab(4)}
          >
            <Link to="/adminpanel/feedback/">
              <MdFeedback className="icon" /> <span>Feedback</span>
            </Link>
          </li>

          <li
            className={`menu-item ${activeTab === 5 ? "active" : ""}`}
            onClick={() => setActiveTab(5)}
          >
            <Link to="/adminpanel/notificationslist/">
              <IoNotificationsOutline className="icon" /> <span>Notifications</span>
            </Link>
          </li>
          
          <li
            className={`menu-item ${activeTab === 6 ? "active" : ""}`}
            onClick={() => setActiveTab(6)}
          >
            <Link to="/adminpanel/events/">
              <MdEvent className="icon" /> <span>Events</span>
            </Link>
          </li>

     

          <li className="menu-item" onClick={handleLogout}>
            <IoLogOut className="icon" /> <span>Logout</span>
          </li>
        </ul>
      </div>

      <div className="admin-content">
        <AdminNavbar />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminSideBar;
