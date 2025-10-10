async function testConnection() {
  try {
    const response = await fetch(`${VITE_BACKEND_URL}/test`, {
      method: "GET",
      credentials: "include",
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
}
