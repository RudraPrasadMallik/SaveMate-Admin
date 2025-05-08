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
  const [fieldErrors, setFieldErrors] = useState({});
  const [coupons, setCoupons] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoupon((prev) => ({
      ...prev,
      [name]: value
    }));
    setFieldErrors((prev) => ({
      ...prev,
      [name]: ""
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    const errors = {};
    if (!coupon.title.trim()) {
      errors.title = "Title is required.";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

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
        setFieldErrors({});
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

  const fetchCoupons = () => {
    AdminApi.getAllCoupons()
      .then((response) => {
        setCoupons(response.data);
      })
      .catch((error) => {
        console.error("Error fetching coupons:", error);
      });
  };

  const handleDelete = (id) => {
    AdminApi.deleteCoupon(id)
      .then(() => {
        setCoupons(coupons.filter((coupon) => coupon.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting coupon:", error);
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
          />
        </label>

        <label>
          Coupon Title
          <input
            name="title"
            value={coupon.title}
            onChange={handleChange}
          />
          {fieldErrors.title && (
            <div className="error-message" style={{ color: "red" }}>
              {fieldErrors.title}
            </div>
          )}
        </label>

        <label>
          Discount Code
          <input
            name="discountCode"
            value={coupon.discountCode}
            onChange={handleChange}
          />
        </label>

        <label>
          Slug
          <input
            name="slug"
            value={coupon.slug}
            onChange={handleChange}
          />
        </label>

        <label>
          Type (e.g., recent, most_watched, external)
          <input
            name="type"
            value={coupon.type}
            onChange={handleChange}
          />
        </label>

        <label>
          SEO Title
          <input
            name="seoTitle"
            value={coupon.seoTitle}
            onChange={handleChange}
          />
        </label>

        <label>
          SEO Description
          <input
            name="seoDescription"
            value={coupon.seoDescription}
            onChange={handleChange}
          />
        </label>

        <label>
          SEO Keywords (comma-separated)
          <input
            name="seoKeywords"
            value={coupon.seoKeywords}
            onChange={handleChange}
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={coupon.description}
            onChange={handleChange}
          ></textarea>
        </label>

        <button type="submit">Submit Coupon</button>
      </form>

      {errorMessage && (
        <div className="error-message" style={{ color: "red", marginTop: "10px" }}>
          {errorMessage}
        </div>
      )}

      <button onClick={fetchCoupons}>Get All Coupons</button>

      {coupons.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Slug</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon.id}>
                <td>{coupon.title}</td>
                <td>{coupon.slug}</td>
                <td>
                  <button onClick={() => handleDelete(coupon.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageCoupons;
