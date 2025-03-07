import React, { useState } from "react";
import "./EventsList.css";
import { Link } from "react-router-dom";
const EventsList = () => {
  const [events, setEvents] = useState([
    { id: 1, name: "Tech Conference 2025", description: "A global tech event." },
    { id: 2, name: "AI Workshop", description: "A hands-on AI session." },
    { id: 3, name: "Cyber Security Summit", description: "Security insights event." },
  ]);

  const handleDelete = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };



  



  return (
    <div className="events-list-container">
      <div className="events-header">
        <h2 className="events-list-title">Events List</h2>
        <Link to="/adminpanel/add-event">
        <button className="add-event-btn" > Add Event</button>
        </Link>
      </div>

      <table className="events-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Event Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.length > 0 ? (
            events.map((event) => (
              <tr >
                <td>{event.id}</td>
                <td>{event.name}</td>
                <td>{event.description}</td>
                <td className="action-buttons">
                    <Link to={`/adminpanel/view-event`} className="view-btn">

                  <button className="view-btn">View</button> </Link>
                  <Link to={`/adminpanel/edit-event`}>
                  <button className="edit-btn" >Edit</button> </Link>
                  <button className="delete-btn" onClick={() => handleDelete(event.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="no-events">No events available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EventsList;
