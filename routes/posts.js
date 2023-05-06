const express = require("express");
const {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  getPostById,
} = require("../controllers/postsController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", authMiddleware, createPost);
router.put("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);

module.exports = router;
