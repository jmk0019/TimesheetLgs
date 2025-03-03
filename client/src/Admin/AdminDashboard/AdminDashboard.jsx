import React from "react";
import "../AdminDashboard/AdminDashboard.css";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const totalUsers = 50;
  const totalProjects = 20;
  const pendingProjects = 5;
  const completedProjects = 12;

  // Monthly projects data
  const monthlyProjects = [
    { month: "Jan", projects: 5 },
    { month: "Feb", projects: 8 },
    { month: "Mar", projects: 6 },
    { month: "Apr", projects: 10 },
    { month: "May", projects: 7 },
    { month: "Jun", projects: 12 },
    { month: "Jul", projects: 9 },
    { month: "Aug", projects: 4 },
    { month: "Sep", projects: 11 },
    { month: "Oct", projects: 15 },
    { month: "Nov", projects: 9 },
    { month: "Dec", projects: 14 },
  ];

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Dashboard</h2>

      {/* Stats Section */}
      <div className="dashboard-grid">
        <div className="dashboard-card">
        <Link to="/adminpanel/employees/">
          <h3>Employees</h3>
          <p>{totalUsers}</p>
          </Link>
        </div>
        <div className="dashboard-card">
        <Link to="/adminpanel/projects/">
          <h3> Projects</h3>
          <p>{totalProjects}</p>
          </Link>
        </div>
        <div className="dashboard-card">
        <Link to="/adminpanel/projects/">
          <h3>Pending Projects</h3>
          <p>{pendingProjects}</p>
          </Link>
        </div>
        <div className="dashboard-card">
        <Link to="/adminpanel/projects/">
          <h3>Completed Projects</h3>
          <p>{completedProjects}</p>
          </Link>
        </div>
      </div>

      {/* Graph Section */}
      <div className="graph-container">
        <h3 className="graph-title">Projects Per Month</h3>
        <div className="bar-chart">
          {monthlyProjects.map((data, index) => (
            <div key={index} className="bar-item">
              <span className="project-count">{data.projects}</span>
              <div
                className="bar"
                style={{ height: `${data.projects * 7}px` }}
              ></div>
              <span className="month-label">{data.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

 };

export default AdminDashboard;
