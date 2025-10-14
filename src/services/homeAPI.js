// src/services/homeAPI.js

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const api = {
  async getUserProfile() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!(response.status === 200)) throw new Error(data.message);

      return { success: true, data };
    } catch (error) {
      console.error("Failed to get user profile:", error.message);
      return { success: false, error: error.message };
    }
  },

  async createFolder(name, folderId) {
    try {
      const endpoint = folderId
        ? `${API_BASE_URL}/folders/${folderId}/upload`
        : `${API_BASE_URL}/folders/upload`; // root upload

      const token = localStorage.getItem("token");
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();
      if (response.status !== 201) throw new Error(data.message);

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async uploadFile(formData, folderId) {
    try {
      const endpoint = folderId
        ? `${API_BASE_URL}/files/${folderId}/upload`
        : `${API_BASE_URL}/files/upload`;

      const token = localStorage.getItem("token");
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (response.status !== 201) throw new Error(data.message);

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
};
