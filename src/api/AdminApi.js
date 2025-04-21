import axios from "axios";

class AdminApi {
  constructor() {
    this.api = axios.create({
      baseURL:"https://savemate.onrender.com",
      withCredentials: true,
    });

    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem("admin_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  login(credentials) {
    return this.api.post("/auth/login", credentials);
  }

  logout() {
    return this.api.post("/auth/logout");
  }

  setAuthToken() {
    const token = localStorage.getItem("authToken");
    if (token) {
      this.api.defaults.headers["Authorization"] = `Bearer ${token}`;
    }
  }

  getAllSections() {
    this.setAuthToken();
    return this.api.get("/admin/sections");
  }

  createSection(section) {
    this.setAuthToken();
    return this.api.post("/admin/createsections", section);
  }

  updateSection(id, sectionDetails) {
    this.setAuthToken();
    return this.api.put(`/admin/updatesections/${id}`, sectionDetails);
  }

  deleteSection(id) {
    this.setAuthToken();
    return this.api.delete(`/admin/deletesections/${id}`);
  }

  createCoupon(coupon) {
    this.setAuthToken();
    return this.api.post("/admin/createcoupons", coupon);
  }

  getSeoData(pageName) {
    this.setAuthToken();
    return this.api.get(`/seo/${pageName}`);
  }

  updateSeoData(pageName, seo) {
    this.setAuthToken();
    return this.api.put(`/seo/${pageName}`, {
      seoTitle: seo.title,
      seoDescription: seo.description,
      seoKeywords: seo.keywords,
    });
  }

  getAllAds() {
    this.setAuthToken();
    return this.api.get("/ads/all");
  }

  createAd(ad) {
    this.setAuthToken();
    return this.api.post("/ads/create", ad);
  }

  updateAd(id, ad) {
    this.setAuthToken();
    return this.api.put(`/ads/update/${id}`, ad);
  }

  debugAuth() {
    return this.api.get("/debug");
  }
}

const adminApi = new AdminApi(); // ✅ assigned to variable and used
export default adminApi;         // ✅ properly exported
