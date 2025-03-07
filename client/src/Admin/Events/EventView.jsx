import React from "react";
import "./EventView.css";

const EventView = () => {
  // Dummy event data
  const event = {
    name: "Music Festival",
    description: "Join us for an unforgettable night of live music and entertainment!",
    image: "data:image/jpeg;base64,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",
    expiryDate: "2025-03-10",
  };

  return (
    <div className="event-view-container">
      <h2 className="event-view-title">Event Details</h2>
      <div className="event-view-card">
        <div className="event-view-image">
          <img src={event.image} alt="Event" />
        </div>
        <div className="event-view-info">
          <h3>{event.name}</h3>
          <p>{event.description}</p>
          <span className="event-view-date">Expires on: {event.expiryDate}</span>
        </div>
      </div>
    </div>
  );
};

export default EventView;
