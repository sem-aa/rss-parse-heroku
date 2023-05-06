const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: String,
  link: String,
  description: String,
  pubDate: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

PostSchema.index({ title: "text", description: 'text' });

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
