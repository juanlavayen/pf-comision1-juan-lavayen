import { useContext, useEffect, useRef, useState } from "react";
import styles from "../styles/AuthForm.module.css";
import { useParams } from "react-router-dom";
import { API_URL } from "../utils/consts";
import { AuthContext } from "../providers/AuthProvider";
import { HiOutlineTrash } from "react-icons/hi";
import Navbar from "../components/Navbar";

const CommentPage = () => {
  const { postId } = useParams();

  const [post, setPost] = useState(null);

  const { auth } = useContext(AuthContext);
  const formRef = useRef(null);

  const getPost = () => {
    fetch(`${API_URL}/post/${postId}`, {
      headers: {
        Authorization: auth.token,
      },
    })
      .then((res) => {
        if (res.status !== 200) return alert("Error getting post");

        return res.json();
      })
      .then((data) => {
        setPost(data);
      });
  };

  useEffect(() => {
    getPost();
  }, [postId, auth]);

  const handleDeleteComment = (commentId) => {
    fetch(`${API_URL}/comments/${postId}/${commentId}`, {
      method: "DELETE",
      headers: {
        Authorization: auth.token,
      },
    }).then((res) => {
      if (!res.ok) return alert("Error deleting comment");
      getPost();
    });
  };

  const handleCreateNewComment = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    fetch(`${API_URL}/comments/${postId}`, {
      method: "POST",
      body: JSON.stringify({
        name: formData.get("name"),
        artist: formData.get("author"),
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
    }).then((res) => {
      if (!res.ok) return alert("Error creating new comment");
      getPost();
    });

    formRef.current.reset();
  };

  if (!post) return <h1>Cargando...</h1>;

  return (
    <div>
      <Navbar />
      <h1>{post.title}</h1>
      <form onSubmit={handleCreateNewComment} ref={formRef}>
        <input type="text" name="author" placeholder="author" />
        <input type="text" name="description" placeholder="comment name" />
        
        <button>Nuevo comentario</button>
      </form>
      {post.comments.map((comment) => {
        return (
          <div key={comment.id} className="comment">
            <h2>{comment.description}</h2>
            <button
              className="delete-button"
              onClick={() => handleDeleteComment(comment._id)}
            >
              <HiOutlineTrash />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default CommentPage;