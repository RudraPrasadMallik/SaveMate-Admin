import React, { useEffect, useState } from "react";
import AdminApi from "../../api/AdminApi";
import "../../Styles/ManageSections.css";
import { useNavigate } from "react-router-dom";

const ManageSections = () => {
  const [sections, setSections] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");  // New state for description
  const [orderIndex, setOrderIndex] = useState(0);  // New state for orderIndex
  const [status, setStatus] = useState(true);  // New state for status
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState("");  // For validation error message
  const navigate = useNavigate();

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = () => {
    setLoading(true);
    AdminApi.getAllSections()
      .then((res) => {
        setSections(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading sections:", err);
        setError("Failed to load sections. Please try again later.");
        setLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!title || !description || orderIndex === "") {
      setValidationError("All fields are required.");
      return; // Prevent form submission if validation fails
    } else {
      setValidationError(""); // Clear validation error if all fields are valid
    }

    const sectionData = { 
      title,
      description,
      orderIndex,
      status
    };

    if (editId) {
      AdminApi.updateSection(editId, sectionData)
        .then(() => {
          fetchSections();
          resetForm();
        })
        .catch((err) => {
          console.error("Error updating section:", err);
          setError("Failed to update section. Please try again.");
        });
    } else {
      AdminApi.createSection(sectionData)
        .then(() => {
          fetchSections();
          resetForm();
        })
        .catch((err) => {
          console.error("Error creating section:", err);
          setError("Failed to create section. Please try again.");
        });
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");  // Reset description
    setOrderIndex(0);  // Reset orderIndex
    setStatus(true);  // Reset status
    setEditId(null);
    setValidationError(""); // Reset validation error
  };

  const handleEdit = (section) => {
    setTitle(section.title);
    setDescription(section.description);  // Pre-fill description
    setOrderIndex(section.orderIndex);  // Pre-fill orderIndex
    setStatus(section.status);  // Pre-fill status
    setEditId(section.id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this section?")) {
      AdminApi.deleteSection(id)
        .then(() => fetchSections())
        .catch((err) => {
          console.error("Error deleting section:", err);
          setError("Failed to delete section. Please try again.");
        });
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Manage Sections</h1>
        <button className="logout-btn" onClick={() => navigate("/admin/home")}>Back to Dashboard</button>
      </div>

      {error && <div className="error-message">{error}</div>}
      {validationError && <div className="validation-error">{validationError}</div>} {/* Display validation error */}

      <form onSubmit={handleSubmit} className="form-inline">
        <input
          type="text"
          value={title}
          placeholder="Section Title"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          value={description}
          placeholder="Section Description"
          onChange={(e) => setDescription(e.target.value)}  // Handle description input
          required
        />
        <input
          type="number"
          value={orderIndex}
          placeholder="Order Index"
          onChange={(e) => setOrderIndex(e.target.value)}  // Handle orderIndex input
          required
        />
        <label>
          <input
            type="checkbox"
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}  // Handle status toggle
          />
          Active
        </label>
        <button type="submit" disabled={loading || !title || !description || orderIndex === ""}>
          {editId ? "Update" : "Add"} Section
        </button>
        {editId && <button type="button" onClick={resetForm}>Cancel</button>}
      </form>

      {loading ? (
        <div>Loading sections...</div>
      ) : (
        <ul className="list">
          {sections.map((section) => (
            <li key={section.id} className="list-item">
              {section.title}
              <div>
                <button onClick={() => handleEdit(section)}>Edit</button>
                <button onClick={() => handleDelete(section.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageSections;
