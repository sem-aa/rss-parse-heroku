import axios from "axios";

// axios.defaults.baseURL = "http://localhost:3001"

export const login = async (credentials) => {
  try {
    const response = await axios.post("/login", credentials);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};
