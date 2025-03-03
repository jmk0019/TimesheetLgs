import React, { useState } from "react";
import "./Notifications.css"; // Import CSS file

const Notifications = () => {
  // Dummy employees list (Replace with API data later)
  const employees = [
    { id: "U001", name: "John Doe" },
    { id: "U002", name: "Jane Smith" },
    { id: "U003", name: "Robert Johnson" },
    { id: "U004", name: "Emily Davis" },
    { id: "U005", name: "Michael Brown" },
  ];

  // Form State
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    employees: [],
  });

  // Handle Input Changes
  const handleChange = (e) => {
    const selectedEmployeeId = e.target.value;
    if (selectedEmployeeId && !formData.employees.includes(selectedEmployeeId)) {
      setFormData({
        ...formData,
        employees: [...formData.employees, selectedEmployeeId],
      });
    }
  };

  // Remove Selected Employee
  const removeEmployee = (id) => {
    setFormData({
      ...formData,
      employees: formData.employees.filter(empId => empId !== id),
    });
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Notification Sent:", formData);
    alert("Notification Sent Successfully!");
    setFormData({ subject: "", description: "", employees: [] }); // Reset form
  };

  return (
    <div className="notifications">
      <h2 className="notifications-title">Send Notification</h2>

      <div className="notifications-container">
        <form className="notification-form" onSubmit={handleSubmit}>
          {/* Subject */}
          <label>Subject:</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder="Enter subject"
            required
          />

          {/* Description */}
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Enter description"
            required
          ></textarea>

          {/* Employee Multi-Select Dropdown */}
          <label>Select Employee(s):</label>
          <select name="employees" onChange={handleChange}>
            <option value="">-- Select Employee --</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name}
              </option>
            ))}
          </select>

          {/* Selected Employees List (as tags) */}
          <div className="selected-employees">
            {formData.employees.map((empId) => {
              const employee = employees.find((e) => e.id === empId);
              return (
                <span key={empId} className="employee-tag">
                  {employee?.name}
                  <button type="button" className="remove-btn" onClick={() => removeEmployee(empId)}>✖</button>
                </span>
              );
            })}
          </div>

          {/* Submit Button */}
          <button className="notification-button" type="submit">
            Send Notification
          </button>
        </form>
      </div>
    </div>
  );
};

export default Notifications;
