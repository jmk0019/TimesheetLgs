import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../../components/utlis/toast";
import "../admin.css";

const EmployeeRegister = () => {
  const [details, setDetails] = useState({
    name: "",
    mobile_no: "",
    email: "",
    designation: "",
    departement: "",
    password: "",
    empId: "",
    confirm_password: "",
    address: "",
    role: "",
  });

  //   const [files, setFiles] = useState({
  //     aadhar_card_front: null,
  //     aadhar_card_back: null,
  //     pancard: null,
  //   });

  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  //   const handleFileChange = (event) => {
  //     const { name, files: selectedFiles } = event.target;
  //     setFiles((prevFiles) => ({ ...prevFiles, [name]: selectedFiles[0] }));
  //   };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setButtonLoader(true);
    if (details.password !== details.confirm_password) {
      setPasswordMismatch(true);
      return;
    }

    setPasswordMismatch(false);
    const formData = new FormData();

    // Append text fields to formData
    for (const key in details) {
      if (key !== "confirm_password") {
        formData.append(key, details[key]);
      }
    }

    // Append file fields to formData
    // for (const key in files) {
    //   formData.append(key, files[key]);
    // }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}salesregister`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        setButtonLoader(false);
        const data = await response.json();
        Toast.fire({ icon: "success", title: data.message });
        setDetails({
          name: "",
          mobile_no: "",
          email: "",
          designation: "",
          departement: "",

          password: "",
          empId: "",
          confirm_password: "",
          address: "",
          pincode: "",
          role: "",
        });
        // setFiles({
        //   aadhar_card_front: null,
        //   aadhar_card_back: null,
        //   pancard: null,
        // });
        navigate("/adminpanel/marketing-list");
      } else {
        const data = await response.json();
        Toast.fire({ icon: "error", title: data.message });

        setButtonLoader(false);
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
        <div className="register-staff-input-container">
          <label className="register-staff-label">
            Full Name
            <span className="customer-enquiry-form-required">*</span>
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
        <div className="register-staff-input-container">
          <label className="register-staff-label">
            Mobile No.
            <span className="customer-enquiry-form-required">*</span>
          </label>
          <input
            className="register-staff-input"
            type="number"
            value={details.mobile_no}
            placeholder="Enter Mobile No."
            name="mobile_no"
            onChange={handleInputChange}
            required
            maxLength={10}
            minLength={10}
            onInput={(e) => {
              if (e.target.value.length > 10) {
                e.target.value = e.target.value.slice(0, 10);
              }
            }}
          />
        </div>
        <div className="register-staff-input-container">
          <label className="register-staff-label">
            Email ID
            <span className="customer-enquiry-form-required">*</span>
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
        <div className="register-staff-input-container">
          <label className="register-staff-label">
            Employee ID
            <span className="customer-enquiry-form-required">*</span>
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
        <div className="register-staff-input-container">
          <label className="register-staff-label">
            Designation
            <span className="customer-enquiry-form-required">*</span>
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
        <div className="register-staff-input-container">
          <label className="register-staff-label">
            Departement
            <span className="customer-enquiry-form-required">*</span>
          </label>
          <select
            required
            className="register-staff-input"
            value={details.departement}
            name="departement"
            onChange={handleInputChange}
            
          >
            <option value="">Select Role</option>
            <option value="Employee">Polarion</option>
            <option value="Manager">Mendix</option>
            <option value="Manager">Sales</option>
            <option value="Manager">Conventational</option>
          </select>
        </div>
        <div className="register-staff-input-container">
          <label className="register-staff-label">
            Role
            <span className="customer-enquiry-form-required">*</span>
          </label>
          <select
            required
            className="register-staff-input"
            value={details.role}
            name="role"
            onChange={handleInputChange}
            
          >
            <option value="">Select Role</option>
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
          </select>
        </div>


        <div className="register-staff-input-container">
          <label className="register-staff-label">
            DOB
            <span className="customer-enquiry-form-required">*</span>
          </label>
          <input
            className="register-staff-input"
            type="date"
           
            value={details.address}
            name="address"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="register-staff-input-container">
          <label className="register-staff-label">
            Password
            <span className="customer-enquiry-form-required">*</span>
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
        <div className="register-staff-input-container">
          <label className="register-staff-label">
            Confirm Password
            <span className="customer-enquiry-form-required">*</span>
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
          {passwordMismatch && (
            <p className="error-message">Passwords do not match</p>
          )}
        </div>
     

        {/* <div className="register-staff-input-container">
          <label className="register-staff-label">
            Pan Card
            <span className="customer-enquiry-form-required"></span>
          </label>
          <input
            className="register-staff-file"
            type="file"
            name="pancard"
            onChange={handleFileChange}
          />
        </div>
        <div className="register-staff-input-container">
          <label className="register-staff-label">
            Aadhar Card Front
            <span className="customer-enquiry-form-required"></span>
          </label>
          <input
            className="register-staff-file"
            type="file"
            name="aadhar_card_front"
            onChange={handleFileChange}
          />
        </div>
        <div className="register-staff-input-container">
          <label className="register-staff-label">Aadhar Card Back</label>
          <input
            className="register-staff-file"
            type="file"
            name="aadhar_card_back"
            onChange={handleFileChange}
          />
        </div> */}
        <div className="register-staff-button-container" style={{color: "#7a0045"}} >
          <button
            className="register-staff-button"
            disabled={buttonLoader}
            type="submit"
          >
            {buttonLoader ? <div className="button-loader"></div> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeRegister;
