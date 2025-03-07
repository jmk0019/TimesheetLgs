import React, { useState } from "react";
import "./ProjectForm.css";

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    startDate: "",
    endDate: "",
    projectTeamSize: "",
    assignToPM: "",
    assignToBA: "",
    teamLead: "",
    department: "",
    type: "",
    clientName: "",
    developers: [],
  });

  const users = ["Posh", "Mukesh", "Priyansh", "John", "Jane", "Doe"];
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMultiSelect = (e) => {
    const selectedUser = e.target.value;
    if (!formData.developers.includes(selectedUser)) {
      setFormData({ ...formData, developers: [...formData.developers, selectedUser] });
    }
  };

  const removeDeveloper = (dev) => {
    setFormData({ ...formData, developers: formData.developers.filter(d => d !== dev) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="project-form-container">
      <h2 className="project-form-title">Project Creation</h2>
      <form onSubmit={handleSubmit}>
        <div className="project-form-row">
          <div className="project-form-group">
            <label>Project Name*</label>
            <input type="text" name="projectName" className="project-form-input" onChange={handleChange} />
          </div>
          <div className="project-form-group">
            <label>Client Name*</label>
            <input type="text" name="clientName" className="project-form-input" onChange={handleChange} />
          </div>
          <div className="project-form-group">
            <label>Project Team Size*</label>
            <input type="number" name="projectTeamSize" className="project-form-input" onChange={handleChange} />
          </div>
        </div>
        <div className="project-form-row">
          <div className="project-form-group">
            <label>Start Date*</label>
            <input type="date" name="startDate" className="project-form-input" onChange={handleChange} />
          </div>
          <div className="project-form-group">
            <label>End Date*</label>
            <input type="date" name="endDate" className="project-form-input" onChange={handleChange} />
          </div>
          <div className="project-form-group">
            <label>Select Department*</label>
            

            <select name="type" className="project-form-select" onChange={handleChange}>
              <option value="">Select Type</option>
              <option value="Conventional">Conventional</option>
              <option value="Mendix">Mendix</option>
              <option value="Polarion">Polarion</option>
            </select>
          </div>
        </div>
        <div className="project-form-row">
          <div className="project-form-group">
            <label>Assign to PM*</label>
            <select name="assignToPM" className="project-form-select" onChange={handleChange}>
              <option value="">Select PM</option>
              {users.map((user) => (
                <option key={user} value={user}>{user}</option>
              ))}
            </select>
          </div>
          <div className="project-form-group">
            <label>Assign to BA*</label>
            <select name="assignToBA" className="project-form-select" onChange={handleChange}>
              <option value="">Select BA</option>
              {users.map((user) => (
                <option key={user} value={user}>{user}</option>
              ))}
            </select>
          </div>
          <div className="project-form-group">
            <label>Select Team Lead*</label>
            <select name="teamLead" className="project-form-select" onChange={handleChange}>
              <option value="">Select Team Lead</option>
              {users.map((user) => (
                <option key={user} value={user}>{user}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="project-form-row">
          <div className="project-form-group">
            <label>Select Developers*</label>
            <select className="project-form-select" onChange={handleMultiSelect}>
              <option value="">Select Developers</option>
              {users.map((user) => (
                <option key={user} value={user}>{user}</option>
              ))}
            </select>
            <div className="selected-developers">
              {formData.developers.map((dev) => (
                <span key={dev} className="developer-tag">
                  {dev} <button type="button" onClick={() => removeDeveloper(dev)}>✖</button>
                </span>
              ))}
            </div>
          </div>
        </div>
        <button type="submit" className="project-form-button">Submit</button>
      </form>
    </div>
  );
};

export default ProjectForm;
