// File: src/admin/components/AdminHome.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/AdminHome.css";


const AdminHome = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("isAuthenticated");
    navigate("/admin/login");
  };

  return (
    <div className="admin-home">
      <div className="admin-header">
        <h1>SaveMate Admin Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="admin-grid">
        <div className="admin-card indigo" onClick={() => navigate("/admin/ads")}>
          <h2>Manage Ads</h2>
          <p>View, Add or Delete homepage banners</p>
        </div>

        <div className="admin-card green" onClick={() => navigate("/admin/sections")}>
          <h2>Manage Sections</h2>
          <p>Control dynamic homepage sections</p>
        </div>

        <div className="admin-card red" onClick={() => navigate("/admin/coupons")}>
          <h2>Manage Coupons</h2>
          <p>Review and approve submitted coupons</p>
        </div>
        
        <div className="admin-card purple" onClick={() => navigate("/admin/seo")}>
  <h2>Manage SEO</h2>
  <p>Update meta title, description, and keywords</p>
</div>


            
      </div>
    </div>
  );
};

export default AdminHome;
