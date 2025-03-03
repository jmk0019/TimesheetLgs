import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../../components/utlis/toast";

const AddProject = () => {
  const [details, setDetails] = useState({
    project_name: "",
    description: "",
    date: "",
    client: "",
  });

  const navigate = useNavigate();
  const [buttonLoader, setButtonLoader] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setButtonLoader(true);

    const formData = new FormData();
    for (const key in details) {
      formData.append(key, details[key]);
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}add-project`, // API for adding a project
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        Toast.fire({ icon: "success", title: data.message });
        navigate("/projects"); // Redirect to projects list after successful addition
      } else {
        const data = await response.json();
        Toast.fire({ icon: "error", title: data.message });
      }
    } catch (error) {
      Toast.fire({ icon: "error", title: error.message });
    }
    setButtonLoader(false);
  };

  return (
    <div className="register-staff-form-main-container">
      <form className="register-staff-from-container" onSubmit={handleSubmit}>
        <div className="register-staff-header-container">
          <h2 className="register-staff-heading">Add New Project</h2>
        </div>

        <div className="register-staff-input-container">
          <label className="register-staff-label">
            Project Name
            <span className="customer-enquiry-form-required">*</span>
          </label>
          <input
            type="text"
            name="project_name"
            value={details.project_name}
            placeholder="Enter Project Name"
            className="register-staff-input"
            onChange={handleInputChange}
          />
        </div>

        <div className="register-staff-input-container">
          <label className="register-staff-label">
            Project Description
            <span className="customer-enquiry-form-required">*</span>
          </label>
          <input
            type="text"
            name="description"
            value={details.description}
            placeholder="Enter Description"
            className="register-staff-input"
            onChange={handleInputChange}
          />
        </div>

        <div className="register-staff-input-container">
          <label className="register-staff-label">
            Client<span className="customer-enquiry-form-required">*</span>
          </label>
          <input
            type="text"
            name="client"
            value={details.client}
            placeholder="Enter Client Name"
            className="register-staff-input"
            onChange={handleInputChange}
          />
        </div>

        <div className="register-staff-input-container">
          <label className="register-staff-label">
            Date<span className="customer-enquiry-form-required">*</span>
          </label>
          <input
            type="date"
            name="date"
            value={details.date}
            className="register-staff-input"
            onChange={handleInputChange}
          />
        </div>

        <div className="register-staff-button-container">
          <button
            type="submit"
            className="register-staff-button"
            disabled={buttonLoader}
          >
            {buttonLoader ? (
              <div className="button-loader"></div>
            ) : (
              "Add Project"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProject;
