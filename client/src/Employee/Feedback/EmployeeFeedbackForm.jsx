import React, { useState } from "react";
import "./EmployeeFeedbackForm.css";

const EmployeeFeedbackForm = () => {
  const [feedback, setFeedback] = useState({
    subject: "",
    description: "",
  });

  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Feedback:", feedback);
    alert("Feedback submitted successfully!");
    setFeedback({ subject: "", description: "" });
  };

  return (
    <div className="feedback-form-container">
      <h2 className="feedback-title">Employee Feedback</h2>
      <form onSubmit={handleSubmit}>
        <div className="feedback-group">
          <label>Subject*</label>
          <input
            type="text"
            name="subject"
            value={feedback.subject}
            onChange={handleChange}
            className="feedback-input"
            required
          />
        </div>

        <div className="feedback-group">
          <label>Description*</label>
          <textarea
            name="description"
            value={feedback.description}
            onChange={handleChange}
            className="feedback-textarea"
            rows="4"
            required
          ></textarea>
        </div>

        <button type="submit" className="feedback-button">
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default EmployeeFeedbackForm;
