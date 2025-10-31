// src/services/user.js

/**
 * User Service
 * Handles all user-related API calls including authentication and profile management
 */

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const api = {
  /**
   * Registers a new user account
   * @param {string} username - User's username
   * @param {string} email - User's email address
   * @param {string} password - User's password
   * @returns {Promise<{success: boolean, data?: Object, error?: string}>} Registration result w/ JWT token
   */
  async register(username, email, password) {
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

      // Store JWT token in localStorage
      localStorage.setItem("token", data.token);

      return { success: true, data };
    } catch (error) {
      console.error("Registration failed:", error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Authenticates a user with email and password
   * @param {string} email - User's email address
   * @param {string} password - User's password
   * @returns {Promise<{success: boolean, data?: Object, error?: string}>} Login result w/ JWT token
   */
  async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok)
        throw new Error(
          data.message || `HTTP error! status: ${response.status}`
        );

      // Store JWT token in localStorage
      localStorage.setItem("token", data.token);

      return { success: true, data };
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Verifies JWT token
   * @returns {Promise<{success: boolean, error?: string}>} Verification result
   */
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

      if (!response.ok) throw new Error(data.message);

      return { success: true };
    } catch (error) {
      console.error(error.message);
      return { success: false, error: error.message };
    }
  },

  /**
   * Fetches the current user's profile information
   * @returns {Promise<{success: boolean, data?: Object, error?: string}>} User's profile data
   */
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

      if (!response.ok) throw new Error(data.message);

      return { success: true, data };
    } catch (error) {
      console.error("Failed to get user profile:", error.message);
      return { success: false, error: error.message };
    }
  },
};
