// src/services/file.js

/**
 * File Service
 * Handles all file-related API operations: create, rename, move, and delete
 */

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const api = {
  /**
   * Upload a file to a folder
   * @param {FormData} formData - Form data containing the file and metadata
   * @param {string} folderId - ID of parent folder (empty string for root)
   * @returns {Promise<{success: boolean, data?: {file: Object}, error?: string}>} Upload result with created file data
   */
  async createFile(formData, folderId) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/files/${folderId}/upload`, {
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

  /**
   * Rename a file
   * @param {string} fileId - ID of file to rename
   * @param {string} name - New file name
   * @returns {Promise<{success: boolean, data?: {displayName: string}, error?: string}>} Rename result with updated file name
   */
  async renameFile(fileId, name) {
    try {
      const endpoint = `${API_BASE_URL}/files/${fileId}/updateFileName`;

      const token = localStorage.getItem("token");
      const response = await fetch(endpoint, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Move a file to a different folder
   * @param {string} fileId - ID of file to move
   * @param {string} newParentId - ID of destination folder
   * @returns {Promise<{success: boolean, data?: Object, error?: string}>} Move result
   */
  async updateFileLoc(fileId, newParentId) {
    try {
      const endpoint = `${API_BASE_URL}/files/${fileId}/updateFileLocation`;

      const token = localStorage.getItem("token");
      const response = await fetch(endpoint, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newParentId }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Delete a file
   * @param {string} fileId - ID of file to delete
   * @returns {Promise<{success: boolean, error?: string}>} Delete result
   */
  async deleteFile(fileId) {
    try {
      const endpoint = `${API_BASE_URL}/files/${fileId}`;

      const token = localStorage.getItem("token");
      const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
};