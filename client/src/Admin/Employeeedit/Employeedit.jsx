import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Toast from "../../components/utlis/toast";

const Employeedit = () => {
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();

  const getProfileDetails = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}get-sales-details/${id}`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setFormData(data.salesperson);
      }
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: error.message,
      });
    }
  };

  useEffect(() => {
    getProfileDetails();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}update-sales-details/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        Toast.fire({
          icon: "success",
          title: "Details updated successfully",
        });
        setIsEditing(false);
      } else {
        throw new Error("Failed to update details");
      }
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: error.message,
      });
    }
  };

  return (
    <div className="register-staff-form-main-container">
      <form className="w-[90%]" onSubmit={handleSubmit}>
        <div className="register-staff-header-container">
          <h2 className="register-staff-heading">Employee Details</h2>
        </div>
        <div className="flex flex-wrap w-full gap-3">
          {" "}
          {[
            { label: "Full Name", key: "name" },
            { label: "Mobile No.", key: "mobile_no" },
            { label: "Email ID", key: "email" },
            { label: "Address", key: "address" },
            { label: "Department", key: "department" },
            { label: "Designation", key: "designation" },
          ].map(({ label, key }) => (
            <div className="register-staff-input-container" key={key}>
              <label className="register-staff-label">
                {label}
                <span className="customer-enquiry-form-required">*</span>
              </label>
              <input
                type="text"
                name={key}
                value={formData[key] || ""}
                placeholder={`Enter ${label}`}
                className="register-staff-input"
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </div>
          ))}
        </div>

        <div className="register-staff-button-container">
          {!isEditing ? (
            <button
              type="button"
              className="register-staff-button edit-button"
              onClick={handleEditClick}
            >
              Edit
            </button>
          ) : (
            <button type="submit" className="register-staff-button" style={{color:"linear-gradient(to bottom, #16007a, #7a0045);"}}>
              Save
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Employeedit;
