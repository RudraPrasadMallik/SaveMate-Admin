import axios from "axios";

class AdminApi {
  constructor() {
    this.api = axios.create({
      baseURL:
      "https://savemate.onrender.com",
      // "http://localhost:8081",
      
      withCredentials: true,
    });

    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem("admin_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          localStorage.removeItem("admin_token");
          window.location.href = "/auth/login"; 
        }
        return Promise.reject(error);
      }
    );
  }

  login(credentials) {
    return this.api.post("/auth/login", credentials);
  }

  logout() {
    localStorage.removeItem("admin_token");
    return this.api.post("/auth/logout");
  }

  setAuthToken() {
    const token = localStorage.getItem("admin_token");
    if (token) {
      this.api.defaults.headers["Authorization"] = `Bearer ${token}`;
    }
  }

  // ================= Admin Endpoints =================

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

  deleteCoupon(id) {
    this.setAuthToken();
    return this.api.delete(`/admin/deleteCoupon/${id}`);
  }
  getAllCoupons(){
    this.setAuthToken();
    return this.api.get("/admin/getcoupons");
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

//Deal
  createDeal(deal) {
    this.setAuthToken();
    return this.api.post("/admin/createdeal", deal);
  }
   deleteDeal(id) {
    this.setAuthToken();
    return this.api.delete(`/admin/deletedeal/${id}`);
  }
  getAllDeals(){
    this.setAuthToken();
    return this.api.get("/admin/getdeals");
  }


  debugAuth() {
    return this.api.get("/debug");
  }
}

const adminApi = new AdminApi();
export default adminApi;
