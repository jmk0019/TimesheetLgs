import Cookies from "js-cookie";
import { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaTasks, FaRegCalendarCheck } from "react-icons/fa";
import { IoLogOut, IoNotifications } from "react-icons/io5";
import { MdFeedback, MdEvent } from "react-icons/md";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./EmployeeSideBar.css";
import EmployeeNavbar from "../EmployeeNavbar/EmployeeNavbar";
import logo from "../Imges/logo.png";

const EmployeeSideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [activeTab, setActiveTab] = useState(1);

  const role = sessionStorage.getItem("role");
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("adminuser");
    Cookies.remove("role");
    navigate("/admin-login");
  };

  return (
    <div className="employee-sidebar-container">
      {/* Sidebar */}
      <div className={`employee-sidebar ${isCollapsed ? "collapsed" : ""}`}>
        {/* Sidebar Header (Toggle Button + Logo) */}
        <div className="employee-sidebar-header">
          <div className="sidebar-toggle-icon" onClick={() => setIsCollapsed(!isCollapsed)}>
            ☰
          </div>
          {!isCollapsed && <img src={logo} alt="Company Logo" className="sidebar-logo" />}
        </div>

        {/* Sidebar Menu */}
        <nav className="employee-sidebar-menu">
          <Link
            to="/employeepanel/dashboard"
            className={`employee-sidebar-button ${activeTab === 1 ? "active" : ""}`}
            onClick={() => setActiveTab(1)}
          >
            <AiFillHome size={20} />
            {!isCollapsed && <span>Home</span>}
          </Link>

          <Link
            to="/employeepanel/profile"
            className={`employee-sidebar-button ${activeTab === 2 ? "active" : ""}`}
            onClick={() => setActiveTab(2)}
          >
            <CgProfile size={20} />
            {!isCollapsed && <span>Profile</span>}
          </Link>

          <Link
            to="/employeepanel/projects"
            className={`employee-sidebar-button ${activeTab === 3 ? "active" : ""}`}
            onClick={() => setActiveTab(3)}
          >
            <FaTasks size={20} />
            {!isCollapsed && <span>Projects</span>}
          </Link>

          <Link
            to="/employeepanel/notifications"
            className={`employee-sidebar-button ${activeTab === 4 ? "active" : ""}`}
            onClick={() => setActiveTab(4)}
          >
            <IoNotifications size={20} />
            {!isCollapsed && <span>Notifications</span>}
          </Link>

          <Link
            to="/employeepanel/feedback"
            className={`employee-sidebar-button ${activeTab === 5 ? "active" : ""}`}
            onClick={() => setActiveTab(5)}
          >
            <MdFeedback size={20} />
            {!isCollapsed && <span>Feedback</span>}
          </Link>

          <Link
            to="/employeepanel/daily-report"
            className={`employee-sidebar-button ${activeTab === 6 ? "active" : ""}`}
            onClick={() => setActiveTab(6)}
          >
            <FaRegCalendarCheck size={20} />
            {!isCollapsed && <span>Daily Task</span>}
          </Link>

          <Link
            to="/employeepanel/events"
            className={`employee-sidebar-button ${activeTab === 7 ? "active" : ""}`}
            onClick={() => setActiveTab(7)}
          >
            <MdEvent size={20} />
            {!isCollapsed && <span>Events</span>}
          </Link>

          <button className="employee-sidebar-button logout" onClick={handleLogout}>
            <IoLogOut size={20} />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="employee-sidebar-main">
        <EmployeeNavbar />
        <Outlet />
      </div>
    </div>
  );
};

export default EmployeeSideBar;
