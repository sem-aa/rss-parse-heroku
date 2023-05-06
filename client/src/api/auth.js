import axios from "axios";

// axios.defaults.baseURL = "http://localhost:3001"
const config = { withCredentials: true };

export const login = async (credentials) => {
  try {
    const response = await axios.post("api/auth/login", credentials, config);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};
