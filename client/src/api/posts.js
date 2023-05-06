import axios from "axios";

const URL_LOCAL = "http://localhost:3001/posts";

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
    const response = await axios.get(URL_LOCAL, { params });
    return response.data;
  } catch (error) {
    console.error("Error updating post:", error);
  }
};

export const fetchPostById = async (id) => {
  try {
    const response = await axios.get(`${URL_LOCAL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching post by ID:", error);
  }
};

export const updatePost = async (id, updatedData) => {
  try {
    const response = await axios.put(
      `${URL_LOCAL}/${id}`,
      updatedData,
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Error updating post:", error);
  }
};

export const deletePost = async (id) => {
  try {
    const response = await axios.delete(`${URL_LOCAL}/${id}`, getConfig());
    return response.data;
  } catch (error) {
    console.error("Error deleting post:", error);
  }
};

export const createPost = async (postData) => {
  try {
    const response = await axios.post(`${URL_LOCAL}`, postData, getConfig());
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
  }
};
