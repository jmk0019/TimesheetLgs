import React, { useState } from "react";
import "./NotificationsPage.css";
import { IoNotificationsOutline } from "react-icons/io5";

const NotificationsPage = () => {
  const [notifications] = useState([
    {
      id: 1,
      subject: "New Project Assigned",
      description: "You have been assigned to Project X. Please check your tasks.",
      date: "2025-03-03",
      time: "2:30 PM",
    },
    {
      id: 2,
      subject: "Meeting Scheduled",
      description: "Team meeting scheduled at 3 PM. Please join on time.",
      date: "2025-03-03",
      time: "1:00 PM",
    },
    {
      id: 3,
      subject: "Report Submission",
      description: "Deadline for the report submission is tomorrow. Make sure to submit before 5 PM.",
      date: "2025-03-02",
      time: "4:45 PM",
    },
  ]);

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h2 className="notifications-title">
          <IoNotificationsOutline className="notifications-icon" /> Notifications
        </h2>
      </div>

      <div className="notifications-list">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div key={notification.id} className="notification-card">
              <div className="notification-content">
                <p className="notification-subjectof">{notification.subject}</p>
                <p className="notification-description">{notification.description}</p>
                <p className="notification-time">
                  {notification.date} | {notification.time}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-notifications">No new notifications</p>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
