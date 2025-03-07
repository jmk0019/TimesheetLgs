import React, { useState } from "react";
import "./NotificationsList.css";
import { Link } from "react-router-dom";

const NotificationsList = () => {
  const [notifications] = useState([
    { id: 1, employeeName: "John Doe", subject: "New Task Assigned", description: "You have a new task in Project X." },
    { id: 2, employeeName: "Jane Smith", subject: "Meeting Reminder", description: "Reminder: Team meeting at 3 PM." },
    { id: 3, employeeName: "Alice Johnson", subject: "Report Submission", description: "Submit your report by EOD today." },
  ]);

  return (
    <div className="notifications-list-container">
      {/* Header with Add Notification Button */}
      <div className="notifications-list-header">
        <h2>Notifications List</h2>
        <Link to="/adminpanel/notfication">
        <button className="add-notification-button"> Add Notification</button>
        </Link>
      </div>

      {/* Notifications Table */}
      <table className="notifications-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Employee Name</th>
            <th>Subject</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <tr key={notification.id}>
                <td>{index + 1}</td>
                <td>{notification.employeeName}</td>
                <td>{notification.subject}</td>
                <td>{notification.description}</td>
                <td>
                  <button className="edit-button">Edit</button>
                  <button className="delete-button">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-data">No notifications found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default NotificationsList;
