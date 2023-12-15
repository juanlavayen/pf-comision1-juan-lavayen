import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import { Link, useNavigate } from "react-router-dom";

const Post = ({ posts, getPost }) => {
  // Estado para la búsqueda
  const [search, setSearch] = useState("");
  // Estado para los posts filtrados
  const [filterPosts, setFilterPosts] = useState(posts || []);

  // Instancia de navigate para redireccionar
  const navigate = useNavigate();

  // Efecto que filtra los posts cuando cambia la búsqueda o los posts
  useEffect(() => {
    // Filtra los posts basados en la búsqueda
    const filtered = (posts || []).filter((play) => {
      return play.title.toLowerCase().includes(search.toLowerCase());
    });

    // Actualiza el estado con los posts filtrados
    setFilterPosts(filtered);
  }, [search, posts]);

  // Agrega el console.log aquí para depurar y verificar las props
  console.log("Props in Post component:", { posts, getPost, search, filterPosts });

  return (
    <div style={{ minWidth: "420px" }}>
      {/* Enlace para crear un nuevo post */}
      <Link to="/post/new" className="btn btn-success">
        Create
      </Link> 

      {/* Input para la búsqueda */}
      <input
        type="search"
        className="form-control"
        placeholder="Search"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />

      {/* Mapeo de los posts filtrados */}
      {filterPosts.map((post) => (
        <PostItem
          getPost={getPost}
          key={post._id}
          post={post}
          onClick={() => {
            // Redirecciona al detalle del post al hacer clic
            navigate(`/post/${post._id}`);
          }}
        />
      ))}
    </div>
  );
};

export default Post;

