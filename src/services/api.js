// src/services/api.js

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const api = {
  async testConnection() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error("API connection test failed:", error);
      return { success: false, error: error.message };
    }
  },

  async register({ username, email, password }) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!(response.status === 201))
        throw new Error(
          data.message || `HTTP error! status: ${response.status}`
        );

      localStorage.setItem("token", data.token);

      return { success: true, data };
    } catch (error) {
      console.error("Registration failed:", error);
      return { success: false, error: error.message };
    }
  },

  async login({ email, password }) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!(response.status === 200))
        throw new Error(
          data.message || `HTTP error! status: ${response.status}`
        );

      localStorage.setItem("token", data.token);

      return { success: true, data };
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false, error: error.message };
    }
  },

  async verifyJWT() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!(response.status === 200))
        throw new Error(data.message);

      return { success: true };
    } catch (error) {
      console.log(error.message);
      return { success: false, error: error.message };
    }
  },

  async getUserProfile() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/profile `, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || `HTTP error! status: ${response.status}`
        );
      }

      return { success: true, data };
    } catch (error) {
      console.log("Failed to get user profile:", error.message);
      return { success: false, error: error.message };
    }
  },
};
