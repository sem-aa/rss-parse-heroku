import axios from "axios";

// axios.defaults.baseURL = "http://localhost:3001";

const getToken = () => {
  return localStorage.getItem("token");
};

const getConfig = () => {
  return {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };
};

export const fetchPosts = async (params) => {
  try {
    const response = await axios.get("/posts", { params });
    return response.data;
  } catch (error) {
    console.error("Error updating post:", error);
  }
};

export const fetchPostById = async (id) => {
  try {
    const response = await axios.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching post by ID:", error);
  }
};

export const updatePost = async (id, updatedData) => {
  try {
    const response = await axios.put(`/posts/${id}`, updatedData, getConfig());
    return response.data;
  } catch (error) {
    console.error("Error updating post:", error);
  }
};

export const deletePost = async (id) => {
  try {
    const response = await axios.delete(`/posts/${id}`, getConfig());
    return response.data;
  } catch (error) {
    console.error("Error deleting post:", error);
  }
};

export const createPost = async (postData) => {
  try {
    const response = await axios.post("/posts", postData, getConfig());
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
  }
};
