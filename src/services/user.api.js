import api from ".";

export const searchApi = async (word) => {
  try {
    const response = await api.get("/api/search", {
      params: {
        engine: "google_trends",
        q: word,
        date: "2020-01-01 2025-12-31",
        // api_key: import.meta.env.VITE_SERPAPI_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};

export const searchRelatedApi = async (word) => {
  try {
    const response = await api.get("/api/search", {
      params: {
        q: word,
        // api_key: import.meta.env.VITE_SERPAPI_KEY,
        gl: "in",
        hl: "en",
      },
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};

