import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminHome from "./admin/components/AdminHome";
import Login from "./admin/components/Login";
import ProtectedRoute from "./admin/components/ProtectedRouts";
import ManageSections from "./admin/components/ManageSections";
import ManageCoupons from "./admin/components/ManageCoupons";
import ManageSeo from "./admin/components/ManageSeo";
import ManageAds from "./admin/components/ManageAds"; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/login" />} />
        <Route path="/admin" element={<Navigate to="/admin/login"/>}/>
        <Route path="/admin/login" element={<Login />} />

        <Route
          path="/admin/home"
          element={
            <ProtectedRoute>
              <AdminHome/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/sections"
          element={
            <ProtectedRoute>
              <ManageSections />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/coupons"
          element={
            <ProtectedRoute>
              <ManageCoupons />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/seo"
          element={
            <ProtectedRoute>
              <ManageSeo />
            </ProtectedRoute>
          }
        />

        {/* ✅ New route for Manage Ads */}
        <Route
          path="/admin/ads"
          element={
            <ProtectedRoute>
              <ManageAds />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
