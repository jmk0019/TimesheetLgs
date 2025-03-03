import React, { useState } from "react";
import "./Feedbacks.css"; // Import CSS file

const Feedbacks = () => {
  // Dummy feedback data (Replace with API later)
  const feedbackData = [
    { id: 101, userId: "U001", name: "John Doe", description: "Great app! Very easy to use." },
    { id: 102, userId: "U002", name: "Jane Smith", description: "Needs some improvements in UI." },
    { id: 103, userId: "U003", name: "Robert Johnson", description: "Helpful for tracking my work hours." },
    { id: 104, userId: "U004", name: "Emily Davis", description: "Sometimes it loads slow, but overall good." },
    { id: 105, userId: "U005", name: "Michael Brown", description: "Amazing features, love the timesheet module!" },
  ];

  // Handle Reply Button Click
  const handleReply = (userId) => {
    alert(`Replying to user: ${userId}`);
  };

  return (
    <div className="feedbacks">
      <h2 className="feedbacks-title">Employee Feedback</h2>

      <div className="feedbacks-container">
        <table className="feedback-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Employee Name</th>
              <th>Feedback</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {feedbackData.map((feedback, index) => (
              <tr key={feedback.id}>
                <td>{index + 1}</td>
                <td>{feedback.name}</td>
                <td>{feedback.description}</td>
                <td>
                  <button className="reply-btn" onClick={() => handleReply(feedback.userId)}>
                    Reply
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Feedbacks;
