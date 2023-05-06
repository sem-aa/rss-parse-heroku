import * as DOMPurify from "dompurify";
import styles from "./Post.module.css";

const Post = ({ post }) => {
  let cleanHtml = DOMPurify.sanitize(post.description);

  return (
    <div className={styles.post}>
      <h3 className={styles.title}>{post.title}</h3>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: cleanHtml }}
      />
    </div>
  );
};

export default Post;
