import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminApi from "../../api/AdminApi";
import "../../Styles/ManageDeals.css";

const ManageDeals = () => {
  const navigate = useNavigate();
  const [deal, setDeal] = useState({
    title: "",
    imageUrl: "",
    logoImgUrl: ""
  });
  const [deals, setDeals] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeal((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!deal.title.trim() || !deal.imageUrl.trim() || !deal.logoImgUrl.trim()) {
      setErrorMessage("All fields are required.");
      return;
    }

    AdminApi.createDeal(deal)
      .then(() => {
        alert("Deal created successfully!");
        setDeal({
          title: "",
          imageUrl: "",
          logoImgUrl: ""
        });
        setErrorMessage("");
        fetchDeals(); // Refresh the list
      })
      .catch((err) => {
        setErrorMessage("Failed to create deal. Try again.");
        console.error("Deal creation error:", err);
      });
  };

  // Fetch all deals
  const fetchDeals = () => {
    AdminApi.getAllDeals()
      .then((res) => {
        setDeals(res.data);
      })
      .catch((err) => {
        console.error("Error fetching deals:", err);
      });
  };

  // Delete deal
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this deal?")) {
      AdminApi.deleteDeal(id)
        .then(() => {
          setDeals(deals.filter((d) => d.id !== id));
        })
        .catch((err) => {
          console.error("Error deleting deal:", err);
        });
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchDeals();
  }, []);

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Manage Deals</h1>
        <div>
          <button className="btn" onClick={() => navigate("/admin/coupons")}>
            Back to Create Coupon
          </button>
          <button className="logout-btn" onClick={() => navigate("/admin/home")}>
            Back to Dashboard
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="form-grid">
        <label>
          Title
          <input
            name="title"
            value={deal.title}
            onChange={handleChange}
            placeholder="Enter deal title"
          />
        </label>

        <label>
          Image URL
          <input
            name="imageUrl"
            value={deal.imageUrl}
            onChange={handleChange}
            placeholder="Enter deal image URL"
          />
        </label>

        <label>
          Logo Image URL
          <input
            name="logoImgUrl"
            value={deal.logoImgUrl}
            onChange={handleChange}
            placeholder="Enter logo image URL"
          />
        </label>

        {errorMessage && (
          <div style={{ color: "red", marginBottom: "10px" }}>{errorMessage}</div>
        )}

        <button type="submit">Submit Deal</button>
      </form>

      <hr />

      <h2>All Deals</h2>
      {deals.length === 0 ? (
        <p>No deals available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Image</th>
              <th>Logo</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {deals.map((deal) => (
              <tr key={deal.id}>
                <td>{deal.title}</td>
                <td>
                  <img src={deal.imageUrl} alt="deal" width="80" />
                </td>
                <td>
                  <img src={deal.logoImgUrl} alt="logo" width="50" />
                </td>
                <td>
                  <button onClick={() => handleDelete(deal.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageDeals;
