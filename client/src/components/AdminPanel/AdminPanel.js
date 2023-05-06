import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdminPanel.module.css";

const AdminPanel = ({ setIsAuth }) => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsAuth(false);
    navigate("/");
  };

  return (
    <div className={styles.adminPanel}>
      <h2 className={styles.title}>Admin</h2>
      {token ? (
        <>
          <button className={`${styles.btn} ${styles.logout}`} onClick={logout}>
            Logout
          </button>
          <button
            className={styles.btn}
            onClick={() => navigate("posts/create")}
          >
            Create Post
          </button>
        </>
      ) : (
        <button className={styles.btn} onClick={() => navigate("/login")}>
          Login
        </button>
      )}
    </div>
  );
};

export default AdminPanel;
