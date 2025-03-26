import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Toast from "../../components/utlis/toast";
import "../admin.css";


const EmployeeRegister = () => {
  const [details, setDetails] = useState({
    name: "",
    mobile_no: "",
    email: "",
    designation: "",
    department: "",
    password: "",
    empId: "",
    confirm_password: "",
    dob: "",
    role: "",
    position : "",
    status: "",

  });

  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setButtonLoader(true);

    if (details.password !== details.confirm_password) {
      setPasswordMismatch(true);
      setButtonLoader(false);
      return;
    }

    setPasswordMismatch(false);
    const formData = new FormData();

    for (const key in details) {
      if (key !== "confirm_password") {
        formData.append(key, details[key]);
      }
    }

    // Retrieve token from cookies
    const token = Cookies.get("token");

    try {
      const response = await fetch("https://timesheet.labyrinthglobalsolution.site/api/admin/register", {
        method: "POST",
        headers: {
          
          Authorization: `Bearer ${token}`, // Token from cookies
        },
        body: formData,
      });
      


      const data = await response.json();
      setButtonLoader(false);

      if (response.ok) {
        Toast.fire({ icon: "success", title: data.message });
        setDetails({
          name: "",
          mobile_no: "",
          email: "",
          designation: "",
          department: "",
          password: "",
          empId: "",
          confirm_password: "",
          dob: "",
          role: "",
          position : "",
          status: "",
        });
        navigate("/adminpanel/marketing-list");
      } else {
        Toast.fire({ icon: "error", title: data.message });
      }
    } catch (error) {
      Toast.fire({ icon: "error", title: error.message });
      setButtonLoader(false);
    }
  };

  return (
    <div className="register-staff-form-main-container">
      <form className="register-staff-from-container" onSubmit={handleSubmit}>
        <div className="register-staff-header-container">
          <h2 className="register-staff-heading">Employee Registration</h2>
        </div>

        {/* Full Name */}
        <div className="register-staff-input-container">
          <label className="register-staff-label">
            Full Name<span className="customer-enquiry-form-required">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={details.name}
            placeholder="Enter Full Name"
            className="register-staff-input"
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Mobile Number */}
        <div className="register-staff-input-container">
          <label className="register-staff-label">
            Mobile No.<span className="customer-enquiry-form-required">*</span>
          </label>
          <input
            className="register-staff-input"
            type="number"
            value={details.mobile_no}
            placeholder="Enter Mobile No."
            name="mobile_no"
            onChange={handleInputChange}
            required
            onInput={(e) => {
              if (e.target.value.length > 10) {
                e.target.value = e.target.value.slice(0, 10);
              }
            }}
          />
        </div>

        {/* Email */}
        <div className="register-staff-input-container">
          <label className="register-staff-label">
            Email ID<span className="customer-enquiry-form-required">*</span>
          </label>
          <input
            className="register-staff-input"
            type="email"
            placeholder="Enter Email ID"
            value={details.email}
            name="email"
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Employee ID */}
        <div className="register-staff-input-container">
          <label className="register-staff-label">
            Employee ID<span className="customer-enquiry-form-required">*</span>
          </label>
          <input
            className="register-staff-input"
            type="text"
            placeholder="Enter Employee ID"
            name="empId"
            value={details.empId}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Designation */}
        <div className="register-staff-input-container">
          <label className="register-staff-label">
            Designation<span className="customer-enquiry-form-required">*</span>
          </label>
          <input
            className="register-staff-input"
            type="text"
            placeholder="Enter Designation"
            name="designation"
            value={details.designation}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Department */}
        <div className="register-staff-input-container">
          <label className="register-staff-label">
            Department<span className="customer-enquiry-form-required">*</span>
          </label>
          <select
            required
            className="register-staff-input"
            value={details.department}
            name="department"
            onChange={handleInputChange}
          >
            <option value="">Select Department</option>
            <option value="Polarion">Polarion</option>
            <option value="Mendix">Mendix</option>
            <option value="Sales">Sales</option>
            <option value="Conventional">Conventional</option>
          </select>
        </div>

        {/* Role */}
        <div className="register-staff-input-container">
          <label className="register-staff-label">
            Role<span className="customer-enquiry-form-required">*</span>
          </label>
          <select
            required
            className="register-staff-input"
            value={details.role}
            name="role"
            onChange={handleInputChange}
          >
            <option value="">Select Role</option>
            <option value="Employee">user</option>
            <option value="Manager">project-manager</option>
            <option value="HR">hr</option>
          </select>
        </div>

        {/* Position */}
        <div className="register-staff-input-container">
          <label className="register-staff-label">
            Position<span className="customer-enquiry-form-required">*</span>
          </label>
          <input
            className="register-staff-input"
            type="text"
            placeholder="Enter Position"
            name="position"
            value={details.position}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* DOB */}
        <div className="register-staff-input-container">
          <label className="register-staff-label">
            DOB<span className="customer-enquiry-form-required">*</span>
          </label>
          <input
            className="register-staff-input"
            type="date"
            value={details.dob}
            name="dob"
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Password */}
        <div className="register-staff-input-container">
          <label className="register-staff-label">
            Password<span className="customer-enquiry-form-required">*</span>
          </label>
          <input
            className="register-staff-input"
            type="password"
            name="password"
            value={details.password}
            placeholder="Enter Password"
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="register-staff-input-container">
          <label className="register-staff-label">
            Confirm Password<span className="customer-enquiry-form-required">*</span>
          </label>
          <input
            className="register-staff-input"
            type="password"
            value={details.confirm_password}
            name="confirm_password"
            placeholder="Enter Confirm Password"
            onChange={handleInputChange}
            required
          />
          {passwordMismatch && <p className="error-message">Passwords do not match</p>}
        </div>
       
        <div className="register-staff-input-container">
          <label className="register-staff-label">
            Status<span className="customer-enquiry-form-required">*</span>
          </label>
          <select
            required
            className="register-staff-input"
            value={details.status}
            name="status"
            onChange={handleInputChange}
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>


        <div className="register-staff-button-container">
          <button className="register-staff-button" disabled={buttonLoader} type="submit">
            {buttonLoader ? <div className="button-loader"></div> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeRegister;
