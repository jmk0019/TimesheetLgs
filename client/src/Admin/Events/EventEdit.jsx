import React, { useState } from "react";
import "./EventEdit.css";

const EventEdit = () => {
  // Dummy event data
  const dummyEvent = {
    name: "Music Festival",
    description: "Join us for an unforgettable night of live music and entertainment!",
    expiryDate: "2025-03-10",
    image: "https://source.unsplash.com/1600x900/?concert,festival",
  };

  const [eventData, setEventData] = useState(dummyEvent);

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
    alert("Event updated successfully!");
    console.log("Updated Event Data:", eventData);
  };

  return (
    <div className="event-edit-container">
      <h2 className="event-edit-title">Edit Event</h2>
      <form className="event-edit-form" onSubmit={handleSubmit}>
        <label>Event Name</label>
        <input type="text" name="name" value={eventData.name} onChange={handleChange} required />

        <label>Description</label>
        <textarea name="description" value={eventData.description} onChange={handleChange} rows="4" required />

        <label>Upload New Image/PDF</label>
        <input type="file" accept="image/*,application/pdf" onChange={handleFileChange} />

        <label>Expiring Date</label>
        <input type="date" name="expiryDate" value={eventData.expiryDate} onChange={handleChange} required />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EventEdit;
