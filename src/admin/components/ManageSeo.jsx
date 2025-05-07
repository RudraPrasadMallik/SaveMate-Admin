import React, { useState, useEffect } from "react";
import AdminApi from "../../api/AdminApi";
import "../../Styles/ManageSeo.css";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const ManageSeo = () => {
  const [pageName, setPageName] = useState("home");
   const navigate = useNavigate();
  const [seo, setSeo] = useState({
    title: "",
    description: "",
    keywords: ""
  });
  const [loading, setLoading] = useState(false);

  const pages = ["home", "search", "coupons", "contact", "about"];

  useEffect(() => {
    fetchSeo(pageName);
  }, [pageName]);

  const fetchSeo = async (page) => {
    setLoading(true);
    try {
      const res = await AdminApi.getSeoData(page);
      setSeo({
        title: res.data.seoTitle || "",
        description: res.data.seoDescription || "",
        keywords: res.data.seoKeywords || ""
      });
    } catch (error) {
      toast.error("Failed to fetch SEO data");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setSeo({ ...seo, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!window.confirm("Are you sure you want to update SEO content?")) return;
    try {
      await AdminApi.updateSeoData(pageName, seo);
      toast.success("SEO updated successfully");
    } catch (error) {
      toast.error("Failed to update SEO");
    }
  };

  return (
    <div className="seo-container">
      <button className="logout-btn" onClick={() => navigate("/admin/home")}>Back to Dashboard</button>
      <h2>Manage SEO</h2>

      <label>Select Page:</label>
      <select value={pageName} onChange={(e) => setPageName(e.target.value)}>
        {pages.map((page) => (
          <option key={page} value={page}>
            {page.charAt(0).toUpperCase() + page.slice(1)}
          </option>
        ))}
      </select>

      {loading ? (
        <p>Loading SEO data...</p>
      ) : (
        <>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={seo.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={seo.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Keywords (comma-separated):</label>
            <input
              type="text"
              name="keywords"
              value={seo.keywords}
              onChange={handleChange}
              required
            />
          </div>

          <button onClick={handleUpdate}>Update SEO</button>
        </>
      )}
       <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default ManageSeo;
