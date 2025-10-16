// src/services/folder.js

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const api = {
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

  async getFolderContents(folderId) {
    try {
      const endpoint = folderId
        ? `${API_BASE_URL}/folders/${folderId}`
        : `${API_BASE_URL}/folders/null`;

      const token = localStorage.getItem("token");
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.status !== 200) throw new Error(data.message);

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async getCrumbs(folderId) {
    try {
      const endpoint = folderId
        ? `${API_BASE_URL}/folders/${folderId}/crumbs`
        : `${API_BASE_URL}/folders/crumbs`;
      console.log(endpoint)

      const token = localStorage.getItem("token");
      const response = await fetch(endpoint,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (response.status !== 200) throw new Error(data.message);

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async renameFolder(folderId, name) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_BASE_URL}/folders/${folderId}/newFolderName`,
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
      if (response.status !== 200) throw new Error(data.message);

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

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
