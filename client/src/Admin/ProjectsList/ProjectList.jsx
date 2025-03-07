import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Toast from "../../components/utlis/toast";
import Loader from "../../components/Loader";
import "./index.css"; // Import the CSS file
import ProjectForm from "../../Manager/AddProject/ProjectForm";

// Dummy data for projects
const dummyProjects = [
  {
    id: 1,
    name: "Project Alpha",
    status: 1,
  },
  {
    id: 2,
    name: "Project Beta",
    status: 0,
  },
  {
    id: 3,
    name: "Project Gamma",
    status: 1,
  },
];

function ProjectList() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [projectList, setProjectList] = useState([]);
  const [loading, setLoading] = useState(false); // Set to false since we're using dummy data
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching data
    setProjectList(dummyProjects);
  }, []);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleEdit = (row) => {
    navigate(`/adminpanel/edit-project/${row.id}`);
  };

  const handleEnableClick = (id, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1;
    const updatedProjects = projectList.map((project) =>
      project.id === id ? { ...project, status: newStatus } : project
    );
    setProjectList(updatedProjects);
    Toast.fire({
      icon: "success",
      title: `Project ${newStatus === 1 ? "enabled" : "disabled"}`,
    });
  };

  const filteredProjects = projectList.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="customer-list-main-container">
      <div className="customer-list-header">
        <p className="app-para-heading-3 m-0">Projects</p>
        <Link to="/adminpanel/add-project">
          <button className="main-button-1">Add Project</button>
        </Link>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="customer-list-sub-container">
        <div className="data-grid-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Project Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project) => (
                <tr key={project.id}>
                  <td>{project.id}</td>
                  <td>{project.name}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="edit"
                        onClick={() => handleEdit(project)}
                      >
                        Edit
                      </button>
                      <button
                        className="view"
                        onClick={() =>
                          navigate(`/adminpanel/project-details/${project.id}`)
                        }
                      >
                        View
                      </button>
                      <button
                        className={
                          project.status === 1 ? "toggle-on" : "toggle-off"
                        }
                        onClick={() =>
                          handleEnableClick(project.id, project.status)
                        }
                      >
                        {project.status === 1 ? "Disable" : "Enable"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <>
          <div className="modal-overlay" onClick={handleCloseModal} />
          <div className="modal-container">
            {/* Modal content here */}
          </div>
        </>
      )}
    </div>
  );
}

export default ProjectList;