import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/PostItem.module.css";
import { HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi";
import { useId } from "react";
import DeletePostModel from "./DeletePostModel";

const PostItem = ({ post, getPost, onClick }) => {
  const modalId = useId();

  return (
    <div
      key={post._id}
      className={styles.item}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {/* AVATAR CON TAMAÑO MÁXIMO DE 40x40px */}
      <picture className={styles.avatar}>
        <img src={post.author.avatar} alt={post.author.username} />
      </picture>
      <div className={styles.details}>
        <section>
          <h2>{post.title}</h2>
        </section>
        {/* IMAGEN CON TAMAÑO MÁXIMO DE 400x400px */}
        <img
          src={post.imageURL}
          alt={post.title}
          className={styles.image}
        />
        {/* AGREGAR DESCRIPTION */}
        <p>{post.description}</p>
        <p className={styles.createdAt}>
          Created on: {new Date(post.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div>
        <b>{post.author.username}</b>
        <Link
          style={{ fontSize: "30px", color: "green" }}
          className="font-warning"
        >
          <HiOutlinePencilAlt />
        </Link>
        <Link
          onClick={(e) => {
            e.stopPropagation();
          }}
          data-bs-toggle="modal"
          data-bs-target={"#modal" + post._id}
          style={{ fontSize: "30px", color: "red" }}
        >
          <HiOutlineTrash />
        </Link>
        <DeletePostModel
          getPost={getPost}
          modalId={modalId}
          postId={post._id}
        />
      </div>
    </div>
  );
};

export default PostItem;





/* import { Link } from "react-router-dom";
import styles from "../styles/Post.module.css";
import { HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi";
import { useId } from "react";
import DeletePostModel from "./DeletePostModel";

const PostItem = ({ post, getPost, onClick }) => {
  const modalId = useId();

  return (
    <div
      key={post._id}
      className={styles.item}
      onClick={(e) => {
        // detiene la propagación para evitar activar el evento onClick del elemento padre

        e.stopPropagation();

        onClick();
      }}
    >
      <picture>
        <img src={post.author.avatar} alt={post.author.username} />
      </picture>
      <section>
        <h2>{post.title}</h2>
        <p>
          <b>{post.author.username}</b>
          <span>{post.comments.length}</span>
        </p>
      </section>
      <div>
        <Link
          style={{ fontSize: "30px", color: "green" }}
          className="font-warning"
        >
          <HiOutlinePencilAlt />
        </Link>
        <Link
          onClick={(e) => {
            e.stopPropagation();
          }}
          data-bs-toggle="modal"
          data-bs-target={"#modal" + post._id}
          style={{ fontSize: "30px", color: "red" }}
        >
          <HiOutlineTrash />
        </Link>

        <DeletePostModel
          getPost={getPost}
          modalId={modalId}
          postId={post._id}
        />
      </div>
    </div>
  );
};

export default PostItem; */
