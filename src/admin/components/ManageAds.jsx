import React, { useEffect, useState } from "react";
import AdminApi from "../../api/AdminApi";
import "../../Styles/ManageAds.css";
import { useNavigate } from "react-router-dom";

const ManageAds = () => {
  const [ads, setAds] = useState([]);
  const [newAd, setNewAd] = useState({
    type: "manual",
    imageUrl: "",
    redirectUrl: "",
    googleScript: "",
    displayOrder: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = () => {
    AdminApi.getAllAds()
      .then((res) => setAds(res.data))
      .catch((err) => console.error("Error fetching ads:", err));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAd((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateAd = () => {
    AdminApi.createAd(newAd)
      .then(() => {
        fetchAds(); // Refresh list
        alert("Ad created successfully!");
        setNewAd({
          type: "manual",
          imageUrl: "",
          redirectUrl: "",
          googleScript: "",
          displayOrder: 0,
        });
      })
      .catch((err) => {
        console.error("Error creating ad:", err);
        alert("Error creating ad");
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this ad?")) {
      AdminApi.deleteAd(id)
        .then(() => {
          fetchAds();
          alert("Ad deleted");
        })
        .catch((err) => console.error("Error deleting ad:", err));
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Manage Advertisements</h1>
        <button className="logout-btn" onClick={() => navigate("/admin/home")}>
          Back to Dashboard
        </button>
      </div>

      {/* ➕ New Ad Form */}
      <div className="create-ad-form">
        <h2>Create New Ad</h2>

        <label>
          Type:
          <select name="type" value={newAd.type} onChange={handleInputChange}>
            <option value="manual">Manual</option>
            <option value="google">Google Script</option>
          </select>
        </label>

        {newAd.type === "manual" ? (
          <>
            <label>
              Image URL:
              <input
                type="text"
                name="imageUrl"
                value={newAd.imageUrl}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Redirect URL:
              <input
                type="text"
                name="redirectUrl"
                value={newAd.redirectUrl}
                onChange={handleInputChange}
              />
            </label>
          </>
        ) : (
          <label>
            Google Ads Script:
            <textarea
              name="googleScript"
              value={newAd.googleScript}
              onChange={handleInputChange}
              style={{ width: "100%", height: "80px", fontSize: "12px" }}
            />
          </label>
        )}

        <label>
          Display Order:
          <input
            type="number"
            name="displayOrder"
            value={newAd.displayOrder}
            onChange={handleInputChange}
          />
        </label>

        <button className="create-btn" onClick={handleCreateAd}>
          Create Ad
        </button>
      </div>

      {/* 📋 Existing Ads */}
      {ads.length === 0 ? (
        <p className="no-ads">No ads found.</p>
      ) : (
        <div className="card-grid">
          {ads.map((ad) => (
            <div key={ad.id} className="card">
              <p><strong>Ad ID:</strong> {ad.id}</p>
              <p><strong>Type:</strong> {ad.type}</p>

              {ad.type === "manual" ? (
                <>
                  <img src={ad.imageUrl} alt="Manual Ad" className="ad-image" />
                  <p><strong>Redirect URL:</strong> {ad.redirectUrl}</p>
                </>
              ) : (
                <>
                  <p><strong>Rendered Google Ad:</strong></p>
                  <div
                    className="google-ad-preview"
                    dangerouslySetInnerHTML={{ __html: ad.googleScript }}
                  />
                </>
              )}

              <p><strong>Status:</strong> {ad.status ? "Active" : "Inactive"}</p>
              <p><strong>Display Order:</strong> {ad.displayOrder}</p>

              <div style={{ marginTop: "10px" }}>
                <button className="edit-btn" onClick={() => console.log("Edit", ad.id)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(ad.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageAds;
