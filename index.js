const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const Post = require("./models/Post");
const parseRSS = require("./rssParser");
const cron = require("node-cron");
const authRoutes = require("./routes/auth");
const postsRoutes = require("./routes/posts");


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

app.use("/auth", authRoutes);
app.use("/posts", postsRoutes);

const rssFeedUrl = "https://lifehacker.com/rss";

cron.schedule("*/30 * * * *", async () => {
  console.log("Parsing RSS feed...");

  try {
    const items = await parseRSS(rssFeedUrl);

    for (const item of items) {
      const exists = await Post.findOne({ link: item.link });

      if (!exists) {
        await Post.create(item);
        console.log("New post saved:", item.title);
      }
    }

    console.log("RSS feed parsing completed.");
  } catch (error) {
    console.error("Error parsing RSS feed:", error);
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
