import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  createPost,
  deletePost,
  fetchPostById,
  updatePost,
} from "../../api/posts";
import Post from "../Post/Post";
import styles from "./PostForm.module.css";

const PostForm = () => {
  const [post, setPost] = useState({
    title: "",
    description: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchPostById(id).then((data) => setPost(data));
    }
  }, [id]);

  const handleChange = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    console.log("handleSubmit update or create");
    event.preventDefault();
    if (id) {
      await updatePost(id, post);
    } else {
      await createPost(post);
    }
    navigate("/");
  };

  const handleDelete = async () => {
    if (id) {
      await deletePost(id);
      navigate("/");
    }
  };

  return (
    <div className={styles.postFormWrapper}>
      <h2>{id ? "Edit Post" : "Create Post"}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>
            Title:
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={post.title}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>
            Description:
          </label>
          <textarea
            name="description"
            id="description"
            value={post.description}
            onChange={handleChange}
            className={styles.description}
          />
        </div>
        <div className={styles.btnContainer}>
          <button type="submit" className={styles.btn}>
            {id ? "Update" : "Create"}
          </button>
          {id && (
            <button
              onClick={handleDelete}
              className={`${styles.btn} ${styles.deletebtn}`}
            >
              Delete
            </button>
          )}
        </div>

        {id && <Post post={post} />}
      </form>
    </div>
  );
};

export default PostForm;
