// src/admin/components/ManageCoupons.jsx
import React, { useState } from "react";
import AdminApi from "../../api/AdminApi";
import "../../Styles/ManageCoupons.css";
import { useNavigate } from "react-router-dom";

const ManageCoupons = () => {
  const [coupon, setCoupon] = useState({
    imgUrl: "",
    title: "",
    description: "",
    discountCode: "",
    slug: "",
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
    type: ""
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoupon((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    AdminApi.createCoupon(coupon)
      .then(() => {
        alert("Coupon created successfully!");
        setCoupon({
          imgUrl: "",
          title: "",
          description: "",
          discountCode: "",
          slug: "",
          seoTitle: "",
          seoDescription: "",
          seoKeywords: "",
          type: ""
        });
        setErrorMessage("");
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.status === 409 &&
          err.response.data &&
          err.response.data.message
        ) {
          setErrorMessage(err.response.data.message);
        } else {
          setErrorMessage("Something went wrong. Please try again.");
        }
        console.error("Error creating coupon:", err);
      });
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Create Coupon</h1>
        <button className="logout-btn" onClick={() => navigate("/admin/home")}>
          Back to Dashboard
        </button>
      </div>

      <form onSubmit={handleSubmit} className="form-grid">
        <label>
          Image URL
          <input
            name="imgUrl"
            value={coupon.imgUrl}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Coupon Title
          <input
            name="title"
            value={coupon.title}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Discount Code
          <input
            name="discountCode"
            value={coupon.discountCode}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Slug
          <input
            name="slug"
            value={coupon.slug}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Type (e.g., recent, most_watched, external)
          <input
            name="type"
            value={coupon.type}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          SEO Title
          <input
            name="seoTitle"
            value={coupon.seoTitle}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          SEO Description
          <input
            name="seoDescription"
            value={coupon.seoDescription}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          SEO Keywords (comma-separated)
          <input
            name="seoKeywords"
            value={coupon.seoKeywords}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={coupon.description}
            onChange={handleChange}
            required
          ></textarea>
        </label>

        <button type="submit">Submit Coupon</button>
      </form>

      {errorMessage && (
        <div className="error-message" style={{ color: "red", marginTop: "10px" }}>
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default ManageCoupons;
