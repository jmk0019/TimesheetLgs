import React, { useState } from "react";
import "./FeedbackPage.css";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const FeedbackPage = () => {
  const [feedbacks] = useState([
    {
      id: 1,
      subject: "Issue with Project X",
      description: "I'm facing issues with task allocation in Project X.",
      date: "2025-03-03",
      time: "2:30 PM",
      reply: "Thank you for reporting. We are looking into this.",
    },
    {
      id: 2,
      subject: "Leave Request Issue",
      description: "My leave request is not being approved in the system.",
      date: "2025-03-02",
      time: "1:00 PM",
      reply: "We have forwarded this to HR. Expect a response soon.",
    },
    {
      id: 3,
      subject: "System Slowness",
      description: "The portal is running slow during peak hours.",
      date: "2025-03-01",
      time: "4:45 PM",
      reply: "",
    },
  ]);

  return (
    <div className="feedback-container">
      {/* Header with Add Feedback Button */}
      <div className="feedback-header">
        <h2 className="feedback-title">
          <IoChatbubbleEllipsesOutline className="feedback-icon" /> Feedback
        </h2>
        <Link to="/employeepanel/feedback">
        <button className="add-feedback-button"> Add Feedback</button>
        </Link>
      </div>

      {/* Feedback List */}
      <div className="feedback-list">
        {feedbacks.length > 0 ? (
          feedbacks.map((feedback) => (
            <div key={feedback.id} className="feedback-card">
              <h4 className="feedback-subject">{feedback.subject}</h4>
              <p className="feedback-description">{feedback.description}</p>
              <span className="feedback-time">
                {feedback.date} | {feedback.time}
              </span>

              {/* Admin Reply Section */}
              {feedback.reply && (
                <div className="feedback-reply">
                  <strong>Admin Reply:</strong> {feedback.reply}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="no-feedback">No feedback submitted yet.</p>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;
