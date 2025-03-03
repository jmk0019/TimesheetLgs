import React from "react";
import "./EmployeeProfile.css";

const EmployeeProfile = () => {
  // Dummy Employee Data
  const employee = {
    name: "Yaswanth Manikanta Jalla",
    employeeId: "LGS2023876",
    role: "Software Engineer",
    department: "Polarion",
    email: "johndoe@example.com",
    phone: "6301376523",
    lastLogin: "27 Aug 2024, 14:54",
    location: "Windows in New York, USA",
  };

  // Extract Initials
  const getInitials = (name) => {
    const nameParts = name.split(" ");
    return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
  };

  // Dummy Leaves & Payslips Data
  const leaves = {
    available: 10,
    used: 5,
    pending: 2,
  };

  const payslips = [
    { month: "January 2025",  status: "View" },
    { month: "December 2024", status: "View" },
    { month: "November 2024", status: "View" },
  ];

  return (
    <div className="employee-profile">
      {/* Profile Card */}
      <div className="profile-card">
        <div className="profile-initials">{getInitials(employee.name)}</div>
        <div className="profile-info">
          <h2>{employee.name}</h2>
          <p className="empid">Employee ID: {employee.employeeId}</p>
          <p className="role">Role: {employee.role}</p>
          <p className="department">Department: {employee.department}</p>
          <p className="email">Email: {employee.email}</p>
          <p className="phone">Phone: {employee.phone}</p>
          
        </div>
      </div>

      {/* Right-Side Cards */}
      <div className="side-cards">
        {/* Leaves Card */}
        <div className="leaves-card">
  <h3>My Leaves</h3>
  <p><span> Total Available:</span> <span className="status available">{leaves.available}</span></p>
  <p><span>Utilized :</span> <span className="status used">{leaves.used}</span></p>
  <p><span>Remaining:</span> <span className="status pending">{leaves.pending}</span></p>
</div>


        {/* Payslips Card */}
        <div className="payslips-card">
          <h3>My Payslips</h3>
          <ul>
            {payslips.map((pay, index) => (
              <li key={index}>
                {pay.month} - <span className={`status ${pay.status.toLowerCase()}`}>{pay.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
