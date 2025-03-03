import { useState } from "react";
import "./EmployeeView.css"; // Import CSS for styling

const EmployeeView = () => {
  const [formData] = useState({
    name: "John Doe",
    mobile_no: "9876543210",
    email: "johndoe@example.com",
    address: "123 Main Street, City, Country",
    department: "Sales",
    designation: "Senior Executive",
  });

  return (
    <div className="employee-view-container">
      <div className="employee-card">
        <h2 className="employee-name">{formData.name}</h2>
        <p className="employee-detail"><strong>Mobile:</strong> {formData.mobile_no}</p>
        <p className="employee-detail"><strong>Email:</strong> {formData.email}</p>
        <p className="employee-detail"><strong>Address:</strong> {formData.address}</p>
        <p className="employee-detail"><strong>Department:</strong> {formData.department}</p>
        <p className="employee-detail"><strong>Designation:</strong> {formData.designation}</p>
      </div>
    </div>
  );
};

export default EmployeeView;
