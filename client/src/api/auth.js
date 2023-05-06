import axios from "axios";

export const login = async (credentials) => {
  try {
    const response = await axios.post("api/auth/login", credentials, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};
