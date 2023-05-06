import React, { useState, useEffect, useCallback } from "react";
import { fetchPosts, deletePost } from "../../api/posts";
import Post from "../Post/Post";
import { useNavigate } from "react-router-dom";
import AdminPanel from "../AdminPanel/AdminPanel";
import styles from "./PostList.module.css";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("-createdAt");
  const [limit, setLimit] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts({ page, search, sort, limit }).then((data) =>
      setPosts(data.posts)
    );
  }, [page, search, sort, limit]);

  const updatePosts = useCallback(
    (newParams) => {
      if (newParams.hasOwnProperty("search")) {
        setSearch(newParams.search);
      } else {
        setPage(newParams.page || page);
        setSort(newParams.sort || sort);
        setLimit(newParams.limit || limit);
      }
    },
    [page, sort, limit]
  );

  const handleDelete = async (id) => {
    if (id) {
      await deletePost(id);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
      navigate("/");
    }
  };

  return (
    <div>
      <AdminPanel />
      <div className={styles.filters}>
        <input
          className={styles.input}
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => updatePosts({ search: e.target.value })}
        />
        <select
          className={styles.input}
          value={sort}
          onChange={(e) => updatePosts({ sort: e.target.value })}
        >
          <option value="-createdAt">Newest</option>
          <option value="createdAt">Oldest</option>
          <option value="title">Title A-Z</option>
          <option value="-title">Title Z-A</option>
        </select>
        <select
          className={styles.input}
          value={limit}
          onChange={(e) => updatePosts({ limit: parseInt(e.target.value) })}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>

        <button
          className={styles.btn}
          onClick={() => updatePosts({ page: page - 1 })}
          disabled={page <= 1}
        >
          Previous
        </button>
        <button
          className={styles.btn}
          onClick={() => updatePosts({ page: page + 1 })}
        >
          Next
        </button>
      </div>
      <ul className={styles.container}>
        {posts?.map((post) => (
          <li key={post._id} className={styles.postWrapper}>
            <Post post={post} />
            <div className={styles.btnContainer}>
              <button
                className={styles.btn}
                onClick={() => navigate(`posts/${post._id}/edit`)}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post._id)}
                className={styles.deletebtn}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsList;
