const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const api = {
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
