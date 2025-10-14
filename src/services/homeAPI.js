// src/services/homeAPI.js

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

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
  
      if (!(response.status === 200))
        throw new Error(data.message);
  
      return { success: true, data };
    } catch (error) {
      console.error("Failed to get user profile:", error.message);
      return { success: false, error: error.message };
    }
  },
};
