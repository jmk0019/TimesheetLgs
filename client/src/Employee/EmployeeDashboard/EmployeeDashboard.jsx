import React from "react";
import "./EmployeeDashboard.css"; // Import CSS file

const EmployeeDashboard = () => {
  // Dummy Data for Projects
  const ongoingProjects = [
    { id: 1, name: "Project Alpha"  ,Startdate :"Jan 10, 2025"},
    { id: 2, name: "Project Beta",Startdate :"Jan 15, 2025"},
    { id: 3, name: "Project Gamma",Startdate :"Jan 20, 2025"},
  ];

  const completedProjects = [
    { id: 4, name: "Project Delta", Delivereddate: "Jan 20, 2025" },
    { id: 5, name: "Project Epsilon", Delivereddate: "Feb 5, 2025" },
  ];

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Employee Dashboard</h2>

      {/* Ongoing Projects */}
      <div className="projects-section">
        <h3>Ongoing Projects</h3>
        <div className="project-container">
          {ongoingProjects.map((project) => (
            <div key={project.id} className="project-box ongoing">
              <h4>{project.name}</h4>
              <p>Start Date: {project.Startdate}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Completed Projects */}
      <div className="projects-section">
        <h3>Completed Projects</h3>
        <div className="project-container">
          {completedProjects.map((project) => (
            <div key={project.id} className="project-box ongoing">
              <h4>{project.name}</h4>
              <p>Delivered On: {project.Delivereddate}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
