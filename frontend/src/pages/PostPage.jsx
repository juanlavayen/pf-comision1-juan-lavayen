import styles from "../styles/PostItem.module.css";
import { useCallback, useContext, useEffect, useState } from "react";
import { API_URL } from "../utils/consts";
import { AuthContext } from "../providers/AuthProvider";
import Post from "../components/Post";
import Navbar from "../components/Navbar";

function PostPage() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const { auth } = useContext(AuthContext);

  const getPosts = useCallback(() => {
    fetch(`${API_URL}/post`, {
      headers: {
        Authorization: auth.token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((errorData) => {
            throw new Error(`Failed to fetch posts: ${errorData.message}`);
          });
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched posts data:", data);
        setPosts(data);
      })
      .catch((err) => {
        console.error(err);
        setError("Error fetching posts");
      });
  }, [auth.token]);

  useEffect(() => {
    getPosts();
  }, [auth.token, getPosts]);

  return (
    <div className={styles.container}>
      <Navbar />
      <h1>Mis viajes !! </h1>
      <main className={styles.section}>
  {error ? (
    <p>{error}</p>
  ) : (
    <div>
      {/* Verificación de posts antes de mapear */}
      {posts && posts.length > 0 ? (
        <Post posts={posts} getPost={getPosts} />
      ) : (
        <p>No hay posts disponibles.</p>
      )}
    </div>
  )}
</main>
      
    </div>
  );
}

export default PostPage;



/* import styles from "../styles/Post.module.css";
import { useCallback, useContext, useEffect, useState } from "react";
import { API_URL } from "../utils/consts";
import { AuthContext } from "../providers/AuthProvider";
import Post from "../components/Post";
import Navbar from "../components/Navbar";

function PostPage() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  const { auth } = useContext(AuthContext);

  const getPosts = useCallback(() => {
    fetch(`${API_URL}/post`, {
      headers: {
        Authorization: auth.token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched posts data:", data);
        setPosts(data);
      })
      .catch((err) => {
        console.error(err);
        setError("Error fetching posts");
      });
  }, [auth.token]);

  useEffect(() => {
    getPosts();
  }, [auth.token, getPosts]);

  return (
    <div className={styles.container}>
      <Navbar />
      <h1>Mis posts ... !! </h1>
     
<main className={styles.section}>
  {error ? (
    <p>{error}</p>
  ) : (
    <div>
      {posts.map((post) => (
        <Post
          key={post._id}
          title={post.title}
          description={post.description}
          author={post.author.username}
          imageURL={post.imageURL}
          createdAt={post.createdAt}
        />
      ))}
    </div>
  )}
</main>

</div>
);
}

export default PostPage;
 */