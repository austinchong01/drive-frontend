// src/services/folder.js

/**
 * Folder Service
 * Handles all folder-related API operations: create, read, rename, move, and delete
 */

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const api = {
  /**
   * Create a folder within a parent folder
   * @param {string} name - New folder name
   * @param {string} folderId - ID of parent folder (empty string for root)
   * @returns {Promise<{success: boolean, data?: {folder: Object}, error?: string}>} Creation result with new folder data
   */
  async createFolder(name, folderId) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_BASE_URL}/folders/${folderId}/upload`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name }),
        }
      );

      const data = await response.json();
      if (response.status !== 201) throw new Error(data.message);

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Retrieve contents of folder (subfolders and files)
   * @param {string} folderId - ID of folder to retrieve (empty string for root)
   * @returns {Promise<{success: boolean, data?: {subfolders: Array, files: Array}, error?: string}>} Folder contents result
   */
  async getFolderContents(folderId) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/folders/${folderId}`, {
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
      return { success: false, error: error.message };
    }
  },

  /**
   * Get the breadcrumb trail
   * @param {string} folderId - ID of folder to traverse
   * @returns {Promise<{success: boolean, data?: {breadcrumbs: Array}, error?: string}>} Breadcrumb trail result
   */
  async getCrumbs(folderId) {
    if (folderId === undefined) folderId = "";
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_BASE_URL}/folders/${folderId}/crumbs`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Rename a folder
   * @param {string} folderId - ID of folder to rename
   * @param {string} name - New folder name
   * @returns {Promise<{success: boolean, data?: {name: string}, error?: string}>} Rename result with updated folder name
   */
  async renameFolder(folderId, name) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_BASE_URL}/folders/${folderId}/updateFolderName`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Move a folder to a different parent folder
   * @param {string} folderId - ID of folder to move
   * @param {string} newParentId - ID of destination folder
   * @returns {Promise<{success: boolean, data?: Object, error?: string}>} Move operation result
   */
  async updateFolderLoc(folderId, newParentId) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_BASE_URL}/folders/${folderId}/updateFolderLocation`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ newParentId }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Delete a folder and its contents (recursively)
   * @param {string} folderId - ID of the folder to delete
   * @returns {Promise<{success: boolean, error?: string}>} Delete operation result
   */
  async deleteFolder(folderId) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/folders/${folderId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 204) {
        const data = await response.json();
        throw new Error(data.message);
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
};
