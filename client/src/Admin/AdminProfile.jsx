import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; // ✅ Correct import for Vite
import "./AdminProfile.css";

const AdminProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token"); // Get token from cookies
    if (token) {
      try {
        const decoded = jwtDecode(token); // Decode the token
        setProfile(decoded);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  if (!profile) {
    return <p className="loading-text">Loading admin details...</p>;
  }

  return (
    <div className="admin-profile-container">
     

      <div className="profile-details">
        <h3>Admin Information</h3>
        <div className="detail-item">
          <strong>Full Name</strong>
          <span>{profile.name || "N/A"}</span>
        </div>
        <div className="detail-item">
          <strong>Email</strong>
          <span>{profile.email || "N/A"}</span>
        </div>
       
        
      </div>
    </div>
  );
};

export default AdminProfile;
