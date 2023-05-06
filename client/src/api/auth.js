import axios from "axios";

export const login = async (credentials) => {
  try {
    const response = await axios.post("http://localhost:3001/auth/login", credentials);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};
