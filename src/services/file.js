const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const api = {

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
