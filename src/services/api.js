// src/services/api.js

/**
 * General API Service
 * Handles search functionality and health check
 */

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const api = {
  /**
   * Search for files and folders by query
   * @param {string} query - Query to match against file and folder names
   * @returns {Promise<{success: boolean, data?: {files: Array, folders: Array}, error?: string}>} Search results w/ matching files and folders
   */
  async search(query) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/api/search?q=${query}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Tests the connection to the backend API
   * @returns {Promise<{success: boolean, data?: Object, error?: string}>} Connection status
   */
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
};