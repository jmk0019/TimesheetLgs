import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Toast from "../../components/utlis/toast";

const ViewProject = () => {
  const [details, setDetails] = useState({
    project_name: "",
    description: "",
    date: "",
    client: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const [buttonLoader, setButtonLoader] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const fetchData = async () => {
    try {
      const options = {
        method: "GET",
      };
      const response = await fetch(`/get-project/${id}`, options);
      const data = await response.json();

      setDetails(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
        `${import.meta.env.VITE_BASE_URL}salesregister`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        Toast.fire({ icon: "success", title: data.message });
        setIsEditing(false); // Disable editing after successful submission
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
          <h2 className="register-staff-heading">Project Details</h2>
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
            readOnly={!isEditing}
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
            readOnly={!isEditing}
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
            readOnly={!isEditing}
          />
        </div>

        <div className="register-staff-input-container">
          <label className="register-staff-label">
            Date<span className="customer-enquiry-form-required">*</span>
          </label>
          <input
            type="text"
            name="date"
            value={details.date}
            placeholder="Enter Date"
            className="register-staff-input"
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
        </div>

        <div className="register-staff-button-container">
          {!isEditing ? (
            <button
              type="button"
              className="register-staff-button edit-button"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          ) : (
            <button
              type="submit"
              className="register-staff-button"
              disabled={buttonLoader}
            >
              {buttonLoader ? <div className="button-loader"></div> : "Save"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ViewProject;
