import React, { useState } from "react";
import "./EventForm.css";

const EventForm = () => {
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    file: null,
    expiryDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEventData({ ...eventData, file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Event Data:", eventData);
    alert("Event submitted successfully!");
    setEventData({ name: "", description: "", file: null, expiryDate: "" });
  };

  return (
    <div className="event-form-container">
      <h2 className="event-title">Create Event</h2>
      <form  className="event-add-form" onSubmit={handleSubmit}>
        <div className="event-group">
          <label>Event Name*</label>
          <input
            type="text"
            name="name"
            value={eventData.name}
            onChange={handleChange}
            className="event-input"
            required
          />
        </div>

        <div className="event-group">
          <label>Description*</label>
          <textarea
            name="description"
            value={eventData.description}
            onChange={handleChange}
            className="event-textarea"
            rows="4"
            required
          ></textarea>
        </div>

        <div className="event-group">
          <label>Upload File (Image/PDF)*</label>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
            className="event-file-input"
            required
          />
        </div>

        <div className="event-group">
          <label>Expiring Date*</label>
          <input
            type="date"
            name="expiryDate"
            value={eventData.expiryDate}
            onChange={handleChange}
            className="event-input"
            required
          />
        </div>

        <button type="submit" className="event-button">
          Submit Event
        </button>
      </form>
    </div>
  );
};

export default EventForm;
